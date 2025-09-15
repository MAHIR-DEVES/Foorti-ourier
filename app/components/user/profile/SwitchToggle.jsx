'use client'
import  {useState} from "react";

const SwitchToggle = () => {

    const [isToggle, setIsToggle] = useState(false);

    return (
        
            <div
                className={`${
                    isToggle ? "button-primary" : "bg-gray-200"
                } w-[57px] h-[30px] px-[0.150rem] cursor-pointer py-[0.160rem] border transition-colors duration-500 border-[#e5eaf2]  rounded-full relative`}
                onClick={() => setIsToggle(!isToggle)}
            >
                <div
                    className={`${
                        isToggle ? "translate-x-[27px] !bg-white" : "translate-x-[1px]"
                    } w-[23px] h-[23px] pb-1 transition-all duration-500 rounded-full bg-[#fff]`}
                    style={{boxShadow: "1px 2px 5px 2px rgb(0,0,0,0.1)"}}
                ></div>
            </div>
       
    );
};

export default SwitchToggle;
                