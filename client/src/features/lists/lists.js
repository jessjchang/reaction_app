import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBoard } from "../boards/boards";
import apiClient from "../../lib/ApiClient";

const initialState = [];

export const createList = createAsyncThunk(
  "lists/createList",
  async ({title, boardId, callback}) => {
    const data = await apiClient.createList({title, boardId});

    if (callback) {
      callback();
    }

    return data;
  }
);

const listSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBoard.fulfilled, (state, action) => {
      const listsNotInCurrentBoard = state.filter(list => list.boardId !== action.payload._id);
      const listsInCurrentBoardWithoutCards = action.payload.lists.reduce((acc, list) => {
        //eslint-disable-next-line
        const { cards, ...listWithoutCards } = list;
        return acc.concat(listWithoutCards);
      }, []);

      return listsNotInCurrentBoard.concat(listsInCurrentBoardWithoutCards);
    });

    builder.addCase(createList.fulfilled, (state, action) => {
      const newState =  state.concat(action.payload);
      return newState;
      // return state.concat(action.payload);
    });
  },
});

export default listSlice.reducer;
