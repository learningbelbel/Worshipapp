import { LoginForm } from "./components/LoginForm"
import '../../theme/theme.login.css'

export const LoginPage = () => {
    return (
        <div className="login-container">
            <div className="forms-container">
                <LoginForm />
            </div>
        </div>
    )
}
