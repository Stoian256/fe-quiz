import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Auth0ProviderWithNavigate } from "./components/auth/auth0-provider-with-navigate";
import "./index.css";
import { AuthProvider } from "./context/authContext";
import { ToastProvider } from "./context/ToastContext";
import { TitleProvider } from "./context/TitleContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Auth0ProviderWithNavigate>
          <ToastProvider>
            <TitleProvider>
              <App />
            </TitleProvider>
          </ToastProvider>
        </Auth0ProviderWithNavigate>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
