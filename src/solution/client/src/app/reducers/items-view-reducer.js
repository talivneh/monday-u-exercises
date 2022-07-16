import actionTypes from "../actions/constants";
import { FILTER_OPTIONS } from "../constants/filter-options";

const initialState = {
  statusFilter: FILTER_OPTIONS[0].value,
  lastDeletedItem: null,
  isLoading: false,
  isError: false,
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
      };
    }

    case actionTypes.FETCH_ITEMS_SUCCESS:
    case actionTypes.UPDATE_ITEM_SUCCESS:
    case actionTypes.ADD_ITEM_SUCCESS: {
      return { ...state, isError: false, isLoading: false };
    }

    case actionTypes.FETCH_ITEMS_FAILURE:
    case actionTypes.REMOVE_ITEM_FAILURE:
    case actionTypes.UPDATE_ITEM_FAILURE:
    case actionTypes.ADD_ITEM_FAILURE: {
      // TODO: create different error flags to show
      // a different error state for each case
      return { ...state, isError: true, isLoading: false };
    }

    default:
      return state;
  }
};
export default itemsViewReducer;
