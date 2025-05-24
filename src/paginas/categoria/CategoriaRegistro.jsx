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

		if(!id){
			reset({ ...defaultValues });
			return;
		}

		API.selecionar(endpoint,id)
			.then(responseCategoria => {
				if(responseCategoria.error === true){
					toast.error('Erro ao buscar categoria');
				}

				if(responseCategoria.ok === false && responseCategoria.error === false){
					toast.warning('Categoria não encontrada');
				}

				if(responseCategoria.ok === true){
					reset(responseCategoria.data);
				}
			})
			.catch(error => {
				console.log(error);
				toast.error('Erro ao selecionar categoria');
			});

	},[location.pathname]);

	// Envio de formulário
	const onSubmit = async (data) => {
		try {
			console.log(data);
		} catch (error) {
			console.error(error);
			toast.error('Erro ao registrar categoria');
		}
	}

	return (
		<article>
			<h2 className='text-center'>Categoria</h2>
			<form method="POST" onSubmit ={handleSubmit(onSubmit)} className='form container alert alert-secondary'>
				{/* Botões */}
				<div className='mb-3 d-flex justify-content-start gap-2'>
					<BotaoLink label='Novo' to='/categoria/form/novo' className='btn-primary' />
					<button type='submit' className='btn btn-success'>Salvar</button>
					<BotaoLink label='Listar' to='/categorias' className='btn-secondary' />
					{watch('id') ? (
						<BotaoLink label='Detalhes' to={`/categoria/view/${watch('id')}`} className='btn-dark' />
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
			<ToastContainer position="bottom-right"/>
		</article>
	);

};

export default CategoriaRegistro;