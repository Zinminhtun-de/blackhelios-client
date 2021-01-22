import React from "react";
import ReactDOM from "react-dom";
import { Provider, ReactReduxContext } from "react-redux";
import { configureStore } from "./redux/store";
import App from "./App/index";
import { ConnectedRouter } from "connected-react-router";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { theme } from "./styles/theme";
import { ToastContainer, toast } from "react-toastify";
import GlobalStyle from "./styles/globalStyles";
// CSS IMPORTING
import "react-quill/dist/quill.snow.css"; // ES6
import "react-toastify/dist/ReactToastify.css";
const store = configureStore().store;

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={configureStore().history}>
      <div>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <MuiThemeProvider theme={theme}>
          <GlobalStyle />
          <App />
        </MuiThemeProvider>
      </div>
    </ConnectedRouter>
  </Provider>,

  document.getElementById("root")
);
