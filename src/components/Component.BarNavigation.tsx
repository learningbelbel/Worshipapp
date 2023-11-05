import { Link } from 'react-router-dom'
import { useState } from 'react';
import { useAuthContext } from '../context/Context.Auth';
import { RoutesData } from '../config/Config.Routes';
import { AiOutlineAlignLeft } from 'react-icons/ai';
import { Button } from 'primereact/button';

export const BarNavigation = () => {
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const { loggedUserData, handleLogout } = useAuthContext()!;

    const profile = loggedUserData.user.profile

    const logoutHandling = () => {
        handleLogout()
        window.location.reload();
    }

    return (
        <>
            <div className='nav-container'>
                {loggedUserData.isLoggedIn && (
                    <>
                        <div className="horizontal-nav">
                            <div className="logo">
                                <h1>Worship</h1>
                            </div>
                            <div className="open-closeMenu">
                                <AiOutlineAlignLeft onClick={() => setIsMenuVisible(!isMenuVisible)} />
                            </div>
                        </div>

                    </>
                )
                }
            </div>
            {loggedUserData.isLoggedIn && (
                <>
                    <div className={
                        isMenuVisible ? 'vertical-bar-container' : 'vertical-bar-container active'}>
                        <div className="nav-menu">
                            <ul>
                                {
                                    RoutesData[`${profile}`].routes.map((route, index) => {
                                        return <li key={index}>
                                            <Link className='link' to={route.path}>
                                                <span className='route-icon'>
                                                    {route.icon}
                                                </span>
                                                {route.title}
                                            </Link>
                                        </li>

                                    })
                                }
                            </ul>
                        </div>
                        <div className="config-btns">
                            <Button
                                style={{ padding: '5px', fontSize: '12px' }}
                                onClick={logoutHandling}
                                severity='danger'
                                label=''
                                icon='pi pi-power-off' />
                        </div>
                    </div>
                </>
            )}
        </>


    )
}
