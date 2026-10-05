
import './App.css'
import Todos from './components/Todos'
import {  useTodoContext } from './contexts/TodoContext'

function App() {

  

  const { todoLista } =  useTodoContext();;


  /* const {todoLista} = useContext(TodoContext) */
  return (
    <>
      <header>
        <h1>Todo</h1>
      </header>
      <article>
        <Todos todoLista={todoLista} />
      </article>
      <footer>
        <p>Készítette: Cs. K. </p>
      </footer>
    </>
  )
}

export default App
