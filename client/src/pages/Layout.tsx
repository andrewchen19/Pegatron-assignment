import { Outlet, useNavigation } from "react-router-dom/dist";
import Loading from "../components/Loading";
import { Title } from "../components";

const Layout: React.FC = () => {
  const navigation = useNavigation();
  // console.log(navigation.state);
  const isLoading = navigation.state === "loading";

  return (
    <main className="align-container">
      <Title />

      {isLoading ? <Loading /> : <Outlet />}
    </main>
  );
};

export default Layout;
