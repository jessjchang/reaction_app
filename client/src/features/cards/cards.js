import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../lib/ApiClient";
import { fetchBoard } from "../boards/boards";

const initialState = [];

const cardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBoard.fulfilled, (state, action) => {
      const cardsNotInCurrentBoard = state.filter(card => card.boardId !== action.payload._id);
      const cardsInCurrentBoard = action.payload.lists.reduce((acc, list) => {
        const { cards } = list;
        return acc.concat(cards);
      }, []);

      return cardsNotInCurrentBoard.concat(cardsInCurrentBoard);
    });
  },
});

export default cardSlice.reducer;
