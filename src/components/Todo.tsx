import "./todo.css"
import type { TodoTipus } from '../adat'

import { useTodoContext } from "../contexts/TodoContext";


interface TodoPropsTipus {

    elem: TodoTipus,
    index: number
}
function Todo({ elem, index }: TodoPropsTipus) {
    const { allapotKezelo } = useTodoContext();

    return (
        <div
            className={`todo ${elem.allapot === "kész"
                    ? "kesz"
                    : elem.allapot === "folyamatban"
                        ? "folyamatban"
                        : elem.allapot === "törölve"
                            ? "torol"
                            : "alap"
                }`}
        >
            <span className="szoveg">{elem.tennivalo}</span>
            <span className="allapot">{elem.allapot}</span>

            <button
                title="kész"
                onClick={() => allapotKezelo(index, "kész")}
            >
                ✔️
            </button>

            <button
                title="folyamatban"
                onClick={() => allapotKezelo(index, "folyamatban")}
            >
                👣
            </button>

            <button
                title="töröl"
                onClick={() => allapotKezelo(index, "törölve")}
            >
                ❌
            </button>

            <button
                title="alap"
                onClick={() => allapotKezelo(index, "létrehozva")}
            >
                Alapállapot
            </button>
        </div>
    )
}

export default Todo