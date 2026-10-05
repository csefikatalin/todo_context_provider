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

### Az elkészült komponensek

```tsx
export type AllapotTipus = "folyamatban" | "törölve" | "kész" | "létrehozva";
export interface TodoTipus {
  id: number;
  tennivalo: string;
  allapot: AllapotTipus;
}

export const TODOLISTA: TodoTipus[] = [
  {
    id: 1,
    tennivalo: "Tanulni a dolgozatra",
    allapot: "folyamatban",
  },
  {
    id: 1,
    tennivalo: "contextes feladat önállóan",
    allapot: "létrehozva",
  },
  {
    id: 1,
    tennivalo: "takarítás",
    allapot: "törölve",
  },
  {
    id: 1,
    tennivalo: "edzés",
    allapot: "kész",
  },
];
```

```tsx
import { useState } from "react";

import "./App.css";
import { TODOLISTA, type AllapotTipus, type TodoTipus } from "./adat";
import Todos from "./components/Todos";

function App() {
  const [todoLista, setTodoLista] = useState<TodoTipus[]>(TODOLISTA);

  function allapotKezelo(index: number, allapot: AllapotTipus) {
    console.log(index, allapot);
    const ujTodoLista: TodoTipus[] = [...todoLista];
    ujTodoLista[index].allapot = allapot;
    setTodoLista(ujTodoLista);
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
  );
}

export default App;
```

```tsx
import "./todo.css";
import type { AllapotTipus, TodoTipus } from "../adat";

interface TodoPropsTipus {
  allapotKezelo: (index: number, allapot: AllapotTipus) => void;
  elem: TodoTipus;
  index: number;
}
function Todo({ elem, allapotKezelo, index }: TodoPropsTipus) {
  return (
    <div className="todo">
      <span className="szoveg">{elem.tennivalo} </span>
      <span className="allapot">{elem.allapot} </span>
      <button
        className="kesz"
        title="kesz"
        onClick={() => {
          allapotKezelo(index, "kész");
        }}
      >
        ✔️
      </button>
      <button
        className="folyamatban"
        title="folyamatban"
        onClick={() => {
          allapotKezelo(index, "folyamatban");
        }}
      >
        👣
      </button>
      <button
        className="torol"
        title="torol"
        onClick={() => {
          allapotKezelo(index, "törölve");
        }}
      >
        ❌
      </button>
      <button
        className="alap"
        title="alap"
        onClick={() => {
          allapotKezelo(index, "létrehozva");
        }}
      >
        Alapállapot
      </button>
    </div>
  );
}

export default Todo;
```

```tsx
import Todo from "./Todo";
import type { AllapotTipus, TodoTipus } from "../adat";
interface TodosPropsTipus {
  allapotKezelo: (index: number, allapot: AllapotTipus) => void;
  todoLista: TodoTipus[];
}

function Todos({ allapotKezelo, todoLista }: TodosPropsTipus) {
  return (
    <div>
      {todoLista.map((e, i) => {
        return (
          <Todo elem={e} index={i} allapotKezelo={allapotKezelo} key={i} />
        );
      })}
    </div>
  );
}

export default Todos;
```

**Most az App komponens kezeli az állapotot, és az adatokat és a függvényeket le kell buborékoltatni több komponensen keresztül a gyerek komponenseknek. **

### Fogalmak

**Provider** jelentése: „értéket biztosító komponens”. A React Context esetében a Provider határozza meg, hogy a komponensfa egy adott részében milyen Context-érték legyen elérhető. Dinamikus, közösen módosítható állapot továbbítására használjuk.

A **Context** definiálja az adatcsatornát és az átadható érték típusát.
A **Provider** megadja az adatcsatornán ténylegesen továbbított értéket.
A **useContext** kiolvassa a legközelebbi Provider értékét.

# A program átalakítása lépésről lépésre

Hozz létre egy új mappát **contexts** névem és benne egy új fájlt: **TodoContext.tsx** néven

## Az adatáramlás

```text
TodoProvider
├── todoLista state
├── allapotKezelo() függvény
│
└── TodoContext.Provider
    │
    └── App
        │
        └── Todos
                └── Todo
```

A `TodoProvider` kezeli a közös állapotot. A `TodoContext.Provider` a `value` tulajdonságon keresztül teszi elérhetővé a `todoLista` és az `allapotKezelo` értékeket a gyermekkomponensek számára.

## Context - Provider alapszerkezet EZT TANULD MEG!

A `ReactNode` típusra azért van szükség, mert a Providernek gyermekkomponenseket kell tudnia fogadni. Ez a react saját beépített típusa.

```tsx
import { createContext, type ReactNode } from "react";

export const TodoContext = createContext({});

interface TodoProviderProps {
  children: ReactNode;
}

export function TodoProvider({ children }: TodoProviderProps) {
  return <TodoContext.Provider value={{}}>{children}</TodoContext.Provider>;
}
```

## 1. Az App komponensből áthelyezzük az állapotkezelést a contextbe.

Töröld az App-ból a state-t és a függvényt és másold be a providerbe.


