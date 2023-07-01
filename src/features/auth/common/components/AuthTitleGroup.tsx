import { AuthMethodType } from '@/features/auth/common/modules/types/authType';

const AuthTitleGroup = ({ type }: { type: AuthMethodType }) => {
  const title = type === 'login' ? '로그인' : '회원가입';

  return (
    <section className="flex flex-col items-center justify-center gap-5">
      <h1 className="text-3xl font-bold text-slate-800">{title}</h1>
      <p className="text-sm text-slate-500">
        링크를 관리하고 생산적인 일상을 함께해 보세요!
      </p>
    </section>
  );
};

export default AuthTitleGroup;
