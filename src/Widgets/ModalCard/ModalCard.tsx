import React, { useState, useEffect } from "react";
import { Input } from '@mantine/core';
import CustomButton from "../../Features/Button/CustomButton";
import "../ModalUser/modalUser.scss"
import {  useCreateCardMutation, useUpdateCardMutation, useDeleteCardMutation  } from '../../Entities/Users/UsersAPIs';
import {  useDispatch } from 'react-redux'

interface ModalCardInterface {
    setActive: (check: boolean) => void; // Функция для установки активности модального окна
    active: boolean; // Флаг активности модального окна
    refetch: () => void // Функция для перезагрузки данных
    type: string, // Тип модального окна ("add", "edit", "del")
    nameProps?: string, // Имя карточки (для редактирования и удаления)
    numberProps?: string,  // Номер карты (для редактирования и удаления)
    id?: number, // Идентификатор строки
}

const ModalCard: React.FC<ModalCardInterface> = ({ active, setActive, refetch, type, nameProps, numberProps, id }) => {
    const [createCardMutation] = useCreateCardMutation();
    const [name, setName] = useState("")
    const [number, setNumber] = useState("")
    const [updateCardMutation] = useUpdateCardMutation();
    const [deleteCardMutation] = useDeleteCardMutation();
    const dispatch = useDispatch();
    //Добавление пользователя
    const handleCreateCard = async () => {
        try {
            const newCard = {
                name: name,
                number: number,
            };
            const resultAction = await createCardMutation(newCard)
            console.log(resultAction)
            setActive(false)
            refetch();
        } catch (error) {
            console.error('Ошибка при создании пользователя:', error);
        }
    };
    //Редактирование пользователя
    const handleEditCard = async () => {
        try {
            const updatedCard = {
                name: name,
                number: number,
            };
            if (id !== undefined) {
                const resultAction = await updateCardMutation({ id: id, card: updatedCard });
            }
            setActive(false);
            refetch();
        } catch (error) {
            console.error('Ошибка при редактировании пользователя:', error);
        }
    };
    //Удаление пользователя
    const handleDeleteCard = async () => {
        try {
            if (id !== undefined) {
                const resultAction = await deleteCardMutation(id); 
            }
            setActive(false);
            refetch();
        } catch (error) {
            console.error('Ошибка при удалении пользователя:', error);
        }
    };
     // Установка значений полей при редактировании
    useEffect(() => {
        if (type === "edit" && numberProps !== undefined && nameProps !== undefined) {
            setNumber(numberProps)
            setName(nameProps)
        }
    }, [])
    if (type === "add" || type === "edit") {
        return (
            <div className="modalUser">
                <Input radius="md" placeholder="Введите имя" value={name} onChange={(e) => setName(e.target.value)} />
                <Input radius="md" placeholder="Введите номер карты" value={number} onChange={(e) => setNumber(e.target.value)} />
                {type === "add" ? <CustomButton onClick={() => handleCreateCard()}>Добавить</CustomButton> :
                    <CustomButton onClick={() => handleEditCard()}>Редактировать</CustomButton>
                }

                <CustomButton onClick={() => setActive(false)}>Отмена</CustomButton>
            </div>
        )
    } else return (
        <div className="deleteBlock">
            <div>Вы действительно хотите удалить юзера {nameProps}?</div>
            <CustomButton onClick={() => handleDeleteCard()}>Удалить</CustomButton>
            <CustomButton onClick={() => setActive(false)}>Отмена</CustomButton>
        </div>
    )



};

export default ModalCard;
