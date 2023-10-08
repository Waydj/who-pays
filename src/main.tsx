import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { MyProvider } from "./context";

const root = document.getElementById("root");

if (root) {
  const reactRoot = ReactDOM.createRoot(root);
  reactRoot.render(
    <React.StrictMode>
      <MyProvider>
        <App />
      </MyProvider>
    </React.StrictMode>
  );
}
