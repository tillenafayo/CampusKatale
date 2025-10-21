import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import "./index.css";
import App from "./App.jsx";
import "@mantine/core/styles.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
      <MantineProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MantineProvider>
import BrowserRouter from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { ClerkProvider } from "@clerk/clerk-react";

// Import your Clerk Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ClerkProvider>
  </StrictMode>
);
