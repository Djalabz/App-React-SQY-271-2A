// Optimiser la todo  : 

// Chaque todo doit etre un objet -> id, content, date_creation, bouton check (ou autre système)
// et un bouton de suppression 

// On affichera chacun de ces éléments (sauf id), le bouton check montre si la todo est faite ou nnon 
// Quand on clique sur supprimer la todo doit disparaitre 

import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

function Todo() {
    const [inputValue, setInputValue] = useState("")
    const [todos, setTodos] = useState([])

    function addTodo() {
        let todoObject =  {
            id : uuidv4(),
            content : inputValue, 
            date : new Date().toLocaleDateString(),
            check: false
        }

       setTodos([ ... todos, todoObject])
       setInputValue("")
    }

    function handleCheck(todo) {
        todo.check = !todo.check

        let todosCopy = [ ... todos ]
        todosCopy = todosCopy.filter((task) => task.id != todo.id)

        todosCopy.push(todo)

        setTodos(todosCopy)
    }

    function handleDelete(todo) {
        let todosCopy = [ ... todos ]
        todosCopy = todosCopy.filter((task) => task.id != todo.id)

        setTodos(todosCopy)
    }

    console.log(todos)

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
                {todos && todos.map((todo) => (
                    <>
                        <h3 key={todo.id} >{todo.content}</h3>
                        <h4>{todo.date}</h4>
                        <button onClick={() => handleDelete(todo)}>X</button>
                        <input 
                            onChange={() => handleCheck(todo)}
                            type="checkbox" 
                            name="check" 
                            id="check" 
                            value={todo.check} />
                    </>
                ))}
            </div>
        </>
     );
}

export default Todo;