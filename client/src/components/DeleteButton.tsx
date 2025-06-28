import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IRootState } from "../store";
import { resetUser } from "../features/user/userSlice";
import { customFetch, errorMessageHandler } from "../utils";
import { toast } from "react-toastify";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  text: string;
  size?: string;
}

const DeleteButton = ({ text, size }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const { shouldDeleteId } = useSelector((state: IRootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const deleteHandler = async () => {
    setIsLoading(true);
    try {
      const response = await customFetch.delete(`/users/${shouldDeleteId}`);

      toast.success(response.data.msg + " 😎");

      const modal = document.getElementById("my-modal") as HTMLDialogElement;
      if (modal) {
        modal.close();
        dispatch(resetUser());
        // remove specific query and fetch new one
        queryClient.removeQueries({ queryKey: ["allUsers"] });
        navigate("/");
      }
    } catch (error) {
      toast.error(
        errorMessageHandler(
          error as { response?: { data?: { msg?: string } } }
        ) + " 😵"
      );
    }

    setIsLoading(false);
  };

  return (
    <button
      type="button"
      className={`btn btn-error capitalize ${size || "btn-sm lg:btn-md"}`}
      disabled={isLoading}
      onClick={deleteHandler}
    >
      {isLoading ? (
        <div className="flex gap-1 items-center">
          <span className="loading loading-spinner loading-sm"></span>
          loading...
        </div>
      ) : (
        text || "Delete"
      )}
    </button>
  );
};

export default DeleteButton;
