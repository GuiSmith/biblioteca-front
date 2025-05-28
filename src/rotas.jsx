import { LivroLista, LivroView, LivroRegistro } from '@paginas/livro';
import { CategoriaRegistro, CategoriaLista, CategoriaView } from '@paginas/categoria';
import { Login } from '@paginas/usuario';

const rotas = [
	{ auth: true, path: '/', element: <LivroLista /> },
	{ auth: false, path: '/livros', element: <LivroLista /> },
	{ auth: false, path: '/livro/view/:id', element: <LivroView/> },
	{ auth: true, path: '/livro/form/:id', element: <LivroRegistro /> },
	{ auth: true, path: '/livro/form/novo', element: <LivroRegistro /> },
	{ auth: false, path: '/categorias', element: <CategoriaLista /> },
	{ auth: true, path: '/categoria/form/novo', element: <CategoriaRegistro /> },
	{ auth: true, path: '/categoria/form/:id', element: <CategoriaRegistro /> },
	{ auth: true, path: '/categoria/view/:id', element: <CategoriaView /> },
	{ auth: false, path: '/login', element: <Login />}
];

export default rotas;