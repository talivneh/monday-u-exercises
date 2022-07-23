import "./Alert.css";
import { useState } from "react";
import { useEffect } from "react";

export default function Alert({ isError, errMessage }) {
  const [showAlert, setShowAlert] = useState(isError);

  useEffect(() => {
    setShowAlert(isError);
  }, [isError]);

  return (
    <div className={`alert ${showAlert ? "show" : ""}`}>
      <button id="alert-close-btn" onClick={() => setShowAlert(false)}>
        X
      </button>
      <span className="alert-innet-text">{errMessage}</span>
    </div>
  );
}
