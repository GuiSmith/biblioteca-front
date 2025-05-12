// Bibliotecas
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

//Serviços
import API from '@servicos/API';
import { listarAutores } from '@servicos/livroAutor';

// Componentes
import BotaoAcao from '@componentes/BotaoAcao';

// Utilitários
import { isDate, formatDate } from '@utils/formatadores';

const LivroView = () => {

	const { id } = useParams();

	if (!id) {
		toast('ID inválido ou não informado!');
	}

	const endpoint = `livro/${id}/exemplares`;

	const completeUrl = `${API.apiUrl}/${endpoint}`;

	const apiOptions = API.apiOptions('GET');

	const [livro, setLivro] = useState(null);

	const [exemplares, setExemplares] = useState([]);

	const [autores, setAutores] = useState([]);

	useEffect(() => {
		fetch(completeUrl, apiOptions)
			.then(async response => {
				const data = await response.json();

				if (response.status !== 200) {
					toast(data.mensagem);
				} else {
					setLivro((prev) => ({
						...prev,
						...data.livro
					}));
					setExemplares((prev) => data.exemplares);
				}

			})
	}, []);

	useEffect(() => {
		if (livro) {
			listarAutores(livro.id)
				.then(autoresLista => setAutores(autoresLista))
				.catch(error => {
					console.warn(`Erro ao listar autores`);
					console.error(error);
				})
		}

	}, [livro]);

	const renderTable = () => {

		const dados = {
			id: 'ID',
			condicao_fisica: 'Condição Física',
			edicao: 'Edição',
			ano: 'Ano',
			data_aquisicao: 'Data de aquisição',
			situacao: 'Situação',
			observacoes: 'Observações',
		};

		if (exemplares.length == 0) {
			return (
				<p className='text-muted'>Nenhum exemplar cadastrado</p>
			);
		}

		return (
			<table className='table table-stripped table-dark'>
				<thead>
					<tr>
						{Object.entries(dados).map(([chave, valor]) => <th key={chave}>{valor}</th>)}
					</tr>
				</thead>
				<tbody>
					{exemplares.map(exemplar => (
						<tr key={exemplar.id}>
							{Object.keys(dados).map((chave, index) => (
								<td key={index}>{isDate(exemplar[chave]) ? formatDate(exemplar[chave]) : exemplar[chave]}</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		)

	};

	return (
		<article className='container'>
			<div className='alert alert-primary text-dark p-3'>
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
						<hr />
						<BotaoAcao label='Fazer algo' className='btn-primary' onClick={() => console.table(livro)} />
					</>
				)}
			</div>
			<div>
				<h2 className='text-center'>Exemplares</h2>
				{exemplares.length == 0
					? <p className='text-muted'>Nenhum exemplar cadastrado</p> 
					: renderTable()
				}
			</div>
			<ToastContainer position='bottom-right' />
		</article>
	)
};

export default LivroView;

