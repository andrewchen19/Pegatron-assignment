import { useLoaderData, useNavigate, useLocation } from "react-router-dom";
import type { UserProps } from "../types";
import DeleteUserModal from "./DeleteUserModal";
import { setShouldDeleteId } from "../features/user/userSlice";
import { useDispatch } from "react-redux";

interface LoaderData {
  users: UserProps[];
}

const AllUsersList: React.FC = () => {
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
      <section className="mt-12">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Gender</th>
                <th>Birthday</th>
                <th>Occupation</th>
                <th>Phone Number</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                const { _id, name, gender, birthday, occupation, phoneNumber } =
                  user;

                return (
                  <tr key={_id}>
                    <th></th>
                    <th>{name}</th>
                    <th>{gender}</th>
                    <th>{birthday}</th>
                    <th>{occupation}</th>
                    <th>{phoneNumber}</th>
                    <th className="grid grid-cols-2 gap-4">
                      <button
                        className="btn btn-primary btn-sm btn-block capitalize tracking-wide"
                        onClick={() => navigateHandler(_id)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-error btn-sm btn-block capitalize tracking-wide"
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
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <DeleteUserModal />
    </>
  );
};

export default AllUsersList;
