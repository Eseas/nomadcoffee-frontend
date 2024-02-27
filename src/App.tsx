import { BrowserRouter, Route, Routes } from "react-router-dom"
import NotFound from "./screens/NotFound";
import Home from "./screens/Home";
import Login from "./screens/Login";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { client, darkModeVar, isLoggedInVar } from "./apollo";
import { ThemeProvider } from "styled-components";
import { GlobalStyles, darkTheme, lightTheme } from "./styled";
import SignUp from "./screens/SignUp";
import routes from "./routes";
import { HelmetProvider } from "react-helmet-async";
import Admin from "./screens/Admin";


function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path={routes.home} element={isLoggedIn ? <Home /> : <Login />}>
          </Route>
          {!isLoggedIn ? (
            <Route path={routes.signUp} element={<SignUp />} />
          ) : null}
          <Route path={`${routes.admin}/${localStorage.getItem("USERNAME")}`} element={<Admin />}>
          </Route>
          <Route path="*" element={
            <NotFound />
            //<Navigate to="/" />
          }>
          </Route>
        </Routes>
      </BrowserRouter>
      </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
}

export default App;