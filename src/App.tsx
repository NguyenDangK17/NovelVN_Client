import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/HomePage.js";
import Detail from "./pages//DetailPage.js";
import Layout from "./pages/Layout.js";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/comic/:id" element={<Detail />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
