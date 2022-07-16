import actionTypes from "../actions/constants";
import { FILTER_OPTIONS } from "../constants/filter-options";

const initialState = {
  statusFilter: FILTER_OPTIONS[0].value,
  lastDeletedItem: null,
  isLoading: false,
  isError: false,
  error: null,
};

const itemsViewReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FILTER_BY_STATUS: {
      const { statusFilter } = action;
      return { ...state, statusFilter };
    }

    case actionTypes.FETCH_ITEMS_REQUEST:
    case actionTypes.REMOVE_ITEM_REQUEST:
    case actionTypes.UPDATE_ITEM_REQUEST:
    case actionTypes.ADD_ITEM_REQUEST: {
      return { ...state, isLoading: true };
    }

    case actionTypes.REMOVE_ITEM_SUCCESS: {
      const { item } = action;
      return {
        ...state,
        isError: false,
        isLoading: false,
        error: null,
      };
    }

    case actionTypes.FETCH_ITEMS_SUCCESS:
    case actionTypes.UPDATE_ITEM_SUCCESS:
    case actionTypes.ADD_ITEM_SUCCESS: {
      return { ...state, isError: false, isLoading: false, error: null };
    }

    case actionTypes.FETCH_ITEMS_FAILURE:
    case actionTypes.REMOVE_ITEM_FAILURE:
    case actionTypes.UPDATE_ITEM_FAILURE:
      return {
        ...state,
        isError: true,
        isLoading: false,
        error: "Somthing went wrong, please try again later",
      };
    case actionTypes.ADD_ITEM_FAILURE: {
      return { ...state, isError: true, isLoading: false, error: action.err };
    }

    default:
      return state;
  }
};
export default itemsViewReducer;
