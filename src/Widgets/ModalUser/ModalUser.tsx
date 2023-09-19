import React, { useState, useEffect } from "react";
import { Input } from '@mantine/core';
import CustomButton from "../../Features/Button/CustomButton";
import "./modalUser.scss"
import { useCreateUserMutation, useUpdateUserMutation, useDeleteUserMutation } from '../../Entities/Users/UsersAPIs';
import { useSelector, useDispatch } from 'react-redux'
import { addUser } from '../../Entities/Users/UsersSlice';
interface ModalUserInterface {
    setActive: (check: boolean) => void;
    active: boolean;
    refetch: () => void
    type: string,
    nameProps?: string,
    emailProps?: string,
    id?: number,
}

const ModalUser: React.FC<ModalUserInterface> = ({ active, setActive, refetch, type, nameProps, emailProps, id }) => {
    const [createUserMutation] = useCreateUserMutation();
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [updateUserMutation] = useUpdateUserMutation();
    const [deleteUserMutation] = useDeleteUserMutation();
    const dispatch = useDispatch();
    //Добавление пользователя
    const handleCreateUser = async () => {
        try {
            const newUser = {
                name: name,
                email: email,
            };
            const resultAction = await createUserMutation(newUser)
            setActive(false)
            refetch();
        } catch (error) {
            console.error('Ошибка при создании пользователя:', error);
        }
    };
    //Редактирование пользователя
    const handleEditUser = async () => {
        try {
            const updatedUser = {
                name: name,
                email: email,
            };
            if (id !== undefined) {
                const resultAction = await updateUserMutation({ id: id, user: updatedUser });
            }
            setActive(false);
            refetch();
        } catch (error) {
            console.error('Ошибка при редактировании пользователя:', error);
        }
    };
    //Удаление пользователя
    const handleDeleteUser = async () => {
        try {
            if (id !== undefined) {
                const resultAction = await deleteUserMutation(id); 
            }
            setActive(false);
            refetch();
        } catch (error) {
            console.error('Ошибка при удалении пользователя:', error);
        }
    };
    useEffect(() => {
        if (type === "edit" && emailProps !== undefined && nameProps !== undefined) {
            setEmail(emailProps)
            setName(nameProps)
        }
    }, [])
    if (type === "add" || type === "edit") {
        return (
            <div className="modalUser">
                <Input radius="md" placeholder="Введите имя" value={name} onChange={(e) => setName(e.target.value)} />
                <Input radius="md" placeholder="Введите email" value={email} onChange={(e) => setEmail(e.target.value)} />
                {type === "add" ? <CustomButton onClick={() => handleCreateUser()}>Добавить</CustomButton> :
                    <CustomButton onClick={() => handleEditUser()}>Редактировать</CustomButton>
                }

                <CustomButton onClick={() => setActive(false)}>Отмена</CustomButton>
            </div>
        )
    } else return (
        <div className="deleteBlock">
            <div>Вы действительно хотите удалить юзера {nameProps}?</div>
            <CustomButton onClick={() => handleDeleteUser()}>Удалить</CustomButton>
            <CustomButton onClick={() => setActive(false)}>Отмена</CustomButton>
        </div>
    )



};

export default ModalUser;
