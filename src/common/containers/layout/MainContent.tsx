const MainContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex min-h-[75vh] w-full justify-center bg-zinc-50">
      <div className="w-full max-w-screen-xl p-6">{children}</div>
    </main>
  );
};
export default MainContent;
