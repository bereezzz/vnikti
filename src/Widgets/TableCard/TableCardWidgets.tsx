import React, { useMemo, useEffect, useState } from 'react';
import CustomButton from '../../Features/Button/CustomButton';
import TableCard from '../../Features/TableCardFeature/TableCard';
import { RootState } from '../../Store/RootReducer'
import { setCards,createCard } from '../../Entities/Cards/CardSlice';
import { useGetCardsQuery } from '../../Entities/Users/UsersAPIs';
import { useSelector, useDispatch } from 'react-redux'
import "../TableUser/tableUser.scss"
import ModalWindow from '../../Features/ModalWindow/ModalWindow';
import ModalCard from '../ModalCard/ModalCard';

interface TableCardWidgetsProps {

}

const TableCardWidgets: React.FC<TableCardWidgetsProps> = ({ }) => {
    const dispatch = useDispatch();
    const [active, setActive] = useState(false)
    const { data: cards, isLoading, isError,refetch: refetchCards } = useGetCardsQuery();

    useEffect(() => {

        if (cards) {
            dispatch(setCards(cards));
        }
    }, [cards]);
    return (
        <div className='tableUser'>
            <div className='buttonBlock'>
                <CustomButton onClick={() => setActive(true)}>Добавить запись</CustomButton>
            </div>
            <ModalWindow active={active} setActive={setActive}>
                <ModalCard active={active} setActive={setActive}  refetch={refetchCards} type={"add"}/>
            </ModalWindow>
            {
                cards !== undefined && <TableCard data={cards} refetch={refetchCards}></TableCard>
            }
        </div>
    )

};

export default TableCardWidgets;