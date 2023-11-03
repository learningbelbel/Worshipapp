import { Dialog } from 'primereact/dialog';
import { addLocale } from 'primereact/api';
import { ContributionCreation } from './components/Component.ContributionCreation';
import { useState } from 'react';
import { TableDisplay } from './components/Component.TableDisplay';
import { Button } from 'primereact/button';

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
        <div className="page-container">

            <div className="page-header">
                <h1>Plan 5</h1>
                <Button
                    className='header-btn'
                    label="Crear Aporte"
                    onClick={() => setDialogVisibility(true)} />
            </div>

            <div className="page-content">
                <TableDisplay />
            </div>

            <Dialog
                header="Crear Aporte"
                visible={dialogVisibility}
                onHide={() => setDialogVisibility(false)}
                style={{ minWidth: '50%' }}>
                <ContributionCreation
                    setDialogVisibility={setDialogVisibility} />
            </Dialog>

        </div>
    );
}
