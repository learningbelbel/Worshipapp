import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { MultiSelect } from "primereact/multiselect";
import { useState } from "react";
import { SongService } from "../../../services/Service.Song";
import { useToast } from "../../../context/Context.Toast";
import { Dialog } from "primereact/dialog";
import { onChangeFunc } from "../../../utils/Util.HandleOnchange";
import { SongModel } from "../../../models/Model.Song";
import { OrdenarListComponent } from "./OrderComponent";
import { ScrollPanel } from "primereact/scrollpanel";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

interface ParamsModel {
    notes: string[];
    amount: string;
}

const initialParamsState = {
    notes: [],
    amount: '',
}

export const CreateRandomListDialog = ({ setIsVisible, isVisible }: any) => {

    const service = new SongService();
    const toast = useToast();

    const [songList, setSongList] = useState<SongModel[]>([]);
    const [params, setParams] = useState<ParamsModel>(initialParamsState)
    const [isVisibleSongList, setIsVisibleSongList] = useState(false)

    const chords = ["Am", "Cm", 'Em', 'Dm', 'Gm', 'G', 'C'];

    const handleOnchange = (e: any) => {
        onChangeFunc(e, params, setParams)
    }

    const handleGetRandomSongs = async () => {
        if (!params.amount || params.notes.length === 0) {
            return toast?.toast('warn', 'Error', 'Todos los campos deben estar llenos')
        }
        const list = await service.getRandomSong(params);
        setSongList(list.data.result)
    }

    const chordTemplate = (rowData: SongModel) => {
        return rowData.chord.map((chord: [], index: number) => {
            return <small key={index}>{chord} <br /></small>
        });
    }

    const footer = () => {
        return <>{
            songList.length > 0 && (
                <Button label="Continuar" onClick={() => { setIsVisibleSongList(true) }} />
            )
        }</>
    }

    const deleteSong = (rowData:any) =>{
        console.log(rowData);

        const updateList = songList.filter(song => song._id !== rowData._id )
        console.log(updateList);
        setSongList(updateList);
    }

    const actionBodyTemplate = (rowData: any) => {
        return (
            <>
                <Button icon="pi pi-trash"  style={{border: 'none'}} outlined severity="danger" onClick={() => deleteSong(rowData)} />
            </>
        );
    };

    return (
        <Dialog
            header="Nuevo Listado"
            visible={isVisible}
            onHide={() => setIsVisible(false)}
            footer={footer}
            className="randomDialog"
        >
            <MultiSelect
                name="notes"
                value={params.notes}
                onChange={handleOnchange}
                options={chords}
                placeholder="Seleccionar Notas"
                maxSelectedLabels={5}
                className="w-full mb-2" />
            <InputText
                name="amount"
                onChange={handleOnchange}
                value={params.amount}
                keyfilter="int"
                placeholder="Cantidad"
                className="w-full mb-2" />
            <Button
                label="Crear"
                onClick={handleGetRandomSongs}
                className="mb-2 flex"
                severity="success"
                style={{ float: 'right' }} />

            {
                songList.length > 0 && (
                    <ScrollPanel style={{ width: '100%', height: '46vh' }}>
                        <DataTable
                            value={songList}
                            id="_id">
                            <Column field='name' header='Nombre' headerStyle={{ display: 'none' }} />
                            <Column field='chord' header='Nota' headerStyle={{ display: 'none' }} body={chordTemplate} />
                            <Column body={actionBodyTemplate} headerStyle={{ display: 'none' }}  exportable={false}></Column>

                        </DataTable>
                    </ScrollPanel>
                )
            }

            <OrdenarListComponent
                setIsVisibleSongList={setIsVisibleSongList}
                isVisibleSongList={isVisibleSongList}
                songList={songList}
                setSongList={setSongList}
                setIsVisible={setIsVisible}
            />
        </Dialog>
    )
}
