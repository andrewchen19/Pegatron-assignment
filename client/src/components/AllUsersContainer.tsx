import { useLoaderData } from "react-router-dom/dist";
import { BsFillGridFill, BsList } from "react-icons/bs";
import { setLayout } from "../features/allUsers/allUsersSlice";
import { useSelector, useDispatch } from "react-redux";
import { IRootState } from "../store";
import AllUsersGrid from "./AllUsersGrid";
import AllUsersList from "./AllUsersList";

interface LoaderData {
  totalUsers: number;
}

const AllUsersContainer: React.FC = () => {
  const { totalUsers } = useLoaderData() as LoaderData;

  const { layout } = useSelector((state: IRootState) => state.allUsers);
  const dispatch = useDispatch();

  // utility function
  const activeButton = (pattern: string) => {
    return `btn btn-sm btn-circle  ${
      pattern === layout
        ? "btn-accent text-primary-content"
        : "btn-ghost text-based-content"
    }`;
  };

  // conditional rendering
  if (totalUsers === 0) {
    return (
      <div className="mt-10">
        <h3 className=" font-palanquin font-semibold text-secondary text-2xl lg:text-3xl tracking-wide">
          No user to display...
        </h3>
      </div>
    );
  }

  return (
    <>
      <header className="mt-10 flex items-center justify-between border-b border-gray-300 pb-4">
        <h3 className="capitalize font-palanquin font-semibold text-xl lg:text-2xl tracking-wide">
          <span className="text-primary">{totalUsers}</span>&nbsp;
          <span>user{totalUsers > 1 ? "s" : ""}</span> found
        </h3>

        <div className="flex gap-1">
          <button
            type="button"
            className={activeButton("grid")}
            onClick={() => dispatch(setLayout("grid"))}
          >
            <BsFillGridFill />
          </button>
          <button
            type="button"
            className={activeButton("list")}
            onClick={() => dispatch(setLayout("list"))}
          >
            <BsList />
          </button>
        </div>
      </header>

      {layout === "grid" ? <AllUsersGrid /> : <AllUsersList />}
    </>
  );
};

export default AllUsersContainer;
