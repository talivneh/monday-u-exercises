import "./Alert.css";

export default function Alert({ type, content }) {
  return (
    <div className={`alert ${type}`}>
      <button id="alert-close-btn">X</button>
      <span className="alert-innet-text">{content}</span>
    </div>
  );
}
