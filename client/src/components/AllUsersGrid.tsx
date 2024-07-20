import { useLoaderData, useNavigate, useLocation } from "react-router-dom";
import type { UserProps } from "../types";
import DeleteUserModal from "./DeleteUserModal";
import { setShouldDeleteId } from "../features/user/userSlice";
import { useDispatch } from "react-redux";

interface LoaderData {
  users: UserProps[];
}

const AllUsersGrid: React.FC = () => {
  const { users } = useLoaderData() as LoaderData;

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const navigateHandler = (_id: string) => {
    navigate(`/edit/${_id}`, {
      state: { from: location.pathname + location.search },
    });
  };

  return (
    <>
      <section className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {users.map((user) => {
          const {
            _id,
            name,
            gender,
            birthday,
            occupation,
            phoneNumber,
            image,
          } = user;

          return (
            <article
              key={_id}
              className="card w-full shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
            >
              <figure>
                <img
                  src={image}
                  alt={name}
                  className="w-full h-40 object-cover object-center"
                />
              </figure>
              <div className="card-body bg-base-100 rounded-b-xl">
                <h2 className="text-2xl font-bold font-palanquin">{name}</h2>
                <p>Gender: {gender}</p>
                <p>Birthday: {birthday}</p>
                <p>Occupation: {occupation}</p>
                <p>Phone Number: {phoneNumber}</p>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    className="btn btn-primary btn-sm lg:btn-md btn-block capitalize tracking-wide"
                    onClick={() => navigateHandler(_id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-error btn-sm lg:btn-md btn-block capitalize tracking-wide"
                    onClick={() => {
                      const modal = document.getElementById(
                        "my-modal"
                      ) as HTMLDialogElement;
                      if (modal) {
                        modal.showModal();
                      }
                      dispatch(setShouldDeleteId(_id));
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <DeleteUserModal />
    </>
  );
};

export default AllUsersGrid;
