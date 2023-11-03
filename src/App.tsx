import './theme/theme.pages.css'
import './theme/theme.login.css'
import './theme/theme.dialogstyles.css'

import { BrowserRouter } from "react-router-dom"
import { ToastProvider } from "./context/Context.Toast";
import { AxiosInterceptor } from "./interceptors/axios.inteceptor";
import { BarNavigation } from "./components/Component.BarNavigation";
import { RoutesComponent } from './components/Component.Routes';

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

