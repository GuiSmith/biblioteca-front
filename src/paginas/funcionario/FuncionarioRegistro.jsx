// Bibliotecas

import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";

// Serviços
import API from "@servicos/API";

// Componentes
import BotaoLink from "@componentes/BotaoLink";

const FuncionarioRegistro = () => {
    
    const defaultValues = {
        id: '',
        ativo: true,
        nome: '',
        cpf: '',
        email: '',
        senha: ''
    };

    const endpoint = 'funcionario';
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();

    const { register, handleSubmit, reset, watch } = useForm({ defaultValues });

    // Carregando funcionário
    useEffect(() => {
        const id = params.id;
        if (!id) {
            reset({ ...defaultValues });
            return;
        }

        API.selecionar(endpoint, id)
            .then(responseFuncionario => {
                if (responseFuncionario.error === true) {
                    toast.error('Erro ao buscar funcionário');
                }
                if (responseFuncionario.ok === false && responseFuncionario.error === false) {
                    toast.warning('Funcionário não encontrado');
                    navigate('/funcionario/form/novo');
                }
                if (responseFuncionario.ok === true) {
                    reset(responseFuncionario.data);
                }
            })
            .catch(error => {
                console.error(error);
                toast.error('Erro ao selecionar funcionário');
            });
    }, [location.pathname]);

    const onSubmit = async (data) => {
        // Não enviando campos com valores padrão
        for (const item in data) {
            if (data[item] === defaultValues[item]) {
                delete data[item];
            }
        }

        try {
            if(data.id > 0){
                const completeUrl = `${API.apiUrl}/${endpoint}/${data.id}`;
                const method = 'PUT';

                const responsePut = await fetch(completeUrl, API.apiOptions(method, data));
                const dataPut = await responsePut.json();

                // OK
                if(responsePut.status === 200){
                    toast.success('Funcionário atualizado com sucesso');
                    return;
                }

                // Erro
                if(responsePut.status === 500){
                    toast.error('Erro ao atualizar funcionário');
                    return;
                }

                // Não foi atualizado
                if(![500,200].includes(responsePut.status)){
                    toast.warning(dataPut.mensagem);
                    return;
                }
            }else{
                const completeUrl = `${API.apiUrl}/${endpoint}`;
                const method = 'POST';

                const responsePost = await fetch(completeUrl, API.apiOptions(method, data));
                const dataPost = await responsePost.json();

                // OK
                if(responsePost.status === 201){
                    toast.success('Funcionário cadastrado com sucesso');
                    return;
                }

                // Erro
                if(responsePost.status === 500){
                    toast.error('Erro ao cadastrar funcionário');
                    return;
                }

                // Não foi cadastrado
                if(![500,201].includes(responsePost.status)){
                    toast.warning(dataPost.mensagem);
                    console.log(dataPost);
                    return;
                }
            }
        } catch (error) {
            console.error(error);
            toast.error('Erro ao enviar dados do funcionário');            
        }
    };

    return (
        <div className="container">
            <h2 className='text-center'>Funcionário</h2>
            <form method = 'POST' onSubmit={handleSubmit(onSubmit)} className='form container alert alert-dark'>
                {/* Botões */}
                <div className="mb-3 d-flex justify-content-start gap-2">
                    <BotaoLink label='Novo' to='/funcionario/form/novo' className='btn-primary' />
                    <button type='submit' className='btn btn-success'>Salvar</button>
                    <BotaoLink label='Listar' to='/funcionarios' className='btn-secondary' />
                    {/* <BotaoLink label='Detalhes' to={`/funcionario/view/${watch('id')}`} className='btn-dark' /> */}
                </div>
                {/* ID */}
                <div className="mb-3">
                    <label htmlFor="id" className="form-label">ID</label>
                    <input type="text" className="form-control" id="id" {...register("id")} disabled />
                </div>
                {/* Ativo */}
                <div className="mb-3 form-check form-switch">
                    <label htmlFor="ativo" className='form-check-label'>Ativo</label>
                    <input type="checkbox" id='ativo' className='form-check-input' {...register('ativo')} defaultChecked={true} />
                </div>
                {/* Nome */}
                <div className="mb-3">
                    <label htmlFor="nome" className="form-label">Nome</label>
                    <input type="text" className="form-control" id="nome" {...register("nome", { required: true })} />
                </div>
                {/* E-mail */}
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" {...register("email", { required: true })} />
                </div>
                {/* Senha */}
                <div className="mb-3">
                    <label htmlFor="senha" className="form-label">Senha</label>
                    <input type="password" className="form-control" id="senha" {...register("senha", { required: true })} />
                </div>
                {/* CPF */}
                <div className="mb-3">
                    <label htmlFor="cpf" className="form-label">CPF</label>
                    <input type="text" className="form-control" id="cpf" {...register("cpf")} />
                </div>
            </form>
            <ToastContainer position = "bottom-right" />
        </div>
    );
};

export default FuncionarioRegistro;