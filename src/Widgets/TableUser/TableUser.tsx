import React, { useEffect, useState } from 'react';
import CustomButton from '../../Features/Button/CustomButton';
import Table from '../../Features/TableFeature/Table';
import { setUsers } from '../../Entities/Users/UsersSlice';
import { useGetUsersQuery } from '../../Entities/Users/UsersAPIs';
import { useDispatch } from 'react-redux'
import "./tableUser.scss"
import ModalWindow from '../../Features/ModalWindow/ModalWindow';
import ModalUser from '../ModalUser/ModalUser';
interface TableUserProps {

}

const TableUser: React.FC<TableUserProps> = ({ }) => {
    const dispatch = useDispatch();
    const [active, setActive] = useState(false)
    const { data: users, isLoading, isError, refetch: refetchUsers } = useGetUsersQuery();

    // Обновление Redux хранилища с данными о людях
    useEffect(() => {
        if (users) {
            dispatch(setUsers(users));
        }
    }, [users]);
    return (
        <div className='tableUser'>
            <div className='buttonBlock'>
                {/* Кнопка для открытия модального окна для добавления записи */}
                <CustomButton onClick={() => setActive(true)}>Добавить запись</CustomButton>
            </div>
            {/* Модальное окно для добавления записи */}
            <ModalWindow active={active} setActive={setActive}>
                <ModalUser active={active} setActive={setActive} refetch={refetchUsers} type={"add"} />
            </ModalWindow>
            {
                users !== undefined && <Table data={users} refetch={refetchUsers}></Table>
            }
        </div>
    )

};

export default TableUser;