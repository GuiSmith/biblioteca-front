// Bibliotecas
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import debounce from 'lodash.debounce';

// Serviços
import API from '@servicos/API';
import { inserirLivroAutor, excluirlivroAutor } from '@servicos/livroAutor';

// Componentes
import BotaoLink from '@componentes/BotaoLink';

const LivroRegistro = () => {

	const defaultValues = {
		id: '',
		ativo: true,
		titulo: '',
		id_categoria: '',
		sinopse: '',
		enredo: ''
	};

	const endpoint = `livro`;
	const navigate = useNavigate();
	const location = useLocation();
	const params = useParams();

	const { register, handleSubmit, reset, watch } = useForm({ ...defaultValues });
	const [categorias, setCategorias] = useState([]);
	const [autores, setAutores] = useState([]);
	const [novosAutores, setNovosAutores] = useState([]);
	const [autoresPesquisados, setAutoresPesquisados] = useState([]);
	const [mostrarDropdown, setMostrarDropdown] = useState(false);

	useEffect(() => {
		reset({ id: params.id });
	}, [location.pathname]);

	// Listando categorias
	useEffect(() => {
		// Listando categorias
		API.listar('categoria')
			.then(responseCategoria => {
				if (responseCategoria.error === true) {
					toast.error('Erro ao listar categorias, contate o suporte');
				}

				if (responseCategoria.error === false && responseCategoria.ok == false) {
					toast.warning('Nenhuma categoria cadastrada!');
				}

				if (responseCategoria.ok === true) {
					setCategorias(responseCategoria.array);
				}
			})
			.catch(error => {
				console.debug(error);
				toast.error('Erro ao listar categorias. Contate o suporte!');
			});
	}, []);

	// Selecionando livro e autores
	useEffect(() => {
		if (!watch('id')) {
			reset({ ...defaultValues });
			setNovosAutores([]);
			setAutores([]);
			return;
		}

		API.selecionar('livro', watch('id'))
			.then(responseLivro => {
				if (responseLivro.error === true) {
					toast.error('Erro ao buscar livro');
				}

				if (responseLivro.ok === false && responseLivro.error === false) {
					toast.warning('Livro não encontrado!');
				}

				if (responseLivro.ok === true) {
					reset(responseLivro.data);
				}
			})
			.catch(error => {
				console.log(error);
				toast.error('Erro ao selecionar livro');
			});
	}, [watch('id')]);

	const onDelete = async () => {
		try {
			if (!watch('id')) return;

			const livroId = watch('id');

			const responseDelete = await API.deletar('livro', livroId);

			if (responseDelete.ok) {
				navigate('/livros');
			}

			if (responseDelete.error) {
				toast.error('Erro ao deletar livro!');
			}

			if (responseDelete.error === false && responseDelete.ok === false) {
				toast.warning(responseDelete.mensagem);
			}
		} catch (error) {
			console.log(error);
			toast.error('Erro ao deletar livro!');
		}

	};

	// Retirar autor da lista
	const removerAutor = (novoAutor) => {
		setNovosAutores(novosAutores.filter(autor => autor.id !== novoAutor.id));
	};

	// Adicionar autor na lista
	const adicionarAutor = (novoAutor) => {

		const jaExiste = novosAutores.some(autor => autor.id == novoAutor.id);

		if (!jaExiste) {
			setNovosAutores(prev => [...prev, novoAutor]);
		}

		setMostrarDropdown(false);
		setAutoresPesquisados([]);
	}

	// Pesquisa autor na API, literalmente
	const debouncedBuscarAutores = useRef(
		debounce(async (termo) => {
			if (!termo || termo.length < 2) return;

			const tabela = 'autor';
			const filtros = { nome: { op: 'like', valor: termo } };

			try {
				const dados = await API.search(tabela, filtros);

				if (dados.error === true) {
					toast.error('Erro ao buscar autores');
				}

				if (dados.ok === false && dados.error === false) {
					toast.warning('Nenhum autor encontrado');
				}

				if (dados.ok === true) {
					setAutoresPesquisados(dados.array);
				}
			} catch (error) {
				console.error('Erro ao buscar autores', error);
				toast.error('Erro ao buscar autores');
			}
		}, 500)
	).current;

	// Ao digitar no campo de busca de autor
	const onAutorChange = (e) => {
		const termo = e.target.value;
		debouncedBuscarAutores(termo);
	};

	const onSubmit = async (data) => {
		// Livro
		try {
			// Testando se o registro deve ser criado ou atualizado
			if (data.id > 0) {
				// Atualizar registro
				const completeUrl = `${API.apiUrl}/${endpoint}/${data.id}`;
				const method = 'PUT';

				const responsePut = await fetch(completeUrl, API.apiOptions(method, data));
				const dataPut = await responsePut.json();

				if (responsePut.status == 200) {
					toast.success('Livro atualizado!');
				} else {
					toast.warning(dataPut.mensagem);
				}
			} else {
				// Criar registro
				const completeUrl = `${API.apiUrl}/${endpoint}`;
				const method = 'POST';

				const responsePost = await fetch(completeUrl, API.apiOptions(method, data));
				const dataPost = await responsePost.json();

				if (responsePost.status == 201) {
					toast.success('Livro cadastrado!');
					navigate(`/livro/form/${dataPost.id}`);
				} else {
					toast.warning(dataPost.mensagem);
				}
			}

		} catch (error) {
			console.debug(error);
			toast.error('Erro ao registrar livro');
		}

		// Autores
		try {
			// Cadastrando autores
			if (!watch('id')) return;

			const autoresRemovidos = autores.filter(autor => !novosAutores.some(novoAutor => novoAutor.id === autor.id));
			const autoresAdicionados = novosAutores.filter(novoAutor => !autores.some(autor => autor.id === novoAutor.id));

			// Adicionando autores
			autoresAdicionados.forEach(async autorAdicionado => {
				const autorAdicionadoResponse = await inserirLivroAutor({ id_livro: watch('id'), id_autor: autorAdicionado.id });

				if (autorAdicionadoResponse.ok === true) return;

				if (autorAdicionadoResponse.error === true) {
					toast.error(`Erro ao inserir ${autorAdicionado.nome}`);
					return;
				}

				if (autorAdicionadoResponse.ok === false && autorAdicionadoResponse.error === false) {
					toast.warning(autorAdicionadoResponse.mensagem);
					return;
				}
			});

			// Removendo autores
			autoresRemovidos.forEach(async autorRemovido => {
				const autorRemovidoResponse = await excluirlivroAutor({ id_livro: watch('id'), id_autor: autorRemovido.id });

				if (autorRemovidoResponse.ok === true) return;

				if (autorRemovidoResponse.error === true) {
					toast.error(`Erro ao remover ${autorRemovido.nome}`);
					return;
				}

				if (autorRemovidoResponse.ok === false && autorRemovidoResponse.error === false) {
					toast.warning(autorRemovido.mensagem);
					return;
				}
			});
		} catch (error) {
			console.error('Erro ao editar autores', error);
			toast.error('Erro ao gerenciar autores');
		}
	};

	return (
		<article>
			<h2 className='text-center'>Livro</h2>
			<form method='POST' onSubmit={handleSubmit(onSubmit)} className='form container alert alert-secondary position-relative'>
				{/* Botões */}
				<div className='mb-3 d-flex justify-content-start gap-2'>
					{/* Novo */}
					{/* <button type='button' className='btn btn-primary' onClick={handleClickNovo} >Novo</button> */}
					<BotaoLink label='Novo' to='/livro/form/novo' className='btn-primary' />
					{/* Salvar */}
					<button type='submit' className='btn btn-success'>Salvar</button>
					{/* Listar */}
					<BotaoLink label='Listar' to='/livros' className='btn-secondary' />
					{/* Detalhes */}
					{watch('id') ? (
						<BotaoLink label='Detalhes' to={`/livro/view/${watch('id')}`} className='btn-dark' />
					) : ''}
					{/* Deletar */}
					{watch('id') ? (
						<button type='button' className='btn btn-danger' onClick={(onDelete)}>Deletar</button>
					) : ''}
				</div>
				{/* ID */}
				<div className='mb-3'>
					<label htmlFor="id" className='form-label'>ID</label>
					<input id='id' type="number" className='form-control' {...register('id')} disabled />
				</div>
				{/* Ativo */}
				<div className='mb-3 form-check form-switch'>
					<label htmlFor="ativo" className='form-check-label'>Ativo</label>
					<input type="checkbox" id='ativo' className='form-check-input' {...register('ativo')} defaultChecked={true} />
				</div>
				{/* Título */}
				<div className='mb-3'>
					<label htmlFor="titulo" className='form-label'>
						Título
						<span className='text-danger ms-1'>*</span>
					</label>
					<input id='titulo' type="text" className='form-control' placeholder='Digite aqui...' {...register('titulo')} required />
				</div>
				{/* Categoria */}
				<div className='mb-3'>
					<label htmlFor="id_categoria" className='form-label'>
						Categoria
						<span className='text-danger ms-1'>*</span>
					</label>
					<select id="id_categoria" className='form-control' {...register('id_categoria')} value={watch('id_categoria')}>
						<option value=''>Selecione uma categoria...</option>
						{categorias.length > 0
							? categorias.map(categoria => (
								<option key={categoria.id} value={categoria.id} >{categoria.nome}</option>
							))
							: ''
						}
					</select>
				</div>
				{/* Sinopse */}
				<div className='mb-3'>
					<label htmlFor="sinopse" className="form-label">
						Sinopse
						<i className="bi bi-info-circle ms-2 text-primary" title="Resumo breve do livro para chamar atenção do leitor." ></i>
					</label>
					<textarea id="sinopse" className='form-control' {...register('sinopse')}></textarea>
				</div>
				{/* Enredo */}
				<div className='mb-3'>
					<label htmlFor="enredo" className='form-label'>
						Enredo
						<i className='bi bi-info-circle ms-2 text-primary' title='Descrição mais detalhada da história, incluindo os principais acontecimentos e personagens' ></i>
					</label>
					<textarea id="enredo" className='form-control' {...register('enredo')}></textarea>
				</div>
				{/* Lista de autores */}
				<div className='mb-3'>
					<label className='form-label'>Autores</label>
					<div className='d-flex flex-wrap justify-content-start gap-2'>
						{novosAutores.map(autor => (
							<button key={autor.id} id={autor.id} type='button' className='btn btn-dark' onClick={() => removerAutor(autor)} >
								{`${autor.id} | ${autor.nome}`}
								<span className='bi bi-x ms-2 text-info'></span>
							</button>
						))}
					</div>
				</div>
				{/* Buscar autor */}
				<div className='mb-3 position-relative'>
					<label htmlFor="autores" className='form-label'>Buscar autor</label>
					<input type="text" className='form-control' id='autores' placeholder='Pesquise autores aqui...' onChange={onAutorChange} onFocus={() => setMostrarDropdown(true)} />
					{mostrarDropdown && autoresPesquisados.length > 0 && (
						<ul className='list-group position-absolute w-100 z-3' style={{ maxHeight: '200px', overFlowY: 'auto' }}>
							{autoresPesquisados.map(autor => (
								<li key={autor.id} className='list-group-item list-group-item-action' onClick={() => adicionarAutor(autor)} style={{ cursor: 'pointer' }}>
									{autor.nome}
								</li>
							))}
						</ul>
					)}
				</div>
			</form>
			< ToastContainer position="bottom-right" />
		</article>
	)
};

export default LivroRegistro;