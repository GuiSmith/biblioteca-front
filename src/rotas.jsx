import { LivroLista, LivroView, LivroRegistro } from '@paginas/livro';
import { CategoriaRegistro } from '@paginas/categoria';
import { Login } from '@paginas/usuario';

const rotas = [
	{ auth: false, path: '/livros', element: <LivroLista /> },
	{ auth: false, path: '/livro/view/:id', element: <LivroView/> },
	{ auth: true, path: '/livro/form/:id', element: <LivroRegistro /> },
	{ auth: true, path: '/livro/form/novo', element: <LivroRegistro /> },
	{ auth: true, path: '/categoria/form/novo', element: <CategoriaRegistro /> },
	{ auth: true, path: '/categoria/form/:id', element: <CategoriaRegistro /> },
	{ auth: false, path: '/login', element: <Login />}
];

export default rotas;