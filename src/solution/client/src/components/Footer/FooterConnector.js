import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { removeOneItem } from "../../app/actions/remove-item-action";
import {
  getAllItems,
  getUndoneItems,
} from "../../app/selectors/items-entities-selectors";
import Footer from "./Footer";

const mapStateToProps = (state) => {
  const items = getAllItems(state);
  const unDoneitems = getUndoneItems(state);
  return { items, count: unDoneitems.length };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({ removeOneItem }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
