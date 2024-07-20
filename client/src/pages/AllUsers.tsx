import {
  AllUsersContainer,
  AllUsersFormContainer,
  Pagination,
} from "../components";

const AllUsers: React.FC = () => {
  return (
    <>
      {/* form */}
      <AllUsersFormContainer />

      {/* data */}
      <AllUsersContainer />

      {/* pagination */}
      <Pagination />
    </>
  );
};

export default AllUsers;
