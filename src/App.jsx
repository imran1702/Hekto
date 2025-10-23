import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./components/pages/Home";
import RootLayout from "./components/RootLayout";
import Products from "./components/pages/Products";
import Shop from "./components/pages/Shop";
import Pages from "./components/pages/Pages";
import Blog from "./components/pages/Blog";
import Contact from "./components/pages/Contact";
import ProductDetails from "./components/pages/ProductDetails";
import Cart from "./components/pages/Cart";
import Login from "./components/pages/Login";
import Error from "./components/pages/Error";
import SignUp from "./components/pages/SignUp";
import FavouriteProducts from "./components/pages/FavouriteProducts";
import CompleteOrder from "./components/pages/CompleteOrder";

let routing = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Home />}></Route>
        <Route path="/pages" element={<Pages />}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route path="/products/:id" element={<ProductDetails />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/completeorder" element={<CompleteOrder />}></Route>
        <Route
          path="/favouriteProducts"
          element={<FavouriteProducts />}
        ></Route>
        <Route path="/shop" element={<Shop />}></Route>
        <Route path="/blog" element={<Blog />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
      </Route>
      <Route path="*" element={<Error />}></Route>
    </>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={routing}></RouterProvider>
    </>
  );
}

export default App;
