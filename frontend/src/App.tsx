// import { BrowserRouter , Routes, Route} from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./routes";
import { ThemeProvider } from "./context/theme-provider";

function App() {
  return (
    <div className="overflow-x-hidden">
      <Router>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <AppRouter />
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
