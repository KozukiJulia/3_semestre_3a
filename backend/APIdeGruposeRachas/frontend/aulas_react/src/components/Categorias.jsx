const Categoria = ({ categoria, botaoExcluir, botaoAlterar }) => {
    return (
        <div style={estilos.cardCategoria}>
            <img src={categoria.icone} alt="" style={estilos.imagem} />
            <h2 style={estilos.nome}>{categoria.nome}</h2>
            <p style={estilos.descricao}>R$ {Number(categoria.preco).toFixed(2)} </p>
            <p>{categoria.categoria}</p>
            {/* if ternário */}
            {/* { categoria.freteGratis == true ? <p>Frete Grátis</p> : null } */}
            {categoria.frete == true && <p>Frete Grátis</p>}
            <a href={categoria.link_categoria} style={estilos.botao}>Ver Categoria</a>
            <button style={estilos.botao} onClick={() => botaoExcluir(categoria.id_categoria)} >Excluir</button>
            <button style={estilos.botao} onClick={() => botaoAlterar(categoria)} >Alterar</button>



        </div>
    )
}

const estilos = {
    cardCategoria: {
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

export default Categoria