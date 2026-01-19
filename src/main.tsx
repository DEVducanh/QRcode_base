import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import MainLayout from "./layout/MainLayout.tsx";
import "./App.css";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <MainLayout>
          <App />
        </MainLayout>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
