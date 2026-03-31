import { estilos } from "../style/Estilos"
import { Link, useNavigate } from "react-router-dom"
const Aula14 = () => {
    const navigate = useNavigate()

    return (
        <div style={estilos.cardAula}>
            <h2>Aula 14 - React - Navegação em React</h2>
            <h3>Biblioteca que permite criar e gerenciar rotas em React</h3>
            {/*<a href='/' > Pagina Principal*/}
            <Link to="/">Navegue para a página principal</Link>
            <br />
            <Link to="/sobre">Navegue para a página principal</Link>
            <br />
            <Link to="/blablabla">Página Não Encontrada</Link>
            <br />
            <br />
            <Link to="/Inicio">Navegue para a página detalhe</Link>
            <br />
            <Link to="/Detalhes">Navegue para a página inicio</Link>
            <br />
            <Link to="/Contato">Navegue para a página principal</Link>
            <br />
            <hr/>
    
            <h3>Navegação com programação utilizando o useNavigate</h3>
            <button onClick={() => navigate('/sobre')}>Sobre</button>
            <hr />
            <h3>Rotas dinamicas / Rotas com Parâmetros (useParams)</h3>
            <button onClick={() => navigate('/perfil/Douglas')}>Perfil doDouglas</button>
            <button onClick={() => navigate('/perfil/Ricardo')}>Perfil do Ricardo</button>
            <hr />
             <button onClick={() => navigate('/filme/1234')}>Detalhe do Filme</button>
             <br />
              <Link to="/inicio">Ir para Inicio</Link>
              <hr />
              <h3>Exercicios</h3>
                <button onClick={() => navigate('/Inicio')}>Pagina de Inicio</button>
                <button onClick={() => navigate('/detalhes')}>Pagina de Detalhes</button>
                <button onClick={() => navigate('/contato')}>Pagina de Contato</button>
                <button onClick={() => navigate('/filme/10')}>Pagina do filme 10</button>
        </div>
    )
}

export default Aula14