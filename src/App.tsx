import { IconCloudDemo } from "./components/test-versions/IconCloudDemo";
// import "./App.css";

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
import Home from "./pages/Home";
import ServicesPage from "./pages/ServicesPage";
import ContactPage from "./pages/ContactPage";
import TeamPage from "./pages/TeamPage";
import Root from "./pages/Root";
import { ThemeProvider } from "./context/ThemeContext";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        { index: true, element: <Home /> },
        { path: "services", element: <ServicesPage /> },
        { path: "team", element: <TeamPage /> },
        { path: "skills", element: <IconCloudDemo /> },
        { path: "contact", element: <ContactPage /> },
      ],
    },
  ]);

  return (
    <>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>

      {/* <h1 className="text-center">Work in progress...</h1>
      <h2 className="text-center">Dev Portfolio</h2>
      <IconCloudDemo /> */}
    </>
  );
}
