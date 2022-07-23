import actionTypes from "../actions/constants";

const initialState = {};

const itemsEntitiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ITEMS_SUCCESS: {
      const { items } = action;
      return items.reduce((allItems, currentItem) => {
        allItems[currentItem.id] = currentItem;
        return allItems;
      }, {});
    }

    case actionTypes.ADD_ITEM_SUCCESS: {
      const { item } = action;
      return { ...state, [item.id]: item };
    }

    case actionTypes.REMOVE_ITEM_SUCCESS: {
      const { item } = action;
      const items = { ...state };
      delete items[item.id];
      return items;
    }

    case actionTypes.UPDATE_ITEM_SUCCESS: {
      const { item } = action;
      const items = { ...state };
      items[item.id].status = item.status;
      return items;
    }

    default:
      return state;
  }
};

export default itemsEntitiesReducer;
