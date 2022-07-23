import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { removeOneItem } from "../../app/actions/remove-item-action";
import { updateItem } from "../../app/actions/update-item-action";
import TodoItem from "./TodoItem";

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({ updateItem, removeOneItem }, dispatch);
};

export default connect(null, mapDispatchToProps)(TodoItem);
