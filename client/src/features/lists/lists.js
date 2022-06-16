import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../lib/ApiClient";

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
      // lists property will point to an array containing an object with cards property (pointing to an array of card objects) and list properties, which we want to extract
      const lists = action.payload.reduce((acc, list) => {

        // const {  }
      }, []);
    });
  },
});

export default listSlice.reducer;
