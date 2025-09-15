
import FloatingTab from "@/app/components/consignments/FloatingTab";
import ChangePassword from "../../../components/user/change-password/ChangePassword";
const ChangePasswordPage = () => {
    return (
        <div>
            <div className="fixed left-1/2 transform -translate-x-1/2 top-6 z-40   hidden md:block">
                <FloatingTab />
            </div>
            <div className="bg-gray-100 min-h-screen md:pt-8 ">
                <div className="container mx-auto  md:pb-4">
                    <h1 className="text-2xl font-bold text-primary mb-5 md:mt-2 ">
                        Password & Security
                    </h1>
                </div>
                 <div className="bg-primary ">
                    <ChangePassword/>
                    
                </div>
            </div>
        </div>
    );
};

export default ChangePasswordPage;
