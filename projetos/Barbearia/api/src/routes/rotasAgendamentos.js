import { Router } from "express";
import { BD } from "../../db.js";
import bcrypt from 'bcrypt';

const router = Router();

router.get('/agendamentos', async (req, res) => {
    try {
        
        const query = `SELECT * FROM agendamentos ORDER BY id_agendamento`

       
        const agendamentos = await BD.query(query);

        
        return res.status(200).json(agendamentos.rows);//200 ok
    } catch (error) {
        console.error('Erro ao listar agendamentos', error.message);
        return res.status(500).json({ error: 'Erro ao listar agendamentos' + error.message })
    }
})

//Endpoint seguro contra sql Injection
router.post('/agendamentos', async (req, res) => {
    const { data_hora, status, id_usuario, id_servico } = req.body;
    try {

        const comando = `INSERT INTO agendamentos(data_hora, status, id_usuario, id_servico) VALUES($1, $2, $3, $4)`
        const valores = [data_hora, status, id_usuario, id_servico];

        await BD.query(comando, valores)
        console.log(comando, valores);

        return res.status(201).json("Agendamento cadastrado");
    } catch (error) {
        console.error('Erro ao cadastrar agendamento', error.message);
        return res.status(500).json({ error: 'Erro ao cadastrar agendamento' + error.message })
    }
})

router.put('/agendamentos/:id_agendamento', async (req, res) => {
    // Id recebido via parametro
    const { id_agendamento } = req.params;

    // Dados do agendamento recebido via Corpo da página
    const { data_hora, status, id_usuario, id_servico } = req.body;
    try {
        //Verificar se o agendamento existe
        const verificaragendamento = await BD.query(`SELECT * FROM agendamentos
            WHERE id_agendamento = $1`, [id_agendamento])
        if (verificaragendamento.rows.length === 0) {
            return res.status(404).json({ message: 'agendamento não encontrado' })
        }
        // Atualiza todos os campos da tabela(PUT Substituição completa)
        const comando = `UPDATE agendamentos SET data_hora = $1, status = $2, id_usuario = $3, id_servico = $4 WHERE
        id_agendamento = $5`;
        const valores = [data_hora, status, id_usuario, id_servico, id_agendamento];
        await BD.query(comando, valores);

        return res.status(200).json('agendamento foi atualizado!');
    } catch (error) {
        console.error('Erro ao atualizar agendamento', error.message);
        return res.status(500).json({ error: 'Erro ao atualizar agendamento' + error.message })
    }
})

router.delete('/agendamentos/:id_agendamento', async (req, res) => {
    const { id_agendamento } = req.params;
    try {
        //Executa o comando de delete
        const comando = `DELETE FROM agendamentos WHERE id_agendamento = $1`
        await BD.query(comando, [id_agendamento])
        return res.status(200).json({ message: "agendamento removido com sucesso" })
    } catch (error) {
        console.error('Erro ao atualizar agendamento', error.message)
        return res.status(500).json({ message: "Erro interno so servidor" + error.message })
    }
})


export default router