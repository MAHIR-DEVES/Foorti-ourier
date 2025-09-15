import Profile from "../../../components/user/profile/Profile";
import ProfileInfo from "../../../components/user/profile/ProfileInfo";
import FloatingTab from "@/app/components/consignments/FloatingTab";
const ProfilePage = () => {
    return (
        <div>
            <div className="fixed left-1/2 transform -translate-x-1/2 top-6 z-40   hidden md:block">
                <FloatingTab />
            </div>
            <div className="bg-gray-100 min-h-screen pt-8 ">
                <div className="container mx-auto  md:pb-8">
                    <h1 className="text-2xl font-bold text-primary mt-2 ">
                        Profile
                    </h1>
                </div>
                <div className="bg-primary ">
                    <div className="text-center">
                        <Profile />
                    </div>
                    <ProfileInfo />
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
