import { createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import localAPI from '../../../infrastructure/api/localAPI';

export const fetchWords = createAsyncThunk('words/fetchWords', async (_, { rejectWithValue }) => {
  try {
    const words = await localAPI.getWords();
    return words;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const addWord = createAsyncThunk('words/addWord', async (wordData, { rejectWithValue }) => {
  try {
    const newIdWord = { ...wordData, id: uuidv4(), progress: 0 };
    const newWord = await localAPI.addWord(newIdWord);
    return newWord;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const updateWord = createAsyncThunk(
  'words/updateWord',
  async (wordData, { rejectWithValue }) => {
    try {
      const updatedWord = await localAPI.updateWord(wordData);
      return updatedWord;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteWord = createAsyncThunk(
  'words/deleteWord',
  async (wordId, { rejectWithValue }) => {
    try {
      await localAPI.deleteWord(wordId);
      return wordId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
