import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  classesSubjects: [
    { classId: 1, subjectIds: [1, 2] },
    { classId: 2, subjectIds: [3, 4] },
  ],
};

const classesSubjectsSlice = createSlice({
  name: 'classesSubjects',
  initialState,
  reducers: {
    setClassesSubjects: (state, action) => {
      state.classesSubjects = action.payload;
    },
    updateClassesSubjects(state, action) {
      const { classId, subjectIds } = action.payload;

      const cl = state.classesSubjects.find(rel => rel.classId === classId);

      if (cl) {
        cl.subjectIds = [...new Set([...cl.subjectIds, ...subjectIds])];
      } else {
        state.classesSubjects.push({ classId, subjectIds });
      }
    },

    addSubjectsToClasses: (state, action) => {
      const { classId, subjectIds } = action.payload;
      const subject = state.classesSubjects.find(cl => cl.classId === classId);

      if (subject) {
        subject.subjectIds = [...new Set([...subject.subjectIds, ...subjectIds])];
      } else {
        state.classesSubjects.push({ classId, subjectIds });
      }
    },

    removeSubjectsFromClasses: (state, action) => {
      const { classId, subjectIds } = action.payload;
      const cl = state.classesSubjects.find(cl => cl.classId === classId);

      if (cl) {
        cl.subjectIds = cl.subjectIds.filter(subjectId => !subjectIds.includes(subjectId));
      }
    },
  },
});

export const {
  setClassesSubjects,
  updateClassesSubjects,
  addSubjectsToClasses,
  removeSubjectsFromClasses,
} = classesSubjectsSlice.actions;

export default classesSubjectsSlice.reducer;
