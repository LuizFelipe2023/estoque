import express from 'express';
import conexao from './banco/db.js';
import router from './rotas/routes.js';
const app = express();

app.use(express.json());
app.use('/',router);

(async()=>{
       try{
          await conexao.sync();
          console.log("Todos os modelos estão sincronizados com o banco de dados");
       }catch(err){
          console.error("Erro ao sincronizar os modelos com o banco de dados:",err);
       }
})();

app.listen(3000,()=>{
    console.log("O servidor estar rodando na porta http://localhost:3000");
});