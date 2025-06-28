import { useLoaderData } from "react-router-dom";
import { resetAllUsers } from "../features/allUsers/allUsersSlice";
import SearchInput from "./SearchInput";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

interface LoaderData {
  params: Record<string, string>;
}

const AllUsersFilter: React.FC = () => {
  const { params } = useLoaderData() as LoaderData;

  const dispatch = useDispatch();

  return (
    <form className="grid gap-4 items-end md:grid-cols-2 lg:grid-cols-3">
      <SearchInput
        label="Enter Name or Occupation"
        name="search"
        value={params.search ? params.search : ""}
      />

      {/* button */}
      <div className="mt-4 grid grid-cols-2 gap-x-4">
        {/* reset btn */}
        <Link
          to="/"
          className="btn btn-secondary btn-sm lg:btn-md btn-block capitalize tracking-wide"
          onClick={() => dispatch(resetAllUsers())}
        >
          reset
        </Link>
      </div>
    </form>
  );
};

export default AllUsersFilter;
