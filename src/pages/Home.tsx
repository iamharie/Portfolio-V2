import React from "react";
import Landing from "../components/Landing";
import About from "../components/About";
import Contact from "../components/Contact";
import Endorsed from "../components/Endorsed";
// import { IconCloudDemo } from "../components/test-versions/IconCloudDemo";

const Home = () => {
  return (
    <>
      <Landing />
      <About />
      {/* <IconCloudDemo /> */}
      <Endorsed />
      <Contact />
    </>
  );
};

export default Home;
