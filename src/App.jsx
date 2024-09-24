import { Button } from "@mui/material";
import * as React from "react";
import { Route, Routes, HashRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Principal from "./components/pages/primeira-pagina/principal.jsx";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Principal />} />
      </Routes>
    </HashRouter>
  );
}
{
  /* <React.Suspense fallback={<Loader />}>
</React.Suspense> */
}
