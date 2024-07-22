import { useNavigate, useLocation, useNavigation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IRootState } from "../store";
import { resetUser } from "../features/user/userSlice";

const BackButton: React.FC = () => {
  const location = useLocation();
  const from = location.state?.from || "/";

  const navigation = useNavigation();
  const isSubmit = navigation.state === "submitting";

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { isImageUploading } = useSelector((state: IRootState) => state.user);

  const navigateHandler = () => {
    dispatch(resetUser());
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
