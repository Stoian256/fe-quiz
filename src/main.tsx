import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Auth0ProviderWithNavigate } from "./components/auth/auth0-provider-with-navigate";
import "./index.css";
import { AuthProvider } from "./context/authContext";
import { ToastProvider } from "./context/ToastContext";
import { TitleProvider } from "./context/TitleContext";
import { FilterAndPaginationQuizzProvider } from "./context/filterAndPaginationContextQuizz";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Auth0ProviderWithNavigate>
          <FilterAndPaginationQuizzProvider>
            <ToastProvider>
              <TitleProvider>
                <App />
              </TitleProvider>
            </ToastProvider>
          </FilterAndPaginationQuizzProvider>
        </Auth0ProviderWithNavigate>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
