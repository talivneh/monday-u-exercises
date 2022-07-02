import "./Footer.css";

export default function Footer({ isListEmpty }) {
  return (
    <footer className={`${isListEmpty ? "hide" : ""}`}>
      <span>
        You have <span id="tasks-number">0</span> pending tasks
      </span>
      <button id="clear-all">
        Clear All X{/* <i class="fas fa-trash"></i> */}
      </button>
    </footer>
  );
}
