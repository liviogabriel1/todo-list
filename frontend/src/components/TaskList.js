import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle, FiCircle, FiTrash2, FiAlertCircle } from 'react-icons/fi'; // Adicionar FiAlertCircle

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
        <div className="task-list container">
            <div className="card">
                <h1 className="task-list__title">Minhas Tarefas</h1>

                {error && (
                    <div className="alert alert--error">
                        <FiAlertCircle className="alert__icon" />
                        {error}
                    </div>
                )}

                <form onSubmit={handleAddTask} className="task-form">
                    <input
                        type="text"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        placeholder="Adicione uma nova tarefa..."
                        className="input input--block"
                        required
                    />
                    <button type="submit" className="button button--primary">
                        Adicionar
                    </button>
                </form>

                <AnimatePresence>
                    {tasks.map((task) => (
                        <motion.div
                            key={task._id}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, height: 0 }}
                            className="task-item"
                        >
                            <button
                                onClick={() => handleToggleComplete(task._id)}
                                className="task-item__status"
                            >
                                {task.completed ? (
                                    <FiCheckCircle className="task-item__icon--completed" />
                                ) : (
                                    <FiCircle className="task-item__icon" />
                                )}
                            </button>

                            <span className={`task-item__text ${task.completed ? 'task-item__text--completed' : ''}`}>
                                {task.description}
                            </span>

                            <button
                                onClick={() => handleDeleteTask(task._id)}
                                className="task-item__delete"
                            >
                                <FiTrash2 />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default TaskList;