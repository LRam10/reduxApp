import React from "react";
import Nav from "../layouts/Nav";
import Footer from "../layouts/Footer";
import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
