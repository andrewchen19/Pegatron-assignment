import { redirect, ActionFunctionArgs } from "react-router-dom";
import { Store } from "redux";
import { customFetch, errorMessageHandler } from "../utils";
import { toast } from "react-toastify";
import { resetUser } from "../features/user/userSlice";
import { QueryClient } from "@tanstack/react-query";

interface Params {
  id: string;
}

export const action =
  (store: Store, queryClient: QueryClient) =>
  async ({ request, params }: ActionFunctionArgs<Params>) => {
    try {
      const formData = await request.formData();
      const formObject = Object.fromEntries(formData);
      // console.log(formObject);

      // get the path of image
      const { image } = store.getState().user;
      formObject.image = image;

      // get dynamic segment
      const id = params.id;
      const response = await customFetch.patch(`/users/${id}`, formObject);

      // remove specific query and fetch new one
      queryClient.removeQueries({ queryKey: ["allUsers"] });

      toast.success(response.data.msg + " 😎");
      store.dispatch(resetUser());

      return redirect("/");
    } catch (error) {
      toast.error(
        errorMessageHandler(
          error as { response?: { data?: { msg?: string } } }
        ) + " 😵"
      );

      return null;
    }
  };
