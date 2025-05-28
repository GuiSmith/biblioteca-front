// Bibliotecas
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';

// Serviços
import API from '@servicos/API';

const Login = () => {

    const { register, handleSubmit } = useForm();

    const navigate = useNavigate();

    const onSubmit = async (data) => {

        try {
            const authTypeOptions = ['usuario', 'funcionario'];
            const authType = authTypeOptions.find(type => type === data.authType);
            if (!authType) {
                toast.error('Tipo de autenticação inválido');
                return;
            }

            const endpoint = `${authType}/login`;
            const completeUrl = `${API.apiUrl}/${endpoint}`;

            const response = await fetch(completeUrl,API.apiOptions('POST',data));
            const responseData = await response.json();

            if(response.status == 200){
                API.setToken(responseData.token);
                API.setAuthType(authType);
                
                const authResponse = await fetch(`${API.apiUrl}/`,API.apiOptions('GET'));                
                if(authResponse.status == 204){
                    toast.success('Login realizado com sucesso');
                    navigate('/');
                }else{
                    toast.error('Erro ao realizar login, contate o suporte!');
                    console.error('Login por e-mail e senha realizado, mas autenticação falhou!');
                }
                return;
            }

            toast.warning(responseData.mensagem);

        } catch (error) {
            console.error('Erro ao fazer login: ', error);
            toast.error('Erro ao fazer login, tente novamente mais tarde');
        }

    }

    return (
        <article className='container'>
            <h2 className='text-center'>Entrar</h2>
            <form onSubmit={handleSubmit(onSubmit)} className='form container alert alert-dark position-relative'>
                {/* E-mail */}
                <div className='mb-3'>
                    <label htmlFor="email" className='form-label'>E-mail</label>
                    <input id='email' className='form-control' type="email" placeholder='Digite seu e-mail' {...register("email")} />
                    <sub className='text-muted'>Nós nunca compartilharemos seu e-mail com ninguém</sub>
                </div>
                {/* Senha */}
                <div className='mb-3'>
                    <label htmlFor="senha" className='form-label'>Senha</label>
                    <input id='senha' className='form-control' type="password" placeholder='Digite sua senha' {...register("senha")} />
                </div>
                {/* Tipo de autenticação */}
                <div className='mb-3'>
                    {/* Usuário */}
                    <div className='form-check'>
                        <input type="radio" className='form-check-input' id='authTypeUsuario' value='usuario' name='authType' {...register("authType")} />
                        <label htmlFor="authTypeUsuario" className='form-check-label'>Usuário</label>
                    </div>
                    {/* Funcionário */}
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