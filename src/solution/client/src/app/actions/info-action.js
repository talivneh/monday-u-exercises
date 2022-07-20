import actionTypes from "./constants";

const showInfoAction = (show, info) => ({
  type: actionTypes.INFO,
  isInfo: { show, info },
});

export const showInfo = ({ show, info }) => {
  return (dispatch) => {
    dispatch(showInfoAction(show, info));
  };
};
