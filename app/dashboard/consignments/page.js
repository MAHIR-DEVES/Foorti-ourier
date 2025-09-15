import FloatingTab from "../../components/consignments/FloatingTab";
import ParcelTable from "../../components/consignments/ParcelTable";
const ConsignmentPage = () => {
  return (
   <div>
     
     <div className="fixed left-1/2 transform -translate-x-1/2 top-6 z-40   hidden md:block">
      <FloatingTab />
    </div>
     <ParcelTable/>
   </div>
  );
};

export default ConsignmentPage;
