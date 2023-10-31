import { Link } from 'react-router-dom'
import '../theme/theme.barNavigation.css'
import { useState } from 'react';

export const BarNavigation = () => {
    const [isMenuVisible, setIsMenuVisible] =useState(false);
    return (
        <>
        <div className="burguer" onClick={()=>setIsMenuVisible(!isMenuVisible)}>
            <i className='pi  pi-bars'></i>
        </div>
            <div className='bar-container' style={{
                marginLeft: isMenuVisible ? '0%': '-50%'
            }}>
                <div className="nav-logo">
                    <h1>WORSHIP</h1>
                </div>
                <div className="nav-menu">
                    <ul>
                        <li><Link className='link' to="/home">INICIO</Link></li>
                        <li><Link className='link' to="/list">LISTADOS</Link></li>
                        {/* <li><Link className='link' to="/finances">FINANZAS</Link></li> */}
                    </ul>
                </div>
            </div>
        </>
    )
}
