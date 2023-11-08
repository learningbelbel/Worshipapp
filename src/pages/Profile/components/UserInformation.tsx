import { onChangeFunc } from "../../../utils/Util.HandleOnchange";

export const UserInformation = ({ userInformation, setUserInformation }: any) => {

    const handleOnchange = (event: any) => {
        onChangeFunc(event, userInformation, setUserInformation)
    }

    return (
        <div className="user-information">
            <form action="" onSubmit={(e) => e.preventDefault()}>
                <div className="section-1">
                    <div className="form-field">
                        <label htmlFor="name">Nombre</label>
                        <input type="text" name='name' value={userInformation.name} disabled onChange={handleOnchange} />
                    </div>
                    <div className="form-field">
                        <label htmlFor="lastName">Apellidos</label>
                        <input type="text" name="lastName" value={userInformation.lastName} disabled onChange={handleOnchange} />
                    </div>
                </div>
                <div className="section-1">
                    <div className="form-field">
                        <label htmlFor="email">Email</label>
                        <input type="text" name='email' value={userInformation.email} disabled onChange={handleOnchange} />
                    </div>
                    <div className="form-field">
                        <label htmlFor="status">Estado</label>
                        <input type="text" value={userInformation.status} disabled onChange={handleOnchange} />
                    </div>
                </div>
            </form>
        </div>
    )
}
