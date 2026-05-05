import { View, Text, StyleSheet, Image } from 'react-native';

const Aula03_exercicio2 = () => {
    // CRIANDO UM VETOR COM INFORMAÇÕES DE PRODUTOS
    const produtos = [
        { 
            id: '1', 
            foto: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop', 
            nome: 'Notebook', 
            categoria: 'Eletrônicos', 
            preco: 3500.00, 
            estoque: 5 
        },
        { 
            id: '2', 
            foto: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=300&fit=crop', 
            nome: 'Mouse Gamer', 
            categoria: 'Acessórios', 
            preco: 150.00, 
            estoque: 25 
        },
        { 
            id: '3', 
            foto: 'https://images.unsplash.com/photo-1587829191301-dc798b83add3?w=400&h=300&fit=crop', 
            nome: 'Teclado Mecânico', 
            categoria: 'Acessórios', 
            preco: 450.00, 
            estoque: 12 
        },
    ];

    return (
        <View style={styles.container}>
            {/* CABEÇALHO - Informando quais campos são exibidos */}
            <Text style={styles.titulo}>Lista de Produtos</Text>

            {/* PERCORRER O VETOR E EXIBIR CADA PRODUTO */}
            {produtos.map((produto) => (
                <View key={produto.id} style={styles.card}>
                    {/* CABEÇALHO DO CARD */}
                    <Text style={styles.cardTitulo}>{produto.nome}</Text>

                    {/* EXIBIR A IMAGEM DO PRODUTO */}
                    <Image 
                        source={{ uri: produto.foto }} 
                        style={styles.imagem} 
                    />

                    {/* EXIBIR OS DADOS EM PARES DE CHAVE E VALOR */}
                    <Text style={styles.texto}>
                        <Text style={styles.chave}>Categoria:</Text> {produto.categoria}
                    </Text>
                    <Text style={styles.texto}>
                        <Text style={styles.chave}>Preço:</Text> R$ {produto.preco.toFixed(2)}
                    </Text>
                    <Text style={styles.texto}>
                        <Text style={styles.chave}>Estoque:</Text> {produto.estoque} unidades
                    </Text>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
    titulo: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 15,
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 5,
    },
    card: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
        backgroundColor: '#fff',
    },
    cardTitulo: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
    },
    imagem: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginBottom: 10,
        resizeMode: 'cover',
    },
    texto: {
        fontSize: 14,
        marginVertical: 4,
        color: '#555',
    },
    chave: {
        fontWeight: 'bold',
        color: '#000',
    },
});

export default Aula03_exercicio2;
