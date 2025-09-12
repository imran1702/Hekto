import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import Home from "./components/pages/Home"
import RootLayout from "./components/RootLayout"
import Products from "./components/Products"
import Shop from "./components/Shop"
import Pages from "./components/pages/Pages"
import Blog from "./components/pages/Blog"
import Contact from "./components/pages/Contact"

let routing = createBrowserRouter(createRoutesFromElements(
    <Route element={<RootLayout />}>
      <Route path="/" element={<Home />}></Route>
      <Route path="/pages" element={<Pages />}></Route>
      <Route path="/products" element={<Products />}></Route>
      <Route path="/shop" element={<Shop />}></Route>
      <Route path="/blog" element={<Blog />}></Route>
      <Route path="/contact" element={<Contact />}></Route>
    </Route>
))

function App() {

  return (
    <>
      <RouterProvider router={routing}></RouterProvider>
    </>
  )
}

export default App
