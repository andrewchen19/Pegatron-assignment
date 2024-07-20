import AllUsersFilter from "./AllUsersFilter";
import FormTitle from "./FormTitle";

const FormContainer: React.FC = () => {
  return (
    <>
      <div className="form-outline">
        <FormTitle text="User Filter" />
        <AllUsersFilter />
      </div>
    </>
  );
};

export default FormContainer;
