import React, { useMemo, useEffect, useState } from 'react';
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from 'mantine-react-table';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPageCard, setCountRowsCard } from './TableCardSlice';
import { RootState } from '../../Store/RootReducer';
import { Card } from '../../Entities/Cards/CardSlice';
import { FaEdit, FaTrash } from 'react-icons/fa';
import ModalWindow from '../ModalWindow/ModalWindow';
import ModalCard from '../../Widgets/ModalCard/ModalCard';

interface TableCardProps {
  data: Card[]
  refetch: () => void

}

const TableCard: React.FC<TableCardProps> = ({ data, refetch }) => {

   // Получение состояния пагинации из Redux
  const currentPage = useSelector((state: RootState) => state.tableCard.currentPageCard);
  const countRows = useSelector((state: RootState) => state.tableCard.countRowsCard);
  
  //Хуки активации модальных окон
  const [deleteActive, setDeleteActive] = useState(false)
  const [editActive, setEditActive] = useState(false)

  const dispatch = useDispatch();

  // Обработчик смены страницы
  const handlePageChange = (newPage: number) => {
    dispatch(setCurrentPageCard(newPage));
  };

   // Обработчик смены количества строк на странице
  const handleCountRows = (count: number) => {
    dispatch(setCountRowsCard(count));
  }

    // Колонки таблицы
  const columns = useMemo<MRT_ColumnDef<Card>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'id',
      },
      {
        accessorKey: 'name',
        header: 'Пользователь',
      },
      {
        accessorKey: 'number',
        header: 'Номер карты',
      },
    ],
    [],
  );

  // Инициализация таблицы с помощью MantineReactTable
  const table = useMantineReactTable({
    columns,
    data,
    initialState: { pagination: { pageSize: Number(countRows), pageIndex: Number(currentPage) } },
    enableRowActions: true,
    renderRowActionMenuItems: (row) => (
      <div style={{ display: "flex", gap: "20px" }}>
        <FaEdit style={{ cursor: "pointer" }} onClick={() => { setEditActive(true) }} />
        <FaTrash style={{ cursor: "pointer" }} onClick={() => setDeleteActive(true)} />
        <ModalWindow active={editActive} setActive={setEditActive}>
          <ModalCard active={editActive} setActive={setEditActive}
            refetch={refetch} type={"edit"}
            nameProps={row.row.original.name}
            numberProps={row.row.original.number}
            id={row.row.original.id} />
        </ModalWindow>
        <ModalWindow active={deleteActive} setActive={setDeleteActive}>
          <ModalCard active={deleteActive} setActive={setDeleteActive}
            refetch={refetch} type={"del"}
            nameProps={row.row.original.name}
            numberProps={row.row.original.number}
            id={row.row.original.id} />
        </ModalWindow>
      </div>
    ),

  });


   // Эффекты для обновления Redux-состояния при изменении пагинации
  useEffect(() => {
    if (table.options.state?.pagination?.pageIndex !== undefined) {
      handlePageChange(table.options.state?.pagination?.pageIndex)
    }
  }, [table.options.state?.pagination?.pageIndex])
  useEffect(() => {
    if (table.options.state?.pagination?.pageSize !== undefined) {

      handleCountRows(table.options.state?.pagination?.pageSize)
    }
  }, [table.options.state?.pagination?.pageSize])
  
  return <MantineReactTable table={table} />;
};

export default TableCard;