import { useEffect, useState } from "react"
import Membros from "./Membros"

const CRUD_Membros = () => {
    const [listaMembros, setListaMembros] = useState([])
    const [id_membro, setId_membro] = useState('')
    const [usuario_id, setUsuario_id] = useState('')
    const [grupo_id, setGrupo_id] = useState('')
    const [papel, setPapel] = useState('')

    //Criando variaveis de estado para alterar meu cadastro
    const [editando, setEditando] = useState(false)
    const [id, setId] = useState('')

    //Função para carregar meus dados
    //Esta função recebe um objeto com todos os dados do produto
    function botaoAlterar(membro) {
        setId_membro(membro.id_membro)
        setUsuario_id(membro.usuario_id)
        setGrupo_id(membro.grupo_id)
        setPapel(membro.papel)

        setEditando(true)
        setId(membro.id_membro)
    }

    //const botaoAdicionar = async () {
    async function botaoAdicionar() {
        const novoMembro = {
            id_membro: id_membro,
            usuario_id: usuario_id,
            grupo_id: grupo_id,
            papel: papel
        }

        try {
            let endpoint = 'http://localhost:3001/membros'
            let metodo = 'POST'

            if (editando == true) {
                endpoint = `http://localhost:3001/membros/${id}`
                metodo = 'PUT'
            }

            const resposta = await fetch(endpoint, {
                method: metodo,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(novoMembro)
            })

            if (!resposta.ok) {
                throw new Error('Erro ao adicionar membro: ' + resposta.statusText)
            }

            buscarDados()
            LimparCamposFormularios()

        } catch (erro) {
            console.error('Erro ao adicionar membro', erro.message)
        }
    }

    async function botaoExcluir(id_membro) {

        if (!window.confirm('Você tem certeza que deseja excluir?')) return

        try {
            const resposta = await fetch(`http://localhost:3001/membros/${id_membro}`, {
                method: 'DELETE'
            })

            if (!resposta.ok) {
                throw new Error('Erro ao excluir membro: ' + resposta.statusText)
            }

            buscarDados()

        } catch (erro) {
            console.error('Erro ao excluir membro', erro.message)
        }
    }

    function LimparCamposFormularios() {
        setId_membro('')
        setUsuario_id('')
        setGrupo_id('')
        setPapel('')

        setEditando(false)
        setId('')
    }

    useEffect(() => {
        buscarDados()
    }, [])

    //Função para buscar os dados de uma API
    async function buscarDados() {
        try {
            const resposta = await fetch('http://localhost:3001/membros')
            const dados = await resposta.json()
            setListaMembros(dados)

        } catch (erro) {
            console.error('Erro ao carregar os dados', erro.message)
        }
    }

    return (
        <div>
            <h1>Cadastro de Membros</h1>
            <div style={{ display: "flex", flexDirection: 'column', gap: 10 }}>
                <input type="text" placeholder="ID do Membro" style={estilos.inputs} value={id_membro}
                    onChange={(event) => setId_membro(event.target.value)} />
                <input type="text" placeholder="ID do Usuário" style={estilos.inputs} value={usuario_id}
                    onChange={(event) => setUsuario_id(event.target.value)} />
                <input type="text" placeholder="ID do Grupo" style={estilos.inputs} value={grupo_id}
                    onChange={(event) => setGrupo_id(event.target.value)} />
                <input type="text" placeholder="Papel" style={estilos.inputs} value={papel}
                    onChange={(event) => setPapel(event.target.value)} />
                <button style={estilos.botao} onClick={botaoAdicionar}>
                    {editando == false ? "Adicionar Membro" : "Editar Membro"}
                </button>
                {
                    editando == true &&
                    <button style={estilos.botao} onClick={LimparCamposFormularios}>Cancelar</button>
                }

                <hr />
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }} >
                    {
                        listaMembros.map((membro, pos) => (
                            <Membros key={pos} membro={membro} botaoExcluir={botaoExcluir} botaoAlterar={botaoAlterar} />
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

export default CRUD_Membros