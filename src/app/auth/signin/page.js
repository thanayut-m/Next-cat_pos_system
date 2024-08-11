"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from 'next/link';

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log('email', email);
      // console.log('password', password);
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result.error) {
        console.error(result.error);
        return false;
      }
      //Login successful!
      router.push("../auth/profile");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-slate-300">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-xl shadow-2xl border-inherit"
      >
        <div className="flex justify-center">
          <p className="text-4xl font-bold m-4"> เข้าสู่ระบบ</p>
        </div>

        <div className="mb-4">
          <label htmlFor="email">อีเมล</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-gray-300 px-3 py-2 rounded "
          />
        </div>
        <div className="mb-4">
          <div className="flex flex-row justify-between">
            <label htmlFor="password">รหัสผ่าน</label>
            <p className="text-[#2a7fff]">ลืมรหัสผ่าน</p>
          </div>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border border-gray-300 px-3 py-2 rounded "
          />
          <div className="flex justify-center">
            <div className="mt-2 flex-row">ยังไม่มีบัญชี</div>
            <Link href="../auth/signup" className=" ml-2 mt-2 flex-row text-[#2a7fff]">สมัครสมาชิก</Link>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded mb-4 hover:bg-blue-400"
        >
          เข้าสู่ระบบ
        </button>
        <div className="grid grid-cols-3">
          <hr className="border-t-2 border-gray-300 my-4" />
          <div className=" flex justify-center">Or</div>
          <hr className="border-t-2 border-gray-300 my-4" />
        </div>
        <div className="mb-3">
          <button className="flex items-center justify-center w-full bg-white text-gray-800 border border-gray-300 rounded-lg shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 py-2 px-4">
            <svg
              className="w-5 h-5 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                fill="#fbc02d"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
              <path
                fill="#e53935"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              ></path>
              <path
                fill="#4caf50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              ></path>
              <path
                fill="#1565c0"
                d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
            </svg>
            <span>Login with Google</span>
          </button>
        </div>
      </form>
    </div>
  );
}
