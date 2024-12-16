import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  classesTeachers: [
    { classId: 1, teacherIds: [1, 2] },
    { classId: 2, teacherIds: [3, 4] },
  ],
};

const classesTeachersSlice = createSlice({
  name: 'classesTeachers',
  initialState,
  reducers: {
    addTeacherToClass: (state, action) => {
      const { classId, teacherIds } = action.payload;
      const cl = state.classesTeachers.find(ct => ct.classId === classId);

      if (cl) {
        cl.teacherIds = [...new Set([...cl.teacherIds, ...teacherIds])];
      } else {
        state.classesTeachers.push({ classId, teacherIds });
      }
    },
    removeTeacherFromClass: (state, action) => {
      const { classId, teacherIds } = action.payload;
      const cl = state.classesTeachers.find(ct => ct.classId === classId);

      if (cl) {
        cl.teacherIds = cl.teacherIds.filter(teacherId => !teacherIds.includes(teacherId));
      }
    },
    setClassTeacher: (state, action) => {
      const { classId, teacherId } = action.payload;
      const cl = state.classesTeachers.find(ct => ct.classId === classId);

      if (cl) {
        if (cl.teacherIds.includes(teacherId)) {
          cl.classTeacherId = teacherId;
        } else {
          throw new Error(
            `Teacher with ID ${teacherId} is not assigned to class with ID ${classId}`
          );
        }
      } else {
        throw new Error(`Class with ID ${classId} not found`);
      }
    },
  },
});

export const { addTeacherToClass, removeTeacherFromClass, setClassTeacher } =
  classesTeachersSlice.actions;

export default classesTeachersSlice.reducer;
