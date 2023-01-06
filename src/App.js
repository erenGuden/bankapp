import Home from "./components/Home";
import Login from "./components/Login";
import NotProtectedRoute from "./routes/NotProtectedRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import Signup from "./components/Signup";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import AccountDetails from "./components/AccountDetails";
import Navbar from "./components/Navbar";
import Transactions from "./components/Transactions";
import Profile from "./components/Profile";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route element={<NavWrapper />}>
            <Route path="/" element={<Home />} />
            <Route path="/account-details" element={<AccountDetails />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
        <Route element={<NotProtectedRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function NavWrapper() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
