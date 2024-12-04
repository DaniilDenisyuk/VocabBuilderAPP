import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  classes: [
    { id: 1, name: '1-A', teacherIds: [], pupilIds: [] },
    { id: 2, name: '2-A', teacherIds: [], pupilIds: [] },
    { id: 3, name: '3-A', teacherIds: [], pupilIds: [] },
  ],
  teachers: [
    { id: 1, name: 'Teacher1', classIds: [0] },
    { id: 2, name: 'Teacher2', classIds: [] },
    { id: 3, name: 'Teacher3', classIds: [] },
  ],
  pupils: [
    { id: 1, name: 'Pupil1', classId: 0 },
    { id: 2, name: 'Pupil2', classId: 0 },
    // інші учні
  ],
  subjects: [
    { id: 1, name: 'Math' },
    { id: 2, name: 'Science' },
    { id: 3, name: 'History' },
  ],
};

const schoolSlice = createSlice({
  name: 'school',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { field, item } = action.payload;
      console.log('addItem called:', { field, item });

      if (state[field]) {
        state[field] = [...state[field], item];
      } else {
        state[field] = [item];
      }
      console.log(`Updated ${field}:`, state[field]);
    },
    deleteItem: (state, action) => {
      const { field, itemId } = action.payload;
      console.log('deleteItem called:', { field, itemId });

      if (state[field] && Array.isArray(state[field])) {
        state[field] = state[field].filter(item => item.id !== itemId);
      } else {
        console.warn(`Field ${field} is not a valid array`);
      }

      console.log(`Updated ${field}:`, state[field]);
    },
    transferPupil: (state, action) => {
      const { pupilId, newClassId } = action.payload;
      console.log('transferPupil called:', { pupilId, newClassId });

      const pupil = state.pupils.find(p => p.id === pupilId);
      const oldClass = state.classes.find(cl => cl.id === pupil.classId);
      const newClass = state.classes.find(cl => cl.id === newClassId);

      if (oldClass) {
        oldClass.pupilIds = oldClass.pupilIds.filter(id => id !== pupilId);
      }

      pupil.classId = newClassId;
      newClass.pupilIds.push(pupilId);

      console.log('Updated pupil:', pupil);
      console.log('Updated old class:', oldClass);
      console.log('Updated new class:', newClass);
    },
    copyTeacher: (state, action) => {
      const { teacherId, newClassId } = action.payload;
      console.log('copyTeacher called:', { teacherId, newClassId });

      const teacher = state.teachers.find(t => t.id === teacherId);
      const newClass = state.classes.find(cl => cl.id === newClassId);

      if (newClass && !teacher.classIds.includes(newClassId)) {
        teacher.classIds.push(newClassId);
        newClass.teacherIds.push(teacherId);
      }

      console.log('Updated teacher:', teacher);
      console.log('Updated new class:', newClass);
    },
    updTeachers: (state, action) => {
      const { teacherId, classIds, subjectIds } = action.payload;

      const teacher = state.teachers.find(t => t.id === teacherId);
      if (teacher) {
        if (classIds) teacher.classIds = classIds;
        if (subjectIds) teacher.subjectIds = subjectIds;
      } else {
        console.warn(`Teacher with id ${teacherId} not found`);
      }
    },
    updItems: (state, action) => {
      const { field, itemId, updatedData } = action.payload;
      console.log('updItems called:', { field, itemId, updatedData });
      if (!state[field] || !Array.isArray(state[field])) {
        console.error(`Поле "${field}" не існує або не є масивом`);
        return;
      }
      const item = state[field].find(i => i.id === itemId);
      if (item) {
        Object.assign(item, updatedData);
      }
    },
  },
});

export const { addItem, deleteItem, transferPupil, copyTeacher, updTeachers, updItems } =
  schoolSlice.actions;
export default schoolSlice.reducer;
