import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

function Layout() {
  return (
    <div>
      <Navbar />
      <div className="pt-24">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
