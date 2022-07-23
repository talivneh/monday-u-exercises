import { FILTER_OPTIONS } from "../app/constants/filter-options";

export function filterByStatus(statusFilter, items) {
  switch (parseInt(statusFilter)) {
    // FILTER_OPTIONS[0] = all items
    case FILTER_OPTIONS[0].value: {
      return items;
    }
    // FILTER_OPTIONS[1] = done items
    case FILTER_OPTIONS[1].value: {
      return items.filter((item) => item.status);
    }
    // FILTER_OPTIONS[2] = un-done items
    case FILTER_OPTIONS[2].value: {
      return items.filter((item) => !item.status);
    }

    default: {
      return items;
    }
  }
}
