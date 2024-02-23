import { BrowserRouter, Route, Routes } from "react-router-dom"
import NotFound from "./screens/NotFound";
import Home from "./screens/Home";
import Login from "./screens/Login";
import { useReactiveVar } from "@apollo/client";
import { darkModeVar, isLoggedInVar } from "./apollo";
import { ThemeProvider } from "styled-components";
import { GlobalStyles, darkTheme, lightTheme } from "./styled";


function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);
  console.log(darkMode);
  return (
    <div>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isLoggedIn ? <Home /> : <Login />}>
          </Route>
          <Route path="*" element={
            <NotFound />
            //<Navigate to="/" />
          }>
          </Route>
        </Routes>
      </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;