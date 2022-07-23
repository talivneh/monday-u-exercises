import actionTypes from "./constants";
import { updateStatus } from "../../services/dataService.js";

const updateItemRequestAction = () => ({
  type: actionTypes.UPDATE_ITEM_REQUEST,
});

const updateItemSuccessAction = (item) => ({
  type: actionTypes.UPDATE_ITEM_SUCCESS,
  item,
});

const updateItemFailureAction = (err) => ({
  type: actionTypes.UPDATE_ITEM_FAILURE,
  err,
});

export const updateItem = (item) => {
  return async (dispatch) => {
    dispatch(updateItemRequestAction());
    try {
      const newStatus = !item.status ? 1 : 0;
      const updatedItem = await updateStatus(item, { status: newStatus });
      dispatch(updateItemSuccessAction(updatedItem));
    } catch (e) {
      dispatch(updateItemFailureAction(e.errMessage));
    }
  };
};
