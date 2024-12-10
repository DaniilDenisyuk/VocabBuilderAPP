import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  teachersClasses: [
    {
      classId: 1,
      teacherId: 1,
      isClassTeacher: false,
    },
    {
      classId: 1,
      teacherId: 2,
      isClassTeacher: false,
    },
    {
      classId: 3,
      teacherId: 3,
      isClassTeacher: true,
    },
  ],
};
const teachersClasses = createSlice({
  name: 'teachersClasses',
  initialState,
  reducers: {
    addTeachersToClass: (state, action) => {
      const { classId, teacherId } = action.payload;
      if (!state.teachersClasses.some(tc => tc.classId === classId && tc.teacherId === teacherId)) {
        state.teachersClasses.push({ classId, teacherId });
      }
    },
    removeTeacherFromClass: (state, action) => {
      const { classId, teacherId } = action.payload;
      state.teachersClasses = state.teachersClasses.filter(
        school => school.classId !== classId || school.teacherId !== teacherId
      );
    },
    setClassTeacher: (state, action) => {
      const { classId, teacherId } = action.payload;
      state.teachersClasses.forEach(tc => {
        if (tc.classId === classId) {
          tc.isClassTeacher = false;
        }
      });
      const teacher = state.teachersClasses.find(
        tc => tc.classId === classId && tc.teacherId === teacherId
      );

      if (teacher) {
        teacher.isClassTeacher = true;
      } else {
        state.teachersClasses.push({ classId, teacherId, isClassTeacher: true });
      }
    },
  },
});

export const { addTeachersToClass, removeTeacherFromClass, setClassTeacher } =
  teachersClasses.actions;
export default teachersClasses.reducer;
