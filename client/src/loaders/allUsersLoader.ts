import { Store } from "redux";
import { customFetch, errorMessageHandler } from "../utils";
import { toast } from "react-toastify";
import { setAllUsers } from "../features/allUsers/allUsersSlice";
import { QueryClient } from "@tanstack/react-query";

interface LoaderRequest {
  request: Request;
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
      toast.error(
        errorMessageHandler(
          error as { response?: { data?: { msg?: string } } }
        ) + " 😵"
      );

      return null;
    }
  };
