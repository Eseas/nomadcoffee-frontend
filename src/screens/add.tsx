import styled from "styled-components";
import { darkModeVar } from "../apollo";
import routes from "../routes";
import AuthLayout from "../components/auth/AuthLayout";
import Button from "../components/auth/Button";
import Input from "../components/auth/Input";
import FormBox from "../components/auth/FormBox";
import BottomBox from "../components/auth/BottomBox";
import { FatLink } from "../components/shared";
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

const CREATECOFFEESHOP_MUTATION = gql`
    mutation createCoffeeShop (
        $name: String!
        $latitude: String!
        $logitude: String!
        $category: String!
        $file: [Upload]
    ) {
        createCoffeeShop(
            name : $name
            latitude : $latitude
            logitude : $logitude
            category : $category
            CoffeeShopPhoto : $file
        ) {
            ok
            error
        }
    }
`

function Add() {
  const navigated = useNavigate();
  const { register, handleSubmit, formState, getValues, setError } = useForm({ mode: "onChange" });
  const onCompleted = (data) => {
    const {createCoffeeShop: {ok, error}} = data;
    if(!ok) {
        setError("result", {
            message: error,
        })
    }
    navigated(routes.home, {state: {message: "CoffeeShop is created."}});
  }
  const [createCoffeeShop, { loading }] = useMutation(CREATECOFFEESHOP_MUTATION, {
    onCompleted,
  });
  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }
    //const {firstName, lastName, email, username, password} = getValues();
    createCoffeeShop({
      variables: {
        ...data,
      },
    });
    //console.log(firstName, lastName, email, username, password);
    console.log(data);
  };
  return (
    <AuthLayout>
      <PageTitle title="Add CoffeeShop" />
      <FormBox>
        <HeaderContainer>
          <Logofont>
            <p>𝓷𝓸𝓶𝓪𝓭 𝓬𝓸𝓯𝓯𝓮𝓮</p>
          </Logofont>
          <Subtitle>
            Add CoffeeShop : owner is {localStorage.getItem("USERNAME")}
          </Subtitle>
        </HeaderContainer>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input {...register("name", {
            required: "name is Required"
          })}
            name="name"
            type="text"
            placeholder="CoffeeShop Name"
          />
          <FormError message={formState.errors?.name?.message} />
          <Input {...register("latitude", {
                required: "latitude is Required"
            })}
            name="latitude"
            type="text"
            placeholder="latitude"
          />
          <FormError message={formState.errors?.latitude?.message} />
          <Input {...register("logitude", {
            required: "logitude is Required"
          })}
            name="logitude"
            type="text"
            placeholder="logitude"
          />
          <FormError message={formState.errors?.logitude?.message} />
          <Input {...register("category", {
            required: "category is Required"
          })}
            name="category"
            type="text"
            placeholder="category"
          />
          <FormError message={formState.errors?.category?.message} />
          <Input {...register("password", {
            required: "Password is Required"
          })}
            name="password"
            type="password"
            placeholder="Password"
          />
          <FormError message={formState.errors?.password?.message} />
          <Input {...register} type="file" name="file" />
          <FormError message={formState.errors?.file?.message} />
          <Button
            type="submit"
            value={loading ? "Loading..." : "Add CoffeeShop"}
            disabled={!formState.isValid || loading}
          />
        </form>
      </FormBox>
      <BottomBox
        cta="Don't add CoffeeShop? "
        linkText="Go Home"
        link={routes.home}
      />
    </AuthLayout>
  );
}
export default Add;