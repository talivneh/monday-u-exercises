import actionTypes from "./constants";
import { getAllItems } from "../../services/dataService.js";

const fetchItemsRequestAction = () => ({
  type: actionTypes.FETCH_ITEMS_REQUEST,
});

const fetchItemsSuccessAction = (items) => ({
  type: actionTypes.FETCH_ITEMS_SUCCESS,
  items,
});

const fetchItemsFailureAction = (err) => ({
  type: actionTypes.FETCH_ITEMS_FAILURE,
  err,
});

export const fetchItems = () => {
  return async (dispatch) => {
    dispatch(fetchItemsRequestAction());
    try {
      const items = await getAllItems();
      dispatch(fetchItemsSuccessAction(items));
    } catch (e) {
      dispatch(fetchItemsFailureAction());
    }
  };
};
