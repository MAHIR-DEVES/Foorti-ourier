
import Link from "next/link";
import { useTranslations } from "next-intl";
const SignUpBtn = () => {
  const tSignUp = useTranslations("signupPage");
  return (
    <div>
      <Link href='/landing/login'>
        {" "}
        <span className="font-semibold px-2 text-[#00b795] cursor-pointer">
            {tSignUp("loginLink")}
        </span>
      </Link>
    </div>
  );
};

export default SignUpBtn;
