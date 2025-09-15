import Button from "@/app/components/apikey/Button";
import OthersTools from "@/app/components/apikey/OthersTools";
import FloatingTab from "@/app/components/consignments/FloatingTab";


const ApiPage = () => {
  return (
    <div>
      <div className="fixed left-1/2 transform -translate-x-1/2 top-6 z-40   hidden md:block">
        <FloatingTab />
      </div>
      <div className=" min-h-screen md:pt-8 ">
        <div className="container mx-auto  md:pb-4">
          <h1 className="text-2xl font-bold text-primary mb-5 md:mt-2 ">
           API Keys
          </h1>
        </div>
        <div className="bg-primary p-4 md:p-8">
         
           <Button/>
           <div>
            <OthersTools/>
           </div>
        </div>
       
      </div>
    </div>
  );
};

export default ApiPage;
