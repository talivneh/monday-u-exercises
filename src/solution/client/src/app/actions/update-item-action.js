import actionTypes from "./constants";
import { updateStatus } from "../../services/dataService.js";

const updateItemRequestAction = () => ({
  type: actionTypes.UPDATE_ITEM_REQUEST,
});

const updateItemSuccessAction = (itemId) => ({
  type: actionTypes.UPDATE_ITEM_SUCCESS,
  itemId,
});

const updateItemFailureAction = (err) => ({
  type: actionTypes.UPDATE_ITEM_FAILURE,
  err,
});

export const updateItem = (item) => {
  return async (dispatch) => {
    dispatch(updateItemRequestAction());
    try {
      const updatedItem = await updateStatus(item, { status: !item.status });
      dispatch(updateItemSuccessAction(updatedItem));
    } catch (e) {
      dispatch(updateItemFailureAction(e.errMessage));
    }
  };
};
