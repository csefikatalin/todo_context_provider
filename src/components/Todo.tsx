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