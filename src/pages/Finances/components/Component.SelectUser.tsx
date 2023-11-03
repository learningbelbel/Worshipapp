import { Dropdown } from 'primereact/dropdown'
import { useState, useEffect } from 'react';
import { UserService } from '../../../services/Service.User';

export const SelectUser = ({ setSelectedUser, selectedUser }: any) => {

    const [userList, setUserList] = useState([]);
    const userService = new UserService();

    useEffect(() => {
        getUserList();
    }, [])

    const getUserList = async () => {
        const list = await userService.getUsers();
        setUserList(list.data.result);
    }

    return (
        <Dropdown 
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.value)}
            options={userList}
            optionLabel={'name'}
            placeholder="Seleccionar"
            className="w-full "
        />
    )
}
