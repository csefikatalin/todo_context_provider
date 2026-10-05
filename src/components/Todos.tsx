
import Todo from './Todo'
import type { AllapotTipus, TodoTipus } from '../adat'
interface TodosPropsTipus {
     allapotKezelo: (index: number,allapot:AllapotTipus) => void,
    todoLista: TodoTipus[]
}

function Todos({ allapotKezelo, todoLista }: TodosPropsTipus) {
    return (
        <div>

            {

                todoLista.map((e, i) => {
                    return <Todo elem={e} index={i} allapotKezelo={allapotKezelo} key={i} />

                }

                )
            }



        </div>
    )
}

export default Todos