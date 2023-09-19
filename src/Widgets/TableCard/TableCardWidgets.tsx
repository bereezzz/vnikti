import React, { useMemo, useEffect, useState } from 'react';
import CustomButton from '../../Features/Button/CustomButton';
import TableCard from '../../Features/TableCardFeature/TableCard';
import { RootState } from '../../Store/RootReducer'
import { setCards,createCard } from '../../Entities/Cards/CardSlice';
import { useGetCardsQuery } from '../../Entities/Users/UsersAPIs';
import { useSelector, useDispatch } from 'react-redux'
import "../TableUser/tableUser.scss"
import ModalWindow from '../../Features/ModalWindow/ModalWindow';


interface TableCardWidgetsProps {

}

const TableCardWidgets: React.FC<TableCardWidgetsProps> = ({ }) => {
    const dispatch = useDispatch();
    const [active, setActive] = useState(false)
    const { data: cards, isLoading, isError,refetch: refetchCards } = useGetCardsQuery();

    useEffect(() => {
        console.log(cards)
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
                {/* <ModalUser active={active} setActive={setActive}  refetch={refetchUsers} type={"add"}/> */}
            </ModalWindow>
            {
                cards !== undefined && <TableCard data={cards} refetch={refetchCards}></TableCard>
            }
        </div>
    )

};

export default TableCardWidgets;