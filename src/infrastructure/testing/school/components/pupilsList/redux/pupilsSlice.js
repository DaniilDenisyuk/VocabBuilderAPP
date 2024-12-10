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
};
const pupilsSlice = createSlice({
  name: 'pupils',
  initialState,
  reducers: {
    setPupils: (state, action) => {
      state.pupils = action.payload;
    },
    addPupil: (state, action) => {
      state.pupils.push(action.payload);
    },
    removePupil: (state, action) => {
      state.pupils = state.pupils.filter(pupil => pupil.id !== action.payload);
    },
    // updPupilClass: (state, action) => {
    //   const { id, classId } = action.payload;
    //   const pupil = state.pupils.find(p => p.id === id);
    //   if (pupil) {
    //     pupil.classId = classId;
    //   }
    // },
    updPupilClass(state, action) {
      const { id, classId } = action.payload;
      const pupilIndex = state.pupils.findIndex(pupil => pupil.id === id);

      if (pupilIndex !== -1) {
        state.pupils[pupilIndex] = { ...state.pupils[pupilIndex], classId };
      }
    },
  },
});
export const { addPupil, removePupil, updPupilClass } = pupilsSlice.actions;

export default pupilsSlice.reducer;
