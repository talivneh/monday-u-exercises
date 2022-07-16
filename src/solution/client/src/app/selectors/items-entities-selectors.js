import { createSelector } from "reselect";
import { getStatusFilter } from "./items-view-selectors";
import { filterByStatus } from "../../services/filter-list-service";

const getItemsEntities = (state) => state.itemsEntities;

const getItems = (state) => Object.values(getItemsEntities(state));

export const getFilteredItems = createSelector(
  getStatusFilter,
  getItems,
  (statusFilter, items) => {
    let filteredItems = items;

    if (statusFilter) {
      filteredItems = filterByStatus(statusFilter, filteredItems);
    }

    return filteredItems;
  }
);
