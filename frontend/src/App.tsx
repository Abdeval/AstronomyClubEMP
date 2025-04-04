import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./routes";
import { ThemeProvider } from "./context/theme-provider";
import { UserProvider } from "./context/user-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();

  return (
    <div className="overflow-x-hidden">
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <Router>
            <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
              <AppRouter />
            </ThemeProvider>
          </Router>
        </UserProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
