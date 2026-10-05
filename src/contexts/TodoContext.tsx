import { createContext, useContext, useState, type ReactNode } from "react";
import { TODOLISTA, type AllapotTipus, type TodoTipus } from "../adat";



interface TodoContextValue {
    allapotKezelo: (index: number, allapot: AllapotTipus) => void,
    todoLista: TodoTipus[]
}

export const TodoContext = createContext<TodoContextValue | undefined>(undefined)


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
        <TodoContext.Provider value={{ allapotKezelo, todoLista }}>
            {children}
        </TodoContext.Provider>
    )
}

/* saját hook */

export function useTodoContext() {

    const context = useContext(TodoContext);

    if (context === undefined) {
        throw new Error(
            'Az App csak TodoProvideren belül használható.',
        );
    }
    return context
}