import { Store } from "redux";
import { customFetch, errorMessageHandler } from "../utils";
import { toast } from "react-toastify";
import { setUser } from "../features/user/userSlice";
import { LoaderFunctionArgs } from "react-router-dom";

export const loader =
  (store: Store) =>
  async ({ params }: LoaderFunctionArgs) => {
    try {
      const id = params.id;

      const response = await customFetch.get(`users/${id}`);

      store.dispatch(setUser(response.data.user));

      return {
        user: response.data.user,
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
