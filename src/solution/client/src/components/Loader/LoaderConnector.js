import { connect } from "react-redux";
import Loader from "./Loader";
import { getIsLoading } from "../../app/selectors/items-view-selectors";

const mapStateToProps = (state) => {
  const isLoading = getIsLoading(state);
  return { isLoading };
};

export default connect(mapStateToProps)(Loader);
