import CreateUserFilter from "./CreateUserFilter";
import FormTitle from "./FormTitle";

const CreateUserFormContainer: React.FC = () => {
  return (
    <div className="form-outline">
      <FormTitle text="Create User" />
      <CreateUserFilter />
    </div>
  );
};

export default CreateUserFormContainer;
