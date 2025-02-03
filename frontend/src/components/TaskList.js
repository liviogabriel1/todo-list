import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskList = ({ token }) => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [error, setError] = useState('');

    // Carrega as tarefas ao montar o componente
    useEffect(() => {
        if (token) {
            fetchTasks();
        }
    }, [token]);

    const fetchTasks = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/tasks', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTasks(res.data);
        } catch (err) {
            setError('Erro ao carregar tarefas.');
        }
    };

    const handleAddTask = async (e) => {
        e.preventDefault();
        if (!newTask.trim()) return;

        try {
            const res = await axios.post(
                'http://localhost:5000/api/tasks',
                { description: newTask },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setTasks([...tasks, res.data]);
            setNewTask('');
        } catch (err) {
            setError('Erro ao adicionar tarefa.');
        }
    };

    const handleToggleComplete = async (id) => {
        try {
            const task = tasks.find((t) => t._id === id);
            const res = await axios.put(
                `http://localhost:5000/api/tasks/${id}`,
                { completed: !task.completed },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setTasks(tasks.map((t) => (t._id === id ? res.data : t)));
        } catch (err) {
            setError('Erro ao atualizar tarefa.');
        }
    };

    const handleDeleteTask = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTasks(tasks.filter((t) => t._id !== id));
        } catch (err) {
            setError('Erro ao remover tarefa.');
        }
    };

    return (
        <div>
            <h2>Minhas Tarefas</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleAddTask}>
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Nova tarefa..."
                    required
                />
                <button type="submit">Adicionar</button>
            </form>
            <ul>
                {tasks.map((task) => (
                    <li key={task._id}>
                        <span
                            style={{
                                textDecoration: task.completed ? 'line-through' : 'none',
                                cursor: 'pointer',
                            }}
                            onClick={() => handleToggleComplete(task._id)}
                        >
                            {task.description}
                        </span>
                        <button onClick={() => handleDeleteTask(task._id)}>Remover</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;