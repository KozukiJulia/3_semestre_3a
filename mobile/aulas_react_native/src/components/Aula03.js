import {View, Text, FlatList} from 'react-native';
import Hr from './Hr';

import Aula03_exercicio from './Aula03_exercicio';
import Aula03_exercicio2 from './Aula03_exercicio2';                 

const Aula03 = () => {
    // definindo um vetor de turmas como fonte de dados para a lista
    const turmas = [
        {id:1, turma: '3°A', pg: 10},
        {id:2, turma: '3°B', pg: 8},
        {id:3, turma: '2°A', pg: 6},
        {id:4, turma: '2°B', pg: 2}
    ]
    const exibirItensLista = ( {item}) => (
        <Text> {item.turma} </Text>
    )
    const exibirItensListaInterclasse = ( {item}) => (
        <Text> {item.turma} - Pontuação: {item.pg} </Text>
    )
    return (
        <View>
            <Hr/>
            <Text>Aula 03 - Listas com FlatList</Text>
            <Text>Aprendendo a manipular listas em react native</Text>
            <Hr/>
            <Text>Lista de Turmas</Text>
            {
                turmas.map((linha) => (
                    <Text key={linha.id}>{linha.turma}</Text>
                ))
            }
            <Text>Lista com o flatlist</Text>
            {/* Componente flatlist para exibir dados. Este componente é mais otimizado e eficiente
            para exibição de listas */}
            <FlatList
                data={turmas}
                renderItem={exibirItensLista}
                keyExtractor={(item) => item.id}
            />
            <Hr/>
            <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold'}}>
                Interclasse SESI 2026
            </Text>
             <FlatList
                data={turmas}
                renderItem={exibirItensListaInterclasse}
                keyExtractor={(item) => item.id}
            />
            <Aula03_exercicio />
            <Aula03_exercicio2 />
        </View>
    )
}

export default Aula03;