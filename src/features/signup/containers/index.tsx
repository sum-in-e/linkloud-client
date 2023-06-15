import SignLayout from '@/features/signup/components/SignLayout';
import EmailSignUpForms from '@/features/signup/containers/EmailSignUp';
import Link from 'next/link';
import { RiKakaoTalkFill } from 'react-icons/ri';

function SignUp() {
  return (
    <SignLayout>
      <section className="flex flex-col items-center justify-center gap-10">
        <img src="images/logo_v.png" className="w-[120px]" />
        <p className="text-sm text-slate-500">
          링크를 관리하고 생산적인 일상을 함께해 보세요!
        </p>
      </section>
      <section className="w-full">
        <button className="focus:shadow-outline flex w-full select-none items-center justify-center gap-1 rounded-2xl bg-[#FAE100] py-3  hover:bg-[#ffe81a] focus:outline-none">
          <RiKakaoTalkFill />
          <p className="text-sm font-bold text-black ">
            카카오로 바로 시작하기
          </p>
        </button>
      </section>
      <hr className="w-full border-gray-300" />
      <EmailSignUpForms />
      <section className="flex w-full justify-center gap-2">
        <p className="text-xs text-gray-500">이미 회원이신가요?</p>
        <Link href="/signin" className="text-xs font-bold">
          로그인하러 가기
        </Link>
      </section>
    </SignLayout>
  );
}

export default SignUp;
