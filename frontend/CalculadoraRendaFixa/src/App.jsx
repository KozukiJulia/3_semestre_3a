import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Calculadora from './pages/Calculadora'
import Sobre from './pages/Sobre'

function App (){
  return(
//habilita osistema de navegação por rotas
<BrowserRouter>
{/*Barra de navegação,para aparecer em todasas paginas*/ }
<Navbar />
{/* area de conteudo principal */}
<main className='conteudo-prncipal'>
  <Routes>
    <Route path='/'element={<Calculadora/>}/> 
    <Route path='/Sobre' element={<Sobre/>}
    />
  </Routes>

</main>

</BrowserRouter>
  )
}
export default App