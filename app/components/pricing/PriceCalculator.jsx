import ContentList from "./ContentList";
import SelectInput from "./SelectInput";


const PriceCalculator = () => {
    return (
        <div>
              <div className="bg-gray-100 min-h-screen pt-8 ">
                 <div className="container mx-auto  md:pb-8">
                    <h1 className="text-2xl font-bold text-primary mt-2 ">
                       Price Calculator
                    </h1>
                 </div>
                 <div className="bg-primary ">
                   <div className="text-center p-5">
                     <h2 className="text-primary text-xl font-bold">Calculate Your Delivery Charge</h2>
                    <p className="text-md font-medium text-secondary text-center">You can easily calculate your delivery charge here</p>
                   </div>
                   <SelectInput/>
                   <ContentList/>
                 </div>
              </div>
        </div>
    );
};

export default PriceCalculator;