import { useSearchParams } from "react-router-dom";
import Navbar from "./components/navbar";
import SupplierOnboard from "./components/supplierOnboard";
import ExecutiveLogin from "./components/execDashboard";
import ManagerOnboard from "./components/managerOnboard";

function AdminDashboard() {
  const [params] = useSearchParams();

  const routeConfig = () => {
    let val = params.get("page"); //supplier_onboard
    switch (val) {
      case "supplier_onboard":
        return (
          <div>
            <SupplierOnboard />
          </div>
        );
      case "executive_onboard":
        return (
          <div>
            <ExecutiveLogin />
          </div>
        );
      case "manager_onboard":
        return (
          <div>
            <ManagerOnboard />
          </div>
        );
      default:
        break;
    }
  };
  return (
    <div>
      <Navbar />
      {routeConfig()}
    </div>
  );
}
export default AdminDashboard;
