import { LivroLista, LivroView, LivroRegistro } from '@paginas/livro';
import { Login } from '@paginas/usuario';

const rotas = [
	{ auth: false, path: '/livros', element: <LivroLista /> },
	{ auth: false, path: '/livros/:id', element: <LivroView/> },
	{ auth: true, path: '/livros/registro/:id', element: <LivroRegistro /> },
	{ auth: true, path: '/livros/registro/novo', element: <LivroRegistro /> },
	{ auth: false, path: '/login', element: <Login />}
];

export default rotas;