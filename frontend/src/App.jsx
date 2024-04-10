import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SearchResults from "./pages/SearchResults";
import Home from "./pages/Home";
import WithLayout from "./common-components/WithLayout";
import Cart from "./pages/Cart";
import "./scss/style.scss";
import Orders from "./pages/Orders";
import Admin from "./pages/Admin";

const router = createBrowserRouter([
  {
    path: "/",
    element: WithLayout(Home),
  },
  {
    path: "/searchResults",
    element: WithLayout(SearchResults),
  },
  {
    path: "/cart",
    element: WithLayout(Cart),
  },
  {
    path: "/orders",
    element: WithLayout(Orders),
  },
  {
    path: "/admin",
    element: <Admin/>,
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
