import { createSelector } from "reselect";
import { getStatusFilter } from "./items-view-selectors";
import { filterByStatus } from "../../services/filter-list-service";
import { FILTER_OPTIONS } from "../constants/filter-options";

const getItemsEntities = (state) => state.itemsEntities;

export const getAllItems = createSelector(getItemsEntities, (items) => {
  return Object.values(items);
});

export const getFilteredItems = createSelector(
  getStatusFilter,
  getAllItems,
  (statusFilter, items) => {
    let filteredItems = items;

    if (statusFilter) {
      filteredItems = filterByStatus(statusFilter, filteredItems);
    }

    return filteredItems;
  }
);

export const getUndoneItems = createSelector(getAllItems, (items) => {
  let filteredItems = items;
  filteredItems = filterByStatus(FILTER_OPTIONS[2].value, filteredItems);
  return filteredItems;
});
