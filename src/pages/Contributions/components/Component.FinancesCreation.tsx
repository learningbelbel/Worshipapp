import { Button } from 'primereact/button'
import { Menu } from 'primereact/menu';
import { useRef, useState } from 'react';
import { PrimaryTitle } from '../../../styledComponents/PrimaryTitle';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { InputTextarea } from 'primereact/inputtextarea';
import { onChangeFunc } from '../../../utils/Util.HandleOnchange';
import { useToast } from '../../../context/Context.Toast';
import { IncomeService } from '../../../services/Service.Expenses';
import { ExpensesService } from '../../../services/Service.Incomes';

interface IncomeExpenseModel {
    description: string;
    date: Date | null;
    amount: string;
}

export const FinancesCreation = () => {

    const menu = useRef<Menu>(null);
    const items = [
        {
            label: 'Opciones',
            items: [
                {
                    label: 'Crear Ingreso',
                    icon: 'pi pi-external-link',
                    command: () => {
                        console.log('Created')
                        setDialogVisibility(true);
                        setTitle('Ingreso');
                    }
                },
                {
                    label: 'Crear Egreso',
                    icon: 'pi pi-external-link',
                    command: () => {
                        setDialogVisibility(true)
                        setTitle('Egreso');
                    }
                }
            ]
        }
    ];

    const initialData: IncomeExpenseModel = {
        description: '',
        date: null,
        amount: ''
    }

    const toast = useToast();
    const service = new IncomeService();
    const expenseService = new ExpensesService();

    const [data, setData] = useState(initialData);
    const [dialogVisibility, setDialogVisibility] = useState(false);
    const [title, setTitle] = useState('')

    const handleOnchange = (e: any) => {
        onChangeFunc(e, data, setData)
    }

    const handleEmptyField = () => {
        if (!data.description || !data.date || !data.amount) {
            toast?.toast('warn', 'Error', 'Todos lo campos deben estar llenos.')
        }

        if (title === 'Ingreso') {
            handleCreateIncome()
        }
        if (title === 'Egreso') {
            handleCreateExpense()
        }
    }

    const handleCreateIncome = async () => {
        const resp = await service.createIncome(data);
        if (resp.status !== 200) {
            toast?.toast('error', 'Error', 'No se pudo crear el Registro')
            return;
        }
        toast?.toast('success', 'Exitoso', 'Registro creado exitosamente');
        setDialogVisibility(false);
    }

    const handleCreateExpense = async () => {
        const resp = await expenseService.createExpense(data);
        if (resp.status !== 200) {
            toast?.toast('error', 'Error', 'No se pudo crear el Registro')
            return;
        }
        toast?.toast('success', 'Exitoso', 'Registro creado exitosamente');
        setDialogVisibility(false);
    }

    return (
        <div className='card flex justify-content-between align-items-center mb-5' >
            <Menu
                model={items}
                popup
                ref={menu}
                popupAlignment="right" />

            <PrimaryTitle title='Contribuciones' />
            <Button
                label="Otros"
                icon="pi pi-ellipsis-v"
                className="mr-2"
                style={{ background: 'transparent', color: '#000', border: 'none' }}
                onClick={(event) => menu?.current?.toggle(event)} />

            <Dialog
                header={`Crear ${title}`}
                visible={dialogVisibility}
                onHide={() => setDialogVisibility(false)}
                style={{ minWidth: '50%' }}>

                <div className="card flex align-items-center col-11">
                    <label className='col-4' htmlFor="">Motivo: </label>
                    <InputTextarea value={data.description} name="description" onChange={handleOnchange} className="w-full" />
                </div>

                <div className="card flex align-items-center mt-2 col-11">
                    <label className='col-4' htmlFor="">Fecha: </label>
                    <Calendar
                        value={data.date}
                        onChange={handleOnchange}
                        dateFormat='dd/MM/yy'
                        readOnlyInput
                        name="date"
                        locale='es'
                        className="w-full "
                    />
                </div>

                <div className="card flex align-items-center mt-2 col-11">
                    <label className='col-4' htmlFor="">Aporte Total: </label>
                    <InputText value={data.amount} name="amount" onChange={handleOnchange} className="w-full" />
                </div>

                <div className='card flex flex-row-reverse col-11'>
                    <Button label='Guardar' onClick={() => handleEmptyField()} />
                </div>
            </Dialog >
        </div>
    )
}
