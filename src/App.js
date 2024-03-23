import React, {useState} from 'react'
import './App.css'


function App() {

  const [list, setList] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null); 
  const [editText, setEditText] = useState("");

  const addTask = (task) =>{
    if (task.trim() !== ""){
      const newTask = {
        id: Math.random(),
        task: task
      };

      setList([...list, newTask]);

      setInput("");
    }
  }
  const deleteTask = (id) => {
    setList(list.filter(task => task.id !== id));
  }

  const updateTask = (id, newText) => {
    setList(list.map(task => {
      if (task.id === id) {
        return { ...task, task: newText };
      }
      return task;
    }));
    setEditId(null); 
  }

  const handleEdit = (id, text) => {
    setEditId(id);
    setEditText(text);
  }

  const handleSubmit = (e) => {
    e.preventDefault(); 
    addTask(input);
  }

  return (
    <div className='todo-App'>
      <h1 className='app-heading'>Daily Planner</h1>
      <form className='task-form' onSubmit={handleSubmit}>
      <input type="text" placeholder='Add a task' className='task-input' value={input} onChange={(e) => setInput(e.target.value)}/>
      <button className= 'addtask-btn'>Add Task</button>    
      </form>

      <ul className='task-list'>
          {list.map((task) =>(
          <li key={task.id} className='the-list'>
          {editId === task.id ? (
            <>
            <input type="text" value={editText} className='task-input' onChange={(e) => setEditText(e.target.value)} />
            <button className='edit-btn' onClick={() => updateTask(task.id, editText)}>Update</button>
            </>
            ) : (
              <>
          {task.task}
          <button className= 'delete-btn' onClick={() => deleteTask(task.id)}>Delete</button>
          <button className= 'edit-btn' onClick={() => handleEdit(task.id, task.task)}>Edit</button>
              </>
          )}
          </li>
          ))}
      </ul>
    </div>
  );
}

export default App
