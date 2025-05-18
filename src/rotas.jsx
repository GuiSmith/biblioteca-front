import { LivroLista, LivroView, LivroRegistro } from '@paginas/livro';
import { Login } from '@paginas/usuario';

const rotas = [
	{ auth: false, path: '/livros', element: <LivroLista /> },
	{ auth: false, path: '/livro/view/:id', element: <LivroView/> },
	{ auth: true, path: '/livro/form/:id', element: <LivroRegistro /> },
	{ auth: true, path: '/livro/form/novo', element: <LivroRegistro /> },
	{ auth: false, path: '/login', element: <Login />}
];

export default rotas;