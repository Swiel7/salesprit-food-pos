import { Outlet } from "react-router-dom";
import { Navbar, Header } from ".";

const Dashboard = () => {
  return (
    <div className="bg-gray-50 grid min-h-screen grid-rows-[auto_1fr] xl:h-screen xl:grid-cols-[260px_1fr]">
      <Navbar />
      <Header />
      <main className="grid min-h-0">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
