// Bibliotecas
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

// Serviços
import API from '@servicos/API';

// Componentes
import BotaoLink from '@componentes/BotaoLink';
import CampoRegistro from '@ui/CampoRegistro';

const EmprestimoRegistro = () => {
    const defaultValues = {
        id: '',
        data_emprestimo: '',
        data_prevista_devolucao: '',
        data_devolucao: '',
        observacoes: '',
        id_usuario: '',
        id_reserva: '',
        id_exemplar: '',
        status: '',
    };

    const endpoint = 'emprestimo';
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();

    const [usuario,setUsuario] = useState(undefined);
    const [exemplar,setExemplar] = useState(undefined);
    const [reserva,setReserva] = useState();

    const { register, handleSubmit, reset, watch } = useForm({ ...defaultValues });

    // Carregando empréstimo
    useEffect(() => {
        const id = params.id;

        if (!id) {
            reset({ ...defaultValues });
            return;
        }

        API.selecionar(endpoint, id)
            .then(responseEmprestimo => {
                if (responseEmprestimo.error === true) {
                    toast.error('Erro ao buscar empréstimo');
                }

                if (responseEmprestimo.ok === false && responseEmprestimo.error === false) {
                    toast.warning('Empréstimo não encontrado');
                    navigate('/emprestimo/form/novo');
                }

                if (responseEmprestimo.ok === true) {
                    reset(responseEmprestimo.data);
                }
            })
            .catch(error => {
                console.log(error);
                toast.error('Erro ao selecionar empréstimo');
            });

    }, [location.pathname]);

    const handleDelete = async () => {
        try {
            if (!watch('id')) return;

            if (!confirm("Deseja mesmo excluir este registro?")) {
                return;
            }

            const id = watch('id');
            const response = await API.excluir(endpoint, id);

            if (response.error === true) {
                toast.error('Erro ao excluir empréstimo');
                return;
            }

            if (response.ok === false && response.error === false) {
                toast.warning('Empréstimo não encontrado');
                return;
            }

            toast.success('Empréstimo excluído com sucesso');
            navigate('/emprestimos');
        } catch (error) {
            console.log(error);
            toast.error('Erro ao excluir empréstimo');
        }
    }

    // Carregando usuário
    useEffect(() => {
        if(!watch('id_usuario')) return;

        API.selecionar('usuario', watch('id_usuario'))
            .then(res => {
                if(res.ok){
                    setUsuario(res.data);
                    return;
                }
                if(res.error){
                    toast.error('Erro ao buscar usuário');
                    setUsuario(undefined);
                    return;
                }
                if(!res.ok && !res.error){
                    toast.warning(res.mensagem);
                    setUsuario(undefined);
                    return;
                }
            })
            .catch(error => {
                toast.error('Erro ao buscar usuário');
                console.error('Erro ao buscar usuário',error);
            });
    },[watch('id_usuario')]);

    const onSubmit = async (data) => {
        console.log(data);
    };

    return (
        <article>
            <h2 className='text-center'>Empréstimo</h2>
            <form method="POST" onSubmit={handleSubmit(onSubmit)} className='form container alert alert-secondary'>
                {/* Botões */}
                <div className='mb-3 d-flex justify-content-start gap-2'>

                </div>
                {/* ID */}
                <div className='mb-3'>
                    <label htmlFor='id' className='form-label'>ID</label>
                    <input type='text' className='form-control' id='id' {...register('id')} disabled />
                </div>
                {/* Data de Empréstimo */}
                <div className='mb-3'>
                    <label htmlFor='data_emprestimo' className='form-label'>Data de Empréstimo</label>
                    <input type='date' className='form-control' id='data_emprestimo' {...register('data_emprestimo')} />
                </div>
                {/* Data Prevista de Devolução */}
                <div className='mb-3'>
                    <label htmlFor='data_prevista_devolucao' className='form-label'>Data Prevista de Devolução</label>
                    <input type='date' className='form-control' id='data_prevista_devolucao' {...register('data_prevista_devolucao')} />
                </div>
                {/* Data de Devolução */}
                <div className='mb-3'>
                    <label htmlFor='data_devolucao' className='form-label'>Data de Devolução</label>
                    <input type='date' className='form-control' id='data_devolucao' {...register('data_devolucao')} />
                </div>
                {/* Observações */}
                <div className='mb-3'>
                    <label htmlFor='observacoes' className='form-label'>Observações</label>
                    <textarea className='form-control' id='observacoes' {...register('observacoes')} />
                </div>
                {/* ID Usuário */}
                <div className='mb-3'>
                    <label htmlFor='id_usuario' className='form-label'>ID Usuário</label>
                    <CampoRegistro
                        idProps={{
                            id: 'id_usuario',
                            ...register('id_usuario')
                        }}
                        textoProps={{
                            id: 'usuario_nome',
                            value: usuario && usuario.hasOwnProperty('nome') ? usuario.nome : ''
                        }}
                    />
                </div>
                {/* ID Reserva */}
                <div className='mb-3'>
                    <label htmlFor='id_reserva' className='form-label'>ID Reserva</label>
                    <CampoRegistro
                        idProps={{
                            id: 'id_reserva',
                            ...register('id_reserva')
                        }}
                        textoProps={{
                            id: 'reserva_nome'
                        }}
                    />
                </div>
                {/* ID Exemplar */}
                <div className='mb-3'>
                    <label htmlFor='id_exemplar' className='form-label'>ID Exemplar</label>
                    <CampoRegistro
                        idProps={{
                            id: 'id_exemplar',
                            ...register('id_exemplar')
                        }}
                        textoProps={{
                            id: 'exemplar_nome'
                        }}
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor='status' className='form-label'>Status</label>
                    <input type="text" className='form-control' id='status' {...register('status')} />
                </div>
            </form>
            <ToastContainer position ="bottom-right"/>
        </article>
    );
};

export default EmprestimoRegistro;