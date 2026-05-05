import { View, Text } from 'react-native';

const Aula03_exercicio = () => {
    const alunos = [
        { id: '1', aluno: 'Ana', materia: 'Matemática', media: 8.5, faltas: 2 },
        { id: '2', aluno: 'Bruno', materia: 'Português', media: 7.2, faltas: 3 },
        { id: '3', aluno: 'Carla', materia: 'Ciências', media: 9.1, faltas: 1 },
        { id: '4', aluno: 'Diego', materia: 'História', media: 6.8, faltas: 4 },
    ];

    return (
        <View>
            <Text>Exercício 3 - Alunos</Text>
            {alunos.map((item) => (
                <Text key={item.id}>
                    {item.aluno} - {item.materia} - Média: {item.media.toFixed(1)} - Faltas: {item.faltas}
                </Text>
            ))}
        </View>
    );
};

export default Aula03_exercicio;
