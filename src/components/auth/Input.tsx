import styled from "styled-components";
import { darkModeVar } from "../../apollo";

interface InputProps {
    hasError?: boolean;
}

const Input = styled.input<InputProps>`    
      width: 100%;
      border-radius: 3px;
      padding: 7px;
      background-color: #fafafa;
      border: 0.5px solid ${(props) => props.hasError ? "tomato" : props.theme.borderColor};
      margin-top: 5px;
      box-sizing: border-box;
      color: ${darkModeVar ? "#121212" : "white"};
      &::placeholder {
        font-size: 12px;
        
      }
      &:focus {
        border-color: rgb(38, 38, 38);
      }
`

export default Input;