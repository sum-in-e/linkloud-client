function MainContent({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-[70vh] w-full justify-center">
      <div className="w-full max-w-screen-xl p-6">{children}</div>
    </main>
  );
}
export default MainContent;
