import { useState } from 'react'

import './App.css'
import { TODOLISTA, type AllapotTipus, type TodoTipus } from './adat'
import Todos from './components/Todos'

function App() {
  const [todoLista, setTodoLista] = useState<TodoTipus[]>(TODOLISTA)

  function allapotKezelo(index: number, allapot: AllapotTipus) {
    console.log(index, allapot)
    const ujTodoLista: TodoTipus[] = [...todoLista]
    ujTodoLista[index].allapot = allapot
    setTodoLista(ujTodoLista)
  }
  return (
    <>
      <header>
        <h1>Todo</h1>
      </header>
      <article>
        <Todos todoLista={todoLista} allapotKezelo={allapotKezelo} />
      </article>
      <footer>
        <p>Készítette: Cs. K. </p>
      </footer>
    </>
  )
}

export default App
