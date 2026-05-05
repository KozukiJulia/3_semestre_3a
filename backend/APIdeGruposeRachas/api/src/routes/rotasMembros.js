import { Router } from "express";
import { BD } from "../../db.js";

const router = Router();

//Criando o endpoint para listar todos os membros
router.get('/membros', async (req, res) => {
    try {
        //cria uma variavel para enviar o comando sql
        const query = `SELECT * FROM Membros ORDER BY id_Membro`

        //cria uma variavel para receber o retorno do sql
        const Membros = await BD.query(query);

        //retorno para a pagina, o json com os dados
        //buscados do sql
        return res.status(200).json(Membros.rows);//200 ok
    } catch (error) {
        console.error('Erro ao listar Membros', error.message);
        return res.status(500).json({ error: 'Erro ao listar Membros' })
    }
})

//Endpoint seguro contra sql Injection
router.post('/membros', async (req, res) => {
    const { usuario_id, grupo_id, papel } = req.body;
    try {
        // Verificar se o usuário existe
        const usuarioExiste = await BD.query(`SELECT 1 FROM Usuarios WHERE id_Usuario = $1`, [usuario_id]);
        if (usuarioExiste.rows.length === 0) {
            return res.status(400).json({ error: 'Usuário não encontrado' });
        }

        // Verificar se o grupo existe
        const grupoExiste = await BD.query(`SELECT 1 FROM Grupos WHERE id_Grupo = $1`, [grupo_id]);
        if (grupoExiste.rows.length === 0) {
            return res.status(400).json({ error: 'Grupo não encontrado' });
        }

        const comando = `INSERT INTO Membros(usuario_id, grupo_id, papel) VALUES($1, $2, $3)`
        const valores = [usuario_id, grupo_id, papel];

        await BD.query(comando, valores)
        console.log(comando, valores);

        return res.status(201).json("Membro cadastrado.");
    } catch (error) {
        console.error('Erro ao cadastrar membro', error.message);
        return res.status(500).json({ error: 'Erro ao cadastrar membro' })
    }
})

// endpoint para atualizar um unico membro
// recebendo o parametro pelo id e buscando o membro
router.put('/membros/:id_Membro', async (req, res) => {
    // Id recebido via parametro
    const { id_Membro } = req.params;

    // Dados do membro recebido via Corpo da página
    const { usuario_id, grupo_id, papel } = req.body;
    try {
        //Verificar se o membro existe
        const verificarMembro = await BD.query(`SELECT * FROM Membros
            WHERE id_Membro = $1`, [id_Membro])
        if (verificarMembro.rows.length === 0) {
            return res.status(404).json({ message: 'Membro não encontrado' })
        }

        // Verificar se o usuário existe, se fornecido
        if (usuario_id !== undefined) {
            const usuarioExiste = await BD.query(`SELECT 1 FROM Usuarios WHERE id_Usuario = $1`, [usuario_id]);
            if (usuarioExiste.rows.length === 0) {
                return res.status(400).json({ error: 'Usuário não encontrado' });
            }
        }

        // Verificar se o grupo existe, se fornecido
        if (grupo_id !== undefined) {
            const grupoExiste = await BD.query(`SELECT 1 FROM Grupos WHERE id_Grupo = $1`, [grupo_id]);
            if (grupoExiste.rows.length === 0) {
                return res.status(400).json({ error: 'Grupo não encontrado' });
            }
        }

        // Atualiza todos os campos da tabela(PUT Substituição completa)
        const comando = `UPDATE Membros SET usuario_id = $1, grupo_id = $2, papel = $3 WHERE
        id_Membro = $4`;
        const valores = [usuario_id, grupo_id, papel, id_Membro];
        await BD.query(comando, valores);

        return res.status(200).json('Membro foi atualizado!');
    } catch (error) {
        console.error('Erro ao atualizar membro', error.message);
        return res.status(500).json({ error: 'Erro ao atualizar membro' })
    }
})

//Rota patch atualizando parcialmente as informações
router.patch('/membros/:id_Membro', async (req, res) => {
    const { id_Membro } = req.params;
    const { usuario_id, grupo_id, papel } = req.body;

    try {
        //Verificar se o membro existe
        const verificarMembro = await BD.query(`SELECT * FROM Membros
            WHERE id_Membro = $1`, [id_Membro])
        if (verificarMembro.rows.length === 0) {
            return res.status(404).json({ message: 'Membro não encontrado' })
        }

        // Verificar se o usuário existe, se fornecido
        if (usuario_id !== undefined) {
            const usuarioExiste = await BD.query(`SELECT 1 FROM Usuarios WHERE id_Usuario = $1`, [usuario_id]);
            if (usuarioExiste.rows.length === 0) {
                return res.status(400).json({ error: 'Usuário não encontrado' });
            }
        }

        // Verificar se o grupo existe, se fornecido
        if (grupo_id !== undefined) {
            const grupoExiste = await BD.query(`SELECT 1 FROM Grupos WHERE id_Grupo = $1`, [grupo_id]);
            if (grupoExiste.rows.length === 0) {
                return res.status(400).json({ error: 'Grupo não encontrado' });
            }
        }

        //Montar o update dinamicamente(apenas campos enviados)
        const campos = [];
        const valores = [];
        let contador = 1;

        if (usuario_id !== undefined) {
            campos.push(`usuario_id = $${contador}`);
            valores.push(usuario_id);
            contador++;
        }
        if (grupo_id !== undefined) {
            campos.push(`grupo_id = $${contador}`);
            valores.push(grupo_id);
            contador++;
        }
        if (papel !== undefined) {
            campos.push(`papel = $${contador}`);
            valores.push(papel);
            contador++;
        }

        //se nenhum campo foi enviado
        if (campos.length === 0) {
            return res.status(400).json({ message: "Nenhum campo a atualizar" })
        }

        //Adicionando ID ao final de valores
        valores.push(id_Membro)

        //montando a query dinamicamente
        const comando = `UPDATE Membros SET ${campos.join(', ')} WHERE id_Membro = $${contador}`
        await BD.query(comando, valores)

        return res.status(200).json('Membro atualizado com sucesso');
    } catch (error) {
        console.error('Erro ao atualizar membro', error.message)
        return res.status(500).json({ message: "Erro interno do servidor: " + error.message })
    }
})

router.delete('/membros/:id_Membro', async (req, res) => {
    const { id_Membro } = req.params;
    try {
        //Executa o comando de delete
        const comando = `DELETE FROM Membros WHERE id_Membro = $1`
        await BD.query(comando, [id_Membro])
        return res.status(200).json({ message: "Membro removido com sucesso" })
    } catch (error) {
        console.error('Erro ao remover membro', error.message)
        return res.status(500).json({ message: "Erro interno do servidor: " + error.message })
    }
})

export default router
