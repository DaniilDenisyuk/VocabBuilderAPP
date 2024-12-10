import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  teachersSubjects: [
    {
      subjectId: 1,
      teacherId: 1,
    },
    {
      subjectId: 1,
      teacherId: 2,
    },
  ],
};
const teacherSubjectSlice = createSlice({
  name: 'teachersSubjects',
  initialState,
  reducers: {
    setTeachersSubjects: (state, action) => {
      state.teachersSubjects = action.payload;
    },
    addTeachersToSubject: (state, action) => {
      console.log('Adding Subject Payload:', action.payload);
      state.teachersSubjects.push(action.payload);
      console.log('Updated TeachersSubjects:', state.teachersSubjects);
    },
    removeTeacherFromSubject: (state, action) => {
      console.log('Removing Subject Payload:', action.payload);
      state.teachersSubjects = state.teachersSubjects.filter(
        school =>
          school.subjectId !== action.payload.subjectId ||
          school.teacherId !== action.payload.teacherId
      );
      console.log('Updated TeachersSubjects:', state.teachersSubjects);
    },
  },
});

export const { setTeachersSubjects, addTeachersToSubject, removeTeacherFromSubject } =
  teacherSubjectSlice.actions;
export default teacherSubjectSlice.reducer;
