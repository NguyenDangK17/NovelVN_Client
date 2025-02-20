import { Outlet, useLocation, matchPath } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const Layout: React.FC = () => {
  const location = useLocation();
  const hideNavbarRoutes = ["/comic/chapter/:id"];
  const hideFooterRoutes = ["/comic/chapter/:id", "/profile"];

  const shouldHideNavbar = hideNavbarRoutes.some((route) =>
    matchPath(route, location.pathname)
  );

  const shouldHideFooter = hideFooterRoutes.some((route) =>
    matchPath(route, location.pathname)
  );

  return (
    <div>
      {!shouldHideNavbar && <Navbar />}
      <Outlet />
      {!shouldHideFooter && <Footer />}
    </div>
  );
};

export default Layout;
