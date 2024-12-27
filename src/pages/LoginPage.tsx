import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import cover from '../assets/images/bg.png';
const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Invalid email format");
      return;
    }
    try {
      const response = await fetch("https://x8ki-letl-twmt.n7.xano.io/api:HdrEIUdm/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        dispatch(login(email));
        navigate("/multi-step-form");
      } else {
        setError("Invalid credentials");
      }
    } catch {
      setError("Network error");
    }
  };

  return (
    <div className="relative h-dvh">
      <img src={cover} alt="" className="absolute top-0 left-0 w-full h-full object-cover z-[-1]" />
      <div className="container mx-auto h-full">
        <div className="flex justify-left items-center h-full">
          <div className="p-8 bg-white rounded-[20px] shadow-[0px_10px_40px_0px_rgba(0,0,0,0.2)] w-full md:w-1/3 mx-[15px] md:mx-[0]">
         
            <h3 className="text-3xl md:text-4xl text-[#175ee3] font-bold mb-4">Welcome Back</h3>
            <div className="mt-7">
              <label htmlFor="" className="mb-[5px] display-block">Email ID</label>
            <input 
              type="email"
              className="text-base h-[45px] border-[#D9D9D9] rounded-md border  px-3.5 py-1.5 w-full
                            focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            </div>
            <div className="mt-7">
              <label htmlFor="" className="mb-[5px] display-block">Password</label>
            <input
              type="password"
              className="text-base h-[45px] border-[#D9D9D9] rounded-md border px-3.5 py-1.5 w-full
                            focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            </div>
            <div className="mt-2 text-right">
              <a href="/forgot-password" className="text-[#175ee3] text-base mt-4 display-inline">
              Forgot Password?
            </a>
           </div>
            <div className="mt-7">
            <button
              className="w-full bg-[#175ee3] group inline-flex items-center text-base md:text-lg justify-center  px-6 py-3 text-white font-semibold rounded-lg shadow-lg"
              onClick={handleLogin}
            >
              Login
            </button>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
