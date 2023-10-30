import { Link } from 'react-router-dom'
import '../theme/theme.barNavigation.css'

export const BarNavigation = () => {
    return (
        <div className='bar-container active'>
            <div className="nav-logo">
                <h1>WORSHIP</h1>
            </div>
            <div className="nav-menu">
                <ul>
                    <li><Link className='link' to="/home">INICIO</Link></li>
                    <li><Link className='link' to="/list">LISTADOS</Link></li>
                    <li><Link className='link' to="/finances">FINANZAS</Link></li>
                </ul>
            </div>
        </div>
    )
}
