import { Navigate } from "react-router-dom";
import { HomePage } from "../pages/Home/Page.SongList";
import { LoginPage } from "../pages/Login/Page.Login";
import { SongListPage } from "../pages/SongList/Page.SongList";
import { ListPage } from "../pages/Lists/Page.List";
import { ContributionsPage } from "../pages/Contributions/Page.Finances";
import { AiOutlineContainer, AiOutlineHome } from 'react-icons/ai';
import { BsMusicNoteBeamed, BsMusicNoteList } from 'react-icons/bs'
import { ProfilePage } from "../pages/Profile/Page.Profile";
import { UserFinancesPage } from "../pages/UserFinances/Page.UserFinances";
import { UserListPage } from "../pages/UserLists/Page.UserLists";
import { FinancesPage } from "../pages/Finances/Page.Finances";
interface RouteModel {
    title?: string;
    icon?: React.ReactNode;
    path: string;
    element: React.ReactNode;
}
interface RouterModel {
    [key: string]: {
        routes: RouteModel[];
    }
}

export const RoutesData: RouterModel = {
    'MUSICIAN': {
        routes: [
            {
                title: 'INICIO',
                path: '/',
                element: <HomePage />,
                icon: <AiOutlineHome />
            },
            {
                title: 'CANCIONES',
                path: '/songs',
                element: <SongListPage />,
                icon: <BsMusicNoteBeamed />
            },
            {
                title: 'LISTADOS',
                path: '/songList',
                element: <ListPage />,
                icon: <BsMusicNoteList/>
            },
            {
                title: 'FINANZAS',
                path: '/finances',
                element: <FinancesPage />,
                icon: <AiOutlineContainer/>
            },
            {
                path: '/myFinances',
                element: <UserFinancesPage />,
            },
            {
                path: '/myLists',
                element: <UserListPage/>
            },
            {
                path: '/profile',
                element: <ProfilePage />,
            },
            {
                path: '*', element: <Navigate to="/" />
            }
        ]
    },
    'TREASURER': {
        routes: [
            {
                title: 'INICIO',
                path: '/',
                element: <HomePage />,
                icon: <AiOutlineHome />
            },
            {
                title: 'CANCIONES',
                path: '/songs',
                element: <SongListPage />,
                icon: <BsMusicNoteBeamed />
            },
            {
                title: 'LISTADOS',
                path: '/songList',
                element: <ListPage />,
                icon: <BsMusicNoteList/>
            },
            {
                title: 'APORTES',
                path: '/contributions',
                element: <ContributionsPage />,
                icon: <AiOutlineContainer/>
            },
            {
                title: 'FINANZAS',
                path: '/finances',
                element: <FinancesPage />,
                icon: <AiOutlineContainer/>
            },
            {
                path: '/myFinances',
                element: <UserFinancesPage />,
            },
            {
                path: '/myLists',
                element: <UserListPage/>
            },
            {
                path: '/profile',
                element: <ProfilePage />,
            },
            {
                path: '*', element: <Navigate to="/" />
            }
        ]
    },
    'SECRETARY': {
        routes: [
            {
                title: 'INICIO',
                path: '/',
                element: <HomePage />,
                icon: <AiOutlineHome />
            },
            {
                title: 'CANCIONES',
                path: '/songs',
                element: <SongListPage />,
                icon: <BsMusicNoteBeamed />
            },
            {
                title: 'LISTADOS',
                path: '/songList',
                element: <ListPage />,
                icon: <BsMusicNoteList/>
            },
            {
                title: 'APORTES',
                path: '/contributions',
                element: <ContributionsPage />,
                icon: <AiOutlineContainer/>
            },
            {
                title: 'FINANZAS',
                path: '/finances',
                element: <FinancesPage />,
                icon: <AiOutlineContainer/>
            },
            {
                path: '/myFinances',
                element: <UserFinancesPage />,
            },
            {
                path: '/profile',
                element: <ProfilePage />,
            },
            {
                path: '*', element: <Navigate to="/" />
            }
        ]
    },
    'default': {
        routes: [
            {
                path: '/login',
                element: <LoginPage />
            },
            {
                path: '*', element: <Navigate to="/login" />
            }
        ]
    }
}