```tsx
import { createContext, useState, type ReactNode } from "react";
import { TODOLISTA, type AllapotTipus, type TodoTipus } from "../adat";

export const TodoContext = createContext({});

interface TodoProviderProps {
  children: ReactNode;
}

export function TodoProvider({ children }: TodoProviderProps) {
  const [todoLista, setTodoLista] = useState<TodoTipus[]>(TODOLISTA);

  function allapotKezelo(index: number, allapot: AllapotTipus) {
    console.log(index, allapot);
    const ujTodoLista: TodoTipus[] = [...todoLista];
    ujTodoLista[index].allapot = allapot;
    setTodoLista(ujTodoLista);
  }

  return (
    <TodoContext.Provider value={{ allapotKezelo, todoLista }}>
      {children}
    </TodoContext.Provider>
  );
}
```

A provider value értékénél soroljuk fel azokat a változókat, és függvényeket, amiket más komponensekben használni akarunk majd. Ezért definiálnunk kell ezek típusát is itt a contextben.

Írd a context fájl elejére a createContext elé. 

```tsx
interface TodoContextValue {
  allapotKezelo: (index: number, allapot: AllapotTipus) => void;
  todoLista: TodoTipus[];
}
```

Mostmár meg tudjuk határozni a context típusát is.  

```tsx
interface TodoContextValue{
    allapotKezelo:(index: number, allapot: AllapotTipus) =>void,
    todoLista:TodoTipus[]
}

export const TodoContext = createContext<TodoContextValue|undefined>(undefined)
```

Most így néz ki az egész context fájl. 

```tsx

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
```

## 2. Vegyük körbe a providerrel az App komponenst a main.tsx fájlban

Amelyik komponenst körülöleljük a providerrel, abban és azok gyerekeiben fogjuk tudni használni a providerben meghatározott value értékeket.

```tsx
  <TodoProvider>
    <App />
    </TodoProvider>


```

## 3. Használjuk a context adatait a komponensekben a useCOntext segítségével

MEnj végi az összes komponensen és vedd észre, hogy most már nem kell átadni pl a az állapotKezelő függvényt.  töröld ki őket a propspkból, a komponensparemtérei közül és a típusokból is. Pontosan ezt a típust hoztuk létre a contextben.

### Most így néz ki az App.tsx fájl

```tsx

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
```

## A fordító típushibát jelez!

Ez azért van, mert a contex értéke lehet undefinde is, és ezt a részt le kell kezelnünk a komponensben. 
Módosítsd az App.tsx-et!

```tsx
import { useContext } from 'react'
import './App.css'
import Todos from './components/Todos'
import { TodoContext } from './contexts/TodoContext'

function App() {

 /* EZZEL KELL KIEGÉSZÍTENI A KÓDOT KEZELI AZ undefinde értéket*/
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

```

Hasonló módon kell eljárni a Todo komponensben is. 


``` tsx
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
```
Látszik, hogy most kódismétlés van, mindkét komponensbe ugyanazt a hibakezelő kódot írtuk. 

Szervezzük ki ezt a kódot a kontext fájlba, a provider komponens után, egy új függvényként. 
Ezzel megírtuk az első saját HOOK-unkat. 

A Hook tehát egy speciális függvény, amit felhasználhatunk a komponensekben. 

```tsx

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
```

### Hook használata a gyerek komponensekben

A gyerek komponensekben:
``` tsx
 const { todoLista } =  useTodoContext();;
```

A Todo komponens: 

``` tsx
import "./todo.css"
import type {  TodoTipus } from '../adat'

import {  useTodoContext } from "../contexts/TodoContext";


interface TodoPropsTipus {
   
    elem: TodoTipus,
    index: number
}
function Todo({ elem, index }: TodoPropsTipus) {    
      const { allapotKezelo } = useTodoContext();

    return (
        <div className='todo'>
            <span className="szoveg">{elem.tennivalo} </span>
            <span className="allapot">{elem.allapot} </span>
            <button className="kesz" title="kesz" onClick={()=>{allapotKezelo(index,"kész")}}>✔️</button>
            <button className="folyamatban" title="folyamatban" onClick={()=>{allapotKezelo(index,"folyamatban")}}>👣</button>
            <button className="torol" title="torol" onClick={()=>{allapotKezelo(index,"törölve")}}>❌</button>
            <button className="alap" title="alap" onClick={()=>{allapotKezelo(index,"létrehozva")}}>Alapállapot</button>
        </div>
    )
}

export default Todo
``` 

Todos komponens - nem változott

``` tsx

import Todo from './Todo'
import type {  TodoTipus } from '../adat'
interface TodosPropsTipus {

    todoLista: TodoTipus[]
}

function Todos({ todoLista }: TodosPropsTipus) {
    return (
        <div>
            {
                todoLista.map((e, i) => {
                    return <Todo elem={e} index={i} key={i} />
                }
                )
            }
        </div>
    )
}

export default Todos
```

App komponens

``` tsx

import './App.css'
import Todos from './components/Todos'
import {  useTodoContext } from './contexts/TodoContext'

function App() {

  const { todoLista } =  useTodoContext();
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

``` 

