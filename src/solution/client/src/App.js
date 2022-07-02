import "./App.css";
import TodoList from "./components/TodoList/TodoList";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Alert from "./components/Alert/Alert";
import Loader from "./components/Loader/Loader";
import { useEffect, useState } from "react";
import { getAllItems } from "./services/dataService";

function App() {
  const [itemsList, setItemsList] = useState([]);
  const [showLoader, setShowLoader] = useState(true);
  const [alert, setAlert] = useState({ show: false, type: "", content: "" });

  useEffect(() => {
    setShowLoader(true);
    getAllItems().then((fetchedItems) => {
      setItemsList(fetchedItems);
    });
    setShowLoader(false);
  });

  return (
    <div className="app-wrapper">
      <Header setAlert={setAlert} setShowLoader={setShowLoader} />
      <TodoList list={itemsList} setAlert={setAlert} />
      <Footer itemsList={itemsList} />
      <Alert alert={alert} setAlert={setAlert} />
      <Loader visible={showLoader} />
    </div>
  );
}

export default App;
