import { createBrowserRouter } from "react-router-dom";
import MainRoute from "../components/MainRoute/MainRoute";
import Homepage from "../pages/Homepage";
import Quiz from "../pages/Quiz";

const route = createBrowserRouter([
  {
    path: "/",
    element: <MainRoute />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/quiz",
        element: <Quiz />,
      },
    ],
  },
]);

export default route;
