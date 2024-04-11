import React from "react";
import { Outlet } from "react-router-dom";
import { ScrollRestoration } from "react-router-dom";

function App() {

  return (
    <>
      <Outlet />
      <ScrollRestoration />
    </>
  )
}

export default App;