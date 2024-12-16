import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  classes: [
    { id: 1, name: '1-A', teacherIds: [], pupilIds: [], subjectIds: [] },
    { id: 2, name: '1-Б', teacherIds: [], pupilIds: [], subjectIds: [] },
    { id: 3, name: '2-A', teacherIds: [], pupilIds: [], subjectIds: [] },
    { id: 4, name: '2-Б', teacherIds: [], pupilIds: [], subjectIds: [] },
    { id: 5, name: '3-A', teacherIds: [], pupilIds: [], subjectIds: [] },
    { id: 6, name: '3-Б', teacherIds: [], pupilIds: [], subjectIds: [] },
    { id: 7, name: '4-А', teacherIds: [], pupilIds: [], subjectIds: [] },
    { id: 8, name: '4-Б', teacherIds: [], pupilIds: [], subjectIds: [] },
    { id: 9, name: '5-А', teacherIds: [], pupilIds: [], subjectIds: [] },
    { id: 10, name: '5-Б', teacherIds: [], pupilIds: [], subjectIds: [] },
  ],
};

const classesSlice = createSlice({
  name: 'classes',
  initialState,
  reducers: {
    addClass: (state, action) => {
      const newClass = action.payload;
      state.classes.push({ ...newClass, teacherIds: [], pupilIds: [], subjectIds: [] });
    },

    removeClass: (state, action) => {
      const classId = action.payload;
      state.classes = state.classes.filter(cls => cls.id !== classId);
    },

    updateClassTeachers: (state, action) => {
      const { classId, teacherIds } = action.payload;
      const classData = state.classes.find(cls => cls.id === classId);
      if (classData) {
        classData.teacherIds = Array.isArray(teacherIds) ? teacherIds : [];
      }
    },

    updateClassPupils: (state, action) => {
      const { classId, pupilIds } = action.payload;
      const classData = state.classes.find(cls => cls.id === classId);
      if (classData) {
        classData.pupilIds = Array.isArray(pupilIds) ? pupilIds : [];
      }
    },

    updateClassSubjects: (state, action) => {
      const { classId, subjectIds } = action.payload;
      const classData = state.classes.find(cls => cls.id === classId);
      if (classData) {
        classData.subjectIds = Array.isArray(subjectIds) ? subjectIds : [];
      }
    },

    addTeacherToClass: (state, action) => {
      const { classId, teacherId } = action.payload;
      const classData = state.classes.find(cls => cls.id === classId);
      if (classData && !classData.teacherIds.includes(teacherId)) {
        classData.teacherIds.push(teacherId);
      }
    },

    removeTeacherFromClass: (state, action) => {
      const { classId, teacherId } = action.payload;
      const classData = state.classes.find(cls => cls.id === classId);
      if (classData) {
        classData.teacherIds = classData.teacherIds.filter(id => id !== teacherId);
      }
    },

    addPupilToClass: (state, action) => {
      const { classId, pupilId } = action.payload;
      const classData = state.classes.find(cls => cls.id === classId);
      if (classData && !classData.pupilIds.includes(pupilId)) {
        classData.pupilIds.push(pupilId);
      }
    },

    removePupilFromClass: (state, action) => {
      const { classId, pupilId } = action.payload;
      const classData = state.classes.find(cls => cls.id === classId);
      if (classData) {
        classData.pupilIds = classData.pupilIds.filter(id => id !== pupilId);
      }
    },

    addSubjectToClass: (state, action) => {
      const { classId, subjectId } = action.payload;
      const classData = state.classes.find(cls => cls.id === classId);
      if (classData && !classData.subjectIds.includes(subjectId)) {
        classData.subjectIds.push(subjectId);
      }
    },

    removeSubjectFromClass: (state, action) => {
      const { classId, subjectId } = action.payload;
      const classData = state.classes.find(cls => cls.id === classId);
      if (classData) {
        classData.subjectIds = classData.subjectIds.filter(id => id !== subjectId);
      }
    },
  },
});

export const selectClassById = (state, classId) =>
  state.classes.classes.find(cls => cls.id === classId);

export const {
  addClass,
  removeClass,
  updateClassTeachers,
  updateClassPupils,
  updateClassSubjects,
  addTeacherToClass,
  removeTeacherFromClass,
  addPupilToClass,
  removePupilFromClass,
  addSubjectToClass,
  removeSubjectFromClass,
} = classesSlice.actions;

export default classesSlice.reducer;
