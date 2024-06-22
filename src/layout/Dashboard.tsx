import { Outlet } from "react-router-dom";
import { Navbar, Header } from ".";

const Dashboard = () => {
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr] bg-gray/5 xl:h-screen xl:grid-cols-[260px_1fr]">
      <Navbar />
      <Header />
      <main className="grid">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
