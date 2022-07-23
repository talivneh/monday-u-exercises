import HeaderConnector from "../Header/HeaderConnector";
import AlertConnector from "../Alert/AlertConnector";
import LoaderConnector from "../Loader/LoaderConnector";
import TodoListConnector from "../TodoList/TodoListConnector";
import FooterConnector from "../Footer/FooterConnector";

export default function TodoApp() {
  return (
    <div className="app-wrapper">
      <HeaderConnector />
      <TodoListConnector />
      <FooterConnector />
      <AlertConnector />
      <LoaderConnector />
    </div>
  );
}
