import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../lib/ApiClient";
import { fetchBoard } from "../boards/boards";

const initialState = [];

export const createCard = createAsyncThunk(
  "cards/createCard",
  async ({title, listId, callback}) => {
    const data = await apiClient.createCard(title, listId);

    if (callback) {
      callback();
    }

    return data;
  }
);

export const editCard = createAsyncThunk(
  "cards/editCard",
  async ({cardId, card}) => {
    const data = await apiClient.editCard(cardId, card);

    return data;
  }
);

export const fetchCard = createAsyncThunk(
  "cards/fetchCard",
  async (id) => {
    const data = await apiClient.getCard(id);

    return data;
  }
);

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

    builder.addCase(createCard.fulfilled, (state, action) => {
      return state.concat(action.payload);
    });

    builder.addCase(fetchCard.fulfilled, (state, action) => {
      const cardsNotMatchingCurrent = state.filter(card => card._id !== action.payload._id);
      return cardsNotMatchingCurrent.concat(action.payload);
    });

    builder.addCase(editCard.fulfilled, (state, action) => {
      return state.map(card => card._id === action.payload._id ? action.payload : card);
    });
  },
});

export default cardSlice.reducer;
