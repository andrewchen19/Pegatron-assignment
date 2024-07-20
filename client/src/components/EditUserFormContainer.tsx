import EditUserFilter from "./EditUserFilter";
import FormTitle from "./FormTitle";

const EditUserFormContainer: React.FC = () => {
  return (
    <div className="form-outline">
      <FormTitle text="Edit User" />
      <EditUserFilter />
    </div>
  );
};

export default EditUserFormContainer;
