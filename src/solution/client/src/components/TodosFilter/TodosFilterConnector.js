import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { filterByStatus } from "../../app/actions/filter-action";
import TodosFilter from "./TodosFilter";

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({ filterByStatus }, dispatch);
};

export default connect(null, mapDispatchToProps)(TodosFilter);
