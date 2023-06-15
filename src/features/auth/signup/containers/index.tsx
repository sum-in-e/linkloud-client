import SignLayout from '@/features/auth/signup/components/SignLayout';
import EmailSignUpForms from '@/features/auth/signup/containers/EmailSignUp';
import KakaoButton from '@/features/auth/common/containers/KakaoButton';
import Link from 'next/link';

function SignUp() {
  return (
    <SignLayout>
      <section className="flex flex-col items-center justify-center gap-10">
        <img src="images/logo_v.png" className="w-[120px]" />
        <p className="text-sm text-slate-500">
          링크를 관리하고 생산적인 일상을 함께해 보세요!
        </p>
      </section>
      <KakaoButton type="signup" />
      <hr className="w-full border-gray-300" />
      <EmailSignUpForms />
      <section className="flex w-full justify-center gap-2">
        <p className="text-xs text-gray-500">이미 회원이신가요?</p>
        <Link href="/login" className="text-xs font-bold">
          로그인하러 가기
        </Link>
      </section>
    </SignLayout>
  );
}

export default SignUp;
