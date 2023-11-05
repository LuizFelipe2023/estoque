import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const blacklistedTokens = [];

const authController = {
    async login(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(422).json({ error: 'E-mail e senha são obrigatórios para fazer login.' });
            }

            const user = await User.findOne({ where: { email } });

            if (!user) {
                return res.status(422).json({ error: 'Esta conta não existe.' });
            }

            const correctPassword = await bcrypt.compare(password, user.password);

            if (!correctPassword) {
                return res.status(422).json({ error: 'Senha incorreta.' });
            }

            const secret = process.env.JWT_SECRET;
            const token = jwt.sign({ id: user.id }, secret, { expiresIn: '5min' });

            res.status(200).json({message:"Login Realizado com sucesso",token, userId: user.id });
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            res.status(500).json({ error: 'Erro interno do servidor ao fazer login.' });
        }
    },

    async logout(req, res) {
        try {
            const token = req.header('auth-token');
            if (!token) {
                return res.status(401).json({ error: 'Nenhum token encontrado.' });
            }
            blacklistedTokens.push(token);

            res.status(200).json({ message: 'Logout realizado com sucesso.' });
        } catch (error) {
            console.error('Erro ao realizar logout:', error);
            res.status(500).json({ error: 'Erro interno do servidor ao realizar logout.' });
        }
    },

    async verifyToken(req, res, next) {
        try {
            const token = req.header('auth-token');
            if (!token) {
                return res.status(401).json({ error: 'Acesso negado. É necessário um token de autenticação.' });
            }

            if (blacklistedTokens.includes(token)) {
                return res.status(401).json({ error: 'Token inválido. Faça o login novamente.' });
            }

            const secret = process.env.JWT_SECRET;
            const verified = jwt.verify(token, secret);
            req.user = { userId: verified.id };
            next();
        } catch (error) {
            console.error('Token inválido:', error);
            res.status(401).json({ error: 'Token inválido.' });
        }
    }
};

export default authController;
