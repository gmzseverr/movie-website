import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import "./index.css";
import { HeroUIProvider } from "@heroui/react";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <HeroUIProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </HeroUIProvider>
      </Router>
    </Provider>
  </React.StrictMode>
);
