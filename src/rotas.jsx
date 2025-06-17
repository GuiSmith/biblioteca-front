import { LivroLista, LivroView, LivroRegistro } from '@paginas/livro';
import { CategoriaRegistro, CategoriaLista, CategoriaView } from '@paginas/categoria';
import { Login, Logout, UsuarioLista, UsuarioView, UsuarioRegistro } from '@paginas/usuario';
import { FuncionarioLista, FuncionarioRegistro } from './paginas/funcionario';
import { EditoraLista, EditoraRegistro, EditoraView } from './paginas/editora';
import { EmprestimoRegistro } from './paginas/emprestimo';

// Se o tipo de autenticação for vazio, todos os tipos podem acessar

const rotas = [
	{
		auth: false,
		path: '/',
		element: <LivroLista />,
		authTypes: []
	},
	{
		auth: false,
		path: '/livros',
		element: <LivroLista />,
		authTypes: []
	},
	{
		auth: false,
		path: '/livro/view/:id',
		element: <LivroView />,
		authTypes: []
	},
	{
		auth: true,
		path: '/livro/form/:id',
		element: <LivroRegistro />,
		authTypes: ['funcionario']
	},
	{
		auth: true,
		path: '/livro/form/novo',
		element: <LivroRegistro />,
		authTypes: ['funcionario']
	},
	{
		auth: false,
		path: '/categorias',
		element: <CategoriaLista />,
		authTypes: []
	},
	{
		auth: true,
		path: '/categoria/form/novo',
		element: <CategoriaRegistro />,
		authTypes: ['funcionario']
	},
	{
		auth: true,
		path: '/categoria/form/:id',
		element: <CategoriaRegistro />,
		authTypes: ['funcionario']
	},
	{
		auth: false,
		path: '/categoria/view/:id',
		element: <CategoriaView />,
		authTypes: []
	},
	{
		auth: false,
		path: '/login',
		element: <Login />,
		authTypes: []
	},
	{
		auth: true,
		path: '/logout',
		element: <Logout />,
		authTypes: []
	},
	{
		auth: true,
		path: '/usuarios',
		element: <UsuarioLista />,
		authTypes: ['funcionario']
	},
	{
		auth: true,
		path: '/usuario/view/:id',
		element: <UsuarioView />,
		authTypes: []
	},
	{
		auth: true,
		path: '/usuario/form/:id',
		element: <UsuarioRegistro />,
		authTypes: []
	},
	{
		auth: false,
		path: '/usuario/form/novo',
		element: <UsuarioRegistro />,
		authTypes: []
	},
	{
		auth: true,
		path: '/funcionarios',
		element: <FuncionarioLista />,
		authTypes: ['funcionario']
	},
	// {
	// 	auth: true,
	// 	path: '/funcionario/view/:id',
	// 	element: <FuncionarioLista />,
	// 	authTypes: ['funcionario']
	// },
	{
		auth: true,
		path: '/funcionario/form/:id',
		element: <FuncionarioRegistro />,
		authTypes: ['funcionario']
	},
	{
		auth: true,
		path: '/funcionario/form/novo',
		element: <FuncionarioRegistro />,
		authTypes: ['funcionario']
	},
	{
		auth: false,
		path: '/editoras',
		element: <EditoraLista />,
		authTypes: []
	},
	{
		auth: false,
		path: '/editora/view/:id',
		element: <EditoraView />,
		authTypes: []
	},
	{
		auth: true,
		path: '/editora/form/novo',
		element: <EditoraRegistro />,
		authTypes: ['funcionario']
	},
	{
		auth: true,
		path: '/editora/form/:id',
		element: <EditoraRegistro />,
		authTypes: ['funcionario']
	},
	{
		auth: true,
		path: '/emprestimo/form/:id',
		element: <EmprestimoRegistro />,
		authTypes: []
	}
];

export default rotas;