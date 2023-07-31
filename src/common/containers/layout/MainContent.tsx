const MainContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="mt-20 w-full">
      <div>{children}</div>
    </main>
  );
};
export default MainContent;
