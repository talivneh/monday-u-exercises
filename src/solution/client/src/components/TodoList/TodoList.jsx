import "./TodoList.css";
import TodoItemConnector from "../TodoItem/TodoItemConnector";
import { useMemo, useEffect } from "react";
import TodosFilterConnector from "../TodosFilter/TodosFilterConnector";

export default function TodoList({ items, filterdItems, fetchItems }) {
  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const itemsList = useMemo(() => {
    return filterdItems.map(({ id, itemName, status }) => (
      <TodoItemConnector key={id} id={id} itemName={itemName} status={status} />
    ));
  }, [filterdItems]);

  return (
    <div className="todo-list">
      {items.length ? (
        <>
          <TodosFilterConnector />
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
