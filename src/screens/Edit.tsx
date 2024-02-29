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
import { gql, useMutation, useQuery } from "@apollo/client";
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

const EDIT_COFFEESHOP_MUTATION = gql`
    mutation editCoffeeShops (
        $name: String!
        $latitude: String!
        $logitude: String!
        $category: String!
        $file: [Upload]
    ) {
        editCoffeeShops(
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

const SeeCoffeeShop_Query = gql`
    query seeCoffeeShop($id: Int!) {
        seeCoffeeShop(id: $id) {
            id
            name
            latitude
            logitude
            categories {
                name
            }
            photos {
                url
            }
        }
    }
`

function Edit() {
  const navigated = useNavigate();
  const { register, handleSubmit, formState, getValues, setError } = useForm({ mode: "onChange" });

  const { loading: findCoffeeShopLoading, error, data: CoffeeShop_data } = useQuery(SeeCoffeeShop_Query, {
    variables: { id: localStorage.getItem("COFFEESHOP_ID") },
  });

  const onCompleted = (data) => {
    const {editCoffeeShops: {ok, error}} = data;
    if(!ok) {
        setError("result", {
            message: error,
        })
    }
    navigated(routes.home, {state: {message: "CoffeeShop is created."}});
  }

  const [editCoffeeShops, { loading }] = useMutation(EDIT_COFFEESHOP_MUTATION, {
    onCompleted,
  });

  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }
    //const {firstName, lastName, email, username, password} = getValues();
    editCoffeeShops({
      variables: {
        ...data,
      },
    });
    //console.log(firstName, lastName, email, username, password);
    console.log(data);
  };


  return (
    <AuthLayout>
      <PageTitle title="Edit CoffeeShop Info" />
      <FormBox>
        <HeaderContainer>
          <Logofont>
            <p>𝓷𝓸𝓶𝓪𝓭 𝓬𝓸𝓯𝓯𝓮𝓮</p>
          </Logofont>
          <Subtitle>
            Edit CoffeeShop : owner is {localStorage.getItem("USERNAME")}
            CoffeeShop Id : {localStorage.getItem("CoffeeShopId")}
          </Subtitle>
        </HeaderContainer>
        <form onSubmit={handleSubmit(onSubmitValid)}>
            <Input {...register("id", {
            required: "id is Required"
            })}
            name="id"
            value={CoffeeShop_data.id}
            type="text"
            placeholder="CoffeeShop id"
            readOnly
          />
          <Input {...register("name", {
            required: "name is Required"
          })}
            name="name"
            value={CoffeeShop_data.name}
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
          <Input {...register} type="file" name="file" />
          <FormError message={formState.errors?.file?.message} />
          <Button
            type="submit"
            value={loading ? "Loading..." : "Edit CoffeeShop"}
            disabled={!formState.isValid || findCoffeeShopLoading || loading}
          />
        </form>
      </FormBox>
      <BottomBox
        cta="Don't Edit CoffeeShop? "
        linkText="Go Home"
        link={routes.home}
      />
    </AuthLayout>
  );
}
export default Edit;