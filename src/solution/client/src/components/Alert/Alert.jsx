import "./Alert.css";

export default function Alert({ alert, setAlert }) {
  return (
    <div className={`alert ${alert.type} ${alert.show && "show"}`}>
      <button
        id="alert-close-btn"
        onClick={() => setAlert({ ...alert, show: false })}
      >
        X
      </button>
      <span className="alert-innet-text">{alert.content}</span>
    </div>
  );
}
