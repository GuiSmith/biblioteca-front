import { NavLink } from 'react-router-dom';

const BarraDeNavegacao = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">Biblioteca</NavLink>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <NavLink
                                to="/livros"
                                className={({ isActive }) =>
                                    `nav-link ${isActive ? 'active' : ''}`
                                }
                            >
                                Livros
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/autores"
                                className={({ isActive }) =>
                                    `nav-link ${isActive ? 'active' : ''}`
                                }
                            >
                                Autores
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to='/categorias'
                                className={({ isActive }) => 
                                    `nav-link ${isActive ? 'active' : ''}`
                                }
                            >
                                Categorias
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to='/editoras'
                                className={({ isActive }) => 
                                    `nav-link ${isActive ? 'active' : ''}`
                                }
                            >
                                Editoras
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/funcionarios"
                                className={({ isActive }) =>
                                    `nav-link ${isActive ? 'active' : ''}`
                                }
                            >
                                Funcionários
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/usuarios"
                                className={({ isActive }) =>
                                    `nav-link ${isActive ? 'active' : ''}`
                                }
                            >
                                Usuários
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/multas"
                                className={({ isActive }) =>
                                    `nav-link ${isActive ? 'active' : ''}`
                                }
                            >
                                Multas
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/logs"
                                className={({ isActive }) =>
                                    `nav-link ${isActive ? 'active' : ''}`
                                }
                            >
                                Logs
                            </NavLink>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <NavLink
                                to="/login"
                                className={({ isActive }) =>
                                    `nav-link ${isActive ? 'active' : ''}`
                                }
                            >
                                Entrar
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default BarraDeNavegacao;