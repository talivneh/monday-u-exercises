import "./Header.css";

export default function Header({}) {
  return (
    <div className="header-wrapper">
      <header>ToDo - Tal Livneh</header>
      <div className="input-field">
        <input type="text" placeholder="add new ToDo" />
        <button id="add-todo">+{/* <i className="fas fa-plus"></i> */}</button>
      </div>
    </div>
  );
}
