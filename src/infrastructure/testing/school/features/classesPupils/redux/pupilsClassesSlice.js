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
    // transferPupil: (state, action) => {
    //   const { pupilId, newClassId } = action.payload;

    //   // 1. клонувати масив
    //   const updatedPupilsClasses = [...state.pupilsClasses];

    //   // 2. знайти індекс учня
    //   const pupilIndex = updatedPupilsClasses.findIndex(pc => pc.pupilId === pupilId);

    //   if (pupilIndex !== -1) {
    //     // 3. видалити з попереднього класу
    //     updatedPupilsClasses.splice(pupilIndex, 1);
    //   } else {
    //     console.error(`Учня з id ${pupilId} не знайдено`);
    //     return;
    //   }

    //   // 4. додати до нового класу
    //   updatedPupilsClasses.push({ classId: newClassId, pupilId, isClassPupil: true });

    //   // 5.оновити state
    //   state.pupilsClasses = updatedPupilsClasses;
    // },
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
