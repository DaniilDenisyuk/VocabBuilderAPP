import { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useReactTable, flexRender, getCoreRowModel } from '@tanstack/react-table';
import MultiSelect from '../../selects/MultiSelect';
import style from './index.module.scss';
import { updateRelationByKey } from '../redux/relations';

export default function EditableTable({ tableType = 'teachersSubjects' }) {
  const dispatch = useDispatch();

  const relations = useSelector(state => state.relations[tableType] || []);
  const teachers = useSelector(state => state.teachers.teachers || []);
  const classes = useSelector(state => state.classes.classes || []);
  const subjects = useSelector(state => state.subjects.subjects || []);
  const teachersSubjectsClasses = useSelector(state => state.relations.teachersSubjectsClasses);

  const getRelationEntities = useMemo(() => {
    switch (tableType) {
      case 'teachersSubjects':
        return {
          rowEntity: teachers,
          columnEntity: subjects,
          thirdEntity: classes,
          keys: ['teacherId', 'subjectId', 'classIds'],
        };
      case 'subjectsClasses':
        return {
          rowEntity: subjects,
          columnEntity: classes,
          thirdEntity: teachers,
          keys: ['subjectId', 'classId', 'teacherIds'],
        };
      case 'teachersClasses':
        return {
          rowEntity: teachers,
          columnEntity: classes,
          thirdEntity: subjects,
          keys: ['teacherId', 'classId', 'subjectIds'],
        };
      default:
        return { rowEntity: [], columnEntity: [], thirdEntity: [], keys: [] };
    }
  }, [tableType, teachers, subjects, classes]);

  const { rowEntity, columnEntity, thirdEntity, keys } = getRelationEntities;

  const { columns, data } = useMemo(() => {
    if (
      !teachers.length ||
      !classes.length ||
      !subjects.length ||
      !teachersSubjectsClasses.length
    ) {
      return { columns: [], data: [] };
    }

    const [rowKey, colKey, cellKey] = keys;

    const tableColumns = [
      { accessorKey: 'rowName', header: 'Name' },
      ...columnEntity.map(entity => ({
        accessorKey: String(entity.id),
        header: entity.name,
        cell: info => renderMultiSelect(info, rowKey, colKey, cellKey),
      })),
    ];

    const tableData = rowEntity.map(row => {
      const rowData = { rowName: row.name, id: row.id };

      columnEntity.forEach(col => {
        const relation = relations.find(rel => rel[rowKey] === row.id && rel[colKey] === col.id);
        rowData[col.id] = relation ? relation[cellKey] : [];
      });

      return rowData;
    });

    return { columns: tableColumns, data: tableData };
  }, [rowEntity, columnEntity, relations, keys]);

  const renderMultiSelect = (cell, rowKey, colKey, cellKey) => {
    const rowId = cell.row.original.id;
    const colId = cell.column.id;

    const relation = relations.find(rel => rel[rowKey] === rowId && rel[colKey] === Number(colId));

    const selectedEntities = relation ? relation[cellKey] : [];
    const options = thirdEntity.map(entity => ({
      value: entity.id,
      label: entity.name,
    }));

    return (
      <MultiSelect
        options={options}
        value={selectedEntities.map(id => ({
          value: id,
          label: thirdEntity.find(entity => entity.id === id)?.name || '',
        }))}
        onChange={selected => {
          const selectedIds = selected.map(option => option.value);
          dispatch(
            updateRelationByKey({
              tableType,
              matchKeys: [rowKey, colKey],
              data: { [rowKey]: rowId, [colKey]: Number(colId), [cellKey]: selectedIds },
            })
          );
        }}
      />
    );
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (!rowEntity.length || !columnEntity.length) {
    return <p>No data available</p>;
  }

  return (
    <div className={style.tableContainer}>
      <table className={style.table}>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
