import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/UserContext.tsx";
import { Provider } from "./components/ui/provider.tsx";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider>
        <UserProvider>
          <App />
        </UserProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
