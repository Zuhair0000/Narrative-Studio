export default function GradientBackground({ children }) {
  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundColor: "#1F2028",
      }}
    >
      <div className="absolute bottom-0 left-0 w-full h-72 rounded-t-[120px] bg-gradient-to-r from-[#F3911D] to-[#840B86]" />

      <div className="relative z-10">{children}</div>
    </div>
  );
}
