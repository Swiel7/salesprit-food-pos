import { Outlet, useNavigation } from "react-router-dom";
import { Navbar, Header } from ".";
import { LoadingOverlay } from "../components";

const Dashboard = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr] bg-gray-50 xl:h-screen xl:grid-cols-[260px_1fr]">
      <Navbar />
      <Header />
      <main className="grid min-h-0">
        <Outlet />
      </main>
      {isLoading && <LoadingOverlay />}
    </div>
  );
};

export default Dashboard;
