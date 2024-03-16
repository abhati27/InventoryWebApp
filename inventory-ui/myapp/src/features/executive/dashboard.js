import { useSearchParams } from "react-router-dom";
import Navbar from "./components/navbar";
import SalesStats from "./components/salesStats";
import OrderList from "./components/orderList";
import OrderStat from "./components/orderStats";

function ExecutiveDashboard(){
    const [params] = useSearchParams();

    const process = ()=>{
        let page = params.get('page'); 
        switch(page){
            case 'sales_stats':
                return(
                    <div>
                        <SalesStats />
                    </div>
                )
                
            case 'all_orders':
                return(
                    <div>
                        <OrderList />
                    </div>
                )
            case 'order_stats':
                return(
                    <div>
                        <OrderStat />
                    </div>
                )
               
                    
            default:
                return(
                    <div>
                        <SalesStats />
                    </div>
                ) 
        }
    }
    return(
        <div>
            <Navbar />
            {process()}
        </div>
    )
}
export default ExecutiveDashboard;