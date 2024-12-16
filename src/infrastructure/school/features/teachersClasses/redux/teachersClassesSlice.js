import { createSelector, createSlice } from '@reduxjs/toolkit';

const initialState = {
  teachersClasses: [],
};

const teachersClassesSlice = createSlice({
  name: 'teachersClasses',
  initialState,
  reducers: {
    setTeacherClass: (state, action) => {
      const { teacherId, classId } = action.payload;
      const teacher = state.teachersClasses.find(tc => tc.teacherId === teacherId);

      if (teacher) {
        if (teacher.classIds.includes(classId)) {
          teacher.teacherClassId = classId;
        } else {
          throw new Error(
            `Class with ID ${classId} is not assigned to teacher with ID ${teacherId}`
          );
        }
      } else {
        throw new Error(`Teacher with ID ${teacherId} not found`);
      }
    },

    addTeacherToClass: (state, action) => {
      const { teacherId, classIds } = action.payload;
      const teacher = state.teachersClasses.find(tc => tc.teacherId === teacherId);

      if (teacher) {
        teacher.classIds = [...new Set([...teacher.classIds, ...classIds])];
      } else {
        state.teachersClasses.push(action.payload);
      }
    },
    removeTeacherFromClass: (state, action) => {
      const { teacherId, classIds } = action.payload;
      const teacher = state.teachersClasses.find(tc => tc.teacherId === teacherId);

      if (teacher) {
        teacher.classIds = teacher.classIds.filter(classId => !classIds.includes(classId));
        if (teacher.classIds.length === 0) {
          state.teachersClasses = state.teachersClasses.filter(
            teacher => teacher.teacherId !== teacherId
          );
        }
      }
    },
  },
});

export const { setTeacherClass, addTeacherToClass, removeTeacherFromClass } =
  teachersClassesSlice.actions;

export default teachersClassesSlice.reducer;

export const selectTeacherClasses = createSelector(
  [state => state.teachersClasses.teachersClasses, (state, teacherId) => teacherId],
  (teachersClasses, teacherId) =>
    teachersClasses.find(rel => rel.teacherId === teacherId)?.classIds || []
);
