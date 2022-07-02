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
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    setShowLoader(true);
    getAllItems().then((fetchedItems) => {
      setItemsList(fetchedItems);
    });
    setShowLoader(false);
  }, []);

  return (
    <div className="app-wrapper">
      <Header />
      <TodoList list={[]} />
      <Footer isListEmpty={itemsList.length == 0} />
      <Alert type={"info"} content={"dsfmakfndnf fdsjifd  fdjsaih"} />
      <Loader visible={showLoader} />
    </div>
  );
}

export default App;
