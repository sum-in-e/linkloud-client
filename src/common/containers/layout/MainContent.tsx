function MainContent({ children }: { children: React.ReactNode }) {
  return (
    <main className="h-96 min-h-[80vh] w-full px-6 py-6 md:px-20">
      {children}{' '}
    </main>
  );
}
export default MainContent;
