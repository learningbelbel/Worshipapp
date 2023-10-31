import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { ScrollPanel } from "primereact/scrollpanel";
import { MultiSelect } from "primereact/multiselect";
import { useState } from "react";
import { SongService } from "../../../services/Service.Song";
import { useToast } from "../../../context/Context.Toast";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import { Nullable } from "primereact/ts-helpers";
import { SongListService } from "../../../services/Service.ListService";

interface SongModel {
    name: string;
    chord: string[];
}

interface ParamsModel {
    notes: string[];
    amount: string;
}

export const CreateRandomListDialog = ({ setIsVisible }: any) => {

    const service = new SongService();
    const listService = new SongListService();
    const toast = useToast();

    const initialParamsState = {
        notes: [],
        amount: '',
    }

    const [listDate, setListDate] = useState<Nullable<Date>>();
    const [songList, setSongList] = useState<SongModel[]>([]);
    const [params, setParams] = useState<ParamsModel>(initialParamsState)
    const [isVisibleCalendar, setIsVisibleCalendar] = useState(false)
    const chords = ["Am", "Cm", 'Em', 'Dm', 'Gm', 'G','C'];

    const handleOnchange = (e: any) => {
        if (e.target.name === 'notes') {
            setParams({
                ...params,
                [e.target.name]: e.target.value
            })
            return;
        }
        setParams({
            ...params,
            [e.target.name]: e.target.value
        })
    }

    const handleGetRandomSongs = async () => {
        if(!params.amount || params.notes.length === 0) {
            return toast?.toast('warn','Error', 'Todos los campos deben estar llenos')
        }
        const list = await service.getRandomSong(params);
        setSongList(list.data.result)
    }

    const handleSaveList = async () => {

        const res = await listService.createList({ songs: songList, date: listDate })

        if (res.status !== 200) {
            return toast?.toast('error', 'Error', 'Error al crear el Listado!')
        }
        setIsVisibleCalendar(false)
        setIsVisible(false)
        toast?.toast('success', 'Exito', 'Listado creado exitosamente!')
    }

    const handleUpdateSong = (index: number, song: SongModel, e: any) => {
        const updatedSongList: SongModel[] = [...songList];
        updatedSongList[index] = { ...song, chord: [e.value] };
        setSongList(updatedSongList);
    }

    const handleVerifySong = () => {
        const isValid = songList.every((song) => song.chord.length <= 1);

        if (!isValid) {
            toast?.toast('warn', 'Error', 'Se permite una sola Nota por Canción!')
            return;
        }
        setIsVisibleCalendar(true);
    }

    const renderSongList = () => {
        return songList.map((song: SongModel, index) => {
            return <li key={index}>
                <span>{song.name}</span>
                <Dropdown
                    value={song.chord[0]}
                    options={song.chord}
                    disabled={song.chord.length > 1 ? false : true}
                    onChange={(e) => handleUpdateSong(index, song, e)}
                    className="dropdown-style" />
            </li>
        })
    }

    const footerContent = (
        <div>
            <Button label="Cancelar" icon="pi pi-times" onClick={() => setIsVisibleCalendar(false)} className="p-button-text" severity="danger" />
            <Button label="Guardar" icon="pi pi-check" onClick={() => handleSaveList()} autoFocus severity="success" />
        </div>
    );

    return (
        <div className="dialog-container">
            <div className="dialog-header">
                <MultiSelect
                    name="notes"
                    value={params.notes}
                    onChange={handleOnchange}
                    options={chords}
                    placeholder="Seleccionar Acordes"
                    maxSelectedLabels={3}
                    className="w-full mb-2"
                />
                <InputText
                    name="amount"
                    onChange={handleOnchange}
                    value={params.amount}
                    keyfilter="int"
                    placeholder="Cantidad"
                    className="w-full mb-2"
                />
                <Button
                    label="Crear"
                    onClick={handleGetRandomSongs}
                    className="mb-2 flex"
                    severity="success"
                    style={{ float: 'right' }}
                />
            </div>

            <div className="dialog-content">
                <ScrollPanel style={{ width: '100%', height: '40vh' }}>
                    {renderSongList()}
                </ScrollPanel>
            </div>

            <div className="dialog-footer">
                {
                    songList.length > 0 && (
                        <Button
                            className="footer-btn"
                            label="Guardar Listado"
                            onClick={handleVerifySong}
                            severity="success" />
                    )
                }
            </div>

            <Dialog header="Seleccionar Fecha" className="calendar-dialog" visible={isVisibleCalendar} onHide={() => setIsVisibleCalendar(false)} footer={footerContent}>
                <small>Seleccione la Fecha para el Listado: </small>
                <Calendar value={listDate} onChange={(e) => setListDate(e.value)} style={{ width: '100vw' }} />
            </Dialog>
        </div>
    )
}
