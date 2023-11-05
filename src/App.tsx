import './theme/theme.pages.css'
import './theme/theme.login.css'
import './theme/theme.dialogstyles.css'
import './theme/theme.barNavigation.css'

// import './theme/theme.borrador.css'
import { BrowserRouter } from "react-router-dom"
import { ToastProvider } from "./context/Context.Toast";
import { AxiosInterceptor } from "./interceptors/axios.inteceptor";
import { RoutesComponent } from './components/Component.Routes';
import { BarNavigation } from './components/Component.BarNavigation';

AxiosInterceptor();

export const App = () => {

  return (
    <ToastProvider>
      <BrowserRouter>
        <BarNavigation />
        <RoutesComponent />
      </BrowserRouter>
    </ToastProvider>
  )
}

