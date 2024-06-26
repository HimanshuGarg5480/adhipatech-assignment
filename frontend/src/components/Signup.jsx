import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = ({ handleSignup }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-500">
      <div className="bg-slate-400 p-4 sm:p-16 rounded shadow-2xl w-[70%] sm:w-8/12">
        <h2 className="text-xl sm:text-3xl font-bold mb-10 text-gray-100">
          Create Your Account
        </h2>

        <form className="space-y-5">
          <div>
            <label className="block mb-1 font-bold text-gray-200">Name</label>
            <input
              onChange={(e) => {
                e.preventDefault();
                setName(e.target.value);
              }}
              type="text"
              className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-bold text-gray-200">Email</label>
            <input
              onChange={(e) => {
                e.preventDefault();
                setEmail(e.target.value);
              }}
              type="email"
              className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-bold text-gray-200">
              Password
            </label>
            <input
              onChange={(e) => {
                e.preventDefault();
                setPassword(e.target.value);
              }}
              type="password"
              required
              className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500"
            />
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleSignup(name, email, password);
            }}
            className="block w-full bg-zinc-900 hover:bg-zinc-500 p-4 rounded text-slate-300 hover:text-slate-900 transition duration-300"
          >
            Sign Up
          </button>
          <p className="text-slate-70000 font-medium">Already have an account? <Link to='/login' className="font-semibold text-blue-900 underline">Login</Link> here</p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
