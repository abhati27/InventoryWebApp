import Navbar from "./components/navbar";
import OrderList from "./components/orderList";

function SupplierDashboard(){

    return(
        <div>
               <div className="mb-4"> 
                    <Navbar />
               </div>
               <div>
                    <OrderList />
               </div>
                
             
        </div>
    )
}
export default SupplierDashboard;