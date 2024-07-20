import { BsFillPlusCircleFill } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";

const Title: React.FC = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const shouldShowButton = pathname === "/" || pathname.startsWith("/?");

  const navigate = useNavigate();

  const navigateHandler = () => {
    navigate(`/create`, {
      state: { from: location.pathname + location.search },
    });
  };

  return (
    <div className="flex justify-center items-center pb-10 relative">
      <h2 className="font-montserrat font-bold text-2xl text-primary">
        User Management System
      </h2>

      {shouldShowButton && (
        <button
          className="absolute bottom-0 right-0 btn btn-xs rounded-md mb-3 text-sm font-semibold flex gap-2 items-center"
          onClick={navigateHandler}
        >
          <BsFillPlusCircleFill /> Add New User
        </button>
      )}
    </div>
  );
};

export default Title;
