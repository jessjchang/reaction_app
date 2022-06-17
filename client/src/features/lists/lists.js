import { createSlice } from "@reduxjs/toolkit";
import { fetchBoard } from "../boards/boards";

const initialState = [];

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
  },
});

export default listSlice.reducer;
