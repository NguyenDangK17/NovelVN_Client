import { Outlet, useLocation, matchPath } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const Layout: React.FC = () => {
  const location = useLocation();
  const hideNavbarFooterRoutes = ["/comic/chapter/:id"];

  const shouldHideNavbarFooter = hideNavbarFooterRoutes.some((route) =>
    matchPath(route, location.pathname)
  );

  return (
    <div>
      {!shouldHideNavbarFooter && <Navbar />}
      <Outlet />
      {!shouldHideNavbarFooter && <Footer />}
    </div>
  );
};

export default Layout;
