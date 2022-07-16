import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchItems } from "../../app/actions/fetch-items-action";
import TodoList from "../TodoList/TodoList";
import { getFilteredItems } from "../../app/selectors/items-entities-selectors";

const mapStateToProps = (state) => {
  const items = getFilteredItems(state);
  return { items };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchItems }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
