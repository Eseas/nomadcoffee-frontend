import { ApolloClient, HttpLink, InMemoryCache, makeVar } from "@apollo/client";

const TOKEN = "TOKEN";
const USERNAME = "USERNAME";
const DARK_MODE = "DARK_MODE";

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));
export const logUserIn = (token, username) => {
    localStorage.setItem(TOKEN, token);
    localStorage.setItem(USERNAME, username);
    isLoggedInVar(true);
}

export const logUserOut = () => {
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(USERNAME);
    isLoggedInVar(false);
}

export const darkModeVar = makeVar(Boolean(localStorage.getItem(DARK_MODE)));

export const enableDarkmode = () => {
    localStorage.setItem(DARK_MODE, "enable");
    darkModeVar(true)
}

export const disableDarkmode = () => {
    localStorage.removeItem(DARK_MODE);
    darkModeVar(false)
}

const httpLink = new HttpLink({uri: 'http://localhost:4000/graphql'});
export const client = new ApolloClient({
    //uri: "http://localhost:4000/graphql",
    link: httpLink,
    cache: new InMemoryCache(),
    connectToDevTools: true,
})