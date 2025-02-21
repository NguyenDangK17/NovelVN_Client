import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout.js";
import NotFoundPage from "./pages/404NotFoundPage.js";
import "./App.css";
import Loading from "./pages/Loading.js";
import ScrollToTop from "./components/ScrollToTop.js";

const Home = lazy(() => import("./pages/HomePage.js"));
const Detail = lazy(() => import("./pages/Novel/NovelDetailPage.js"));
const AboutPage = lazy(() => import("./pages/AboutPage.js"));
const MangaListPage = lazy(() => import("./pages/Manga/MangaListPage.js"));
const NovelListPage = lazy(() => import("./pages/Novel/NovelListPage.js"));
const NovelChapterPage = lazy(
  () => import("./pages/Novel/NovelChapterPage.js")
);
const LoginPage = lazy(() => import("./pages/Authentication/LoginPage.js"));
const SignupPage = lazy(() => import("./pages/Authentication/SignupPage.js"));
const ProfilePage = lazy(() => import("./pages/User/ProfilePage.js"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/comic/:id" element={<Detail />} />
          <Route path="/comic/chapter/:id" element={<NovelChapterPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/manga" element={<MangaListPage />} />
          <Route path="/novel" element={<NovelListPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
