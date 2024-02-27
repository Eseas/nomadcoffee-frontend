import styled from "styled-components";
import { darkModeVar } from "../apollo";
import routes from "../routes";
import AuthLayout from "../components/auth/AuthLayout";
import Button from "../components/auth/Button";
import Separator from "../components/auth/Separator";
import Input from "../components/auth/Input";
import FormBox from "../components/auth/FormBox";
import BottomBox from "../components/auth/BottomBox";
import { FatLink } from "../components/shared";
import { Helmet } from "react-helmet-async";
import PageTitle from "../components/PageTitle";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import FormError from "../components/auth/FormError";
import { useNavigate } from "react-router-dom";
import { Logofont } from "../components/auth/Logofont";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Subtitle = styled(FatLink)`
    text-align: center;
    margin-top: 25px;
`

const CREATEACCOUNT_MUTATION = gql`
    mutation createAccount(
        $firstName: String!
        $lastName: String
        $username: String!
        $email:String!
        $password: String!
    ) {
        createAccount(
            firstName: $firstName
            lastName: $lastName
            username: $username
            email: $email
            password: $password
        ) {
            ok
            error
        }
    }
`

function SignUp() {
  const navigated = useNavigate();
  const { register, handleSubmit, formState, getValues, setError } = useForm({ mode: "onChange" });
  const onCompleted = (data) => {
    const {createAccount: {ok, error}} = data;
    if(!ok) {
        setError("result", {
            message: error,
        })
    }
    navigated(routes.home, {state: {message: "Account created. Please log in"}});
  }
  const [createAccount, { loading }] = useMutation(CREATEACCOUNT_MUTATION, {
    onCompleted,
  });
  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }
    //const {firstName, lastName, email, username, password} = getValues();
    createAccount({
      variables: {
        ...data,
      },
    });
    //console.log(firstName, lastName, email, username, password);
    console.log(data);
  };
  return (
    <AuthLayout>
      <PageTitle title="Sign Up" />
      <FormBox>
        <HeaderContainer>
          <Logofont>
            <p>𝓷𝓸𝓶𝓪𝓭 𝓬𝓸𝓯𝓯𝓮𝓮</p>
          </Logofont>
          <Subtitle>
            Sign up to see photos and videos from your friends.
          </Subtitle>
        </HeaderContainer>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input {...register("firstName", {
            required: "First name is Required"
          })}
            name="firstName"
            type="text"
            placeholder="First Name"
          />
          <FormError message={formState.errors?.firstName?.message} />
          <Input {...register("lastName")}
            name="lastName"
            type="text"
            placeholder="Last Name"
          />
          <FormError message={formState.errors?.lastName?.message} />
          <Input {...register("email", {
            required: "Email is Required"
          })}
            name="email"
            type="text"
            placeholder="Email"
          />
          <FormError message={formState.errors?.email?.message} />
          <Input {...register("username", {
            required: "Username is Required"
          })}
            name="username"
            type="text"
            placeholder="Username"
          />
          <FormError message={formState.errors?.username?.message} />
          <Input {...register("password", {
            required: "Password is Required"
          })}
            name="password"
            type="password"
            placeholder="Password"
          />
          <FormError message={formState.errors?.password?.message} />

          <Button
            type="submit"
            value={loading ? "Loading..." : "Sign up"}
            disabled={!formState.isValid || loading}
          />
        </form>
      </FormBox>
      <BottomBox
        cta="have an account?"
        linkText="Log in"
        link={routes.home}
      />
    </AuthLayout>
  );
}
export default SignUp;