import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { removeOneItem } from "../../app/actions/remove-item-action";
import { getFilteredItems } from "../../app/selectors/items-entities-selectors";
import Footer from "./Footer";

const mapStateToProps = (state) => {
  const items = getFilteredItems(state);
  return { items };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({ removeOneItem }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
