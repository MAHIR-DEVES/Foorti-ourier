
import StockStatusCards from "@/app/components/inventory/StockStatusCards";
import DatePick from "../../components/inventory/DatePick";
import SearchFilterBar from "@/app/components/inventory/SearchFilterBar";
import ActionBar from "@/app/components/inventory/ActionBar";
import ProductTable from "@/app/components/inventory/ProductTable";
const InventoryPage = () => {
    return (
           <div className="bg-gray-100 min-h-screen  ">
            
               <DatePick/>
               <StockStatusCards/>
               <SearchFilterBar/>
               <ActionBar/>
               <ProductTable/>
            </div>
    );
};

export default InventoryPage;