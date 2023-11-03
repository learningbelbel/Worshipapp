import { useAuthContext } from '../context/Context.Auth'
import { Route, Routes } from 'react-router-dom';
import { RoutesData } from '../config/Config.Routes';

export const RoutesComponent = () => {
    const { loggedUserData } = useAuthContext()!;
    return (
        <Routes>
            {
                loggedUserData.user.profile ? (
                    RoutesData[`${loggedUserData?.user.profile}`]
                        .routes.map((route, index) => {
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={route.element}
                                />
                            )
                        })
                ) : (
                    RoutesData['default'].routes.map((route, index) => {
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={route.element} />
                        )
                    })
                )
            }
        </Routes>
    )
}
