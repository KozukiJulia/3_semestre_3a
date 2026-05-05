import { ScrollView} from "react-native";
import Aula01 from "./src/components/Aula01";
import Aula02 from "./src/components/Aula02";
import Aula03 from "./src/components/Aula03";

export default function App(){
  return(
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <Aula01/>
      <Aula02/>
      <Aula03/>
    </ScrollView>
  )
}