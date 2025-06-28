import { useLoaderData, useLocation, useNavigate } from "react-router-dom/dist";

interface PageButtonProp {
  pageNumber: number;
  isActive: boolean;
}

interface LoaderData {
  numOfPages: number;
  params: Record<string, string>;
}

const Pagination: React.FC = () => {
  const { numOfPages, params } = useLoaderData() as LoaderData;
  const location = useLocation();
  const { pathname, search } = location;
  const navigate = useNavigate();

  // params got String type, remember to convert type
  const page = parseInt(params?.page) || 1;

  // conditional rendering
  if (numOfPages < 2) return null;

  // click page button
  const pageChangeHandler = (number: number) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", String(number));

    navigate(`${pathname}?${searchParams.toString()}`);
  };

  // make single page button
  const pageButton = ({ pageNumber, isActive }: PageButtonProp) => {
    return (
      <button
        key={pageNumber}
        className={`btn btn-neutral btn-sm lg:btn-md join-item ${
          isActive && "btn-active"
        }`}
        onClick={() => pageChangeHandler(pageNumber)}
      >
        {pageNumber}
      </button>
    );
  };

  // make all page buttons (array of objects)
  const allPageButtons = () => {
    const pageButtons = [];

    // first page button
    pageButtons.push(pageButton({ pageNumber: 1, isActive: page === 1 }));

    // ... button
    if (page > 2) {
      pageButtons.push(
        <button
          key="dot-1"
          className="btn btn-neutral btn-sm lg:btn-md join-item"
        >
          ...
        </button>
      );
    }

    // other page button
    if (page !== 1 && page !== numOfPages) {
      pageButtons.push(pageButton({ pageNumber: page, isActive: true }));
    }

    // ... button
    if (page < numOfPages - 1) {
      pageButtons.push(
        <button
          key="dot-2"
          className="btn btn-neutral btn-sm lg:btn-md join-item"
        >
          ...
        </button>
      );
    }

    // last page button
    pageButtons.push(
      pageButton({ pageNumber: numOfPages, isActive: page === numOfPages })
    );

    return pageButtons;
  };

  return (
    <section className="mt-12 flex justify-center">
      <div className="join">
        {/* prev button */}
        <button
          className="btn btn-neutral btn-sm lg:btn-md join-item"
          onClick={() => {
            if (page === 1) {
              pageChangeHandler(numOfPages);
            } else {
              pageChangeHandler(page - 1);
            }
          }}
        >
          prev
        </button>

        {/* render all page buttons */}
        {allPageButtons()}

        {/* next button */}
        <button
          className="btn btn-neutral btn-sm lg:btn-md join-item"
          onClick={() => {
            if (page === numOfPages) {
              pageChangeHandler(1);
            } else {
              pageChangeHandler(page + 1);
            }
          }}
        >
          next
        </button>
      </div>
    </section>
  );
};

export default Pagination;
