import { Route, Routes } from "react-router";
import "./App.css";
import Login from "./auth/login";
import AdminDashboard from "./features/admin/dashboard";
import ExecutiveDashboard from "./features/executive/dashboard";
import SupplierDashboard from "./features/supplier/dashboard";
import ManagerDashboard from "./features/manager/dashboard";
import Customer from "./features/customer/customer";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Customer />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/executive" element={<ExecutiveDashboard />} />
        <Route path="/supplier" element={<SupplierDashboard />} />
        <Route path="/manager" element={<ManagerDashboard />} />
        <Route path="/customer" element={<Customer />} />
      </Routes>
    </div>
  );
}

export default App;
