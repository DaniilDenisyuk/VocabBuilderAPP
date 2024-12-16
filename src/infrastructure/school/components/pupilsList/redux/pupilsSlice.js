import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
  teachersClasses: [],
  teachersSubjects: [],
  teachersClassesSubjects: [],
};

const pupilsSlice = createSlice({
  name: 'pupils',
  initialState,
  reducers: {
    addPupil: (state, action) => {
      const newPupil = action.payload;
      state.pupils.push(newPupil);

      state.teachersClasses.push({ pupilId: newPupil.id, classId: newPupil.classId });
      state.teachersSubjects.push({ pupilId: newPupil.id, subjectIds: [] });
      state.teachersClassesSubjects.push({
        pupilId: newPupil.id,
        classId: newPupil.classId,
        subjectIds: [],
      });
    },
    removePupil: (state, action) => {
      const pupilId = action.payload;

      state.pupils = state.pupils.filter(pupil => pupil.id !== pupilId);
      state.teachersClasses = state.teachersClasses.filter(item => item.pupilId !== pupilId);
      state.teachersSubjects = state.teachersSubjects.filter(item => item.pupilId !== pupilId);
      state.teachersClassesSubjects = state.teachersClassesSubjects.filter(
        item => item.pupilId !== pupilId
      );
    },

    addPupilToClass: (state, action) => {
      const { pupilId, newClassId } = action.payload;
      const pupil = state.pupils.find(pupil => pupil.id === pupilId);

      if (pupil) {
        pupil.classId = newClassId;

        const pupilClass = state.teachersClasses.find(item => item.pupilId === pupilId);
        if (pupilClass) {
          pupilClass.classId = newClassId;
        }

        const pupilClassesSubjects = state.teachersClassesSubjects.find(
          item => item.pupilId === pupilId
        );
        if (pupilClassesSubjects) {
          pupilClassesSubjects.classId = newClassId;
        }
      }
    },
  },
});

export const { addPupil, removePupil, addPupilToClass } = pupilsSlice.actions;
export default pupilsSlice.reducer;
