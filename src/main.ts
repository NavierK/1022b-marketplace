import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';

const app = express();

app.use(express.json());
app.use(cors());

// Rota para listar produtos
app.get("/produtos", async (req, res) => {
    try {
        const conexao = await mysql.createConnection({
            host: process.env.dbhost ? process.env.dbhost : "localhost",
            user: process.env.dbuser ? process.env.dbuser : "root",
            password: process.env.dbpassword ? process.env.dbpassword : "",
            database: process.env.dbname ? process.env.dbname : "banco1022b",
            port: process.env.dbport ? parseInt(process.env.dbport) : 3306
        });

        const [result] = await conexao.query("SELECT * FROM produtos");
        await conexao.end();

        res.send(result);
    } catch (e) {
        res.status(500).send("Erro do servidor ao listar produtos");
    }
});

// Rota para listar usuários
app.get("/usuarios", async (req, res) => {
    try {
        const conexao = await mysql.createConnection({
            host: process.env.dbhost ? process.env.dbhost : "localhost",
            user: process.env.dbuser ? process.env.dbuser : "root",
            password: process.env.dbpassword ? process.env.dbpassword : "",
            database: process.env.dbname ? process.env.dbname : "banco1022b",
            port: process.env.dbport ? parseInt(process.env.dbport) : 3306
        });

        const [result] = await conexao.query("SELECT * FROM usuarios");
        await conexao.end();

        res.send(result);
    } catch (e) {
        res.status(500).send("Erro do servidor ao listar usuários");
    }
});

app.listen(8000, () => {
    console.log("SERVIDOR INICIADO NA PORTA 8000");
});
