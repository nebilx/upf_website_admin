import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ThemeProvider from "./theme";
import Router from "./routes";
import ScrollToTop from "./components/scroll-to-top/ScrollToTop";
import { Provider } from "react-redux";
import store from "./redux/store/configureStore";
import { Toaster } from "react-hot-toast";
import "./App.css";
function App() {
  return (
    <HelmetProvider>
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider>
            <Toaster />
            <ScrollToTop />
            {/* <StyledChart /> */}
            <Router />
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    </HelmetProvider>
  );
}

export default App;
