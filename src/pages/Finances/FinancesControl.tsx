import { useEffect, useState } from "react";
import { ContributionControl } from "./components/Component.ControlContribution"
import { PromisesControl } from "./components/Component.ControlPromise"
import { TitheControl } from "./components/Component.ControlTithe"
import { UserService } from "../../services/Service.User";
import { CreateControl } from "./components/Component.CreateControl";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";



interface ControlModel {
    month: string;
    status: string,
}

interface User {
    name: string;
    promises?: ControlModel[];
    tithes?: ControlModel[];
    contributions?: ControlModel[];
}

export const FinancesControl = () => {

    const userService = new UserService();

    const [userData, setUserData] = useState<User[]>([]);
    const [displayControl, setDisplayControl] = useState('contribution')
    const [dialogVisibility, setDialogVisibility] = useState(false)
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        userService.getUsersFinancesControl().then((data) => {
            setUserData(data.data.result)
        });
    }, [isLoading]);

    const controls = [
        { name: 'Control de Plan 5', value: 'contribution' },
        { name: 'Control de Promesas', value: 'promises' },
        { name: 'Control de Diezmos', value: 'tithe' },
    ]

    return (
        <>
            <div className="flex justify-content-between mb-2 mt-2">
                <Dropdown
                    value={displayControl}
                    onChange={(e) => setDisplayControl(e.value)}
                    options={controls}
                    optionLabel={'name'}
                    placeholder="Seleccionar"
                />
                <Button
                    className='header-btn'
                    label="Crear Registro"
                    onClick={() => setDialogVisibility(true)}
                />
            </div>

            {
                displayControl === 'contribution' && <ContributionControl user={userData} />
            }
            {
                displayControl === 'promises' && <PromisesControl user={userData} />
            }
            {
                displayControl === 'tithe' && <TitheControl user={userData} />
            }



            <CreateControl
                dialogVisibility={dialogVisibility}
                setDialogVisibility={setDialogVisibility}
                setIsLoading={setIsLoading}
            />

        </>
    )
}
