import CRUD_Produtos from "../components/CRUD_Categoria";
import CRUD_Grupos from "../components/CRUD_Grupos";
import CRUD_Usuarios from "../components/CRUD_Usuarios";
import CRUD_Membros from "../components/CRUD_Membros";



const Principal = () => {
    return (
        <div style={estilos.fundo}>
            <main style={estilos.conteudo}>
                <CRUD_Produtos />
                <CRUD_Usuarios />
                <CRUD_Grupos />
                <CRUD_Membros />
            </main>
        </div>
    )
}

const estilos = {
    fundo: {
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
}

export default Principal;