import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchItems } from "../../app/actions/fetch-items-action";
import TodoList from "../TodoList/TodoList";
import {
  getFilteredItems,
  getAllItems,
} from "../../app/selectors/items-entities-selectors";

const mapStateToProps = (state) => {
  const items = getAllItems(state);
  const filterdItems = getFilteredItems(state);
  return { items, filterdItems };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchItems }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
