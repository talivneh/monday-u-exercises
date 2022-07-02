import "./TodoList.css";
import TodoItem from "../TodoItem/TodoItem";

export default function TodoList({ list, setAlert }) {
  return (
    <div className="todo-list">
      {list.length ? (
        <ul>
          {list.map((item) => (
            <TodoItem
              key={item.id}
              id={item.id}
              itemName={item.itemName}
              status={item.status}
              setAlert={setAlert}
            />
          ))}
        </ul>
      ) : (
        <div className="empty-list">
          <span>Hi! You Have Nothing ToDo!</span>
        </div>
      )}
    </div>
  );
}
