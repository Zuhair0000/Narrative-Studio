import Navbar from "../components/Navbar";

export default function PaymentSuccess() {
  return (
    <>
      <Navbar showAuthButtons={false} />
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#1F2028] text-white">
        <h1 className="text-3xl font-bold mb-4">🎉 Payment Successful!</h1>
        <p>You’ve received 10 new credits. Enjoy generating stories!</p>
      </div>
    </>
  );
}
