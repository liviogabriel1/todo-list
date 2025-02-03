import axios from 'axios';

// Configura a URL base do back-end
const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Porta do back-end
});

// Função para registrar um usuário
export const registerUser = async (userData) => {
    try {
        const response = await api.post('/auth/register', userData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Função para fazer login
export const loginUser = async (userData) => {
    try {
        const response = await api.post('/auth/login', userData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Função para buscar tarefas do usuário logado
export const fetchTasks = async (token) => {
    try {
        const response = await api.get('/tasks', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Função para criar uma nova tarefa
export const createTask = async (taskData, token) => {
    try {
        const response = await api.post('/tasks', taskData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Função para excluir uma tarefa
export const deleteTask = async (taskId, token) => {
    try {
        await api.delete(`/tasks/${taskId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        throw error.response.data;
    }
};

// Função para marcar tarefa como concluída
export const toggleTaskCompletion = async (taskId, token) => {
    try {
        const response = await api.patch(
            `/tasks/${taskId}/toggle`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};