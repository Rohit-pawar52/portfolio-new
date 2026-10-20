import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// Fonts are self-hosted from public/fonts and declared in index.html (@font-face + preload)
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
