import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  teachers: [
    { id: 1, name: 'Teacher1' },
    { id: 2, name: 'Teacher2' },
    { id: 3, name: 'Teacher3' },
    { id: 4, name: 'Teacher4' },
    { id: 5, name: 'Teacher5' },
  ],
  teachersClasses: [],
  teachersSubjects: [],
  teachersClassesSubjects: [],
};

const findTeacherById = (array, teacherId) => array.find(item => item.teacherId === teacherId);

const teachersSlice = createSlice({
  name: 'teachers',
  initialState,
  reducers: {
    updateTeacherSubjects: (state, action) => {
      const { teacherId, subjectIds } = action.payload;
      const teacherSubjects = state.teachersSubjects.find(item => item.teacherId === teacherId);

      if (teacherSubjects) {
        teacherSubjects.subjectIds = Array.isArray(subjectIds) ? subjectIds : [];
      }
    },
    setTeachers: (state, action) => {
      state.teachers = action.payload;
    },
    addTeacher: (state, action) => {
      const newTeacher = action.payload;

      if (!newTeacher.id) {
        throw new Error('Teacher must have a unique ID');
      }

      state.teachers.push(newTeacher);

      state.teachersClasses.push({ teacherId: newTeacher.id, classIds: [] });
      state.teachersSubjects.push({ teacherId: newTeacher.id, subjectIds: [] });
      state.teachersClassesSubjects.push({
        teacherId: newTeacher.id,
        classIds: [],
        subjectIds: [],
      });
    },
    removeTeacher: (state, action) => {
      const teacherId = action.payload;

      state.teachers = state.teachers.filter(teacher => teacher.id !== teacherId);
      state.teachersClasses = state.teachersClasses.filter(item => item.teacherId !== teacherId);
      state.teachersSubjects = state.teachersSubjects.filter(item => item.teacherId !== teacherId);
      state.teachersClassesSubjects = state.teachersClassesSubjects.filter(
        item => item.teacherId !== teacherId
      );
    },
    copyTeacher: (state, action) => {
      const { teacherId, newClassId } = action.payload;
      const teacherData = findTeacherById(state.teachersClassesSubjects, teacherId);

      if (teacherData && !teacherData.classIds.includes(newClassId)) {
        teacherData.classIds.push(newClassId);
      }
    },
  },
});

export const { updateTeacherSubjects, setTeachers, addTeacher, removeTeacher, copyTeacher } =
  teachersSlice.actions;

export default teachersSlice.reducer;
