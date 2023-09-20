import React, { useMemo, useEffect, useState } from 'react';
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from 'mantine-react-table';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPage, setCountRows } from './TableSlice';
import { RootState } from '../../Store/RootReducer';
import { User } from '../../Entities/Users/UsersSlice';
import { FaEdit, FaTrash } from 'react-icons/fa';
import ModalWindow from '../ModalWindow/ModalWindow';
import ModalUser from '../../Widgets/ModalUser/ModalUser';

interface TableProps {
  data: User[]
  refetch: () => void
}

const Table: React.FC<TableProps> = ({ data, refetch }) => {
  // Получение состояния пагинации из Redux
  const currentPage = useSelector((state: RootState) => state.table.currentPage);
  const countRows = useSelector((state: RootState) => state.table.countRows);

  //Хуки для активации модальных окон
  const [deleteActive, setDeleteActive] = useState(false)
  const [editActive, setEditActive] = useState(false)

  const dispatch = useDispatch();

  // Обработчик смены страницы
  const handlePageChange = (newPage: number) => {
    dispatch(setCurrentPage(newPage));
  };

  // Обработчик смены количества строк на странице
  const handleCountRows = (count: number) => {
    dispatch(setCountRows(count));
  }
  
   // Колонки таблицы
  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'id1',
      },
      {
        accessorKey: 'name',
        header: 'name1',
      },
      {
        accessorKey: 'email',
        header: 'email1',
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
          <ModalUser active={editActive} setActive={setEditActive}
            refetch={refetch} type={"edit"}
            nameProps={row.row.original.name}
            emailProps={row.row.original.email}
            id={row.row.original.id} />
        </ModalWindow>
        <ModalWindow active={deleteActive} setActive={setDeleteActive}>
          <ModalUser active={deleteActive} setActive={setDeleteActive}
            refetch={refetch} type={"del"}
            nameProps={row.row.original.name}
            emailProps={row.row.original.email}
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

export default Table;