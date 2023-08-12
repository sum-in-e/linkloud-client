const SignLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full justify-center px-4">
      <div className="mb-10 mt-5 flex min-h-[75vh] w-full max-w-[340px] flex-col items-center gap-5 md:my-10">
        {children}
      </div>
    </div>
  );
};

export default SignLayout;
