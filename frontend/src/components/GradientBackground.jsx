export default function GradientBackground({ children }) {
  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundColor: "#0F0F0F", // dark background
      }}
    >
      {/* Gradient glow at the bottom */}
      <div
        className="absolute bottom-0 left-0 w-full h-72 rounded-t-[120px] bg-gradient-to-r from-[#F3911D] to-[#840B86]"
        // style={{
        //   background: "linear-gradient(135deg, #F3911D 0%, #840B86 100%)",
        //   filter: "blur(80px)",
        //   opacity: 0.6,
        // }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
