import "./Loader.css";

export default function Loader({ isLoading }) {
  return <div className={`loader ${isLoading ? "show" : "hide"}`}></div>;
}
