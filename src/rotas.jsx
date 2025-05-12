import { LivroLista, LivroView, LivroRegistro } from '@paginas/livro';

const rotas = [
	{ path: '/livros', element: <LivroLista /> },
	{ path: '/livros/:id', element: <LivroView/> },
	{ path: '/livros/registro/:id', element: <LivroRegistro /> },
	{ path: '/livros/registro/novo', element: <LivroRegistro /> },
];

export default rotas;