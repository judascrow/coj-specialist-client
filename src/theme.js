import { createMuiTheme } from "@material-ui/core/styles";
import lightBlue from "@material-ui/core/colors/lightBlue";
import pink from "@material-ui/core/colors/pink";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: lightBlue[300],
      main: lightBlue[500],
      dark: lightBlue[700],
      contrastText: "#fff",
    },
    secondary: {
      light: pink[300],
      main: pink[500],
      dark: pink[700],
      contrastText: "#fff",
    },
    success: {
      light: green[500],
      main: green[700],
      dark: green[900],
      contrastText: "#fff",
    },
    error: {
      light: red[300],
      main: red[500],
      dark: red[700],
      contrastText: "#fff",
    },
  },
  status: {
    danger: "orange",
  },
  typography: {
    fontFamily: '"Sarabun", "Arial", sans-serif',
    button: {
      fontWeight: 400,
      textAlign: "capitalize",
    },
  },
});

export default theme;
