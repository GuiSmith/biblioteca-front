import { NavLink } from 'react-router-dom';

// Contextos
import { useAuth } from '@contextos/AuthContexto';

const BarraDeNavegacao = () => {

    const { isAuthenticated, contextAuthType } = useAuth();

    const links = [
        {
            auth: false,
            to: '/livros',
            text: 'Livros'
        },
        {
            auth: false,
            to: '/autores',
            text: 'Autores'
        },
        {
            auth: false,
            to: '/categorias',
            text: 'Categorias'
        },
        {
            auth: false,
            to: '/editoras',
            text: 'Editoras'
        },
        {
            auth: true,
            to: '/funcionarios',
            text: 'Funcionários'
        },
        {
            auth: true,
            to: '/usuarios',
            text: 'Usuários'
        },
        {
            auth: true,
            to: '/multas',
            text: 'Multas'
        },
        {
            auth: true,
            to: '/logs',
            text: 'Logs'
        }
    ];

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
                        {links.map((link, index) => (!link.auth || (link.auth && isAuthenticated && contextAuthType == 'funcionario')) ? <NavLink key={index} to={link.to} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>{link.text}</NavLink> : '')}
                    </ul>
                    <ul className="navbar-nav ms-auto">
                        {!isAuthenticated ?
                            <li className="nav-item">
                                <NavLink to="/login" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} >
                                    Entrar
                                </NavLink>
                            </li>
                            :
                            <li className='nav-item'>
                                <NavLink to='/logout' className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>
                                    Sair
                                </NavLink>
                            </li>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default BarraDeNavegacao;