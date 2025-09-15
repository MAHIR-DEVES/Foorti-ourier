import PriceCalculator from "@/app/components/pricing/PriceCalculator";
import FloatingTab from "@/app/components/consignments/FloatingTab";

const PricingPage = () => {
    return (
        <div>
            <div className="fixed left-1/2 transform -translate-x-1/2 top-6 z-40   hidden md:block">
                  <FloatingTab />
                </div>
            <PriceCalculator/>
        </div>
    );
};

export default PricingPage;