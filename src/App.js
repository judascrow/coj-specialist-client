import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";

import theme from "./theme";

import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";

import MainApp from "./components/MainApp";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthState>
        <AlertState>
          <MainApp />
        </AlertState>
      </AuthState>
    </ThemeProvider>
  );
};

export default App;
