const MainContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex min-h-[75vh] w-full justify-center bg-zinc-50">
      <div className="flex w-full max-w-screen-xl justify-center p-5">
        {children}
      </div>
    </main>
  );
};
export default MainContent;
