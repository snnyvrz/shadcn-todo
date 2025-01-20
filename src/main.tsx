import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="signin" element={<div>Sign In</div>} />
        <Route path="signup" element={<div>Sign Up</div>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
