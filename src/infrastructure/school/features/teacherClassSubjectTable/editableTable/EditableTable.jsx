import { useMemo, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useReactTable, flexRender, getCoreRowModel } from '@tanstack/react-table';
import MultiSelect from '../../selects/MultiSelect';
import style from './index.module.scss';
import { updateRelationByKey } from '../redux/relations';
import SelectOptionsToText from '../../selects/SelectOptionsToText';
import EditCloseSelectButton from '../../selects/EditCloseSelectButton';

export default function EditableTable({ tableType = 'teachersSubjects' }) {
  const dispatch = useDispatch();

  // стан для редагування конкретної комірки
  const [editingCell, setEditingCell] = useState(null);

  // useEffect при зміні tableType скидає стан     setEditingCell(null);
  useEffect(() => {
    setEditingCell(null);
  }, [tableType]);

  const relations = useSelector(state => state.relations[tableType] || []);
  const teachers = useSelector(state => state.teachers.teachers || []);
  const classes = useSelector(state => state.classes.classes || []);
  const subjects = useSelector(state => state.subjects.subjects || []);

  const entitiesMap = useMemo(() => {
    switch (tableType) {
      case 'teachersSubjects':
        return {
          rows: teachers,
          columns: subjects,
          thirdEntity: classes,
          keys: ['teacherId', 'subjectId', 'classIds'],
        };
      case 'subjectsClasses':
        return {
          rows: subjects,
          columns: classes,
          thirdEntity: teachers,
          keys: ['subjectId', 'classId', 'teacherIds'],
        };
      case 'teachersClasses':
        return {
          rows: teachers,
          columns: classes,
          thirdEntity: subjects,
          keys: ['teacherId', 'classId', 'subjectIds'],
        };
      default:
        return { rows: [], columns: [], thirdEntity: [], keys: [] };
    }
  }, [tableType, teachers, subjects, classes]);

  const { rows, columns, keys } = entitiesMap;
  console.log('entitiesMap: ', entitiesMap);
  //entitiesMap:
  // {
  //   rows: [
  //     { id: 1, name: 'Teacher1' },
  //     { id: 2, name: 'Teacher2' },
  //     { id: 3, name: 'Teacher3' },
  //     { id: 4, name: 'Teacher4' },
  //     { id: 5, name: 'Teacher5' },
  //   ],
  //   columns: [
  //     { id: 101, name: 'Mathematics' },
  //     { id: 102, name: 'Physics' },
  //     { id: 103, name: 'Chemistry' },
  //   ],
  //   thirdEntity: [
  //     { id: 1, name: '1-A' }, { id: 2, name: '1-Б' }, { id: 3, name: '2-A' }, { id: 4, name: '2-Б' },
  //     { id: 5, name: '3-A' }, { id: 6, name: '3-Б' }, { id: 7, name: '4-А' }, { id: 8, name: '4-Б' },
  //     { id: 9, name: '5-А' }, { id: 10, name: '5-Б' },
  //   ],
  //   keys: ['teacherId', 'subjectId', 'classIds'],
  // }
  const [rowKey, colKey, cellKey] = keys;
  console.log('keys: ', keys);
  // keys:
  // (3) ['teacherId', 'subjectId', 'classIds']
  // 0: "teacherId"
  // 1: "subjectId"
  // 2: "classIds"
  // length: 3

  const tableData = useMemo(() => {
    return rows.map(row => {
      const rowData = { id: row.id, rowName: row.name };
      columns.forEach(col => {
        const relation = relations.find(rel => rel[rowKey] === row.id && rel[colKey] === col.id);
        rowData[col.id] = relation ? relation[cellKey] : [];
      });
      return rowData;
    });
  }, [rows, columns, relations, rowKey, colKey, cellKey]);

  const tableColumns = useMemo(() => {
    return [
      { accessorKey: 'rowName', header: 'Name' },
      ...columns.map(column => ({
        accessorKey: String(column.id),
        header: column.name,
        cell: cell => renderEditableCell(cell),
      })),
    ];
  }, [columns, relations, editingCell]);

  const renderEditableCell = cell => {
    const rowId = cell.row.original.id;
    const colId = cell.column.id;

    const isEditing = editingCell?.rowId === rowId && editingCell?.colId === colId;

    //  options MultiSelect
    const options = entitiesMap.thirdEntity.map(item => ({
      value: item.id,
      label: item.name,
    }));

    const currentRelation = relations.find(
      rel => rel[rowKey] === rowId && rel[colKey] === Number(colId)
    );

    const selectedOptions = currentRelation
      ? currentRelation[cellKey].map(id => ({
          value: id,
          label: entitiesMap.thirdEntity.find(entity => entity.id === id)?.name || '',
        }))
      : [];

    const handleEditToggle = () => {
      setEditingCell(prev =>
        prev?.rowId === rowId && prev?.colId === colId ? null : { rowId, colId }
      );
    };

    const handleChange = selected => {
      const selectedIds = selected.map(option => option.value);

      dispatch(
        updateRelationByKey({
          tableType,
          matchKeys: [rowKey, colKey],
          data: { [rowKey]: rowId, [colKey]: Number(colId), [cellKey]: selectedIds },
        })
      );
      //! закрити редагування після збереження
      setEditingCell(null);
    };

    return (
      <div className={style.cellContainer}>
        <EditCloseSelectButton isEditing={isEditing} onToggleEdit={handleEditToggle} />

        {isEditing ? (
          <MultiSelect options={options} value={selectedOptions} onChange={handleChange} />
        ) : (
          <span className={style.optionsList}>
            <SelectOptionsToText selectedOptions={selectedOptions} />
          </span>
        )}
      </div>
    );
  };

  const table = useReactTable({
    data: tableData,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (!rows.length || !columns.length) {
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
