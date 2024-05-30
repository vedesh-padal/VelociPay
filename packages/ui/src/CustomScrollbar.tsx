const CustomScrollbar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-h-[35vh] overflow-y-auto p-2">
      {children}
    </div>
  );
};

export default CustomScrollbar;