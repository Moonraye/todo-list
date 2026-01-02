import React, { useState, useEffect, useRef } from 'react';
export default function TodoListApp(){
    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null);
    useEffect (() => {
        inputRef.current.focus();
        const saved = localStorage.getItem('my-tasks');
        if (saved) setTasks(JSON.parse(saved));
    }, []);
    useEffect(() => {
        localStorage.setItem('my-tasks', JSON.stringify(tasks));
}, [tasks]);

    const addTask = () => {
        if(!inputValue.trim()) return;
        const newTask = { id: Date.now(), text: inputValue };
        setTasks([...tasks, newTask]);
        setInputValue('');
    };
    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };
    
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
        if (e.key === 'Escape') {
            setInputValue('');
        }
    };
    return ( 
        <div className = "p-4" > 
            <h1 className = "text-2xl mb-4" > Todo List </h1>
            <input ref={inputRef} value={inputValue} onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}    
            placeholder='What`s need?' />
            <button onClick={addTask} className="ml-2 p-1 bg-blue-500 text-white rounded">Add</button>

            <ul>
                {tasks.map(task => (
                    <li key={task.id} className='mt-4'>{task.text}
                <button onClick={() => deleteTask(task.id)}
                className="ml-2 p-1 bg-red-500 text-white rounded">Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}