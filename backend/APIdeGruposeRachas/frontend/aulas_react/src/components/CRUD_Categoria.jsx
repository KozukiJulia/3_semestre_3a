import { useEffect, useState } from "react"
import Categorias from "./Categorias"

const CRUD_Categorias = () => {
    const [listaCategorias, setListaCategorias] = useState([])
    const [nome, setNome] = useState('')
    const [descricao, setDescricao] = useState('')
    const [tipo, setTipo] = useState('True')
    const [cor, setCor] = useState('')
    const [icone, setIcone] = useState('')

    //Criando variaveis de estado para alterar meu cadastro
    const [editando, setEditando] = useState(false)
    const [id, setId] = useState('')

    //Função para carregar meus dados
    //Esta função recebe um objeto com todos os dados do produto
    function botaoAlterar(categoria) {
        setNome(categoria.nome)
        setDescricao(categoria.descricao)
        setTipo(categoria.tipo)
        setCor(categoria.cor)
        setIcone(categoria.icone)
        setEditando(true)
        setId(categoria.id_categoria)
    }

    //const botaoAdicionar = async () {
    async function botaoAdicionar() {
        const novaCategoria = {
            nome: nome,
            descricao: descricao,
            tipo: tipo,
            cor: cor,
            icone: icone

        }

        try {
            let endpoint = 'http://localhost:3001/categorias'
            let metodo = 'POST'

            if (editando == true) {
                endpoint = `http://localhost:3001/categorias/${id}`
                metodo = 'PUT'
            }

            const resposta = await fetch(endpoint, {
                method: metodo,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(novaCategoria)
            })

            if (!resposta.ok) {
                throw new Error('Erro ao adicionar categoria: ' + resposta.statusText)
            }

            buscarDados()
            LimparCamposFormularios()

        } catch (erro) {
            console.error('Erro ao adicionar categoria', erro.message)
        }
    }

    async function botaoExcluir(id_categoria) {

        if (!window.confirm('Você tem certeza que deseja excluir?')) return

        try {
            const resposta = await fetch(`http://localhost:3001/categorias/${id_categoria}`, {
                method: 'DELETE'
            })

            if (!resposta.ok) {
                throw new Error('Erro ao excluir categoria: ' + resposta.statusText)
            }

            buscarDados()

        } catch (erro) {
            console.error('Erro ao excluir categoria', erro.message)
        }
    }

    function LimparCamposFormularios() {
        setNome('')
        setDescricao('')
        setTipo('')
        setCor('')
        setIcone('')
        setEditando(false)
        setId('')
    }

    useEffect(() => {
        buscarDados()
    }, [])

    //Função para buscar os dados de uma API
    async function buscarDados() {
        try {
            const resposta = await fetch('http://localhost:3001/categorias')
            const dados = await resposta.json()
            setListaCategorias(dados)

        } catch (erro) {
            console.error('Erro ao carregar os dados', erro.message)
        }
    }

    return (
        <div>
            <h1>Cadastro de Categorias</h1>
            <div style={{ display: "flex", flexDirection: 'column', gap: 10 }}>
                <input type="text" placeholder="Nome" style={estilos.inputs} value={nome}
                    onChange={(event) => setNome(event.target.value)} />
                <input type="text" placeholder="Descrição" style={estilos.inputs} value={descricao}
                    onChange={(event) => setDescricao(event.target.value)} />
                <input type="text" placeholder="Tipo" style={estilos.inputs} value={tipo}
                    onChange={(event) => setTipo(event.target.value)} />
                <input type="text" placeholder="Cor" style={estilos.inputs} value={cor}
                    onChange={(event) => setCor(event.target.value)} />
                <input type="text" placeholder="Ícone" style={estilos.inputs} value={icone}
                    onChange={(event) => setIcone(event.target.value)} />

                <button style={estilos.botao} onClick={botaoAdicionar}>
                    {editando == false ? "Adicionar Categoria" : "Editar Categoria"}
                </button>
                {
                    editando == true &&
                    <button style={estilos.botao} onClick={LimparCamposFormularios}>Cancelar</button>
                }

                <hr />
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }} >
                    {
                        listaCategorias.map((categoria, pos) => (
                            <Categorias key={pos} categoria={categoria} botaoExcluir={botaoExcluir} botaoAlterar={botaoAlterar} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

const estilos = {
    cadastro: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
    },
    inputs: {
        padding: "10px",
        fontSize: "16px",
    },
    botao: {
        backgroundColor: "#e30613",
        color: "#fff",
        borderRadius: "5px",
        fontWeight: "bold",
        border: "none",
        padding: "10px",
        fontSize: "16px",
    }
}

export default CRUD_Categorias