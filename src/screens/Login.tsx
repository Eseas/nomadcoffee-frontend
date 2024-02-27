import styled from "styled-components";
import { darkModeVar, logUserIn } from "../apollo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import routes from "../routes";
import AuthLayout from "../components/auth/AuthLayout";
import Button from "../components/auth/Button";
import Separator from "../components/auth/Separator";
import Input from "../components/auth/Input";
import FormBox from "../components/auth/FormBox";
import BottomBox from "../components/auth/BottomBox";
import React from "react";
import PageTitle from "../components/PageTitle";
import { useForm } from "react-hook-form";
import FormError from "../components/auth/FormError";
import { gql, useMutation } from "@apollo/client";
import { useLocation } from "react-router-dom";
import { Logofont } from "../components/auth/Logofont";

const Title = styled.h1`
  color: ${(props) => props.theme.fontColor};
`;

const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

const Notification = styled.div`
    color: #2ecc71;
    margin-top: 5px;
`;

const LOGIN_MUTATION = gql`
    mutation login($username:String!, $password:String!) {
        login(username:$username, password:$password) {
            ok
            token
            error
        }
    }
`

function Login() {
  const { register, handleSubmit, formState, setError, getValues, clearErrors } = useForm({mode:"onChange"});
  
  const location = useLocation();

  const onCompleted = (data) => {
    const {login: {ok, error, token}} = data;
    const {username} = getValues()
    console.log("login username: ", username);
    if(!ok) {
        setError("result", {
            message: error,
        })
    }
    if(token) {
        logUserIn(token, username);
    }
  }

  const [login, {loading}] = useMutation(LOGIN_MUTATION,{
    onCompleted,
  });

  const onSubmitValid = (data) => {
  // Handle the valid form submission
  if(loading) {
      return;
  }
      const {username, password} = getValues();
      login({
          variables: {username, password},
      });
  }

  const clearLoginError = () => {
    clearErrors("result");
  }

  return (
    <AuthLayout>
      <PageTitle title="Login" />
      <FormBox>
        <div>
          <Logofont>
            <p>𝓷𝓸𝓶𝓪𝓭 𝓬𝓸𝓯𝓯𝓮𝓮</p>
          </Logofont>
        </div>
        <Notification>{location?.state?.message}</Notification>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            {...register('username', {
                required: "Username is Required",
                minLength: {
                    value: 5,
                    message: "username should be longer than 5 chars",
                }
            })}
            onChange={clearLoginError}
            name="username"
            type="text"
            placeholder="Username" 
            hasError={Boolean(formState.errors?.username?.message)}
          />
          <FormError message={formState.errors?.username?.message} />
          <Input
            {...register('password',{
                required: "Password is Required",
            })}
            name="password"
            type="password"
            placeholder="Password"
            hasError={Boolean(formState.errors?.password?.message)}
          />
          <FormError message={formState.errors?.password?.message} />
          <Button
            type= "submit"
            value= {loading ? "Loading..." : "Log in"}
            disabled={!formState.isValid || loading}
          />
          <FormError message={formState.errors?.result?.message} />
        </form>
        <Separator />
        <FacebookLogin>
          <FontAwesomeIcon icon={faFacebookSquare} />
          <span>Log in with Facebook</span>
        </FacebookLogin>
      </FormBox>
      <BottomBox
        cta="Don't have an account?"
        linkText="Sign up"
        link={routes.signUp}
      />
    </AuthLayout>
  );
}
export default Login;