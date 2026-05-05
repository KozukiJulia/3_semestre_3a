const Membros = ({ Membros, botaoExcluir }) => {
    return (
        <div style={estilos.cardMembros}>
            <h2 style={estilos.id_membros}>{Membros.id_membros}</h2>
            <h2 style={estilos.usuario_id}>{Membros.usuario_id}</h2>            
            <h2 style={estilos.grupo_id}>{Membros.grupo_id}</h2>            
            <h2 style={estilos.papel}>{Membros.papel}</h2>            
            <button style={estilos.botao} onClick={() => botaoExcluir(Membros.id_membros)} >Excluir</button>
        </div>
    )
}

const estilos = {
    cardMembros: {
        border: "1px solid #ccc",
        padding: 10,
        width: 250, 
        textAlign: 'center'
    },

    imagem: {
        height: 150,
        width: "100%",
        objectFit: "contain"
    },

    titulo: {
        fontSize: 14,
        color: "#333",
        textAlign: "center"
    },

    preco: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#e30613"
    },

    botao: {
        display: "inline-block",
        background: "#e30613",
        color: "white",
        textDecoration: "none",
        padding: "8px 12px",
        borderRadius: 5,
        marginTop: 10,
        fontWeight: "bold"
    },

    freteGratis: {
        fontWeight: "bold"
    }
};

export default Membros