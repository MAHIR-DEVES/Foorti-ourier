import PickupCard from "../../components/pickup-requests/PickupCard";
import FloatingTab from "../../components/consignments/FloatingTab";
const PickupRequestsPage = () => {
    return (
        <div>
               <div className="fixed left-1/2 transform -translate-x-1/2 top-6 z-40   hidden md:block">
      <FloatingTab />
    </div>
            <PickupCard/>
        </div>
    );
};

export default PickupRequestsPage;