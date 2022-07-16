import { connect } from "react-redux";
import Alert from "./Alert";
import { getIsError } from "../../app/selectors/items-view-selectors";

const mapStateToProps = (state) => {
  const isError = getIsError(state);
  return { isError };
};

export default connect(mapStateToProps)(Alert);
