// Bibliotecas
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";

// Serviços
import API from "@servicos/API";

// Componentes
import BotaoLink from "@componentes/BotaoLink";

const EditoraRegistro = () => {

    const defaultValues = {
        id: '',
        nome: '',
        cnpj: ''
    };

    const endpoint = 'editora';
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();

    const { register, handleSubmit, reset, watch } = useForm({ defaultValues });

    // Carregando editora
    useEffect(() => {
        const id = params.id;
        if (!id) {
            reset({ ...defaultValues });
            return;
        }

        API.selecionar(endpoint, id)
            .then(responseEditora => {
                if (responseEditora.error === true) {
                    toast.error('Erro ao buscar editora');
                }
                if (responseEditora.ok === false && responseEditora.error === false) {
                    toast.warning('Editora não encontrada');
                    navigate('/editora/form/novo');
                }
                if (responseEditora.ok === true) {
                    reset(responseEditora.data);
                }
            })
            .catch(error => {
                console.error(error);
                toast.error('Erro ao selecionar editora');
            });
    }, [location.pathname]);

    // Deletar
    const handleDelete = async () => {
        try {
            if (!watch('id')) return;
            if (!confirm('Deseja realmente excluir esta editora?')) return;

            const id = watch('id');
            const responseDelete = await API.deletar(endpoint, id);

            // Erro
            if (responseDelete.error === true) {
                toast.error('Erro ao excluir editora');
                return;
            }

            // Sem sucesso
            if (responseDelete.ok === false && responseDelete.error === false) {
                toast.warning('Editora não encontrada');
                return;
            }

            // Sucesso
            if (responseDelete.ok === true) {
                toast.success('Editora excluída com sucesso');
                navigate('/editoras');
                return;
            }
        } catch (error) {
            console.error(error);
            toast.error('Erro ao excluir editora');
        }

    };

    const onSubmit = async (data) => {

        console.log(data);

        // Não enviando campos com valores padrão
        for (const item in data) {
            if (data[item] === defaultValues[item]) {
                delete data[item];
            }
        }

        try {
            if (data.id > 0) {
                const completeUrl = `${API.apiUrl}/${endpoint}/${data.id}`;
                const method = 'PUT';

                const responsePut = await fetch(completeUrl, API.apiOptions(method, data));
                const dataPut = await responsePut.json();

                console.log(responsePut);

                // OK
                if (responsePut.status == 200) {
                    toast.success('Editora atualizada com sucesso');
                    return;
                }

                // Erro
                if (responsePut.status === 500) {
                    toast.error('Erro ao atualizar editora');
                    return;
                }

                // Não foi atualizado
                if (![200, 500].includes(responsePut.status)) {
                    toast.error('Erro ao atualizar editora');
                    return;
                }
            } else {
                const completeUrl = `${API.apiUrl}/${endpoint}`;
                const method = 'POST';

                const responsePost = await fetch(completeUrl, API.apiOptions(method, data));
                const dataPost = await responsePost.json();

                // OK
                if (responsePost.status === 201) {
                    toast.success('Editora cadastrada com sucesso');
                    return;
                }

                // Erro
                if (responsePost.status === 500) {
                    toast.error('Erro ao cadastrar editora');
                    return;
                }

                // Não foi cadastrado
                if (![201, 500].includes(responsePost.status)) {
                    toast.warning(dataPost.mensagem);
                    return;
                }
            }
        } catch (error) {
            console.error(error);
            toast.error('Erro ao enviar dados da editora');
        }

    };

    return (
        <article className='container'>
            <h2 className="text-center">Editora</h2>
            <form method='POST' onSubmit={handleSubmit(onSubmit)} className="form container alert alert-dark">
                {/* Botões */}
                <div className="mb-3 d-flex flex-wrap justify-content-start gap-2">
                    <BotaoLink label='Novo' to='/editora/form/novo' className='btn-primary' />
                    <button type='submit' className="btn btn-success">Salvar</button>
                    <BotaoLink label='Listar' to='/editoras' className='btn-secondary' />
                    {watch('id') ? (
                        <button type='button' className="btn btn-danger" onClick={handleDelete}>Deletar</button>
                    ) : ''}
                </div>
                {/* ID */}
                <div className="mb-3">
                    <label htmlFor="id" className="form-label">ID</label>
                    <input type="number" id="id" className="form-control" {...register("id")} disabled />
                </div>
                {/* Nome */}
                <div className="mb-3">
                    <label htmlFor="nome" className="form-label">Nome</label>
                    <input type="text" id="nome" className="form-control" {...register("nome", { required: true })} />
                </div>
                {/* CNPJ */}
                <div className="mb-3">
                    <label htmlFor="cnpj" className="form-label">CNPJ</label>
                    <input type="text" id="cnpj" className="form-control" {...register("cnpj", { required: true })} />
                </div>
            </form>
            <ToastContainer position='bottom-right' />
        </article>
    )
};

export default EditoraRegistro;