import { css } from "styled-components";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
const setColor = {
  primaryColor: "#14B795",
  mainWhite: "#fff",
  mainBlack: "#222",
  mainGrey: "#ececec",
  lightGrey: "#f7f7f7",
  mainRed: "#b71436",
  darkRed: "#94102c",
  lightRed: "#da1840",
};
const theme = createMuiTheme({
  typography: {
    fontFamily: "Poppins",
  },

  palette: {
    primary: {
      main: setColor.primaryColor,
    },
    white: {
      main: setColor.mainWhite,
    },
    black: {
      main: setColor.mainBlack,
    },
    red: {
      main: setColor.mainRed,
      dark: setColor.darkRed,
      light: setColor.lightRed,
    },
  },
});

export { setColor, theme };
