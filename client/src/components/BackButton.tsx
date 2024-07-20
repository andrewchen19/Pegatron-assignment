import { useNavigate, useLocation, useNavigation } from "react-router-dom";
import { useSelector } from "react-redux";
import { IRootState } from "../store";

const BackButton: React.FC = () => {
  const location = useLocation();
  const from = location.state?.from || "/";

  const navigation = useNavigation();
  const isSubmit = navigation.state === "submitting";

  const navigate = useNavigate();

  const { isImageUploading } = useSelector((state: IRootState) => state.user);

  const navigateHandler = () => {
    navigate(from);
  };

  return (
    <button
      type="button"
      className="btn btn-secondary btn-sm lg:btn-md btn-block capitalize tracking-wide"
      disabled={isSubmit || isImageUploading}
      onClick={navigateHandler}
    >
      back
    </button>
  );
};

export default BackButton;
