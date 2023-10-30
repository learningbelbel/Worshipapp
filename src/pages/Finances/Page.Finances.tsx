import { Link } from 'react-router-dom';
import { Dialog } from 'primereact/dialog';
import { addLocale } from 'primereact/api';
import { ContributionCreation } from './components/Component.ContributionCreation';
import { useState } from 'react';
import { TableDisplay } from './components/Component.TableDisplay';
import { TableComponent } from './components/Component.Table';

addLocale('es', {
    firstDayOfWeek: 1,
    dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
    dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
    dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
    monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
    monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
    today: 'Hoy',
    clear: 'Limpiar'
});

export const FinancesPage = () => {

    const [dialogVisibility, setDialogVisibility] = useState(false);

    return (
        <div className="page-container col-12">

            <div className="table-container">
                <div className="flex justify-content-between align-items-center">
                    <h1>Plan 5</h1>
                    <span>
                        <Link to="#" onClick={() => setDialogVisibility(true)}>Crear Aporte</Link>
                    </span>
                </div>

                <div>
                    <TableDisplay />
                </div>
                <hr/>
                <br/>
                <div className='card m-2'>
                <TableComponent />

                </div>
            </div>

            <Dialog header="Crear Aporte" visible={dialogVisibility} onHide={() => setDialogVisibility(false)} style={{ minWidth: '50%' }}>
                <ContributionCreation
                    setDialogVisibility={setDialogVisibility} />
            </Dialog>

        </div>
    );
}
