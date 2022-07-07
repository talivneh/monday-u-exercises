import "./Alert.css";

export default function Alert({ alert, setAlert }) {
  const createItemInfo = ({ itemName, status, createdAt, updatedAt }) => {
    return (
      <span>
        <span>
          <span className="title">To do:</span> {itemName}
        </span>
        <span>
          <span className="title">Creation-date:</span> {createdAt}
        </span>
        {status ? (
          <span className="title done">
            <span>Done at:</span>
            {updatedAt}
          </span>
        ) : (
          ``
        )}
      </span>
    );
  };

  return (
    <div className={`alert ${alert.type} ${alert.show ? "show" : ""}`}>
      <button
        id="alert-close-btn"
        onClick={() => setAlert({ ...alert, show: false })}
      >
        X
      </button>
      <span className="alert-innet-text">
        {alert.type === "warning" ? (
          <span> {alert.content}</span>
        ) : (
          createItemInfo(alert.content)
        )}
      </span>
    </div>
  );
}
