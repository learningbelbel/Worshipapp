import { InputTextComponent } from '../../../styled-components/InputTextComponent'
import { useState } from 'react';
import { useToast } from '../../../context/Context.Toast';
import { FaUserCircle } from 'react-icons/fa';
import { RegisterService } from '../../../services/Service.Register';
import { Dialog } from 'primereact/dialog';

export const RegisterForm = ({ setIsVisible, isVisible }: any) => {

    const service = new RegisterService();
    const toast = useToast();
    const initialUserData = {
        name: '',
        lastName: '',
        email: '',
        password: ''
    }
    const [userData, setUserData] = useState(initialUserData);

    const handleOnchange = (e: any) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }

    const handleEmptyFields = (e: any) => {
        e.preventDefault();

        if (!userData.name ||
            !userData.lastName ||
            !userData.email ||
            !userData.password)
            return toast?.toast('warn', 'Error', 'Todos los campos deben estar llenos');

        handleRegister();
    }

    const handleRegister = async () => {
        const resp = await service.createUser(userData);
        console.log(resp);
        if (resp.status === 200) {
            toast?.toast('success', 'Completado', 'Registro completado');
        }
        setIsVisible(false)

    }


    return (
        <Dialog visible={isVisible} onHide={() => setIsVisible(false)}
            className="dialog"
            contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
            headerStyle={{ backgroundColor: 'rgba(0,0,0,0.8)' }}>
            <div className='form-container'>
                <span>
                    <FaUserCircle className="icon" />
                </span>
                <h1>Registrarme</h1>

                <form className="form-content" onSubmit={handleEmptyFields}>
                    <div className="form-field">
                        <InputTextComponent
                            name="name"
                            placeholder="Nombre"
                            type="text"
                            onChange={handleOnchange}
                        />
                    </div>
                    <div className="form-field">
                        <InputTextComponent
                            name="lastName"
                            placeholder="Apellido"
                            type="text"
                            onChange={handleOnchange}
                        />
                    </div>
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
                    <button onClick={handleEmptyFields}>Registrarme</button>
                </div>


            </div>
        </Dialog>
    )
}
