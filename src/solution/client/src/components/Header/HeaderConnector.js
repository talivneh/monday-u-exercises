import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addNewItem } from "../../app/actions/add-item-action";
import Header from "./Header";

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({ addNewItem }, dispatch);
};

export default connect(null, mapDispatchToProps)(Header);
