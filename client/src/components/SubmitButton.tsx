import { useNavigation } from "react-router-dom";
import { useSelector } from "react-redux";
import { IRootState } from "../store";

interface Props {
  text: string;
  size?: string;
}

const SubmitButton = ({ text, size }: Props) => {
  const navigation = useNavigation();
  const isSubmit = navigation.state === "submitting";

  const { isImageUploading } = useSelector((state: IRootState) => state.user);

  return (
    <button
      type="submit"
      className={`btn btn-primary btn-block capitalize tracking-wide ${
        size || "btn-sm lg:btn-md"
      }`}
      disabled={isSubmit || isImageUploading}
    >
      {isSubmit ? (
        <div className="flex gap-1 items-center">
          <span className="loading loading-spinner loading-sm"></span>
          loading...
        </div>
      ) : (
        text || "submit"
      )}
    </button>
  );
};

export default SubmitButton;
