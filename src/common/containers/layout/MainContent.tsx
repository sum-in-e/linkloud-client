const MainContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="mt-16 w-full md:mt-20">
      <div>{children}</div>
    </main>
  );
};
export default MainContent;
