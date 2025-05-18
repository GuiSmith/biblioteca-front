// Bibliotecas
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Serviços
import API from '@servicos/API';
import { listarCategorias } from '@servicos/categoria';
import { selecionarLivro, deletarLivro } from '@servicos/livro';

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

	const { register, handleSubmit, reset, watch } = useForm({ ...defaultValues });
	const { id } = useParams();

	const [categorias, setCategorias] = useState([]);

	// Carregando registros
	useEffect(() => {
		// Listando categorias
		listarCategorias()
			.then(categorias => setCategorias(categorias))
			.catch(error => {
				console.debug(error);
				toast.error('Erro ao listar categorias. Contate o suporte!');
			});
		// Selecionando livro
		if (id) {
			selecionarLivro(id)
				.then(livro => Object.keys(livro).length > 0 ? reset(livro) : toast.warning('Livro não encontrado!'))
				.catch(error => {
					console.log(error);
					toast.error('Erro ao selecionar livro');
				})
		} else {
			reset({ ...defaultValues });
		}
	}, [id]);

	const onSubmit = async (data) => {
		try {
			// Testando se o registro deve ser criado ou atualizado
			if (data.id > 0) {
				// Atualizar registro
				const completeUrl = `${API.apiUrl}/${endpoint}/${id}`;
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
				} else {
					toast.warning(dataPost.mensagem);
				}
			}
		} catch (error) {
			console.debug(error);
			toast.error('Erro ao registrar livro');
		}
	};

	const onDelete = async () => {
		if(!id) return;

		const responseDelete = await deletarLivro(id);

		if(responseDelete.ok == true){
			navigate('/livros');
		}else{
			if(responseDelete.error){
				toast.error(responseDelete.mensagem);
			}else{
				toast.warning(responseDelete.mensagem);
			}
		}
	};

	return (
		<article>
			<h2 className='text-center'>Livro</h2>
			<form method='POST' onSubmit={handleSubmit(onSubmit)} className='form container alert alert-secondary position-relative'>
				{/* Botões */}
				<div className='mb-3 d-flex justify-content-start gap-2'>
					<BotaoLink label='Novo' to='/livro/form/novo' className='btn-primary' />
					<button type='submit' className='btn btn-success'>Salvar</button>
					<BotaoLink label='Detalhes' to={`/livro/view/${watch('id')}`} className={`btn-dark ${watch('id') ? '' : 'disabled'}`} />
					<button type='button' className={`btn btn-danger ${watch('id') ? '' : 'disabled'}`} onClick={(onDelete)}>Deletar</button>
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
			</form>
			< ToastContainer position="bottom-right" />
		</article>
	)
};

export default LivroRegistro;