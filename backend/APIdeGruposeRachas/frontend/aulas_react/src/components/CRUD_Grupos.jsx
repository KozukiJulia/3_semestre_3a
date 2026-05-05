import { useEffect, useState } from "react"
import Grupos from "./Grupos"

const CRUD_Grupos = () => {
    const [listaGrupos, setListaGrupos] = useState([])
    const [nome, setNome] = useState('')
    const [descricao, setDescricao] = useState('')
    const [vagas, setVagas] = useState('')
    const [codigo_convite, setCodigoConvite] = useState('')
    const [categoria, setCategoria] = useState('')
    const [ativo, setAtivo] = useState(false)
    const [freteGratis, setFreteGratis] = useState(false)
    //Criando variaveis de estado para alterar meu cadastro
    const [editando, setEditando] = useState(false)
    const [id, setId] = useState('')

    //Função para carregar meus dados
    //Esta função recebe um objeto com todos os dados do produto
    function botaoAlterar(grupos) {
        setNome(grupos.nome)
        setDescricao(grupos.descricao)
        setVagas(grupos.vagas)
        setCodigoConvite(grupos.codigo_convite)
        setCategoria(grupos.categoria)
        setFreteGratis(grupos.frete)
        setEditando(true)
        setId(grupos.id_grupo)
    }

    //const botaoAdicionar = async () {
    async function botaoAdicionar() {
        const novoGrupo = {
            nome: nome,
            descricao: descricao,
            vagas: vagas,
            codigo_convite: codigo_convite,
            categoria: categoria,
            frete: freteGratis
        }

        try {
            let endpoint = 'http://localhost:3001/grupos'
            let metodo = 'POST'

            if (editando == true) {
                endpoint = `http://localhost:3001/grupos/${id}`
                metodo = 'PUT'
            }

            const resposta = await fetch(endpoint, {
                method: metodo,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(novoGrupo)
            })

            if (!resposta.ok) {
                throw new Error('Erro ao adicionar grupo: ' + resposta.statusText)
            }

            buscarDados()
            LimparCamposFormularios()

        } catch (erro) {
            console.error('Erro ao adicionar grupo', erro.message)
        }
    }

    async function botaoExcluir(id_grupo) {

        if (!window.confirm('Você tem certeza que deseja excluir?')) return

        try {
            const resposta = await fetch(`http://localhost:3001/grupos/${id_grupo}`, {
                method: 'DELETE'
            })

            if (!resposta.ok) {
                throw new Error('Erro ao excluir grupos: ' + resposta.statusText)
            }

            buscarDados()

        } catch (erro) {
            console.error('Erro ao adicionar grupos', erro.message)
        }
    }

    function LimparCamposFormularios() {
        setNome('')
        setDescricao('')
        setVagas('')
        setCodigoConvite('')
        setCategoria('')
        setAtivo(false)
        setFreteGratis(false)
        setEditando(false)
        setId('')
    }

    useEffect(() => {
        buscarDados()
    }, [])

    //Função para buscar os dados de uma API
    async function buscarDados() {
        try {
            const resposta = await fetch('http://localhost:3001/grupos')
            const dados = await resposta.json()
            setListaGrupos(dados)

        } catch (erro) {
            console.error('Erro ao carregar os dados', erro.message)
        }
    }

    return (
        <div>
            <h1>Cadastro de Grupos</h1>
            <div style={{ display: "flex", flexDirection: 'column', gap: 10 }}>
                <input type="text" placeholder="Nome" style={estilos.inputs} value={nome}
                    onChange={(event) => setNome(event.target.value)} />
                <input type="number" placeholder="Vagas" style={estilos.inputs} value={vagas}
                    onChange={(event) => setVagas(event.target.value)} />
                <input type="text" placeholder="Descrição" style={estilos.inputs} value={descricao}
                    onChange={(event) => setDescricao(event.target.value)} />
                <input type="text" placeholder="Código de Convite" style={estilos.inputs} value={codigo_convite}
                    onChange={(event) => setCodigoConvite(event.target.value)} />
                <input type="text" placeholder="Categoria" style={estilos.inputs} value={categoria}
                    onChange={(event) => setCategoria(event.target.value)} />
                <span> <input type="checkbox" checked={freteGratis}
                    onChange={(event) => setFreteGratis(event.target.checked)} />  Frete Grátis </span>
                <button style={estilos.botao} onClick={botaoAdicionar}>
                    {editando == false ? "Adicionar Grupo" : "Editar Grupo"}
                </button>
                {
                    editando == true &&
                    <button style={estilos.botao} onClick={LimparCamposFormularios}>Cancelar</button>
                }

                <hr />
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }} >
                    {
                        listaGrupos.map((grupo, pos) => (
                            <Grupos key={pos} grupo={grupo} botaoExcluir={botaoExcluir} botaoAlterar={botaoAlterar} />
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

export default CRUD_Grupos