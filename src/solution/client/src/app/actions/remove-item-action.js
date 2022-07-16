import actionTypes from "./constants";
import { removeItem } from "../../services/dataService.js";

const removeItemRequestAction = () => ({
  type: actionTypes.REMOVE_ITEM_REQUEST,
});

const removeItemSuccessAction = (item) => ({
  type: actionTypes.REMOVE_ITEM_SUCCESS,
  item,
});

const removeItemFailureAction = (item, err) => ({
  type: actionTypes.REMOVE_ITEM_FAILURE,
  item,
  err,
});

export const removeOneItem = (item) => {
  return async (dispatch) => {
    dispatch(removeItemRequestAction());
    try {
      await removeItem(item);
      dispatch(removeItemSuccessAction(item));
    } catch (e) {
      dispatch(removeItemFailureAction(item, e.errMessage));
    }
  };
};
