import { LivroLista, LivroView, LivroRegistro } from '@paginas/livro';
import { CategoriaRegistro, CategoriaLista, CategoriaView } from '@paginas/categoria';
import { Login, Logout, UsuarioLista, UsuarioView, UsuarioRegistro } from '@paginas/usuario';
import { FuncionarioLista, FuncionarioRegistro } from './paginas/funcionario';
import { EditoraLista, EditoraRegistro, EditoraView } from './paginas/editora';
import { EmprestimoRegistro } from './paginas/emprestimo';

const rotas = [
	{ auth: false, path: '/', element: <LivroLista /> },
	{ auth: false, path: '/livros', element: <LivroLista /> },
	{ auth: false, path: '/livro/view/:id', element: <LivroView/> },
	{ auth: true, path: '/livro/form/:id', element: <LivroRegistro /> },
	{ auth: true, path: '/livro/form/novo', element: <LivroRegistro /> },
	{ auth: false, path: '/categorias', element: <CategoriaLista /> },
	{ auth: true, path: '/categoria/form/novo', element: <CategoriaRegistro /> },
	{ auth: true, path: '/categoria/form/:id', element: <CategoriaRegistro /> },
	{ auth: false, path: '/categoria/view/:id', element: <CategoriaView /> },
	{ auth: false, path: '/login', element: <Login /> },
	{ auth: true, path: '/logout', element: <Logout /> },
	{ auth: true, path: '/usuarios', element: <UsuarioLista /> },
	{ auth: true, path: '/usuario/view/:id', element: <UsuarioView /> },
	{ auth: true, path: '/usuario/form/:id', element: <UsuarioRegistro /> },
	{ auth: false, path: '/usuario/form/novo', element: <UsuarioRegistro /> },
	{ auth: true, path: '/funcionarios', element: <FuncionarioLista /> },
	// { auth: true, path: '/funcionario/view/:id', element: <FuncionarioLista /> },
	{ auth: true, path: '/funcionario/form/:id', element: <FuncionarioRegistro /> },
	{ auth: true, path: '/funcionario/form/novo', element: <FuncionarioRegistro /> },
	{ auth: false, path: '/editoras', element: <EditoraLista /> },
	{ auth: false, path: '/editora/view/:id', element: <EditoraView /> },
	{ auth: true, path: '/editora/form/novo', element: <EditoraRegistro /> },
	{ auth: true, path: '/editora/form/:id', element: <EditoraRegistro /> },
	{ auth: true, path: '/emprestimo/form/:id', element: <EmprestimoRegistro />},
];

export default rotas;