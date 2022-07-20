import "./Footer.css";

export default function Footer({ removeOneItem, items, count }) {
  return (
    <footer className={`${!items.length && "hide"}`}>
      <span>
        You have <span id="tasks-number">{count}</span> pending tasks
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
