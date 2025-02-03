import React, { useState } from 'react';
import axios from 'axios'; // Adicionar esta linha
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../api';
import { motion } from 'framer-motion';
import Loader from 'react-spinners/ClipLoader'; // Corrigir o nome do pacote
import Illustration from './Illustration';

const Register = ({ setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true); // Adicionar controle de loading

        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', {
                username,
                password
            });

            localStorage.setItem('token', res.data.token);
            setToken(res.data.token);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.error || 'Erro ao registrar. Tente novamente.');
        } finally {
            setLoading(false); // Finalizar loading
        }
    };

    return (
        <div className="auth-page fade-in">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="auth-container"
            >
                <div className="auth-illustration">
                    <Illustration />
                    <h2 className="auth-illustration__title">Junte-se à nossa comunidade</h2>
                    <p className="auth-illustration__text">
                        Crie sua conta e comece a organizar suas tarefas de forma eficiente.
                    </p>
                </div>

                <div className="auth-form">
                    <h1 className="auth-form__title">Criar conta</h1>
                    <p className="auth-form__subtitle">Preencha os dados para se registrar</p>

                    {error && (
                        <div className="alert alert--error">
                            <svg className="alert__icon" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="form">
                        <div className="form-group">
                            <label className="form-label">Nome de usuário</label>
                            <input
                                type="text"
                                required
                                className="input"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Senha</label>
                            <input
                                type="password"
                                required
                                className="input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="button button--primary button--block"
                        >
                            {loading ? (
                                <Loader size={20} color="#e0e7ff" />
                            ) : (
                                'Criar conta'
                            )}
                        </button>
                    </form>

                    <p className="auth-form__footer">
                        Já tem uma conta?{' '}
                        <Link to="/login" className="auth-form__link">
                            Fazer login
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;