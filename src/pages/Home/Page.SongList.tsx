import { useState } from "react"
import { CreateRandomListDialog } from "./components/CreateRandomListDialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { SongListService } from "../../services/Service.ListService";
import { useEffect } from 'react';
import { CreateListDialog } from "./components/CreateListDialog";
import { Dialog } from "primereact/dialog";

interface ListModel {
    date: string;
    songs: [];
}
export const HomePage  = () => {

    const listService = new SongListService();

    const [randomDialogVisible, setRandomDialogVisible] = useState(false);
    const [regularDialogVisible, setRegularDialogVisible] = useState(false);
    const [currentSongList, setCurrentSongList] = useState<ListModel>();

    useEffect(() => {
        getCurrentSongList()
    }, [])

    const getCurrentSongList = async () => {
        const list = await listService.getCurrentList();
        setCurrentSongList(list.data.result)
    }

    const columns = [
        { field: 'name', header: 'Nombre' },
        { field: 'note', header: 'Nota' }
    ];

    const dynamicColumns = columns.map((col) => {
        return <Column key={col.field} columnKey={col.field} field={col.field} header={col.header}/>;
    });

    return (
        <div className="page-container">
            <Dialog
                header="Nuevo Listado"
                visible={randomDialogVisible}
                onHide={() => setRandomDialogVisible(false)}
                contentStyle={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                headerStyle={{
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    color: '#fff'
                }}
                className="randomDialog"
            >
                <CreateRandomListDialog
                    setIsVisible={setRandomDialogVisible}
                    isVisible={randomDialogVisible}
                />
            </Dialog>
            <Dialog visible={regularDialogVisible} onHide={() => setRegularDialogVisible(false)}>
                <CreateListDialog />
            </Dialog>

            <div className="content-header">
                <h1>Listado Actual</h1>
                <span className='close-bar'>
                    <i className='pi pi-bars '></i>
                </span>
                <div className="head-btn">
                    <input type="submit" value="Crear Random" onClick={() => setRandomDialogVisible(!randomDialogVisible)} />
                    {/* <input type="submit" value="Crear Listado" onClick={() => setRegularDialogVisible(!regularDialogVisible)} /> */}
                </div>
            </div>
            <div className="card">
                <DataTable
                    value={currentSongList?.songs}>
                    <Column rowReorder style={{ width: '3rem' }} />
                    {dynamicColumns}
                </DataTable>
            </div>
        </div >
    )
}
