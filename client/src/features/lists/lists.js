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

export const editList = createAsyncThunk(
  "lists/editList",
  async ({id, updatedListInfo}) => {
    const data = await apiClient.editList(id, updatedListInfo);
    return data;
  }
)

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
      return state.concat(action.payload);
    });

    builder.addCase(editList.fulfilled, (state, action) => {
      return state.map(list => list._id === action.payload._id ? action.payload : list)
    });
  },
});

export default listSlice.reducer;
