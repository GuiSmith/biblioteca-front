import { LivroLista, LivroView, LivroRegistro } from '@paginas/livro';
import { Login } from '@paginas/usuario';

const rotas = [
	{ path: '/livros', element: <LivroLista /> },
	{ path: '/livros/:id', element: <LivroView/> },
	{ path: '/livros/registro/:id', element: <LivroRegistro /> },
	{ path: '/livros/registro/novo', element: <LivroRegistro /> },
	{ path: '/login', element: <Login />}
];

export default rotas;