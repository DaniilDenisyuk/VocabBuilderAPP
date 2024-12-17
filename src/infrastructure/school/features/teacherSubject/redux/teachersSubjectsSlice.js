import { createSelector, createSlice } from '@reduxjs/toolkit';

const initialState = {
  teachersSubjects: [
    { teacherId: 1, classId: 1, subjectIds: [1, 2] },
    { teacherId: 3, classId: 2, subjectIds: [3, 4] },
  ], //teacherId, subjectId, classIds
};

const teachersSubjectsSlice = createSlice({
  name: 'teachersSubjects',
  initialState,
  reducers: {
    setTeachersSubjects: (state, action) => {
      state.teachersSubjects = action.payload;
    },
    updateTeachersSubjects(state, action) {
      const { teacherId, subjectIds } = action.payload;

      const teacher = state.teachersSubjects.find(rel => rel.teacherId === teacherId);

      if (teacher) {
        teacher.subjectIds = [...new Set([...teacher.subjectIds, ...subjectIds])];
      } else {
        state.teachersSubjects.push({ teacherId, subjectIds });
      }
    },
    addTeachersToSubject: (state, action) => {
      const { teacherId, subjectIds } = action.payload;
      const teacher = state.teachersSubjects.find(teacher => teacher.teacherId === teacherId);

      if (teacher) {
        teacher.subjectIds = [...new Set([...teacher.subjectIds, ...subjectIds])];
      } else {
        state.teachersSubjects.push(action.payload);
      }
    },
    removeTeacherFromSubject: (state, action) => {
      const { teacherId, subjectIds } = action.payload;
      const teacher = state.teachersSubjects.find(teacher => teacher.teacherId === teacherId);

      if (teacher) {
        teacher.subjectIds = teacher.subjectIds.filter(id => !subjectIds.includes(id));
        if (teacher.subjectIds.length === 0) {
          state.teachersSubjects = state.teachersSubjects.filter(
            teacher => teacher.teacherId !== teacherId
          );
        }
      }
    },
  },
});

export const {
  setTeachersSubjects,
  updateTeachersSubjects,
  addTeachersToSubject,
  removeTeacherFromSubject,
} = teachersSubjectsSlice.actions;

export default teachersSubjectsSlice.reducer;

export const selectSubjectsForTeacher = createSelector(
  [state => state.teachersSubjects],
  teachersSubjects => {
    const subjectsMap = teachersSubjects.reduce((acc, rel) => {
      acc[rel.teacherId] = rel.subjectIds;
      return acc;
    }, {});
    return subjectsMap;
  }
);
