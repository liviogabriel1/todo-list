import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../api';
import { motion } from 'framer-motion';
import Loader from 'react-spinners/ClipLoader';
import Illustration from './Illustration';

const Login = ({ setToken }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const { token } = await loginUser({ username: email, password });
            localStorage.setItem('token', token);
            setToken(token);
            navigate('/');
        } catch (err) {
            setError('E-mail ou senha incorretos');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page fade-in">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="auth-container"
            >
                <div className="auth-illustration">
                    <Illustration />
                    <h2 className="auth-illustration__title">Organize suas tarefas de forma simples</h2>
                    <p className="auth-illustration__text">
                        Gerencie suas atividades diárias com facilidade e eficiência.
                    </p>
                </div>

                <div className="auth-form">
                    <h1 className="auth-form__title">Bem-vindo</h1>
                    <p className="auth-form__subtitle">Faça login para continuar</p>

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
                            <label className="form-label">E-mail</label>
                            <input
                                type="email"
                                required
                                className="input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                                'Entrar na minha conta'
                            )}
                        </button>
                    </form>

                    <p className="auth-form__footer">
                        Não tem conta?{' '}
                        <Link to="/register" className="auth-form__link">
                            Criar conta
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;