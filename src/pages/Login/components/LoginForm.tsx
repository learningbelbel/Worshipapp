import { useToast } from "../../../context/Context.Toast"
import { InputTextComponent } from "../../../styled-components/InputTextComponent"
import { FaUserCircle } from 'react-icons/fa'
import { useState } from 'react';
import { LoginService } from "../../../services/Service.Login";
import { useAuthContext } from "../../../context/Context.Auth";
import { useNavigate } from "react-router-dom";
import { Dialog } from 'primereact/dialog'
import { RegisterForm } from "./RegisterForm";

export const LoginForm = () => {

    const { handleLogin, handleLogout } = useAuthContext()!;
    const navigate = useNavigate();
    const toast = useToast();
    const service = new LoginService();

    const initialLoginState = {
        email: '',
        password: ''
    }

    const [loginData, setLoginData] = useState(initialLoginState);
    const [isVisible, setIsVisible] = useState(false);

    const handleOnchange = (e: any) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        })
    }

    const handleEmptyFields = (e: any) => {
        e.preventDefault();

        if (!loginData.email || !loginData.password)
            return toast?.toast('warn', 'Error', 'Todos los campos deben estar llenos');
        handleLoginProcess();
    }

    const handleLoginProcess = async () => {
        try {
            const resp = await service.post(loginData);
            handleLogin(resp.data);
            toast?.toast('success', 'Bienvenido', 'Haz Iniciado sesión Exitosamente!')
            navigate('/home')
        } catch (error: any) {
            handleLogout();
            if (error.code === 'ERR_BAD_REQUEST')
                return toast?.toast('error', 'Error', 'Email o Contraseña son incorrectos');
            toast?.toast('error', 'Error', 'No se Pudo iniciar Sesión');
        }
    }


    return (
        <div className='form-container'>
            <span>
                <FaUserCircle className="icon" />
            </span>
            <h1>Login</h1>

            <form className="form-content" onSubmit={handleEmptyFields}>
                <div className="form-field">
                    <InputTextComponent
                        name="email"
                        placeholder="Email"
                        type="email"
                        onChange={handleOnchange}
                    />
                </div>
                <div className="form-field">
                    <InputTextComponent
                        name='password'
                        type="password"
                        placeholder='Contraseña'
                        onChange={handleOnchange}
                    />
                </div>
            </form>
            <div className="button-container">
                <button onClick={handleEmptyFields}>Ingresar</button>
            </div>
            <div className="forgot-pass-container">
                <span onClick={() => setIsVisible(true)}>Registrarme</span>
            </div>

            <Dialog visible={isVisible} onHide={() => setIsVisible(false)}
                className="dialog"
                contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
                headerStyle={{ backgroundColor: 'rgba(0,0,0,0.8)' }}>
                <RegisterForm setIsVisible={setIsVisible}/>
            </Dialog>
        </div>
    )
}
