import react, { useState, useEffect } from 'react'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';

function Todo() {

    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [editTodoId, setEditTodoId] = useState('');
    const [editTodoText, setEditTodoText] = useState('');

    useEffect(() => {
        fetchTodos();
    }, [])

    const fetchTodos = async () => {
        try {
            const response = await axios.get('http://localhost:4000/todos')
            setTodos(response.data)
        } catch (error) {
            console.error(error)
        }
    }

    const addTodo = async () => {
        if (newTodo.trim() === '') return;

        try {
            const response = await axios.post('http://localhost:4000/todos', { body: newTodo })
            setTodos([...todos, response.data])
            setNewTodo('')
        } catch (error) {
            console.error(error)
        }
    }

    const handleEdit = (id) => {
        const editedTodo = todos.find((todo) => todo._id === id);
        if (editedTodo) {
            setEditTodoId(id);
            setEditTodoText(editedTodo.body);
        }
    };

    const handleUpdate = async () => {
        if (editTodoText.trim() === '') return;

        try {
            const response = await axios.put(
                `http://localhost:4000/todos/${editTodoId}`,
                {
                    body: editTodoText
                }
            );

            setTodos((prevTodos) =>
                prevTodos.map((todo) =>
                    todo._id === editTodoId ? { ...todo, body: response.data.body } : todo
                )
            );

            setEditTodoId('');
            setEditTodoText('');
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = (id) => {

        axios.delete(`http://localhost:4000/todos/${id}`)
            .then(response => {
                console.log("succesfully deleted", response);
                setTodos((iadsa) => iadsa.filter((todo) => todo._id !== id));
            })
            .catch(error => {
                console.error(error);
            });
    }
    return (
        <div className='bg-custom container' >
            <h1 className='mt-4' >Todo list</h1>
            <input
                type="text"
                value={newTodo}
                className='form-control'
                placeholder="Add a new todo"
                onChange={(e) => setNewTodo(e.target.value)}
            />
            <button style={{ marginTop: '10px' }} className='btn btn-primary' onClick={addTodo}>Add</button>
            <ul className='list-group' >
                {todos &&
                    todos.map((todo, index) => (
                        <li style={{ marginTop: '10px' }} className='list-group-item d-flex align-items-center' key={todo._id}>
                            {editTodoId === todo._id ? (
                                <input
                                    className='form-control'
                                    type="text"
                                    value={editTodoText}
                                    onChange={(e) => setEditTodoText(e.target.value)}
                                />
                            ) : (
                                todo.body
                            )}
                            {editTodoId === todo._id ? (
                                <button className='btn btn-succes mx-2' onClick={handleUpdate}>Save</button>
                            ) : (
                                <button className='btn btn-primary mx-2' onClick={() => handleEdit(todo._id)}>Edit</button>
                            )}
                            <button className='btn btn-danger' onClick={() => handleDelete(todo._id)}>Delete</button>
                        </li>
                    ))}
            </ul>
        </div >
    )
}


export default Todo;