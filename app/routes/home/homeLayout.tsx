import { Outlet } from "react-router";
import { Navbar } from "~/components/nav";

export default function HomeLayout() {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto">
        <Outlet />
      </div>
    </div>
  );
}
