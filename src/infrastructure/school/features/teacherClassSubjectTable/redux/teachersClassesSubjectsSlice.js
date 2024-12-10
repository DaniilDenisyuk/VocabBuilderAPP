import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  classes: [
    { id: 1, name: '1-A' },
    { id: 2, name: '1-Б' },
    { id: 3, name: '2-A' },
    { id: 4, name: '2-Б' },
    { id: 5, name: '3-A' },
    { id: 6, name: '3-Б' },
    { id: 7, name: '4-А' },
    { id: 8, name: '4-Б' },
    { id: 9, name: '5-А' },
    { id: 10, name: '5-Б' },
  ],
  pupils: [
    { id: 1, name: 'Pupil1', classId: 0 },
    { id: 2, name: 'Pupil2', classId: 0 },
    { id: 3, name: 'Pupil3', classId: 0 },
    { id: 4, name: 'Pupil4', classId: 0 },
    { id: 5, name: 'Pupil5', classId: 0 },
    { id: 6, name: 'Pupil6', classId: 0 },
    { id: 7, name: 'Pupil7', classId: 0 },
    { id: 8, name: 'Pupil8', classId: 0 },
    { id: 9, name: 'Pupil9', classId: 0 },
    { id: 10, name: 'Pupil10', classId: 0 },
  ],
  subjects: [
    { id: 1, name: 'Math' },
    { id: 2, name: 'Science' },
    { id: 3, name: 'History' },
    { id: 4, name: 'English' },
    { id: 5, name: 'Geography' },
    { id: 6, name: 'Art' },
    { id: 7, name: 'Physical Education' },
    { id: 8, name: 'Music' },
    { id: 9, name: 'Literature' },
    { id: 10, name: 'Chemistry' },
  ],
  teachers: [
    { id: 1, name: 'Teacher1' },
    { id: 2, name: 'Teacher2' },
    { id: 3, name: 'Teacher3' },
    { id: 4, name: 'Teacher4' },
    { id: 5, name: 'Teacher5' },
    { id: 6, name: 'Teacher6' },
    { id: 7, name: 'Teacher7' },
    { id: 8, name: 'Teacher8' },
    { id: 9, name: 'Teacher9' },
    { id: 10, name: 'Teacher10' },
  ],
  teachersClassesSubjects: [],
};

const teachersClassesSubjectsSlice = createSlice({
  name: 'teachersClassesSubjects',
  initialState,
  reducers: {
    addTeacherToClass(state, action) {
      const { teacherId, classId } = action.payload;
      if (
        !state.teachersClassesSubjects.some(
          relation => relation.teacherId === teacherId && relation.classId === classId
        )
      ) {
        state.teachersClassesSubjects.push({ teacherId, classId });
      }
    },

    removeTeacherFromClass(state, action) {
      const { teacherId, classId } = action.payload;
      state.teachersClassesSubjects = state.teachersClassesSubjects.filter(
        relation => !(relation.teacherId === teacherId && relation.classId === classId)
      );
    },

    addTeachersToSubject: (state, action) => {
      const { teacherId, classId, subjectIds } = action.payload;

      subjectIds.forEach(subjectId => {
        if (
          !state.teachersClassesSubjects.some(
            relation =>
              relation.teacherId === teacherId &&
              relation.classId === classId &&
              relation.subjectId === subjectId
          )
        ) {
          state.teachersClassesSubjects.push({ teacherId, classId, subjectId });
        }
      });
    },
    removeTeacherFromSubject: (state, action) => {
      const { teacherId, classId, subjectIds } = action.payload;

      state.teachersClassesSubjects = state.teachersClassesSubjects.filter(
        relation =>
          !(
            relation.teacherId === teacherId &&
            relation.classId === classId &&
            subjectIds.includes(relation.subjectId)
          )
      );
    },

    updateTeacherClassesSubjects(state, action) {
      const { teacherId, classId, selectedSubjects } = action.payload;

      if (!Array.isArray(selectedSubjects)) return;

      const teacherData = state.teachersClassesSubjects.find(ts => ts.teacherId === teacherId);

      if (teacherData) {
        if (!teacherData.classIds.includes(classId)) {
          teacherData.classIds.push(classId);
        }

        teacherData.subjectIds = selectedSubjects;
      } else {
        state.teachersClassesSubjects.push({
          teacherId,
          classIds: [classId],
          subjectIds: selectedSubjects,
        });
      }
    },
    copyTeacher(state, action) {
      const { teacherId, newClassId } = action.payload;

      const teacherData = state.teachersClassesSubjects.find(ts => ts.teacherId === teacherId);

      if (teacherData && !teacherData.classIds.includes(newClassId)) {
        teacherData.classIds.push(newClassId);
      }
    },
  },
});

export const {
  addTeacherToClass,
  removeTeacherFromClass,
  addTeachersToSubject,
  removeTeacherFromSubject,
  updateTeacherClassesSubjects,
  copyTeacher,
} = teachersClassesSubjectsSlice.actions;

export default teachersClassesSubjectsSlice.reducer;
