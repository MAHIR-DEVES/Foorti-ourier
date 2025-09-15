import { FaRegEdit } from "react-icons/fa";
import SwitchToggle from "./SwitchToggle";
const ProfileInfo = () => {
    const userData = [
    { label: "User ID", value: "78945145" },
    { label: "Name", value: "Sabbir Rahman",icon:<FaRegEdit /> },
    { label: "Email", value: "sabbir@example.com",icon:<FaRegEdit /> },
    { label: "Phone", value: "+880123456789",icon:<FaRegEdit /> },
    { label: "Address", value: "Dhaka, Bangladesh",icon:<FaRegEdit /> },
  
];
    return (
        <div className="p-4 md:p-8 space-y-4">
            {userData.map((item, index) => (
                <div key={index} className="flex gap-3 items-center">
                    <p className="text-md text-secondary font-medium">{item.label}:</p>
                    <p className="text-primary font-semibold text-lg">{item.value}</p>
                    <p className="text-primary-active text-xl text-primary-hover cursor-pointer" >{item.icon}</p>
                    
                </div>
            ))}
           
        </div>
    );
};

export default ProfileInfo;
