import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();
const conexao = new Sequelize(process.env.db_name,process.env.db_user, process.env.db_password, {
    host: 'localhost',
    dialect: 'mysql'
})

try {
    (async () => {
        await conexao.authenticate();
        console.log("Conexão Feita com sucesso");
    })();

} catch (err) {
    console.error("Erro ao conectar-se ao Banco de dados:", err);
}

export default conexao;