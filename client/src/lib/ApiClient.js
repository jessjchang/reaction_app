import axios from "axios";
import * as routes from "../constants/ApiRoutes";

function logError(errorResponse) {
  const response = errorResponse.response;

  if (response && response.data && response.data.error) {
    console.error(`HTTP Error: ${response.data.error}`);
  } else {
    console.error("Error: ", errorResponse);
  }
}

axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.headers.common["Accept"] = "application/json";

const apiClient = {
  getBoard: async (id) => {
    try {
      const { data } = await axios.get(`${routes.BOARDS_INDEX_URL}/${id}`);
      return data;
    } catch (e) {
      logError(e);
    }
  },
  getBoards: async () => {
    try {
      const { data } = await axios.get(routes.BOARDS_INDEX_URL);
      return data;
    } catch (e) {
      logError(e);
    }
  },
  createBoard: async (board) => {
    try {
      const { data } = await axios.post(routes.CREATE_BOARD_URL, { board });
      return data;
    } catch (e) {
      logError(e);
    }
  },
  createList: async ({title, boardId}) => {
    try {
      const { data } = await axios.post(routes.CREATE_LIST_URL, { title, boardId });
      return data;
    } catch (e) {
      logError(e);
    }
  },
  editList: async (id, updatedListInfo) => {
    try {
      const { data } = await axios.put(`${routes.LISTS_INDEX_URL}/${id}`, updatedListInfo);
      return data;
    } catch (e) {
      logError(e);
    }
  },
  createCard: async (title, listId) => {
    try {
      const { data } = await axios.post(routes.CREATE_CARD_URL, {
        card: {title,},
        listId,
      });
      return data;
    } catch (e) {
      logError(e);
    }
  },
  editCard: async (cardId, card) => {
    try {
      const { data } = await axios.put(`${routes.CARDS_INDEX_URL}/${cardId}`, {
        card,
      })
    } catch (e) {
      logError(e);
    }
  },
  getCard: async (id) => {
    try {
      const { data } = await axios.get(`${routes.CARDS_INDEX_URL}/${id}`);
      return data;
    } catch (e) {
      logError(e);
    }
  },
};

export default apiClient;
