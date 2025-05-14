// Bibliotecas
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {

    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        console.log('Dados enviados: ', data);

        // Tratar login
    }

    return (
        <article className='container'>
            <h2 className='text-center'>Entrar</h2>
            <form onSubmit={handleSubmit(onSubmit)} className='form container alert alert-dark position-relative'>
                <div className='mb-3'>
                    <label htmlFor="email" className='form-label'>E-mail</label>
                    <input id='email' className='form-control' type="email" placeholder='Digite seu e-mail' {...register("email")} />
                    <sub className='text-muted'>Nós nunca compartilharemos seu e-mail com ninguém</sub>
                </div>
                <div className='mb-3'>
                    <label htmlFor="senha" className='form-label'>Senha</label>
                    <input id='senha' className='form-control' type="password" placeholder='Digite sua senha' {...register("senha")} />
                </div>
                <div className='mb-3'>
                    <div className='form-check'>
                        <input type="radio" className='form-check-input' id='authTypeUsuario' value='usuario' name='authType' {...register("authType")} />
                        <label htmlFor="authTypeUsuario" className='form-check-label'>Usuário</label>
                    </div>
                    <div className='form-check'>
                        <input type="radio" className='form-check-input' id='authTypeFuncionario' value='funcionario' name='authType' {...register("authType")} />
                        <label htmlFor="authTypeFuncionario" className='form-check-label'>Funcionário</label>
                    </div>
                </div>
                <button type='submit' className='btn btn-success'>Entrar</button>
            </form>
            <ToastContainer position='bottom-right' />
        </article>
    )
};

export default Login;