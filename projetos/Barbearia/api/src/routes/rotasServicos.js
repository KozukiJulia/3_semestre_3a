import { Router } from "express";
import { BD } from "../../db.js";
import bcrypt from 'bcrypt';

const router = Router();

router.get('/Servicos', async (req, res) => {
    try {
        
        const query = `SELECT * FROM Servicos ORDER BY id_servico`

        const Servicos = await BD.query(query);

        return res.status(200).json(Servicos.rows);
    } catch (error) {
        console.error('Erro ao listar Servicos', error.message);
        return res.status(500).json({ error: 'Erro ao listar Servicos' })
    }
})

//Endpoint seguro contra sql Injection
router.post('/Servicos', async (req, res) => {
    const { nome, valor, descricao } = req.body;
    try {


        const comando = `INSERT INTO Servicos(nome, valor, descricao) VALUES($1, $2, $3)`
        const valores = [nome, valor, descricao];

        await BD.query(comando, valores)
        console.log(comando, valores);

        return res.status(201).json("Servico cadastrado.");
    } catch (error) {
        console.error('Erro ao cadastrar Servicos', error.message);
        return res.status(500).json({ error: 'Erro ao cadastrar Servicos' })
    }
})


router.put('/Servicos/:id_servico', async (req, res) => {
    // Id recebido via parametro
    const { id_servico } = req.params;

    // Dados do servico recebido via Corpo da página
    const { nome, valor, descricao } = req.body;
    try {
        //Verificar se o servico existe
        const verificarServico = await BD.query(`SELECT * FROM Servicos
            WHERE id_servico = $1`, [id_servico])
        if (verificarServico.rows.length === 0) {
            return res.status(404).json({ message: 'Servico não encontrado' })
        }
        // Atualiza todos os campos da tabela(PUT Substituição completa)
        const comando = `UPDATE Servicos SET nome = $1, valor = $2, descricao = $3 WHERE
        id_servico = $4`;
        const valores = [nome, valor, descricao, id_servico];
        await BD.query(comando, valores);

        return res.status(200).json('Servico foi atualizado!');
    } catch (error) {
        console.error('Erro ao atualizar Servicos', error.message);
        return res.status(500).json({ error: 'Erro ao atualizar Servicos' })
    }
})

router.delete('/Servicos/:id_servico', async (req, res) => {
    const { id_servico } = req.params;
    try {
        //Executa o comando de delete
        const comando = `DELETE FROM Servicos WHERE id_servico = $1`
        await BD.query(comando, [id_servico])
        return res.status(200).json({ message: "Servico removido com sucesso" })
    } catch (error) {
        console.error('Erro ao atualizar Servicos', error.message)
        return res.status(500).json({ message: "Erro interno so servidor" + error.message })
    }
})


    
export default router