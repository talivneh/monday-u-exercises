import { FILTER_OPTIONS } from "../app/constants/filter-options";

export function filterByStatus(statusFilter, items) {
  switch (statusFilter) {
    case FILTER_OPTIONS[0].value: {
      return items;
    }

    case FILTER_OPTIONS[1].value: {
      return items.filter((item) => item.status);
    }

    case FILTER_OPTIONS[2].value: {
      return items.filter((item) => !item.status);
    }

    default: {
      return items;
    }
  }
}
