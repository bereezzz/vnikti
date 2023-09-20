import React, { useEffect, useState } from 'react';
import CustomButton from '../../Features/Button/CustomButton';
import TableCard from '../../Features/TableCardFeature/TableCard';
import { setCards } from '../../Entities/Cards/CardSlice';
import { useGetCardsQuery } from '../../Entities/Users/UsersAPIs';
import { useDispatch } from 'react-redux'
import "../TableUser/tableUser.scss"
import ModalWindow from '../../Features/ModalWindow/ModalWindow';
import ModalCard from '../ModalCard/ModalCard';

interface TableCardWidgetsProps {

}

const TableCardWidgets: React.FC<TableCardWidgetsProps> = ({ }) => {
    const dispatch = useDispatch();
    const [active, setActive] = useState(false)
    const { data: cards, refetch: refetchCards } = useGetCardsQuery();

    // Обновление Redux хранилища с данными о карточках
    useEffect(() => {
        if (cards) {
            dispatch(setCards(cards));
        }
    }, [cards]);

    return (
        <div className='tableUser'>
            <div className='buttonBlock'>
                 {/* Кнопка для открытия модального окна для добавления записи */}
                <CustomButton onClick={() => setActive(true)}>Добавить запись</CustomButton>
            </div>
              {/* Модальное окно для добавления записи */}
            <ModalWindow active={active} setActive={setActive}>
                <ModalCard active={active} setActive={setActive} refetch={refetchCards} type={"add"} />
            </ModalWindow>
            {
                cards !== undefined && <TableCard data={cards} refetch={refetchCards}></TableCard>
            }
        </div>
    )

};

export default TableCardWidgets;