import {StyleSheet} from 'react-native';

export const corPrincipal = '#59b6ff';
export const corSecundaria = '#706ef9';
export const corTextos = '#f2f2f2';
export const corFundo = '#000000';
export const corFundo2 = '#262626';
export const corPlaceholder = '#808080';

const Estilos = StyleSheet.create({
    conteudo: {
        flex: 1,
        backgroundColor: corFundo,
    },
    header: {
        alignItems: 'center',
        paddingVertical: 20
    },
    logo: {
        width: 300,
        height: 40,
        resizeMode: 'contain'
    },
    corpo: {
        flex: 1,
        paddingHorizontal: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        marginBottom: 10
    },
    input: {
        flex: 1,
        height: 50,
        backgroundColor: corFundo2,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: corPrincipal,
        marginRight: 6,
        paddingHorizontal: 10,
        color: corTextos,
        fontSize: 16
    },
    botao: {
        width: 50,
        borderRadius: 6,
        backgroundColor: corSecundaria,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textoBotao: {
        color: corTextos,
        fontWeight: 'bold',
        fontSize: 26,
        marginBottom: 5
    },
    botaoItem: {
        backgroundColor: corFundo2,
        borderRadius: 8,
        marginBottom:8,
        padding: 12,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: corPlaceholder,
        justifyContent: 'space-between',
        marginHorizontal: 10
    },
    textoBotaoItem: {
        color: corTextos,
        fontSize: 16
    },
    textoBotaoItemComprado: {
        color: corPlaceholder,
        fontSize: 16,
        textDecorationLine: 'line-through'
    }
});
export default Estilos;