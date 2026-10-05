# React Context és Provider lépésről lépésre
Ebben az útmutatóban egy egyszerűTtodo alkalamzás közös állapotát tesszük elérhetővé több komponens számára a React Context API segítségével.

A Contexten keresztül a következő értékeket adjuk tovább:

- a tennivalók listáját;
- a listát módosítő függvényt;

## Kiindulás

Felépítünk egy alap TODO alkalmazást úgy, ahogy eddig is tanultuk, az App komponensben kezelt állapottal. Az állapotokat props-okkal adjuk át a gyerekelemeknek. 


## Javasolt fájlszerkezet

```text
src/
├── components/
│   └── Todos.tsx
│   └── Todo.tsx
├── adat.ts
├── App.css
├── App.tsx
└── main.tsx
```




### Fogalmak

A Provider jelentése: „értéket biztosító komponens”. A React Context esetében a Provider határozza meg, hogy a komponensfa egy adott részében milyen Context-érték legyen elérhető. Dinamikus, közösen módosítható állapot továbbítására használjuk.

### Context és Provider szerepe

A Context definiálja az adatcsatornát és az átadható érték típusát.
A Provider megadja az adatcsatornán ténylegesen továbbított értéket.
A useContext kiolvassa a legközelebbi Provider értékét.


## Context - Provider alapszerkezet

```tsx
import { createContext, type ReactNode } from "react";

export const TodoContext=createContext({})

interface TodoProviderProps{
    children:ReactNode
}

export function  TodoProvider({children}:TodoProviderProps){
    return (
        <TodoContext.Provider value={{}}>
            {children}
        </TodoContext.Provider>
    )
}
```


import { createContext, useState, type ReactNode } from "react";
import { TODOLISTA, type AllapotTipus, type TodoTipus } from "../adat";


export const TodoContext = createContext({})


interface TodoProviderProps {
    children: ReactNode
}

export function TodoProvider({ children }: TodoProviderProps) {

    const [todoLista, setTodoLista] = useState<TodoTipus[]>(TODOLISTA)

    function allapotKezelo(index: number, allapot: AllapotTipus) {
        console.log(index, allapot)
        const ujTodoLista: TodoTipus[] = [...todoLista]
        ujTodoLista[index].allapot = allapot
        setTodoLista(ujTodoLista)
    }

    return (
        <TodoContext.Provider value={{allapotKezelo, todoLista}}>
            {children}
        </TodoContext.Provider>
    )
}




import type { useContext } from 'react'
import './App.css'
import Todos from './components/Todos'
import { TodoContext } from './contexts/TodoContext'

function App() {
  const {todoLista} = useContext(TodoContext)
  return (
    <>
      <header>
        <h1>Todo</h1>
      </header>
      <article>
        <Todos todoLista={todoLista}  />
      </article>
      <footer>
        <p>Készítette: Cs. K. </p>
      </footer>
    </>
  )
}

export default App



  <TodoProvider>
    <App />
    </TodoProvider>





import { createContext, useState, type ReactNode } from "react";
import { TODOLISTA, type AllapotTipus, type TodoTipus } from "../adat";



interface TodoContextValue{
    allapotKezelo:(index: number, allapot: AllapotTipus) =>void,
    todoLista:TodoTipus[]
}

export const TodoContext = createContext<TodoContextValue|{}>({})


interface TodoProviderProps {
    children: ReactNode
}

export function TodoProvider({ children }: TodoProviderProps) {

    const [todoLista, setTodoLista] = useState<TodoTipus[]>(TODOLISTA)

    function allapotKezelo(index: number, allapot: AllapotTipus) {
        console.log(index, allapot)
        const ujTodoLista: TodoTipus[] = [...todoLista]
        ujTodoLista[index].allapot = allapot
        setTodoLista(ujTodoLista)
    }

    return (
        <TodoContext.Provider value={{allapotKezelo, todoLista}}>
            {children}
        </TodoContext.Provider>
    )
}




import { useContext } from 'react'
import './App.css'
import Todos from './components/Todos'
import { TodoContext } from './contexts/TodoContext'

function App() {

  const context = useContext(TodoContext);

  if (context === undefined) {
    throw new Error(
      'Az App csak TodoProvideren belül használható.',
    );
  }

  const { todoLista } = context;


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


  const context = useContext(TodoContext);

  if (context === undefined) {
    throw new Error(
      'Az App csak TodoProvideren belül használható.',
    );
  }

  const { todoLista } = context;


  

  function App() {

  const context = useContext(TodoContext);

  if (context === undefined) {
    throw new Error(
      'Az App csak TodoProvideren belül használható.',
    );
  }

  const { todoLista } = context;


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

function Todo({ elem, index }: TodoPropsTipus) {

    const context = useContext(TodoContext);
    
      if (context === undefined) {
        throw new Error(
          'Az App csak TodoProvideren belül használható.',
        );
      }
    
      const { allapotKezelo } = context;

    return (<div className='todo'>
    </div>)
  }


/* saját hook  a contexben*/

export function useTodoContext() {

    const context = useContext(TodoContext);

    if (context === undefined) {
        throw new Error(
            'Az App csak TodoProvideren belül használható.',
        );
    }
    return context
}

A gyerekk komponensekben: 
 const { todoLista } =  useTodoContext();;