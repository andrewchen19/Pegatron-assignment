import { Form, redirect, ActionFunctionArgs } from "react-router-dom";
import { Store } from "redux";
import { customFetch, errorMessageHandler } from "../utils";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { IRootState } from "../store";
import { resetUser } from "../features/user/userSlice";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormFile from "./FormFile";
import BackButton from "./BackButton";
import SubmitButton from "./SubmitButton";
import { QueryClient } from "@tanstack/react-query";

interface Params {
  id: string;
}

export const action =
  (store: Store, queryClient: QueryClient) =>
  async ({ request }: ActionFunctionArgs<Params>) => {
    try {
      const formData = await request.formData();
      const formObject = Object.fromEntries(formData);
      // console.log(formObject);

      // get the path of image
      const { image } = store.getState().user;
      formObject.image = image;

      const response = await customFetch.post(`/users`, formObject);

      // remove specific query and fetch new one
      queryClient.removeQueries({ queryKey: ["allUsers"] });

      toast.success(response.data.msg + " 😎");
      store.dispatch(resetUser());

      return redirect("/");
    } catch (error) {
      toast.error(errorMessageHandler(error) + " 😵");

      return null;
    }
  };

const CreateUserFilter: React.FC = () => {
  const {
    name,
    gender,
    birthday,
    occupation,
    phoneNumber,
    genderOption,
    occupationOption,
  } = useSelector((state: IRootState) => state.user);

  return (
    <Form
      method="POST"
      className="grid gap-4 items-end md:grid-cols-2 lg:grid-cols-3"
    >
      <FormInput label="* name" type="text" name="name" defaultValue={name} />
      <FormSelect
        label="* gender"
        name="gender"
        defaultValue={gender}
        options={genderOption}
      />
      <FormInput
        label="* birthday"
        type="date"
        name="birthday"
        defaultValue={birthday}
      />
      <FormSelect
        label="* occupation"
        name="occupation"
        defaultValue={occupation}
        options={occupationOption}
      />
      <FormInput
        label="* phoneNumber"
        type="tel"
        name="phoneNumber"
        defaultValue={phoneNumber}
      />
      <FormFile label="image" name="image" accept="image/*" />

      {/* button */}
      <div className="mt-4 grid grid-cols-2 gap-x-4">
        {/* back where came from */}
        <BackButton />

        {/* submit btn */}
        <SubmitButton text="submit" />
      </div>
    </Form>
  );
};

export default CreateUserFilter;
