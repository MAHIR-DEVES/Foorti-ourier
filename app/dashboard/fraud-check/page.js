import FraudCheck from "@/app/components/fraud-check/FraudCheck";
import FloatingTab from "../../components/consignments/FloatingTab";

const FraudCheckPage = () => {
    return (
        <div>
              <div className="fixed left-1/2 transform -translate-x-1/2 top-6 z-40   hidden md:block">
                  <FloatingTab />
                </div>
            <FraudCheck/>
        </div>
    );
};

export default FraudCheckPage;