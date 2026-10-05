
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