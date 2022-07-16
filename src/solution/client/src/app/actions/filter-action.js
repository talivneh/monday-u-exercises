import actionTypes from "./constants";

const filterByStatusAction = (statusFilter) => ({
  type: actionTypes.FILTER_BY_STATUS,
  statusFilter,
});

export const filterByStatus = (statusFilter) => {
  return (dispatch) => {
    dispatch(filterByStatusAction(statusFilter));
  };
};
