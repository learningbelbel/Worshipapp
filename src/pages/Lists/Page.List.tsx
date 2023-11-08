import { DataTable, DataTableExpandedRows } from "primereact/datatable"
import { useRef, useState } from 'react';
import { useEffect } from 'react';
import { SongListService } from "../../services/Service.ListService";
import { Column } from "primereact/column";
import { format, parseISO } from "date-fns";
import esLocale from 'date-fns/locale/es';
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import { Dialog } from "primereact/dialog";
import { Calendar } from "primereact/calendar";
import { onChangeFunc } from "../../utils/Util.HandleOnchange";
import { Nullable } from 'primereact/ts-helpers';
import { useToast } from "../../context/Context.Toast";

interface ListModel {
    date: Nullable<Date>;
    songs: []
}

export const ListPage = () => {

    const listService = new SongListService();
    const toast = useToast();

    const initialListData: ListModel = {
        date: null,
        songs: []
    }

    const [expandedRows, setExpandedRows] = useState<DataTableExpandedRows | any[]>([]);
    const [lists, setLists] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const [listData, setListData] = useState(initialListData)

    useEffect(() => {
        getLists()
    }, [])
    const getLists = async () => {
        const res = await listService.getAllList();
        setLists(res.data.result);
    }

    const dateTemplate = (rowData: any) => {
        const originalDate = parseISO(rowData.date);
        const formatedDate = format(originalDate, 'eeee, d MMMM yyyy', { locale: esLocale });

        return <>{formatedDate}</>
    };

    const rowExpansionTemplate = (data: any) => {
        return (
            < >
                {
                    data.songs.map((song: any, i: number) => {
                        return <li className="p-3 flex justify-content-between" key={i}>
                            <span>
                                {song.name}
                            </span>
                            <span>
                                {song.chord}
                            </span>
                        </li>
                    })
                }
            </>
        );
    };

    const allowExpansion = (rowData: any) => {
        return rowData.songs.length > 0;
    };

    const menu = useRef<Menu>(null);
    const menuItems: MenuItem[] = [
        {
            label: `Acciones`,
            items: [
                {
                    label: 'Reutilizar',
                    icon: 'pi pi-undo',
                    command: () => {
                        setIsVisible(true)
                    }
                }
            ]
        }
    ];

    const handleSave = async() => {
        if(!listData.date) return toast?.toast('warn','Error', 'Debes ingresar una fecha');
        const resp = await listService.createList(listData);

        if(resp.status === 200){
            toast?.toast('success','Exito', 'Listado creado exitosamente!')
            setIsVisible(false)
        }

    }

    const actionBodyTemplate = (rowData: any) => {
        return (
            <div className="flex justify-content-center">
                <Menu model={menuItems}
                    popup
                    ref={menu}
                    popupAlignment="right" />
                <Button icon="pi pi-ellipsis-v" style={{ border: 'none', padding: 0, margin: 0, width: '5px' }} outlined
                    onClick={(event) => {
                        menu.current?.toggle(event)
                        setListData({
                            ...listData,
                            songs: rowData.songs
                        })
                    }} />
            </div>
        );
    };

    const handleOnchange = (e: any) => {
        onChangeFunc(e, listData, setListData);
    }

    return (
        <div className="page-container">
            <h2>Listados de Canciones</h2>

            <div className="card">
                <DataTable
                    value={lists}
                    expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)}
                    rowExpansionTemplate={rowExpansionTemplate}
                    dataKey="_id"
                    style={{ zIndex: '0' }}>
                    <Column expander={allowExpansion} style={{ width: '5rem' }} />
                    <Column field="date" header="Fecha" body={dateTemplate} />
                    <Column body={actionBodyTemplate} header="Acción" exportable={false}></Column>

                </DataTable>
                <Dialog header="Asignar Fecha"
                    visible={isVisible}
                    onHide={() => setIsVisible(false)}>

                    <div>
                        <div className="pt-3 mb-3 flex justify-content-between align-items-center">
                            <label> Seleccionar Fecha: </label>
                            <Calendar
                                value={listData.date}
                                onChange={handleOnchange}
                                locale='es'
                                name="date"
                            />
                        </div>
                        <Button label="Cancelar" icon="pi pi-times" onClick={() => setIsVisible(false)} className="p-button-text" severity="danger" />
                        <Button label="Guardar" icon="pi pi-check" onClick={handleSave} autoFocus severity="success" />
                    </div>
                </Dialog>
            </div>
        </div>
    )
}
