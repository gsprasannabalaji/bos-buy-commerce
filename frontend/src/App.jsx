import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SearchResults from "./pages/SearchResults";
import Home from "./pages/Home";
import WithLayout from "./common-components/WithLayout";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import ProductDetail from "./pages/ProductDetail";
import AddProducts from "./pages/AddProducts";
import ProductCategory from "./components/ProductCategory";
import AdminHome from "./pages/AdminHome";
import Login from "./pages/Login";
import AllOrders from "./pages/AllOrders";
import CustomToast from "./common-components/CustomToast";
import { useSelector, useDispatch } from "react-redux";
import { setToast } from "./features/toast/toastSlice";
import "./scss/style.scss";
import SignUp from "./pages/Signup";

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
    path: "/addProducts",
    element: WithLayout(AddProducts),
  },
  {
    path: "/admin",
    element: WithLayout(AdminHome),
  },
  {
    path: "/allorders",
    element: WithLayout(AllOrders),
  },
  {
    path: "/login",
    element: WithLayout(Login),
  },
  {
    path: "*",
    element: WithLayout(Home),
  },
  {
    path:"/signup",
    element: <SignUp />,
  }
]);

const App = () => {
  const { showToast, toast } = useSelector((state) => state?.toast);
  const dispatch = useDispatch();

  return (
    <>
      <RouterProvider router={router} />
      <CustomToast
        show={showToast}
        onClose={() => {
          dispatch(
            setToast({
              toast: {
                ...toast,
                message: "",
              },
              showToast: false,
            })
          );
        }}
        message={toast?.message}
        header={""}
        variant={toast?.variant}
      />
    </>
  );
};

export default App;
