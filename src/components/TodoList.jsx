import { useState } from "react"
import { v4 as uuidv4 } from 'uuid';

// Remove the styled-components import and Checkbox component
// Instead, we'll use inline styles

function TodoList() {

    let [todos , setTodos] = useState([{task : "Coding" , id :uuidv4(), completed: false}])
    let [newTodo , setNewTodo] = useState("")

    let addNewTask = ()=>{
        if (newTodo.trim() !== "") {
            setTodos((prevTodos) => [
                ...prevTodos,
                { task: newTodo, id: uuidv4(), completed: false }
            ]);
            setNewTodo("");
        }
    }   
    let updateTodo = (event)=>{
        setNewTodo(event.target.value)              
    }  
    let toggleComplete = (id)=>{
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };
    let removeCompleted = ()=>{
        setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
    };

    // If we want to delete something then we follow this filter pattern and want to add something we will use map pattern
    let deleteTask = (id) => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
    }

    let toUpperCase = ()=>{
        setTodos((prevTodos)=>{
            return prevTodos.map((todo)=>{
            return {...todo, task : todo.task.toUpperCase()}         
        })
        })
    }
    let toLowerCase = ()=>{
        setTodos((prevTodos)=>{
            return prevTodos.map((todo)=>{
            return {...todo, task : todo.task.toLowerCase()}         
        })
        })
    }
    return (
    <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#f0f8ff',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)'
    }}>
        <h2 style={{ color: '#4a4a4a', textAlign: 'center', marginBottom: '20px' }}>ToDo List</h2>

        <div style={{ display: 'flex', marginBottom: '20px' }}>
            <input 
                type="text" 
                placeholder="Tasks to do..." 
                value={newTodo}  
                onChange={updateTodo}
                style={{
                    flex: 1,
                    padding: '10px',
                    fontSize: '16px',
                    borderRadius: '5px 0 0 5px',
                    border: '1px solid #ddd'
                }}
            />
            <button 
                onClick={addNewTask}
                style={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0 5px 5px 0',
                    cursor: 'pointer'
                }}
            >
                Add
            </button>
        </div>

        <h3 style={{ color: '#4a4a4a', marginBottom: '10px' }}>Tasks to Complete</h3>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
            {todos.map((todo) => (
                <li key={todo.id} style={{
                    backgroundColor: 'white',
                    margin: '10px 0',
                    padding: '10px',
                    borderRadius: '5px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => toggleComplete(todo.id)}
                            style={{ marginRight: '10px', cursor: 'pointer' }}
                        />
                        <span style={{ 
                            textDecoration: todo.completed ? 'line-through' : 'none',
                            color: '#333' // Added dark color for better visibility
                        }}>{todo.task}</span>
                    </div>
                    <div>
                        <button onClick={() => deleteTask(todo.id)} style={{...buttonStyle, backgroundColor: '#f44336'}}>Delete</button>
                    </div>
                </li>
            ))}
        </ul>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
            <button onClick={removeCompleted} style={{...buttonStyle, backgroundColor: '#ff9800'}}>Remove Completed</button>
            <button onClick={toUpperCase} style={buttonStyle}>Upper Case All</button>
            <button onClick={toLowerCase} style={buttonStyle}>Lower Case All</button>
        </div>
    </div>
    ) 
}

const buttonStyle = {
    padding: '8px 12px',
    margin: '0 5px',
    fontSize: '14px',
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
};

export default TodoList
