import "./todo.css"
import type { AllapotTipus, TodoTipus } from '../adat'


interface TodoPropsTipus {
    allapotKezelo: (index: number,allapot:AllapotTipus) => void,
    elem: TodoTipus,
    index: number
}
function Todo({ elem, allapotKezelo, index }: TodoPropsTipus) {
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