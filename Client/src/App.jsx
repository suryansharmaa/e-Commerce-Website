import AuthLogin from "./pages/auth/Login";
import NotFound from "./pages/not-found/Index";
import AuthRegister from "./pages/auth/Register";
import { Routes, Route } from "react-router-dom";
import AuthLayout from "./components/auth/Layout";
import AdminOrders from "./pages/admin-view/Orders";
import ShoppingHome from "./pages/shopping-view/Home";
import AdminFeatures from "./pages/admin-view/Features";
import AdminProducts from "./pages/admin-view/Products";
import AdminLayout from "./components/admin-view/layout";
import AdminDashboard from "./pages/admin-view/Dashboard";
import ShoppingListing from "./pages/shopping-view/Listing";
import ShoppingAccount from "./pages/shopping-view/Account";
import ShoppingLayout from "./components/shopping-view/Layout";
import ShoppingCheckout from "./pages/shopping-view/Checkout";

function App() {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />}></Route>
          <Route path="features" element={<AdminFeatures />}></Route>
          <Route path="orders" element={<AdminOrders />}></Route>
          <Route path="products" element={<AdminProducts />}></Route>
        </Route>

        <Route path="/shopping" element={<ShoppingLayout />}>
          <Route path="account" element={<ShoppingAccount />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
        </Route>

        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
