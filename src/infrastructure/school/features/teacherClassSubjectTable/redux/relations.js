import { createSelector, createSlice } from '@reduxjs/toolkit';

const initialState = {
  teachersSubjects: [
    { teacherId: 1, classId: 1, subjectIds: [1, 2] },
    { teacherId: 3, classId: 2, subjectIds: [3] },
  ], // teacherId, subjectId, classIds
  teachersClasses: [
    { teacherId: 1, subjectId: 1, classIds: [1, 2] },
    { teacherId: 2, subjectId: 2, classIds: [2, 3] },
    { teacherId: 3, subjectId: 2, classIds: [2, 3] },
  ], // teacherId, classId, subjectIds
  subjectsClasses: [
    { teacherId: 1, classId: 1, subjectIds: [1, 2] },
    { teacherId: 2, classId: 2, subjectIds: [2] },
    { teacherId: 3, classId: 3, subjectIds: [1, 2] },
    { teacherId: 4, classId: 4, subjectIds: [2] },
  ], // subjectId, classId, teacherIds
  teachersSubjectsClasses: [
    {
      teacherId: 1,
      subjectId: 2,
      classId: 3,
    },
    {
      teacherId: 1,
      subjectId: 2,
      classId: 4,
    },
    {
      teacherId: 2,
      subjectId: 3,
      classId: 5,
    },
  ],
  subjects: [],
  teachers: [],
  classes: [],
  selectedValues: {},
};

const relationsSlice = createSlice({
  name: 'relations',
  initialState,
  reducers: {
    setList(state, action) {
      const { subjects, teachers, classes } = action.payload;
      if (subjects) state.subjects = subjects;
      if (teachers) state.teachers = teachers;
      if (classes) state.classes = classes;
    },

    setTableData(state, action) {
      const { tableType, data } = action.payload;
      if (state[tableType]) {
        state[tableType] = data;
      }
    },

    updateSelectedValues(state, action) {
      const { cellId, selectedOptions } = action.payload;
      if (Array.isArray(selectedOptions)) {
        state.selectedValues[cellId] = selectedOptions;
      }
    },

    updateRelationByKey(state, action) {
      const { tableType, matchKeys, data } = action.payload;
      const table = state[tableType];
      if (!table) return;

      const existingRelationIndex = table.findIndex(relation =>
        matchKeys.every(key => relation[key] === data[key])
      );

      if (existingRelationIndex !== -1) {
        table[existingRelationIndex] = { ...table[existingRelationIndex], ...data };
      } else {
        table.push(data);
      }
    },

    addTeachersSubjectsClasses(state, action) {
      const { teacherId, subjectId, classIds } = action.payload;
      classIds.forEach(classId => {
        const exists = state.teachersSubjectsClasses.some(
          relation =>
            relation.teacherId === teacherId &&
            relation.subjectId === subjectId &&
            relation.classId === classId
        );
        if (!exists) {
          state.teachersSubjectsClasses.push({ teacherId, subjectId, classId });
        }
      });
    },
    toggleSelector(state, action) {
      const { cellId } = action.payload;
      if (state.activeSelectorCell === cellId) {
        state.activeSelectorCell = null;
      } else {
        state.activeSelectorCell = cellId;
      }
    },
  },
});

export const {
  setList,
  setTableData,
  updateSelectedValues,
  updateRelationByKey,
  addTeachersSubjectsClasses,
  toggleSelector,
} = relationsSlice.actions;

export const getTableData = (state, tableType) => state.relations[tableType];
export const selectSelectedValues = state => state.relations.selectedValues;

export default relationsSlice.reducer;

const selectTeachersState = state => state.teachers.teachers || [];
const selectClassesState = state => state.classes.classes || [];
const selectSubjectsState = state => state.subjects.subjects || [];
const selectTableDataState = (state, tableType) => state.relations[tableType] || [];

export const selectTeachers = createSelector([selectTeachersState], teachers =>
  teachers.filter(teacher => teacher.isActive)
);

export const selectClasses = createSelector([selectClassesState], classes => classes);

export const selectSubjects = createSelector([selectSubjectsState], subjects => subjects);

export const selectTableData = createSelector([selectTableDataState], tableData => tableData);
