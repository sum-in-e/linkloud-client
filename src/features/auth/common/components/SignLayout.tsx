const SignLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="my-5 flex w-full max-w-[340px] flex-col items-center gap-5">
        {children}
      </div>
    </div>
  );
};

export default SignLayout;
