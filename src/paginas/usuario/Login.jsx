// Bibliotecas
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';

// Componentes
import BotaoAcao from '@componentes/BotaoAcao';

const Login = () => {

    const [authType, setAuthType] = useState('usuario');

    const [endpoint, setEndpoint] = useState(authType);

    const handleAuthType = (type) => {
        setAuthType(type);
        console.log(`Tipo de login: ${type}`);
    }

    useEffect(() => {
        setEndpoint(authType);
    },[authType]);

    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        console.log('Dados enviados: ', data);
    }

    return (
        <article className='container'>
            <h2 className='text-center'>Entrar</h2>
            <form onSubmit={handleSubmit(onSubmit)} className='form container alert alert-dark position-relative'>
                <div className='d-flex justify-content-center gap-2'>
                    <BotaoAcao label='Usuário' className='btn-dark' onClick={() => handleAuthType('usuario')} disabled={authType === 'usuario'} />
                    <BotaoAcao label='Funcionário' className='btn-dark' onClick={() => handleAuthType('funcionario')} disabled={authType === 'funcionario'}/>
                </div>
                <div className='mb-3'>
                    <label htmlFor="email" className='form-label'>E-mail</label>
                    <input id='email' className='form-control' type="email" {...register("email")} placeholder='Digite seu e-mail' />
                    <span className='text-muted'>Nós nunca compartilharemos seu e-mail com ninguém</span>
                </div>
                <div className='mb-3'>
                    <label htmlFor="senha" className='form-label'>Senha</label>
                    <input id='senha' className='form-control' type="password" {...register("senha")} placeholder='Digite sua senha' />
                    <span className='text-muted'></span>
                </div>
                <button type='submit' className='btn btn-success'>Entrar</button>
            </form>
            <ToastContainer position='bottom-right' />
        </article>
    )
};

export default Login;