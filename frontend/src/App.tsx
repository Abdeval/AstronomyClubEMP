// import { BrowserRouter , Routes, Route} from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./routes";
import { ThemeProvider } from "./context/theme-provider";
import { UserProvider } from "./context/user-context";

function App() {
  return (
    <div className="overflow-x-hidden">
      <UserProvider>
        <Router>
          <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <AppRouter />
          </ThemeProvider>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
