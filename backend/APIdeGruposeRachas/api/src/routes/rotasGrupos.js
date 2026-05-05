import { Router } from "express";
import { BD } from "../../db.js";

const router = Router();

//Criando o endpoint para listar todos os grupos
router.get('/grupos', async (req, res) => {
    try {
        //cria uma variavel para enviar o comando sql
        const query = `SELECT * FROM Grupos ORDER BY id_Grupo`

        //cria uma variavel para receber o retorno do sql
        const Grupos = await BD.query(query);

        //retorno para a pagina, o json com os dados
        //buscados do sql
        return res.status(200).json(Grupos.rows);//200 ok
    } catch (error) {
        console.error('Erro ao listar Grupos', error.message);
        return res.status(500).json({ error: 'Erro ao listar Grupos' })
    }
})

//Endpoint seguro contra sql Injection
router.post('/grupos', async (req, res) => {
    const { nome, descricao, vagas, codigo_convite, ativo, categoria_id } = req.body;
    try {
        // Verificar se o codigo_convite já existe
        const checkQuery = `SELECT * FROM Grupos WHERE codigo_convite = $1`;
        const existingGroup = await BD.query(checkQuery, [codigo_convite]);
        if (existingGroup.rows.length > 0) {
            return res.status(400).json({ error: 'Código de convite já existe. Escolha um código único.' });
        }

        const comando = `INSERT INTO Grupos(nome, descricao, vagas, codigo_convite, ativo, categoria_id) VALUES($1, $2, $3, $4, $5, $6)`
        const valores = [nome, descricao, vagas, codigo_convite, ativo, categoria_id];

        await BD.query(comando, valores)
        console.log(comando, valores);

        return res.status(201).json("Grupo cadastrado.");
    } catch (error) {
        console.error('Erro ao cadastrar grupo', error.message);
        return res.status(500).json({ error: 'Erro ao cadastrar grupo' })
    }
})

// endpoint para atualizar um unico grupo
// recebendo o parametro pelo id e buscando o grupo
router.put('/grupos/:id_Grupo', async (req, res) => {
    // Id recebido via parametro
    const { id_Grupo } = req.params;

    // Dados do grupo recebido via Corpo da página
    const { nome, descricao, vagas, codigo_convite, ativo, categoria_id } = req.body;
    try {
        //Verificar se o grupo existe
        const verificarGrupo = await BD.query(`SELECT * FROM Grupos
            WHERE id_Grupo = $1`, [id_Grupo])
        if (verificarGrupo.rows.length === 0) {
            return res.status(404).json({ message: 'Grupo não encontrado' })
        }
        // Verificar se o codigo_convite já existe em outro grupo
        const checkQuery = `SELECT * FROM Grupos WHERE codigo_convite = $1 AND id_Grupo != $2`;
        const existingGroup = await BD.query(checkQuery, [codigo_convite, id_Grupo]);
        if (existingGroup.rows.length > 0) {
            return res.status(400).json({ error: 'Código de convite já existe em outro grupo. Escolha um código único.' });
        }
        // Atualiza todos os campos da tabela(PUT Substituição completa)
        const comando = `UPDATE Grupos SET nome = $1, descricao = $2, vagas = $3, codigo_convite = $4, ativo = $5, categoria_id = $6 WHERE
        id_Grupo = $7`;
        const valores = [nome, descricao, vagas, codigo_convite, ativo, categoria_id, id_Grupo];
        await BD.query(comando, valores);

        return res.status(200).json('Grupo foi atualizado!');
    } catch (error) {
        if (error.code === '23505') {
            return res.status(400).json({ error: 'Código de convite já existe' });
        }
        console.error('Erro ao atualizar grupo', error.message);
        return res.status(500).json({ error: 'Erro ao atualizar grupo' })
    }
})

//Rota patch atualizando parcialmente as informações
router.patch('/grupos/:id_Grupo', async (req, res) => {
    const { id_Grupo } = req.params;
    const { nome, descricao, vagas, codigo_convite, ativo, categoria_id } = req.body;

    try {
        //Verificar se o grupo existe
        const verificarGrupo = await BD.query(`SELECT * FROM Grupos
            WHERE id_Grupo = $1`, [id_Grupo])
        if (verificarGrupo.rows.length === 0) {
            return res.status(404).json({ message: 'Grupo não encontrado' })
        }

        // Se codigo_convite está sendo atualizado, verificar se já existe em outro grupo
        if (codigo_convite !== undefined) {
            const checkQuery = `SELECT * FROM Grupos WHERE codigo_convite = $1 AND id_Grupo != $2`;
            const existingGroup = await BD.query(checkQuery, [codigo_convite, id_Grupo]);
            if (existingGroup.rows.length > 0) {
                return res.status(400).json({ error: 'Código de convite já existe em outro grupo. Escolha um código único.' });
            }
        }

        //Montar o update dinamicamente(apenas campos enviados)
        const campos = [];
        const valores = [];
        let contador = 1;

        if (nome !== undefined) {
            campos.push(`nome = $${contador}`);
            valores.push(nome);
            contador++;
        }
        if (descricao !== undefined) {
            campos.push(`descricao = $${contador}`);
            valores.push(descricao);
            contador++;
        }
        if (vagas !== undefined) {
            campos.push(`vagas = $${contador}`);
            valores.push(vagas);
            contador++;
        }
        if (codigo_convite !== undefined) {
            campos.push(`codigo_convite = $${contador}`);
            valores.push(codigo_convite);
            contador++;
        }
        if (categoria_id !== undefined) {
            campos.push(`categoria_id = $${contador}`);
            valores.push(categoria_id);
            contador++;
        }
        if (ativo !== undefined) {
            campos.push(`ativo = $${contador}`);
            valores.push(ativo);
            contador++;
        }

        //se nenhum campo foi enviado
        if (campos.length === 0) {
            return res.status(400).json({ message: "Nenhum campo a atualizar" })
        }

        //Adicionando ID ao final de valores
        valores.push(id_Grupo)

        //montando a query dinamicamente
        const comando = `UPDATE Grupos SET ${campos.join(', ')} WHERE id_Grupo = $${contador}`
        await BD.query(comando, valores)

        return res.status(200).json('Grupo atualizado com sucesso');
    } catch (error) {
        if (error.code === '23505') {
            return res.status(400).json({ error: 'Código de convite já existe' });
        }
        console.error('Erro ao atualizar grupo', error.message)
        return res.status(500).json({ message: "Erro interno do servidor: " + error.message })
    }
})

router.delete('/grupos/:id_Grupo', async (req, res) => {
    const { id_Grupo } = req.params;
    try {
        //Executa o comando de delete
        const comando = `DELETE FROM Grupos WHERE id_Grupo = $1`
        await BD.query(comando, [id_Grupo])
        return res.status(200).json({ message: "Grupo removido com sucesso" })
    } catch (error) {
        console.error('Erro ao remover grupo', error.message)
        return res.status(500).json({ message: "Erro interno do servidor: " + error.message })
    }
})

export default router
