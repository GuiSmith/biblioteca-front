// Bibliotecas
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

// Contextos
import { useAuth } from '@contextos/AuthContexto';

const Logout = () => {
    
    const { handleLogoutSuccess } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        handleLogoutSuccess();
        toast.success('Saindo...');
        navigate('/');
    },[]);

    return (
        <>
            <ToastContainer position="bottom-right" />
        </>
    )

};

export default Logout;