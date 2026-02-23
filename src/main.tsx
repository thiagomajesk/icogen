import React from "react";
import { createRoot } from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import RootApp from "./RootApp";
import "@mantine/core/styles.css";
import "./styles.css";

const root = document.getElementById("root");
if (!root) {
  throw new Error("Root element not found");
}

createRoot(root).render(
  <React.StrictMode>
    <MantineProvider forceColorScheme="dark">
      <RootApp />
    </MantineProvider>
  </React.StrictMode>,
);
