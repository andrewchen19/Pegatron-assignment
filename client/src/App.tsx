import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AllUsers, CreateUser, EditUser, Error, Layout } from "./pages";

// toastify
import { ToastContainer, Zoom } from "react-toastify";

// loaders
import { loader as allUsersLoader } from "./components/AllUsersFilter";
import { loader as editUserLoader } from "./pages/EditUser";

// actions
import { action as createUserAction } from "./components/CreateUserFilter";
import { action as editUserAction } from "./components/EditUserFilter";

// store
import { store } from "./store";

// React Query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * (1000 * 60), // 5 mins
    },
  },
});

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <Error />,
      children: [
        {
          path: "/",
          element: <AllUsers />,
          loader: allUsersLoader(store, queryClient),
        },
        {
          path: "/create",
          element: <CreateUser />,
          action: createUserAction(store, queryClient),
        },
        {
          path: "/edit/:id",
          element: <EditUser />,
          loader: editUserLoader(store),
          action: editUserAction(store, queryClient),
        },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-center"
        autoClose={2000}
        theme="dark"
        hideProgressBar
        transition={Zoom}
      />
    </QueryClientProvider>
  );
}

export default App;
