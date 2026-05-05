import { useEffect, useState } from "react"
import Usuario from "./Usuario"

const CRUD_Usuarios = () => {
    const [listaUsuarios, setListaUsuarios] = useState([])
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [tipo_acesso, setTipo_acesso] = useState('')

    async function botaoAdicionar() {
        const novoUsuario = {
            nome: nome,
            email: email,
            senha: senha,
            tipo_acesso: tipo_acesso
        }

        try {
            const resposta = await fetch('http://localhost:3001/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(novoUsuario)
            })

            if (!resposta.ok) {
                throw new Error('Erro ao adicionar usuários: ' + resposta.statusText)
            }

            buscarDados()
            LimparCamposFormularios()

        } catch (erro) {
            console.error('Erro ao adicionar produto', erro.message)
        }
    }

    async function botaoExcluir(id_usuario) {

        try {
            const resposta = await fetch(`http://localhost:3001/usuarios/${id_usuario}`, {
                method: 'DELETE'
            })

            if (!resposta.ok) {
                throw new Error('Erro ao excluir usuario: ' + resposta.statusText)
            }

            buscarDados()

        } catch (erro) {
            console.error('Erro ao adicionar usuario', erro.message)
        }
    }

    function LimparCamposFormularios() {
        setNome('')
        setEmail('')
        setSenha('')
        setTipo_acesso('')
    }

    useEffect(() => {
        buscarDados()
    }, [])

    //Função para buscar os dados de uma API
    async function buscarDados() {
        try {
            const resposta = await fetch('http://localhost:3001/usuarios')
            const dados = await resposta.json()
            setListaUsuarios(dados)

        } catch (erro) {
            console.error('Erro ao carregar os dados', erro.message)
        }
    }

    return (
        <div>
            <h1>Cadastro de Usuários</h1>
            <div style={{ display: "flex", flexDirection: 'column', gap: 10 }}>
                <input type="text" placeholder="Nome" style={estilos.inputs} value={nome}
                    onChange={(event) => setNome(event.target.value)} />
                <input type="email" placeholder="Email" style={estilos.inputs} value={email}
                    onChange={(event) => setEmail(event.target.value)} />
                <input type="password" placeholder="Senha " style={estilos.inputs} value={senha}
                    onChange={(event) => setSenha(event.target.value)} />
                <input type="tipo_acesso" placeholder="Tipo_acesso " style={estilos.inputs} value={tipo_acesso}
                    onChange={(event) => setTipo_acesso(event.target.value)} />
                <button style={estilos.botao} onClick={botaoAdicionar}>Adicionar Usuario</button>

                <hr />
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }} >
                    {
                        listaUsuarios.map((usuario, pos) => (
                            <Usuario key={pos} usuario={usuario} botaoExcluir={botaoExcluir} />
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

export default CRUD_Usuarios