// import { BrowserRouter , Routes, Route} from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import AppRouter from "./routes";

function App() {
  return (
    <>
      <Router>
        <AppRouter />
      </Router>
    </>
  );
}

export default App;
