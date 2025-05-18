// Bibliotecas
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';

// Serviços

const LivroRegistro = () => {

	const { register, handleSubmit } = useForm();

	const onSubmit = async (data) => {
		console.log(data);
	};

	return (
		<article>
			<h2 className='text-center'>Livro</h2>
			<form onSubmit={handleSubmit(onSubmit)} className='form container alert alert-secondary position-relative'>
				<button type='submit' className='btn btn-success'>Salvar</button>
				{/* ID */}
				<div className='mb-3'>
					<label htmlFor="id" className='form-label'>ID</label>
					<input id='id' type="number" className='form-control' {...register('id')} disabled />
				</div>
				{/* Título */}
				<div className='mb-3'>
					<label htmlFor="titulo" className='form-label'>Título</label>
					<input id='titulo' type="text" className='form-control' placeholder='Digite aqui...' {...register('titulo')} />
				</div>
				{/* Ativo */}
				<div className='mb-3 form-check form-switch'>
					<label htmlFor="ativo" className='form-check-label'>Ativo</label>
					<input type="checkbox" id='ativo' className='form-check-input' {...register('ativo')} defaultChecked={true} />
				</div>
				{/* Sinopse */}
				<div className='mb-3'>
					<label htmlFor="sinopse" className="form-label">
						Sinopse
						<i className="bi bi-info-circle ms-2 text-primary" title="Resumo breve do livro para chamar atenção do leitor." style={{cursor: 'help'}} ></i>
					</label>
					<textarea id="sinopse" className='form-control' {...register('sinopse')}></textarea>
				</div>
				{/* Enredo */}
				<div className='mb-3'>
					<label htmlFor="enredo" className='form-label'>
						Enredo
						<i className='bi bi-info-circle ms-2 text-primary' title='Descrição mais detalhada da história, incluindo os principais acontecimentos e personagens' style={{cursor: 'help'}}></i>
					</label>
					<textarea id="enredo" className='form-control' {...register('enredo')}></textarea>
				</div>
			</form>
			< ToastContainer position="bottom-right" />
		</article>
	)
};

export default LivroRegistro;