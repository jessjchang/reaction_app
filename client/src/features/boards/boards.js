import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../lib/ApiClient";

const initialState = [];

export const fetchBoards = createAsyncThunk("boards/fetchBoards", async () => {
  const data = await apiClient.getBoards();
  return data;
});

export const createBoard = createAsyncThunk(
  "boards/createBoard",
  async (newBoard, callback) => {
    const data = await apiClient.createBoard(newBoard);
    if (callback) {
      callback;
    }
    return data;
  }
);

export const fetchBoard = createAsyncThunk(
  "boards/fetchBoard",
  async (id) => {
    const data = await apiClient.getBoard(id);

    return data;
  }
);

const boardSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBoards.fulfilled, (state, action) => {
      return action.payload.reduce((acc, comm) => {
        //eslint-disable-next-line
        const { lists, ...boardWithoutLists } = comm;
        return acc.concat(boardWithoutLists);
      }, []);
    });

    builder.addCase(createBoard.fulfilled, (state, action) => {
      state.push(action.payload);
    });

    builder.addCase(fetchBoard.fulfilled, (state, action) => {
      //eslint-disable-next-line
      const { lists, ...boardWithoutLists } = action.payload;
      const foundBoard = state.find(board => board._id === action.payload._id);

      if (foundBoard) {
        return state;
      } else {
        return state.concat(boardWithoutLists);
      }
    });
  },
});

export default boardSlice.reducer;
