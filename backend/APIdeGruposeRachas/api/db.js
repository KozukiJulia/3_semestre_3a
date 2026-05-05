import { Pool } from 'pg';

const BD = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    password: process.env.DB_PASSWORD || 'admin',
    database: process.env.DB_NAME || 'bd_grupos',
    port: process.env.DB_PORT || 5432
})

const testarConexao = async () => {
    try {
        const cliente = await BD.connect(); // Realiza a conexão
        console.log('Conexão estabelecida');
        cliente.release(); // Libera a conexão
    } catch (error) {
        console.error('Erro ao conectar com o banco', error.message);
    }
}

export { BD, testarConexao }
