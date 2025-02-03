import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = ({ setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', { username, password });
            localStorage.setItem('token', res.data.token); // Salva o token no localStorage
            setToken(res.data.token); // Atualiza o estado do token no App.js
            navigate('/'); // Redireciona para a página inicial
        } catch (err) {
            setError(err.response?.data?.error || 'Erro ao registrar. Tente novamente.');
        }
    };

    return (
        <div>
            <h2>Registrar</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Usuário:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Senha:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Registrar</button>
            </form>
        </div>
    );
};

export default Register;