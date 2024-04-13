import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SearchResults from "./pages/SearchResults";
import Home from "./pages/Home";
import WithLayout from "./common-components/WithLayout";
import AdminWithLayout from "./common-components/AdminWithLayout";
import Cart from "./pages/Cart";
import "./scss/style.scss";
import Orders from "./pages/Orders";
import ProductDetail from "./pages/ProductDetail";
import AddProducts from "./pages/AddProducts";
import ProductCategory from "./components/ProductCategory";
import Admin from "./pages/AdminHome";

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
    path: "/products/:productId",
    element: WithLayout(ProductDetail),
  },
  {
    path: "/products/category",
    element: WithLayout(ProductCategory),
  },
  {
    path: "/addproducts",
    element: AdminWithLayout(AddProducts),
  },
  {
    path: "/admin",
    element: AdminWithLayout(Admin),
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
