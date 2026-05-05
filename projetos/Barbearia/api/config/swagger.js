const documentacao = {
    openapi: '3.0.3',
    info: {
        title: 'Barbearia',
        description: 'Documentação da API Barbearia',
        version: '1.0.0'
    },
    servers: [
        { url: 'http://localhost:3000', description: 'localhost' }
    ],
    tags: [
        { name: 'Usuários', description: 'Operações relacionadas aos usuários' },
        { name: 'Servicos', description: 'Operações relacionadas às Servicos' },
        { name: 'Agendamentos', description: 'Operações relacionadas às Agendamentos' },
       
    ],
    paths: {
        "/usuarios": {
            get: {
                tags: ["Usuários"],
                summary: "Listar todos os usuários",
                responses: {
                    200: {
                        description: "Dados obtidos com sucesso!",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: { $ref: '#/components/schemas/Listar_Usuarios' }
                                }
                            }
                        }
                    }
                }
            },
            post: {
                tags: ['Usuários'],
                summary: 'Cadastrar novo usuário',
                description: "Recebe nome, email, senha para cadastrar novo usuário",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Cadastrar_Usuario"
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: "Usuário cadastrado com sucesso!"
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }
                }
            }
        },
        "/usuarios/{id_usuario}": {
            put: {
                tags: ['Usuários'],
                summary: 'Atualizar todos os dados do usuário',
                description: 'Atualiza todos os dados de um usuário existente, é necessário enviar todos os campos',
                parameters: [
                    {
                        name: "id_usuario",
                        in: "path",
                        required: true,
                        description: "ID do usuário a ser atualizado",
                        schema: {
                            type: 'integer',
                            example: 1
                        }
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Atualizar_Usuario" },
                            example: {
                                nome: "Ricardo Santos",
                                email: "ricardo5@sesisp.com",
                                senha: "senhaAtualizada"
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: "Usuário atualizado com sucesso!"
                    },
                    404: {
                        description: "Usuário não encontrado",
                        content: {
                            "application/json": {
                                example: { message: "Usuário não encontrado" }
                            }
                        }
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }

                }

            },
            delete: {
                tags: ['Usuários'],
                summary: 'Remover Usuário',
                description: 'Remove usuário existente pelo ID',
                parameters: [
                    {
                        name: "id_usuario",
                        in: "path",
                        required: true,
                        description: "ID do usuário a ser removido",
                        schema: {
                            type: 'integer',
                            example: 1
                        }
                    }
                ],
                responses: {
                    200: {
                        description: "Usuário removido com sucesso!"
                    },
                    404: {
                        description: "Usuário não encontrado",
                        content: {
                            "application/json": {
                                example: { message: "Usuário não encontrado" }
                            }
                        }
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }

                }
            },

        },
      
        "/Servicos": {
            get: {
                tags: ["Servicos"],
                summary: "Listar todas as servicos",
                responses: {
                    200: {
                        description: "Dados obtidos com sucesso!",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: { $ref: '#/components/schemas/Listar_Servicos' }
                                }
                            }
                        }
                    }
                }
            },
            post: {
                tags: ['Servicos'],
                summary: 'Cadastrar novo Servico',
                description: "Recebe nome, valor, descricao para cadastrar novo Servico",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Cadastrar_Servico"
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: "Servico cadastrado com sucesso!"
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }
                }
            }
        },
        "/Servicos/{id_servico}": {
            put: {
                tags: ['Servicos'],
                summary: 'Atualizar todos os dados da Servico',
                description: 'Atualiza todos os dados de uma Servico existente, é necessário enviar todos os campos',
                parameters: [
                    {
                        name: "id_servico",
                        in: "path",
                        required: true,
                        description: "ID da servico a ser atualizada",
                        schema: {
                            type: 'integer',
                            example: 1
                        }
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Atualizar_Servico" },
                            example: {
                                nome: "tintura de cabelo",
                                valor: "R$ 100,00",
                                descricao: "Serviço de tintura de cabelo"
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: "Servico atualizada com sucesso!"
                    },
                    404: {
                        description: "Servico não encontrada",
                        content: {
                            "application/json": {
                                example: { message: "servico não encontrada" }
                            }
                        }
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }

                }

            },
            delete: {
                tags: ['Servicos'],
                summary: 'Remover Servico',
                description: 'Remove Servico existente pelo ID',
                parameters: [
                    {
                        name: "id_servico",
                        in: "path",
                        required: true,
                        description: "ID da servico a ser removida",
                        schema: {
                            type: 'integer',
                            example: 1
                        }
                    }
                ],
                responses: {
                    200: {
                        description: "servico removida com sucesso!"
                    },
                    404: {
                        description: "servico não encontrada",
                        content: {
                            "application/json": {
                                example: { message: "servico não encontrada" }
                            }
                        }
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }

                }
            },

        },

        "/Agendamentos": {
            get: {
                tags: ["Agendamentos"],
                summary: "Listar todas as agendamento",
                responses: {
                    200: {
                        description: "Dados obtidos com sucesso!",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: { $ref: '#/components/schemas/Listar_Agendamento' }
                                }
                            }
                        }
                    }
                }
            },
            post: {
                tags: ['Agendamentos'],
                summary: 'Cadastrar novo agendamento',
                description: "Recebe data_hora,status, id_usuario e id_servico para cadastrar novo agendamento",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Cadastrar_Agendamento"
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: "Agendamento cadastrada com sucesso!"
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }
                }
            }
        },
        "/Agendamentos/{id_Agendamento}": {
            put: {
                tags: ['Agendamentos'],
                summary: 'Atualizar todos os dados da Agendamento',
                description: 'Atualiza todos os dados de uma Agendamento existente, é necessário enviar todos os campos',
                parameters: [
                    {
                        name: "id_Agendamento",
                        in: "path",
                        required: true,
                        description: "ID da Agendamento a ser atualizada",
                        schema: {
                            type: 'integer',
                            example: 1
                        }
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Atualizar_Agendamento" },
                            example: {
                                data_hora: "2026-10-10T10:09:00Z",
                                status: "Agendado",
                                id_usuario: 2,
                                id_servico: 1
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: "Agendamento atualizada com sucesso!"
                    },
                    404: {
                        description: "Agendamento não encontrada",
                        content: {
                            "application/json": {
                                example: { message: "Agendamento não encontrada" }
                            }
                        }
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }

                }

            },
            delete: {
                tags: ['Agendamentos'],
                summary: 'Remover Agendamento',
                description: 'Remove Agendamento existente pelo ID',
                parameters: [
                    {
                        name: "id_Agendamento",
                        in: "path",
                        required: true,
                        description: "ID da Agendamento a ser removida",
                        schema: {
                            type: 'integer',
                            example: 1
                        }
                    }
                ],
                responses: {
                    200: {
                        description: "Agendamento removida com sucesso!"
                    },
                    404: {
                        description: "Agendamento não encontrada",
                        content: {
                            "application/json": {
                                example: { message: "Agendamento não encontrada" }
                            }
                        }
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }

                }
            },

        },

       

    },


    components: {
        schemas: {
            Listar_Usuarios: {
                type: 'object',
                properties: {
                    id: { type: "integer", example: 1 },
                    nome: { type: "string", example: "Ricardo" },
                    email: { type: "string", example: "ricardo@email.com" },
                    tipo: { type: "string", example: "admin" }
                }
            },
            Cadastrar_Usuario: {
                type: 'object',
                properties: {
                    nome: { type: "string", example: "Ricardo" },
                    email: { type: "string", example: "ricardo2@email.com" },
                    senha: { type: "string", example: "Senha123" },
                    tipo: { type: "string", example: "admin" }
                }
            },
            Atualizar_Usuario: {
                type: 'object',
                required: ["nome", "email", "senha"],
                properties: {
                    nome: { type: "string", example: "Nina" },
                    email: { type: "string", example: "nina@email.com" },
                    senha: { type: "string", example: "Senha123" },
                    tipo_acesso: { type: "string", example: "admin" }
                }
            },
            Login_Usuario: {
                type: 'object',
                required: true,
                properties: {
                    nome: { type: "string", example: "Julia" },
                    email: { type: "string", example: "julia@email.com" },
                    senha: { type: "string", example: "Senha123" },
                    tipo: { type: "string", example: "admin" }
                }
            },
            Reposta_Login: {
                type: 'object',
                properties: {
                    message: { type: 'string', example: 'Login realizado com sucesso' },
                    usuario: {
                        type: 'object',
                        properties: {
                            id_usuario: { type: "string", example: 1 },
                            nome: { type: "string", example: "Julia" },
                        }
                    }
                }
            },
            Listar_Servicos: {
                type: 'object',
                properties: {
                    id_servico: { type: "integer", example: 1 },
                    nome: { type: "string", example: "fazer sobrancelha" },
                    valor: { type: "string", example: "R$ 10,00" },
                    descricao: { type: "string", example: "Serviço de design de sobrancelha" },
                }
            },
            Cadastrar_Servico: {
                type: 'object',
                properties: {
                    nome: { type: "string", example: "fazer barba" },
                    descricao: { type: "string", example: "Serviço de corte de cabelo" },
                    valor: { type: "number", example: 20.00 }
                }
            },
            Atualizar_Servico: {
                type: 'object',
                required: ["nome", "valor", "descricao"],
                properties: {
                    nome: { type: "string", example: "raspar cabelo" },
                    descricao: { type: "string", example: "Serviço de corte de cabelo" },
                    valor: { type: "string", example: "R$ 20,00" }
                }
            },
            Listar_Agendamentos: {
                type: 'object',
                properties: {
                    id_Agendamento: { type: "integer", example: 1 },
                    data_hora: { type: "string", example: "2026-10-10T10:00:00Z" },
                    status: { type: "string", example: "Agendado" },
                    id_usuario: { type: "number", example: 1 },
                    id_servico: { type: "number", example: 1 }
                }
            },
            Cadastrar_Agendamento: {
                type: 'object',
                properties: {
                    data_hora: { type: "string", example: "2026-08-10T10:07:00Z" },
                    status: { type: "string", example: "Agendado" },
                    id_usuario: { type: "number", example: 1 },
                    id_servico: { type: "number", example: 1 }
                }
            },
            Atualizar_Agendamento: {
                type: 'object',
                required: ["data_hora", "status", "id_usuario", "id_servico"],
                properties: {
                    data_hora: { type: "string", example: "2026-10-10T10:09:00Z" },
                    status: { type: "string", example: "Agendado" },
                    id_usuario: { type: "number", example: 2 },
                    id_servico: { type: "number", example: 2 }
                }
            },
           
        }
    }
}
export default documentacao;