import "./TodoList.css";
import TodoItemConnector from "../TodoItem/TodoItemConnector";
import TodosFilter from "../TodosFilter/TodosFilter";
import { useMemo, useEffect } from "react";

export default function TodoList({ items, fetchItems }) {
  useEffect(() => {
    fetchItems();
  }, []);

  const itemsList = useMemo(() => {
    return items.map(({ id, itemName, status }) => (
      <TodoItemConnector key={id} id={id} itemName={itemName} status={status} />
    ));
  }, [items]);

  return (
    <div className="todo-list">
      {items.length ? (
        <>
          <TodosFilter />
          <ul>{itemsList}</ul>
        </>
      ) : (
        <div className="empty-list">
          <span>Hi! You Have Nothing ToDo!</span>
        </div>
      )}
    </div>
  );
}
