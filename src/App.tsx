// import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Home from "./pages/Home";
import Experience from "./pages/Experience";
import ContactPage from "./pages/ContactPage";
import ProjectPage from "./pages/ProjectPage";
import StayStrongPage from "./components/staystrong/StayStrongPage";
import StayStrongFallback from "./components/staystrong/StayStrongFallback";
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
        { path: "contact", element: <ContactPage /> },
        { path: "staystrong", element: <StayStrongFallback /> },

        // Beta testing route (for closed users)
        { path: "staystrong/closed-access", element: <StayStrongPage /> },
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
