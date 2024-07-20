import { useDispatch } from "react-redux";
import {
  setUserImage,
  setImageIsUploading,
  setImageIsNotUploading,
} from "../features/user/userSlice";
import { customFetch, errorMessageHandler } from "../utils";
import { toast } from "react-toastify";

interface Props {
  label: string;
  name: string;
  accept: string;
  size?: string;
}

const FormFile = ({ label, name, accept, size }: Props) => {
  const dispatch = useDispatch();

  const fileHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const imageFile = e.target.files[0];
    const formData = new FormData();
    formData.append("image", imageFile);

    dispatch(setImageIsUploading());

    try {
      const {
        data: {
          msg,
          image: { src },
        },
      } = await customFetch.post(`/users/uploads`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(msg + "😎");
      // console.log(src);

      dispatch(setUserImage(src));
    } catch (error) {
      toast.error(errorMessageHandler(error + "😵"));
    }

    dispatch(setImageIsNotUploading());
  };

  return (
    <div className="form-control">
      <label className="label" htmlFor={name}>
        <span className="label-text capitalize font-montserrat">{label}</span>
      </label>
      <input
        type="file"
        id={name}
        name={name}
        accept={accept}
        onChange={fileHandler}
        className={`input input-bordered ${size || "input-sm lg:input-md"}`}
      />
    </div>
  );
};

export default FormFile;
