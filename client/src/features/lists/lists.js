import { createSlice } from "@reduxjs/toolkit";
import { fetchBoard } from "../boards/boards";

const initialState = [];

// export const fetchBoards = createAsyncThunk("boards/fetchBoards", async () => {
//   const data = await apiClient.getBoards();
//   return data;
// });

// export const createBoard = createAsyncThunk(
//   "boards/createBoard",
//   async (newBoard, callback) => {
//     const data = await apiClient.createBoard(newBoard);
//     if (callback) {
//       callback;
//     }
//     return data;
//   }
// );

// export const fetchBoard = createAsyncThunk(
//   "boards/fetchBoard",
//   async (id) => {
//     const data = await apiClient.fetchBoard(id);

//     return data;
//   }
// );

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
