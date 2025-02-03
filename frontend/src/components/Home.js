import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiArrowRight, FiCheck, FiTrendingUp, FiUsers, FiZap } from 'react-icons/fi';

const Home = () => {
    // Corrigindo o uso dos hooks
    const controls = useAnimation();
    const [ref, inView] = useInView();

    useEffect(() => {
        if (inView) {
            controls.start('visible');
        }
    }, [controls, inView]);

    const features = [
        {
            icon: <FiCheck />,
            title: "Simplicidade",
            description: "Interface intuitiva e fácil de usar."
        },
        {
            icon: <FiTrendingUp />,
            title: "Produtividade",
            description: "Aumente sua eficiência com ferramentas inteligentes."
        },
        {
            icon: <FiUsers />,
            title: "Colaboração",
            description: "Trabalhe em equipe de forma eficiente."
        },
        {
            icon: <FiZap />,
            title: "Velocidade",
            description: "Interface rápida e responsiva."
        }
    ];


    return (
        <div className="home">
            {/* Seção Hero */}
            <section className="hero-section">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="hero-title">
                            Transforme sua <span className="highlight">produtividade</span>
                        </h1>
                        <p className="hero-text">
                            O TaskFlow é a ferramenta definitiva para gerenciamento de tarefas.
                            Simplifique sua rotina e aumente sua eficiência.
                        </p>
                        <div className="hero-actions">
                            <Link to="/register" className="button button--primary button--glow">
                                Comece agora <FiArrowRight className="icon" />
                            </Link>
                            <Link to="/login" className="button button--outline">
                                Já tenho uma conta
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="hero-illustration"
                    >
                        <div className="dashboard-mockup">
                            {[...Array(4)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="mockup-card"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 + i * 0.1 }}
                                >
                                    <div className="task-header">
                                        <div className="task-status"></div>
                                        <h3>Tarefa {i + 1}</h3>
                                    </div>
                                    <div className="task-progress">
                                        <div
                                            className="progress-bar"
                                            style={{ width: `${(i + 1) * 25}%` }}
                                        ></div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Seção de Recursos */}
            <section className="features-section" ref={ref}>
                <div className="container">
                    <motion.h2
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 }
                        }}
                        className="section-title"
                    >
                        Por que escolher o TaskFlow?
                    </motion.h2>

                    <div className="features-grid">
                        {features.map((feature, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={controls}
                                transition={{ delay: 0.2 + i * 0.1 }}
                                className="feature-card glass"
                            >
                                <div className="feature-icon">
                                    {feature.icon}
                                </div>
                                <h3>{feature.title}</h3>
                                <p>{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="cta-section">
                <div className="container">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="cta-title"
                    >
                        Pronto para transformar sua produtividade?
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <Link to="/register" className="button button--primary button--lg button--glow">
                            Comece agora gratuitamente
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Home;