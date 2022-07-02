import "./Loader.css";

export default function Loader({ visible }) {
  return <div className={`loader ${visible && "show"}`}></div>;
}
