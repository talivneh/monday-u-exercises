import "./Alert.css";
import { useState } from "react";

export default function Alert({ isError }) {
  const [showAlert, setShowAlert] = useState(isError);

  return (
    <div className={`alert ${showAlert ? "show" : ""}`}>
      <button id="alert-close-btn" onClick={() => setShowAlert(false)}>
        X
      </button>
      <span className="alert-innet-text">create alert</span>
    </div>
  );
}
