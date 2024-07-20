import { Store } from "redux";
import { customFetch, errorMessageHandler } from "../utils";
import { toast } from "react-toastify";
import { resetAllUsers, setAllUsers } from "../features/allUsers/allUsersSlice";
import { Link, useLoaderData } from "react-router-dom";
import SearchInput from "./SearchInput";
import { useDispatch } from "react-redux";
import { QueryClient } from "@tanstack/react-query";

interface LoaderRequest {
  request: Request;
}

interface LoaderData {
  params: Record<string, string>;
}

interface AllUsersProps {
  search?: string;
  page?: string;
}

// query function
const allUsersQuery = (params: AllUsersProps) => {
  const { search, page } = params;

  return {
    // nullish coalescing operator
    queryKey: ["allUsers", search ?? "searchTerm", page ?? "1"],
    queryFn: () => customFetch.get("/users", { params }),
  };
};

export const loader =
  (store: Store, queryClient: QueryClient) =>
  async ({ request }: LoaderRequest) => {
    try {
      const url = new URL(request.url);
      const params = Object.fromEntries(url.searchParams);
      // console.log(params);

      const response = await queryClient.ensureQueryData(allUsersQuery(params));
      // console.log(response);

      store.dispatch(setAllUsers({ data: response.data }));

      return {
        users: response.data.users,
        numOfPages: response.data.numOfPages,
        totalUsers: response.data.totalUsers,
        params,
      };
    } catch (error) {
      toast.error(errorMessageHandler(error) + " 😵");

      return null;
    }
  };

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
