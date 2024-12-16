import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  subjects: [
    { id: 101, name: 'Mathematics' },
    { id: 102, name: 'Physics' },
    { id: 103, name: 'Chemistry' },
  ],
  teachersClasses: [],
  teachersSubjects: [],
  teachersClassesSubjects: [],
};

const subjectsSlice = createSlice({
  name: 'subjects',
  initialState,
  reducers: {
    addSubject: (state, action) => {
      const newSubject = action.payload;
      state.subjects.push(newSubject);

      state.teachersClasses.push({ subjectId: newSubject.id, classIds: [] });
      state.teachersSubjects.push({ subjectId: newSubject.id, teacherIds: [] });
      state.teachersClassesSubjects.push({
        subjectId: newSubject.id,
        teacherIds: [],
        classIds: [],
      });
    },
    removeSubject: (state, action) => {
      const subjectId = action.payload;
      state.subjects = state.subjects.filter(subject => subject.id !== subjectId);

      state.teachersClasses = state.teachersClasses.filter(item => item.subjectId !== subjectId);
      state.teachersSubjects = state.teachersSubjects.filter(item => item.subjectId !== subjectId);
      state.teachersClassesSubjects = state.teachersClassesSubjects.filter(
        item => item.subjectId !== subjectId
      );
    },
    addTeacherToSubject: (state, action) => {
      const { subjectId, teacherId } = action.payload;
      const subject = state.teachersSubjects.find(sub => sub.subjectId === subjectId);

      if (subject && !subject.teacherIds.includes(teacherId)) {
        subject.teacherIds.push(teacherId);
      }
    },
    removeTeacherFromSubject: (state, action) => {
      const { subjectId, teacherId } = action.payload;
      const subject = state.teachersSubjects.find(sub => sub.subjectId === subjectId);

      if (subject) {
        subject.teacherIds = subject.teacherIds.filter(id => id !== teacherId);
      }
    },
  },
});

export const { addSubject, removeSubject, addTeacherToSubject, removeTeacherFromSubject } =
  subjectsSlice.actions;

export default subjectsSlice.reducer;
