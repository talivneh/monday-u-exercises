import "./Footer.css";
import { removeAllItems } from "../../services/dataService";
import { useEffect, useState } from "react";

export default function Footer({ itemsList }) {
  const [pendingNum, setPendingNum] = useState(0);

  useEffect(() => {
    const newPendingNum = itemsList.filter((todo) => todo.status == 0).length;
    setPendingNum(newPendingNum);
  }, [itemsList]);

  return (
    <footer className={`${!itemsList.length && "hide"}`}>
      <span>
        You have <span id="tasks-number">{pendingNum}</span> pending tasks
      </span>
      <button
        id="clear-all"
        onClick={() => {
          removeAllItems();
        }}
      >
        Clear All X{/* <i class="fas fa-trash"></i> */}
      </button>
    </footer>
  );
}
