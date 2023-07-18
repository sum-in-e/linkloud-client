const SignLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="my-5 flex w-full max-w-[340px] flex-col items-center gap-5">
      {children}
    </div>
  );
};

export default SignLayout;
