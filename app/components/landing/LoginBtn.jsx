import Link from 'next/link';
import { useTranslations } from 'next-intl';
const LoginBtn = () => {
  const tBtn = useTranslations('loginPage');

  return (
    <div>
      <Link href="/landing/sign-up">
        <span className="font-semibold px-2 text-[#2a64f6] cursor-pointer">
          {tBtn('signupLink')}
        </span>
      </Link>
    </div>
  );
};

export default LoginBtn;
