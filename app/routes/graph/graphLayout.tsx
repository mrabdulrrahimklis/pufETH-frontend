import { Outlet } from "react-router";
import Navbar from "~/components/Navbar";

export default function GraphLayout() {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto">
        <Outlet />
      </div>
    </div>
  );
}
