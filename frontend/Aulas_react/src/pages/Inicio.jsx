import {Link} from 'react-router-dom'

function Inicio () {
    return(
        <div>
            <h1>Bem-vindo</h1>
            <Link to='/Detalhes'>Ir para pagina Detalhe</Link>
        </div>
    )
}
export default Inicio