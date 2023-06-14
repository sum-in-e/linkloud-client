function SignLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="my-10 flex w-full max-w-[300px] flex-col items-center gap-5">
        {children}
      </div>
    </div>
  );
}

export default SignLayout;
