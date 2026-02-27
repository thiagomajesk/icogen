import React from "react";
import { createRoot } from "react-dom/client";
import { MantineProvider, createTheme } from "@mantine/core";
import RootApp from "./RootApp";
import "@mantine/core/styles.css";
import "./styles.css";

const root = document.getElementById("root");
if (!root) {
  throw new Error("Root element not found");
}

const theme = createTheme({
  components: {
    Select: {
      defaultProps: {
        withCheckIcon: true,
        checkIconPosition: "right",
      },
    },
  },
});

createRoot(root).render(
  <React.StrictMode>
    <MantineProvider forceColorScheme="dark" theme={theme}>
      <RootApp />
    </MantineProvider>
  </React.StrictMode>,
);
