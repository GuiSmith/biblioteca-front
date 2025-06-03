// Bibliotecas
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

// Serviços
import API from '@servicos/API';

// Componentes
import BotaoLink from '@componentes/BotaoLink';

const CategoriaRegistro = () => {

	const defaultValues = {
		id: '',
		nome: '',
		descricao: ''
	};

	const endpoint = 'categoria';
	const navigate = useNavigate();
	const location = useLocation();
	const params = useParams();

	const { register, handleSubmit, reset, watch } = useForm({ ...defaultValues });

	// Carregando categoria
	useEffect(() => {
		const id = params.id;

		if (!id) {
			reset({ ...defaultValues });
			return;
		}

		API.selecionar(endpoint, id)
			.then(responseCategoria => {
				if (responseCategoria.error === true) {
					toast.error('Erro ao buscar categoria');
				}

				if (responseCategoria.ok === false && responseCategoria.error === false) {
					toast.warning('Categoria não encontrada');
					navigate('/categoria/form/novo');
				}

				if (responseCategoria.ok === true) {
					reset(responseCategoria.data);
				}
			})
			.catch(error => {
				console.log(error);
				toast.error('Erro ao selecionar categoria');
			});

	}, [location.pathname]);

	const handleDelete = async () => {
		try {
			if (!watch('id')) return;

			if(!confirm("Deseja mesmo excluir este registro?")){
                return;
            }

			const id = watch('id');
			const responseDelete = await API.deletar(endpoint, id);

			//Erro
			if (responseDelete.error) {
				throw new Error(responseDelete.mensagem);	
			}

			// Sem sucesso
			if(!responseDelete.error && !responseDelete.ok){
				toast.warning(responseDelete.mensagem);
				return;
			}

			// OK
			if(responseDelete.ok){
				toast.success('Categoria deletada com sucesso!');
				navigate('/categorias');
			}

		} catch (error) {
			console.error(error);
			toast.error('Erro ao deletar categoria');
		}
	}

	// Envio de formulário
	const onSubmit = async (data) => {
		try {
			console.log(data);
			console.log();

			if (data.id > 0) {
				const completeUrl = `${API.apiUrl}/${endpoint}/${data.id}`;
				const method = 'PUT';

				const responsePut = await fetch(completeUrl, API.apiOptions(method, data));
				const dataPut = await responsePut.json();

				if (responsePut.status == 200) {
					toast.success('Categoria atualizada!');
					return;
				}

				if (responsePut.status == 500) {
					toast.error('Erro ao atualizar categoria, contate o suporte');
					return;
				}

				if (![200, 500].includes(responsePut.status)) {
					toast.warning(dataPut.mensagem);
					return;
				}
			} else {
				const completeUrl = `${API.apiUrl}/${endpoint}`;
				const method = 'POST';

				const responsePost = await fetch(completeUrl, API.apiOptions(method, data));
				const dataPost = await responsePost.json();

				if (responsePost.status == 201) {
					toast.success('Categoria criada!');
					navigate(`/categoria/view/${dataPost.id}`);
					return;
				}

				if (responsePost.status == 500) {
					toast.error('Erro ao criar categoria, contate o suporte');
					return;
				}

				if (![201, 500].includes(responsePost.status)) {
					toast.warning(dataPost.mensagem);
					return;
				}
			}
		} catch (error) {
			console.error(error);
			toast.error('Erro ao registrar categoria');
		}
	}

	return (
		<article>
			<h2 className='text-center'>Categoria</h2>
			<form method="POST" onSubmit={handleSubmit(onSubmit)} className='form container alert alert-secondary'>
				{/* Botões */}
				<div className='mb-3 d-flex justify-content-start gap-2'>
					<BotaoLink label='Novo' to='/categoria/form/novo' className='btn-primary' />
					<button type='submit' className='btn btn-success'>Salvar</button>
					<BotaoLink label='Listar' to='/categorias' className='btn-secondary' />
					{watch('id') ? (
						<BotaoLink label='Detalhes' to={`/categoria/view/${watch('id')}`} className='btn-dark' />
					) : ''}
					{watch('id') ? (
						<button type="button" className='btn btn-danger' onClick={handleDelete}>Deletar</button>
					) : ''}
				</div>
				{/* ID */}
				<div className='mb-3'>
					<label htmlFor="id" className='form-label'>ID</label>
					<input id='id' type="number" className='form-control' {...register('id')} disabled />
				</div>
				{/* Nome */}
				<div className='mb-3'>
					<label htmlFor="nome" className='form-label'>Nome</label>
					<input id='nome' type="text" className='form-control' {...register('nome', { required: true })} />
				</div>
				{/* Descrição */}
				<div className='mb-3'>
					<label htmlFor="descricao" className='form-label'>Descrição</label>
					<textarea id='descricao' className='form-control' {...register('descricao', { required: true })} />
				</div>
			</form>
			<ToastContainer position="bottom-right" />
		</article>
	);

};

export default CategoriaRegistro;