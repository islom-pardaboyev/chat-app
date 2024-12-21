import { createRoot } from "react-dom/client";
import "./index.css";

import { Provider } from "react-redux";
import { store } from "./store/index.tsx";
import { AppProvider } from "./context/index.tsx";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <AppProvider>
      <App />
    </AppProvider>
  </Provider>
);
