import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchItems } from "../../app/actions/fetch-items-action";
import TodoList from "../TodoList/TodoList";
import {
  getIsError,
  getIsLoading,
} from "../../app/selectors/items-view-selectors";

const mapStateToProps = (state) => {
  const isLoading = getIsLoading(state);
  const isError = getIsError(state);
  return { items, isLoading, isError };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchItems }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ToTodoListdoApp);
