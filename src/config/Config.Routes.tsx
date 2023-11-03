import { Navigate } from "react-router-dom";
import { HomePage } from "../pages/Home/Page.SongList";
import { LoginPage } from "../pages/Login/Page.Login";
import { SongListPage } from "../pages/SongList/Page.SongList";
import { ListPage } from "../pages/Lists/Page.List";
import { FinancesPage } from "../pages/Finances/Page.Finances";
import { AiOutlineContainer, AiOutlineHome } from 'react-icons/ai';
import { BsMusicNoteBeamed, BsMusicNoteList } from 'react-icons/bs'
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
    'Team_Member': {
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
                path: '*', element: <Navigate to="/" />
            }
        ]
    },
    'default': {
        routes: [
            {
                title: 'INICIO',
                path: '/login',
                element: <LoginPage />
            },
            {
                path: '*', element: <Navigate to="/login" />
            }
        ]
    }
}