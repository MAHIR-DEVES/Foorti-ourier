import { RiLockPasswordLine } from "react-icons/ri";

const ChangePassword = () => {
  return (
    <div className="p-4 md:p-8 mb-4 flex items-center flex-col gap-5 justify-center">
        <h2 className='text-center text-primary text-2xl font-medium'>Change Password </h2>
      <div className="w-full md:w-[50%] relative">
        <RiLockPasswordLine className=" absolute top-3.5 left-3 text-[1.5rem] text-secondary" />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          className="peer border-border border border-gray rounded-md outline-none pl-10 pr-4 py-3 w-full focus:border-primary transition-colors duration-300"
        />
      </div>

      <div className="w-full md:w-[50%] relative">
        <RiLockPasswordLine className=" absolute top-3.5 left-3 text-[1.5rem] text-secondary" />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="New Password Min:8 Chars"
          className="peer border-border border border-gray rounded-md outline-none pl-10 pr-4 py-3 w-full focus:border-primary transition-colors duration-300"
        />
      </div>

      <div className="w-full md:w-[50%] relative">
        <RiLockPasswordLine className=" absolute top-3.5 left-3 text-[1.5rem] text-secondary" />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Confirm Password "
          className="peer border-border border border-gray rounded-md outline-none pl-10 pr-4 py-3 w-full focus:border-primary transition-colors duration-300"
        />
      </div>

      <button className="w-full md:w-[50%] button-primary cursor-pointer text-white p-2.5 px-4 rounded-md hover:button-primary focus:outline-none text-xl focus:ring-button-primary focus:ring-offset-2">
        Update
      </button>
    </div>
  );
};

export default ChangePassword;
