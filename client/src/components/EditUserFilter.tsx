import { useLoaderData, Form } from "react-router-dom";
import type { UserProps } from "../types";
import { useSelector } from "react-redux";
import { IRootState } from "../store";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormFile from "./FormFile";
import BackButton from "./BackButton";
import SubmitButton from "./SubmitButton";

interface LoaderData {
  user: UserProps;
}

const EditUserFilter = () => {
  const { user } = useLoaderData() as LoaderData;
  const { name, gender, birthday, occupation, phoneNumber } = user;
  const { genderOption, occupationOption } = useSelector(
    (state: IRootState) => state.user
  );

  return (
    <Form
      method="PATCH"
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

export default EditUserFilter;
