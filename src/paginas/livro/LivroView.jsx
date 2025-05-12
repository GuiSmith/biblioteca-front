// Bibliotecas
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

//Serviços
import API from '@servicos/API';
import { listarAutores } from '@servicos/livro_autor';

// Componentes
import BotaoAcao from '@componentes/BotaoAcao';

const LivroView = () => {

	const { id } = useParams();

	if(!id){
		toast('ID inválido ou não informado!');
	}

	const endpoint = `livro/${id}/exemplares`;

	const completeUrl = `${API.apiUrl}/${endpoint}`;

	const apiOptions = API.apiOptions('GET');

	const [livro,setLivro] = useState(null);

	const [exemplares,setExemplares] = useState([]);

	const [autores,setAutores] = useState([]);

	useEffect(() => {
		fetch(completeUrl,apiOptions)
			.then(async response => {
				const data = await response.json();

				if(response.status !== 200){
					toast(data.mensagem);
				}else{
					setLivro((prev) => ({
						...prev,
						...data.livro
					}));
					setExemplares((prev) => data.exemplares);
				}

			})
	},[]);

	useEffect(() => {
		if(livro){
			listarAutores(livro.id)
				.then(autoresLista => setAutores(autoresLista))
				.catch(error => {
					console.warn(`Erro ao listar autores`);
					console.error(error);
				})
		}

	},[livro]);

	useEffect(() => {
		if(autores){
			// console.log(autores);
		}
	},[autores]);

	return (
		<article className='alert alert-primary p-3 container'>
			{!livro ? (
				<p>Carregando...</p>
			) : (
				<>
					<h2>{livro.titulo || 'Titulo'}</h2>
					<p>Sinopse: {livro.sinopse || 'sinopse'}</p>
					<p>Enredo: {livro.enredo}</p>
					<p>
						Autores: {
							autores.length > 0
							? autores.reduce((acc, autor, index) => acc + (index > 0 ? ', ' : '') + autor.nome, '')
							: ''
						}
					</p>
					<hr/>
					<BotaoAcao label='Fazer algo' className='btn-primary' onClick = {() => console.table(livro)} />
				</>
			)}
		</article>
	)
};

export default LivroView; 

