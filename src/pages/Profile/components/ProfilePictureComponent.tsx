import { Avatar } from 'primereact/avatar'
import { FileUpload } from 'primereact/fileupload'


export const ProfilePictureComponent = ({ profilePicture, userInformation, setNewPicture }: any) => {

    const chooseOptions = {
        icon: 'pi pi-pencil',
        iconOnly: true,
        className: 'chooseBtn'
    };

    const handleFileChange = (event: any) => {
        setNewPicture(event.files[0]);

    };

    return (
        <div className="profile-picture-container">
            <div className="picture pt-2">
                <Avatar
                    image={profilePicture}
                    size="xlarge"
                    shape="circle"
                    className='img'
                />
                <FileUpload
                    mode="basic"
                    name="profilePicture"
                    chooseOptions={chooseOptions}
                    accept="image/*"
                    onSelect={handleFileChange} />
            </div>
            <div className="user-name">
                <h3>{userInformation.name} {userInformation.lastName}</h3>
            </div>
        </div>
    )
}
