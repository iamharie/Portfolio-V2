// import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Home from "./pages/Home";
import Experience from "./pages/Experience";
import ContactPage from "./pages/ContactPage";
import TeamPage from "./pages/TeamPage";
import Root from "./pages/Root";
import { IconCloudDemo } from "./components/test-versions/IconCloudDemo";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        { index: true, element: <Home /> },
        { path: "experience", element: <Experience /> },
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
