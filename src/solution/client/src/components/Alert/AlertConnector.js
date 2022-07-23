import { connect } from "react-redux";
import Alert from "./Alert";
import { getIsError, getError } from "../../app/selectors/items-view-selectors";

const mapStateToProps = (state) => {
  const isError = getIsError(state);
  const errMessage = getError(state);
  return { isError, errMessage };
};

export default connect(mapStateToProps)(Alert);
