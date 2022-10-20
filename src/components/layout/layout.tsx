import React from "react";
import { NavBar } from "../navbar";
import { Footer } from "../footer";

interface Props {
  children: React.ReactNode;
}

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="">
      <NavBar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
