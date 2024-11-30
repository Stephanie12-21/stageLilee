import Footer from "@/components/MainComponent/Footer/Footer";
import Header from "@/components/MainComponent/Header/Header";
import React from "react";

const layout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default layout;
