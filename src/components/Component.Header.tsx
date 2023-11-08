import { MenuItem } from "primereact/menuitem";
import { DOMAIN } from "../config/Config.EndPoints";
import { useAuthContext } from "../context/Context.Auth";
import { AiOutlineAlignLeft } from "react-icons/ai";
import { Menu } from "primereact/menu";
import { Avatar } from "primereact/avatar";
import { useRef } from 'react';
import logo from '../assets/jorbandorange.png'


interface Props {
    setIsMenuVisible: any;
    isMenuVisible: boolean;
}

export const HeaderComponent = ({setIsMenuVisible, isMenuVisible}:Props) => {

    const { loggedUserData, handleLogout } = useAuthContext()!;
    const menu = useRef<Menu>(null);
    const profilePicture = `${DOMAIN}/${loggedUserData.user.profilePictureUrl}`

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
                    label: 'Mis Listados',
                    icon: 'pi pi-list',
                    url: '/myLists'
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

    const logoutHandling = () => {
        handleLogout()
        window.location.reload();
    }

    return (
        <>
            <div className='header-container'>
                {loggedUserData.isLoggedIn && (
                    <div className="header-content">
                        <div className="open-closeMenu" onClick={() => setIsMenuVisible(!isMenuVisible)}>
                            <AiOutlineAlignLeft />
                        </div>
                        <div className="logo">
                            <img src={logo} alt="" style={{ height: '8vh' }} />
                        </div>
                        <div className="p-0 flex justify-content-center" style={{ backgroundColor: 'transparent', marginRight: '20px' }}>
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
                )}
            </div>
        </>
    )
}
