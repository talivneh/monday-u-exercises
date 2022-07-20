import { FILTER_OPTIONS } from "../../app/constants/filter-options";
import "./TodosFilter.css";
import { useCallback } from "react";

export default function TodosFilter({ filterByStatus }) {
  const onSelectFilter = useCallback(
    (e) => {
      filterByStatus(e.target.value);
    },
    [filterByStatus]
  );

  return (
    <div className="filter-group">
      {FILTER_OPTIONS.map(({ value, text }) => {
        return (
          <label key={value}>
            <input
              name="filter"
              type="radio"
              onChange={onSelectFilter}
              value={value}
            />
            {text}
          </label>
        );
      })}
    </div>
  );
}
