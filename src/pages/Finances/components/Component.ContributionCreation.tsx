import { Button } from "primereact/button"
import { Calendar } from "primereact/calendar"
import { InputText } from "primereact/inputtext"
import { Nullable } from "primereact/ts-helpers";
import { useState } from 'react';
import { SelectUser } from './Component.SelectUser';
import { ContributionService } from "../../../services/Service.Contribution";
import { useToast } from "../../../context/Context.Toast";

interface SelectUser {
    id: string;
    name: string;
}
const initialSelectedUser: SelectUser = {
    id: '',
    name: '',
}

export const ContributionCreation = ({ setDialogVisibility }: any) => {

    const service = new ContributionService();
    const toast = useToast();

    const [selectedUser, setSelectedUser] = useState<SelectUser>(initialSelectedUser);
    const [dates, setDates] = useState<Nullable<Date[]>>(null);
    const [amount, setAmount] = useState<string>('');

    const handleEmptyField = () => {
        if (!selectedUser || !dates || !amount) {
            return toast?.toast('warn', 'Error', 'Debes de llenar todos lo campos.')
        }
        handleSave();
    }

    const handleSave = async () => {
        const response = await service.createContribution({ userId: selectedUser.id, dates: dates, amount: amount })
        if (response.status === 200) {
            console.log(response);
            toast?.toast('success', 'Exito', 'Aporte Guardado exitosamente.')
            setDialogVisibility(false)
        }
    }

    return (
        <>
            <div className="card flex align-items-center col-11">
                <label className='col-4' htmlFor="">Integrantes: </label>
                <SelectUser
                    selectedUser={selectedUser}
                    setSelectedUser={setSelectedUser}
                />
            </div>

            <div className="card flex align-items-center mt-2 col-11">
                <label className='col-4' htmlFor="">Fecha: </label>
                <Calendar
                    value={dates}
                    onChange={(e) => setDates(e.value)}
                    selectionMode="multiple"
                    dateFormat='dd/MM'
                    readOnlyInput
                    locale='es'
                    className="w-full "
                />
            </div>

            <div className="card flex align-items-center mt-2 col-11">
                <label className='col-4' htmlFor="">Aporte Total: </label>
                <InputText value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full" />
            </div>

            <div className='card flex flex-row-reverse col-11'>
                <Button label='Guardar' onClick={() => handleEmptyField()} />
            </div>
        </>
    )
}
