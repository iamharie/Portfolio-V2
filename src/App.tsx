// import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Home from "./pages/Home";
import Experience from "./pages/Experience";
import ContactPage from "./pages/ContactPage";
import ProjectPage from "./pages/ProjectPage";
import StayStrongPage from "./components/staystrong/StayStrongPage";
import Root from "./pages/Root";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        { index: true, element: <Home /> },
        { path: "experience", element: <Experience /> },
        { path: "team", element: <ProjectPage /> },
        { path: "sslogin", element: <StayStrongPage /> },
        // { path: "skills", element: <IconCloudDemo /> },
        { path: "contact", element: <ContactPage /> },
      ],
    },
  ]);

  return (
    <>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}
