import { Button } from "primereact/button";
import { useToast } from "../../../context/Context.Toast";
import { UserService } from "../../../services/Service.User";
import { onChangeFunc } from "../../../utils/Util.HandleOnchange";

export const UserInformation = ({ userInformation, newPicture, setIsLoading, setUserInformation }: any) => {

    const userService = new UserService();
    const toast = useToast();

    const handleSave = async () => {
        if (!newPicture) {
            return toast?.toast('warn', 'Error', 'Por favor selecciona una Imagen')
        }
        const formData = new FormData();
        formData.append("profilePicture", newPicture);
        setIsLoading(true)

        const resp = await userService.updateProfilePicture(formData);
        if(resp.status === 200) {
            toast?.toast('success','Exito', 'Foto de Perfil Cambiada!')
        }
        setIsLoading(false)

    }

    const handleOnchange = (event: any) => {
        onChangeFunc(event, userInformation, setUserInformation)
    }

    return (
        <div className="user-information">
            <form action="" onSubmit={(e) => e.preventDefault()}>
                <div className="section-1">
                    <div className="form-field">
                        <label htmlFor="name">Nombre</label>
                        <input type="text" name='name' value={userInformation.name} onChange={handleOnchange} />
                    </div>
                    <div className="form-field">
                        <label htmlFor="lastName">Apellidos</label>
                        <input type="text" name="lastName" value={userInformation.lastName} onChange={handleOnchange} />
                    </div>
                </div>
                <div className="section-1">
                    <div className="form-field">
                        <label htmlFor="email">Email</label>
                        <input type="text" name='email' value={userInformation.email} onChange={handleOnchange} />
                    </div>
                    <div className="form-field">
                        <label htmlFor="status">Estado</label>
                        <input type="text" value={userInformation.status} disabled onChange={handleOnchange} />
                    </div>
                </div>
                <div className="btn">
                    <Button label='Guardar' onClick={handleSave} />
                </div>
            </form>
        </div>
    )
}
