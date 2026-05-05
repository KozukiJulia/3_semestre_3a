import express from 'express';
import { BD, testarConexao } from './db.js';
import rotasUsuarios from './src/routes/rotasUsuarios.js'
import rotasCategorias from './src/routes/rotasCategorias.js'
import rotasGrupos from './src/routes/rotasGrupos.js'
import rotasMembros from './src/routes/rotasMembros.js'
//usando swagger
import swaggerUi from 'swagger-ui-express';
import documentacao from './config/swagger.js';
import cors from 'cors'

const app = express();
app.use(express.json());
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(documentacao))
app.use(cors())


app.get('/', async (req, res) => {
    await testarConexao();
    // res.status(200).json("Api Funcionando");
    res.redirect('/swagger')
})

//Utilizando rotas
app.use(rotasUsuarios);
app.use(rotasCategorias);
app.use(rotasGrupos);
app.use(rotasMembros);

const porta = 3001;
app.listen(porta, '0.0.0.0', () => {
    console.log(`http://localhost:${porta}`);
})

