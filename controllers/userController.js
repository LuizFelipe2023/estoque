import User from '../models/user.js'; 
import bcrypt from 'bcryptjs'; 

const userController = {

    async register(req, res) {
        try {
            const { name, email, password, confirmPassword } = req.body;

           
            if (!name || !email || !password) {
                return res.status(400).json({ error: 'Preencha todos os campos obrigatórios!.' });
            }

            
            if (password !== confirmPassword) {
                return res.status(422).json({ error: "As senhas não conferem!" });
            }

            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ error: "Já existe um usuário usando este email! Tente outro email." });
            }

           
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new User({
                name,
                email,
                password: hashedPassword
            });

         
            const savedUser = await newUser.save();
            return res.status(201).json(savedUser);

        } catch (err) {
          
            console.error("Erro ao criar uma conta:", err);
            return res.status(500).json({ error: "Erro ao criar uma conta." });
        }
    },

    async resetPassword(req, res) {
        try {
            const { email, oldPassword, newPassword, confirmPassword } = req.body;
            const { userId } = req.body.userId;

            
            if (!email || !oldPassword || !newPassword || !confirmPassword) {
                return res.status(400).json({ error: "Preencha todos os campos obrigatórios." });
            }

           
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(404).json({ error: "Nenhum usuário encontrado com este e-mail." });
            }

           
            if (userId !== req.user.id) {
                return res.status(403).json({ error: 'Acesso proibido. Você só pode alterar sua própria senha.' });
            }

          
            const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
            if (!isPasswordCorrect) {
                return res.status(401).json({ error: "Credenciais inválidas. Verifique se a senha atual está correta." });
            }

           
            if (newPassword !== confirmPassword) {
                return res.status(422).json({ error: "As senhas não conferem." });
            }

            
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;
            await user.save();

            return res.status(200).json({ message: "Senha alterada com sucesso." });

        } catch (error) {
           
            console.error("Erro ao redefinir a senha:", error);
            return res.status(500).json({ error: "Erro ao redefinir a senha." });
        }
    }
};

export default userController;
