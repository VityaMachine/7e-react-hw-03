import { useState, useEffect, useMemo } from "react";

import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";

import ThemeWrapper from "./ThemeWrapper";

import ShoppingList from "./ShoppingList";

const getDesignTokens = (mode) => ({
  palette: {
    mode,
  },
});

function App() {
  const [mode, setMode] = useState("light");

  const toggleColorMode = () => {
    setMode((prevMode) => {
      localStorage.setItem(
        "vvColorMode",
        JSON.stringify(prevMode === "light" ? "dark" : "light")
      );
      return prevMode === "light" ? "dark" : "light";
    });
  };

  let theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  theme = responsiveFontSizes(theme);

  useEffect(() => {
    localStorage.getItem("vvColorMode") &&
      setMode(JSON.parse(localStorage.getItem("vvColorMode")));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <ThemeWrapper mode={mode} modeHandler={toggleColorMode}>
        <ShoppingList />
      </ThemeWrapper>
    </ThemeProvider>
  );
}

export default App;
