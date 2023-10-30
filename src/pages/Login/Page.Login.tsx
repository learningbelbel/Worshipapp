import { LoginForm } from "./components/LoginForm"
import '../../theme/theme.login.css'
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/Context.Auth";

export const LoginPage = () => {
    
    const navigate = useNavigate();
    const {loggedUserData} = useAuthContext()!;

    useEffect(()=>{
        if(loggedUserData.isLoggedIn){
            navigate('/home')
        }
    },[])

    return (
        <div className="login-container ">
            <div className="forms-container">
                <LoginForm />
            </div>
        </div>
    )
}
