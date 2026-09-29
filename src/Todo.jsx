import { useState } from "react";

function Todo() {
    const [inputValue, setInputValue] = useState("")
    const [todos, setTodos] = useState([])

    function addTodo() {
       setTodos([ ... todos, inputValue])
       setInputValue("")
    }

    return ( 
        <>
            <h1>Ma todo</h1>

            <input 
                type="text" 
                placeholder="Votre todo ici"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />

            <button onClick={() => addTodo()}>Ajouter</button>

            <div>
                { todos.length && todos.map((todo, index) => (
                    <h3 key={index} >{todo}</h3>
                )) }
            </div>
        </>
     );
}

export default Todo;