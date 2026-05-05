import {useState} from "react";
import {Text, View, TextInput, TouchableOpacity, FlatList, Image, StatusBar} from "react-native";
import Estilos,{ corPrincipal, corSecundaria, corTextos, corFundo, corFundo2, corPlaceholder} from "./Estilos";
import {MaterialIcons} from '@expo/vector-icons';

const ListaCompras = () => {
    //variavel de estado para o item a ser adicionado
    const [item, setItem] = useState('');
    const [listaCompras, setListaCompras] = useState([
    {id:1, produto: '1 cartela de ovos🥚', comprado:false},
    {id:1, produto: '2 nikitos de morango🍪', comprado:false},
    ]);
    const exibirItens = ({item}) => {
        return (
<TouchableOpacity style={Estilos.botaoItem}>
    <Text style={Estilos.textoBotaoItem}>{item.produto}</Text>
    <MaterialIcons name='delete-outline'  size={24} color={corPrincipal} />
</TouchableOpacity>
        )
}

const botaoAdicionar = () => {
    //Criando novo objeto do produto qu estou adicionando
    const novoItem = {id:Date.now(), produto: item, comprado:false}
    //Criando nova lista de compras com o item adicionado
    const novaLista = [...listaCompras, novoItem];
    //Atualizando a lista de compras com a nova lista
    setListaCompras(novaLista)
    setItem('')

}
    
            return (
        <View style={Estilos.conteudo}>
            <StatusBar backgroundColor={corFundo} barStyle="light-content" />
            <View style={Estilos.header}>
                <Image source={require('../assets/logo.png')} style={Estilos.logo} />
            </View>
            <View style={Estilos.corpo}>
                <View style={Estilos.inputContainer}>
                    <TextInput
                        placeholder="Adicione um novo item na lista"
                        style={Estilos.input}
                        value={item} onChangeText={setItem}
                        placeholderTextColor={corPlaceholder}
                    />
                    <TouchableOpacity style={Estilos.botao} onPress={botaoAdicionar} >
                        <Text style={Estilos.textoBotao}>+</Text>
                    </TouchableOpacity>
                </View>
                 {}
            <FlatList
                data={listaCompras}
                renderItem={exibirItens}
                keyExtractor={item => item.id}
            />
            </View>
           
        </View>

    );

};
export default ListaCompras;
