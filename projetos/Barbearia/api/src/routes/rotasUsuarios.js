import { Router } from "express";
import { BD } from "../../db.js";
import bcrypt from 'bcrypt';

const router = Router();


router.get('/usuarios', async (req, res) => {
    try {
        
        const query = `SELECT * FROM usuarios ORDER BY id_usuario`

        
        const usuarios = await BD.query(query);

        //retorno para a pagina, o json com os dados 
        //buscados do sql
        return res.status(200).json(usuarios.rows);//200 ok
    } catch (error) {
        console.error('Erro ao listar usuários', error.message);
        return res.status(500).json({ error: 'Erro ao listar usuarios' })
    }
})

//Endpoint seguro contra sql Injection
router.post('/usuarios', async (req, res) => {
    const { nome, email, senha, tipo } = req.body;
    try {
        //definindo a força da criptografia
        const saltRounds = 10
        //gerando o hash da senha
        const senhaCriptografada = await bcrypt.hash(senha, saltRounds)

        const comando = `INSERT INTO USUARIOS(nome, email, senha, tipo) VALUES($1, $2, $3, $4)`
        const valores = [nome, email, senhaCriptografada, tipo];

        await BD.query(comando, valores)
        console.log(comando, valores);

        return res.status(201).json("Usuário cadastrado.");
    } catch (error) {
        console.error('Erro ao cadastrar usuários', error.message);
        return res.status(500).json({ error: 'Erro ao cadastrar usuarios' })
    }
})

// endpoint para atualizar um unico usuário
// recebendo o parametro pelo id e buscando o usuario
router.put('/usuarios/:id_usuario', async (req, res) => {
    // Id recebido via parametro
    const { id_usuario } = req.params;


    const { nome, email, senha, tipo } = req.body;
    try {
        //Verificar se o usuario existe
        const verificarUsuario = await BD.query(`SELECT * FROM USUARIOS
            WHERE id_usuario = $1`, [id_usuario])
        if (verificarUsuario.rows.length === 0) {
            return res.status(404).json({ message: 'Usuario não encontrado' })
        }
        // Atualiza todos os campos da tabela(PUT Substituição completa)
        const comando = `UPDATE USUARIOS SET nome = $1, email = $2, senha =$3, tipo = $4 WHERE
        id_usuario = $5`;
        const valores = [nome, email, senha, tipo, id_usuario];
        await BD.query(comando, valores);

        return res.status(200).json('Usuario foi atualizado!');
    } catch (error) {
        console.error('Erro ao atualizar usuários', error.message);
        return res.status(500).json({ error: 'Erro ao atualizar usuarios' + error.message })
    }
})


router.delete('/usuarios/:id_usuario', async (req, res) => {
    const { id_usuario } = req.params;
    try {
        //Executa o comando de delete
        const comando = `DELETE FROM USUARIOS WHERE id_usuario = $1`
        await BD.query(comando, [id_usuario])
        return res.status(200).json({ message: "Usuario removido com sucesso" })
    } catch (error) {
        console.error('Erro ao atualizar usuario', error.message)
        return res.status(500).json({ message: "Erro interno so servidor" + error.message })
    }
})



export default router