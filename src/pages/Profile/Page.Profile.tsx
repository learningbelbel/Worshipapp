import { useState, useEffect } from 'react';
import { UserMember } from '../../models/Model.RegularUser';
import { DOMAIN } from '../../config/Config.EndPoints';
import { UserService } from '../../services/Service.User';
import { ProfilePictureComponent } from './components/ProfilePictureComponent';
import { UserInformation } from './components/UserInformation';

const initalUserInformation: UserMember = {
    name: '',
    lastName: '',
    email: '',
    profile: '',
    profilePicture: '',
    status: ''
}

export const ProfilePage = () => {

    const userService = new UserService();

    const [userInformation, setUserInformation] = useState<UserMember>(initalUserInformation);
    const [profilePicture, setProfilePicture] = useState('');
    const [newPicture, setNewPicture] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchUserInformation();
    }, [isLoading])

    const fetchUserInformation = async () => {
        const resp = await userService.getUsersById();
        setUserInformation(resp.data.result);
        setProfilePicture(`${DOMAIN}/${resp.data.result.profilePicture}`)
    }

    return (
        <div className="page-container">
            <ProfilePictureComponent
                profilePicture={profilePicture}
                userInformation={userInformation}
                setNewPicture={setNewPicture}
            />
            <UserInformation
                userInformation={userInformation}
                setUserInformation={setUserInformation}
                newPicture={newPicture}
                setIsLoading={setIsLoading}
            />

        </div>
    )
}
