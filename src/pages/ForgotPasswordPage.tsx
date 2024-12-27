import React, { useState } from "react";
import cover from "../assets/images/bg.png";

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    setMessage("");
    setError("");

    // Validate email
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      const response = await fetch("https://x8ki-letl-twmt.n7.xano.io/api:HdrEIUdm/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("If the email is registered, you will receive reset instructions.");
      } else {
        setError(data?.message || "An error occurred. Please try again.");
      }
    } catch (err) {
      setError("Failed to send request. Please check your internet connection and try again.");
    }
  };

  return (
    <div className="relative h-dvh">
      <img src={cover} alt="" className="absolute top-0 left-0 w-full h-full object-cover z-[-1]" />
      <div className="container mx-auto h-full">
        <div className="flex justify-left items-center h-full">
          <div className="p-8 bg-white rounded-[20px] shadow-[0px_10px_40px_0px_rgba(0,0,0,0.2)] w-full md:w-1/3 mx-[15px] md:mx-[0]">
            <h3 className="text-3xl md:text-4xl text-[#175ee3] font-bold mb-4">Forgot Password</h3>
            <div className="mt-7">
              <label htmlFor="email" className="mb-[5px]">
                Email ID
              </label>
              <input
                type="email"
                id="email"
                className="text-base h-[45px] border-[#D9D9D9] rounded-md border px-3.5 py-1.5 w-full
                            focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>
            <div className="mt-7">
              <button
                className="w-full bg-[#175ee3] group inline-flex items-center text-base md:text-lg justify-center px-6 py-3 text-white font-semibold rounded-lg shadow-lg"
                onClick={handleSubmit}
              >
                Submit
              </button>
              {message && <p className="text-green-500 mt-2">{message}</p>}
            </div>
            <div className="mt-4 text-center">
              <a href="/login" className="text-[#354E66] text-base mt-4 display-inline">
                Back to Login
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
