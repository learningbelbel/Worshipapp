import { Dropdown } from 'primereact/dropdown';
import { useEffect, useState } from 'react';
import { UserService } from '../../services/Service.User';
import { ContributionTables } from '../../components/Component.ContributionTable';
import { TableTemplate } from '../../components/Component.TableTemplate';

const controls = [
    { name: 'Control de Plan 5', value: 'contributions' },
    { name: 'Control de Promesas', value: 'promises' },
    { name: 'Control de Diezmos', value: 'tithes' },
]
interface UserModel {
    contributions: [];
    promises: [];
    tithes: [];
}
const initialUserData: UserModel = {
    contributions: [],
    promises: [],
    tithes: [],
}
export const UserFinancesPage = () => {

    const userService = new UserService();

    const [userData, setUserData] = useState<UserModel>(initialUserData);
    const [displayControl, setDisplayControl] = useState('contributions');

    useEffect(() => {
        fetchUserFinances()
    }, [])

    const fetchUserFinances = async () => {
        const resp = await userService.getFinancesByUser();
        console.log(resp)
        if (resp.status === 200) {
            setUserData(resp.data.result);
        }
    }

    return (
        <div className='page-container'>
            <div className="page-header card mb-2">
                <h2>Mis Aportes</h2>
                <Dropdown
                    value={displayControl}
                    onChange={(e) => setDisplayControl(e.value)}
                    options={controls}
                    optionLabel={'name'}
                    placeholder="Seleccionar"
                    style={{ width: '40%' }}
                />
            </div>

            {
                displayControl === 'contributions' && (
                    <div className="card">
                        <h1>Plan 5</h1>
                        <ContributionTables data={userData.contributions} />
                    </div>
                )
            }

            {
                displayControl === 'promises' && (
                    <div className="card">
                        <h1>Promesas de Construcción</h1>
                        <TableTemplate data={userData.promises}  timeHeader={"Mes"} timeField="month"/>
                    </div>
                )
            }
            {
                displayControl === 'tithes' && (
                    <div className="card">
                        <h1>Diezmos</h1>
                        <TableTemplate data={userData.tithes} timeHeader={"Mes"} timeField="month"/>
                    </div>
                )}
        </div>
    )
}
