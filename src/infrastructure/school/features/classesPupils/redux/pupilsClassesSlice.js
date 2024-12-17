import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pupilsClasses: [
    {
      classId: 1,
      pupilId: 1,
      isClassPupil: false,
    },
    {
      classId: 1,
      pupilId: 2,
      isClassPupil: false,
    },
    {
      classId: 3,
      pupilId: 3,
      isClassPupil: true,
    },
  ],
};

const pupilsClasses = createSlice({
  name: 'pupilsClasses',
  initialState,
  reducers: {
    addPupilsToClass: (state, action) => {
      const { classId, pupilId } = action.payload;
      if (!state.pupilsClasses.some(pc => pc.classId === classId && pc.pupilId === pupilId)) {
        state.pupilsClasses.push({ classId, pupilId, isClassPupil: false });
      }
    },
    removePupilFromClass: (state, action) => {
      const { classId, pupilId } = action.payload;
      state.pupilsClasses = state.pupilsClasses.filter(
        school => school.classId !== classId || school.pupilId !== pupilId
      );
    },
    transferPupil: (state, action) => {
      const { pupilId, newClassId } = action.payload;

      const updatedPupilsClasses = state.pupilsClasses.filter(pc => pc.pupilId !== pupilId);
      updatedPupilsClasses.push({ classId: newClassId, pupilId, isClassPupil: true });

      state.pupilsClasses = updatedPupilsClasses;
    },
  },
});

export const { addPupilsToClass, removePupilFromClass, transferPupil } = pupilsClasses.actions;
export default pupilsClasses.reducer;
