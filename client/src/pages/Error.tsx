import notFound from "../assets/images/not-found.svg";
import { NavLink, useRouteError, isRouteErrorResponse } from "react-router-dom";

const Error: React.FC = () => {
  const error = useRouteError();
  // console.log(error);

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return (
        <main className="min-h-screen flex justify-center items-center">
          <section className="grid lg:grid-cols-2 gap-x-16 gay-y-8 justify-center items-center">
            {/* image */}
            <div className="max-w-[500px]">
              <img src={notFound} alt="not found" className="w-full" />
            </div>
            {/* info */}
            <div className="text-center">
              <h1 className="capitalize text-3xl lg:text-4xl font-bold font-palanquin">
                page not found
              </h1>
              <p className="mt-4 text-slate-500 font-montserrat leading-7 tracking-wide">
                Sorry, we couldn’t find the page you’re looking for
              </p>
              <NavLink
                to="/"
                className="mt-6 btn btn-sm lg:btn-md capitalize btn-outline btn-error tracking-wide"
              >
                Home
              </NavLink>
            </div>
          </section>
        </main>
      );
    }
  }
};

export default Error;
