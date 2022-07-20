import actionTypes from "./constants";
import { addItem } from "../../services/dataService.js";

const addItemRequestAction = () => ({
  type: actionTypes.ADD_ITEM_REQUEST,
});

const addItemSuccessAction = (item) => ({
  type: actionTypes.ADD_ITEM_SUCCESS,
  item,
});

const addItemFailureAction = (err) => ({
  type: actionTypes.ADD_ITEM_FAILURE,
  err,
});

export const addNewItem = (text) => {
  return async (dispatch) => {
    dispatch(addItemRequestAction());
    try {
      const item = await addItem(text.trim());
      if (item.error) return dispatch(addItemFailureAction(item.error));
      const { id, itemName } = item;
      dispatch(addItemSuccessAction({ id, itemName }));
    } catch (e) {
      dispatch(addItemFailureAction());
    }
  };
};
