import "./index.css";
import App from "./App";
import store from "./store/store";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
      <Toaster />
    </Provider>
  </BrowserRouter>
);
