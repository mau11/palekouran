const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {/* nav */}
      <main>{children}</main>
      {/* footer */}
    </div>
  );
};

export default Layout;
