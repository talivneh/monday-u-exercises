import "./Footer.css";
import { useEffect, useState } from "react";

export default function Footer({ removeOneItem, items }) {
  const [pendingNum, setPendingNum] = useState(0);

  useEffect(() => {
    const newPendingNum = items.filter((todo) => todo.status == 0).length;
    setPendingNum(newPendingNum);
  }, [items]);

  return (
    <footer className={`${!items.length && "hide"}`}>
      <span>
        You have <span id="tasks-number">{pendingNum}</span> pending tasks
      </span>
      <button
        id="clear-all"
        onClick={() => {
          items.forEach((item) => removeOneItem(item));
        }}
      >
        Clear All X{/* <i class="fas fa-trash"></i> */}
      </button>
    </footer>
  );
}
