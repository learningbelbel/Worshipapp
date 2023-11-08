import { Link } from 'react-router-dom'
import { useRef, useState } from 'react';
import { useAuthContext } from '../context/Context.Auth';
import { RoutesData } from '../config/Config.Routes';
import { AiOutlineAlignLeft } from 'react-icons/ai';
import { Menu } from 'primereact/menu';
import { MenuItem } from 'primereact/menuitem';
import { Avatar } from 'primereact/avatar';
import { DOMAIN } from '../config/Config.EndPoints';

export const BarNavigation = () => {

    const { loggedUserData, handleLogout } = useAuthContext()!;

    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const menu = useRef<Menu>(null);
    const profile = loggedUserData.user.profile
    const profilePicture = `${DOMAIN}/${loggedUserData.user.profilePictureUrl}`

    const logoutHandling = () => {
        handleLogout()
        window.location.reload();
    }

    const menuItems: MenuItem[] = [
        {
            label: `${loggedUserData.user.name}`,
            items: [
                {
                    label: 'Perfil',
                    icon: 'pi pi-user',
                    url: '/profile'
                },
                {
                    label: 'Cerrar Sesión',
                    icon: 'pi pi-power-off',
                    command: () => {
                        logoutHandling()
                    }
                }
            ]
        }
    ];

    return (
        <>
            <div className='header-container'>
                {loggedUserData.isLoggedIn && (
                    <div className="header-content">
                        <div className="logo">
                            <h1>Worship</h1>
                        </div>
                        <div className="open-closeMenu" onClick={() => setIsMenuVisible(!isMenuVisible)}>
                            <AiOutlineAlignLeft />
                        </div>
                        <div className="p-0 flex justify-content-center" style={{backgroundColor: 'transparent', marginRight: '20px'}}>
                            <Menu model={menuItems}
                                popup
                                ref={menu}
                                popupAlignment="right" />
                            <Avatar
                                image={profilePicture}
                                size="large"
                                shape="circle"
                                onClick={(event) => menu.current?.toggle(event)} />
                        </div>
                    </div>

                )
                }
            </div>
            {loggedUserData.isLoggedIn && (
                <>
                    <div className={
                        !isMenuVisible ? 'nav-container' : 'nav-container active'}>
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
                    </div>
                </>
            )}
        </>


    )
}
