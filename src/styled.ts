import { createGlobalStyle } from "styled-components"
import reset from "styled-reset";

export const lightTheme = {
    accent: "#0095f6",
    bgColor: "#FAFAFA",
    fontColor: "rgb(38, 38, 38)",
    borderColor: "rgb(219, 219, 219)",
};

export const darkTheme = {
    accent: "white",
    fontColor: "white",
    bgColor: "#2c2c2c",
    borderColor: "rgb(38, 38, 38)"
};

export const GlobalStyles = createGlobalStyle`
    ${reset}
    * {
        box-sizing: border-box;
    }
    input {
        all: unset;
    }
    body {
        background-color: ${(props) => props.theme.bgColor};
        font-size: 14px;
        font-family: 'Open Sans', sans-serif;
        color: ${(props) => props.theme.bgColor};
    }
    a {
        text-decoration: none;
    }
`;