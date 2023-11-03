import { Link, useNavigate } from 'react-router-dom'
import '../theme/theme.barNavigation.css'
import { useState, useEffect } from 'react';
import { useAuthContext } from '../context/Context.Auth';
import { RoutesData } from '../config/Config.Routes';
import { AiOutlineAlignLeft } from 'react-icons/ai';

export const BarNavigation = () => {
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const { loggedUserData } = useAuthContext()!;

    return (

        <div className='nav-container'>
            {
                loggedUserData.isLoggedIn && (
                    <>
                        <div className="horizontal-nav">
                            <div className="logo">
                                <h1>Worship</h1>
                            </div>
                            <div className="open-closeMenu">
                                <AiOutlineAlignLeft onClick={() => setIsMenuVisible(!isMenuVisible)} />
                            </div>
                        </div>
                        <div className={
                            !isMenuVisible ? 'vertical-bar-container' : 'vertical-bar-container active'}>
                            <div className="nav-menu">
                                <ul>
                                    {
                                        RoutesData[`${loggedUserData.user.profile}`].routes.map((route, index) => {
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
                        </div>
                    </>
                )
            }
        </div>


    )
}
