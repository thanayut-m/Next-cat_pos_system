"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

export default function SignUp() {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const router = useRouter();

  const checkEmailExists = async (email) => {
    try {
      const res = await fetch("/api/auth/check-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        const data = await res.json();
        return data.exists;
      } else {
        console.error("เกิดข้อผิดพลาดในการตรวจสอบอีเมลล์");
        return false;
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการตรวจสอบอีเมลล์:", error);
      return false;
    }
  };

  const handleSubmitSignUp = async (e) => {
    e.preventDefault();

    const emailExists = await checkEmailExists(email);
    if (emailExists) {
      console.log("อีเมลนี้ถูกใช้งานแล้ว");
      setEmailError("อีเมลนี้ถูกใช้งานแล้ว");
      return;
    }

    if (password !== confirmPassword) {
      console.log("รหัสผ่านไม่ตรงกัน");
      setPasswordErr("รหัสผ่านไม่ตรงกัน");
      return;
    }

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          confirmPassword,
          first_name,
          last_name,
        }),
      });

      if (res.ok) {
        console.log("success");
        Swal.fire({
          title: "Success",
          icon: "success",
          text: "Registration successful!",
        });

        router.push("../auth/signin");
      } else {
        Swal.fire({
          title: "Error1",
          icon: "error",
          text: err.message,
        });
      }
    } catch (err) {
      console.log("error", err);
      Swal.fire({
        title: "error3",
        icon: "error",
        text: err.message,
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-300">
      <div className="flex-grow flex items-center justify-center">
        <div className="flex  shadow-6xl ">
          <div className="w-96 flex items-center justify-center text-white text-2xl">
            <img
              src="/assets/signup/cat-signup.jpg"
              alt=""
              className="w-full h-auto rounded-l-6xl"
            />
          </div>
          <div className="w-96 p-6 bg-[#ffffff] rounded-r-6xl">
            <form onSubmit={handleSubmitSignUp} className="w-full">
              <div className="flex justify-center mb-6">
                <p className="text-4xl font-bold">สมัครสมาชิก</p>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1"
                >
                  อีเมล
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border border-gray-300 px-1 py-1 rounded"
                />
                {emailError && (
                  <label className="block text-red-600 text-sm font-bold mt-1">
                    {emailError}
                  </label>
                )}
              </div>

              <div className="flex items-center mb-4 space-x-4">
                <div className="flex-1">
                  <label
                    htmlFor="first_name"
                    className="block text-sm font-medium mb-1"
                  >
                    ชื่อ
                  </label>
                  <input
                    id="first_name"
                    type="text"
                    value={first_name}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="w-full border border-gray-300 px-1 py-1 rounded"
                  />
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="last_name"
                    className="block text-sm font-medium mb-1"
                  >
                    นามสกุล
                  </label>
                  <input
                    id="last_name"
                    type="text"
                    value={last_name}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="w-full border border-gray-300 px-1 py-1 rounded"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center mb-4 space-x-4">
                  <div className="flex-1">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium mb-1"
                    >
                      รหัสผ่าน
                    </label>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full border border-gray-300 px-1 py-1 rounded"
                    />

                  </div>
                  <div className="flex-1">
                    <label
                      htmlFor="confirm-password"
                      className="block text-sm font-medium mb-1"
                    >
                      ยืนยันรหัสผ่าน
                    </label>
                    <input
                      id="confirm-password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="w-full border border-gray-300 px-1 py-1 rounded"
                    />
                  </div>
                </div>
                {passwordErr && (
                      <label className="block text-red-600 text-sm font-bold">
                        {passwordErr}
                      </label>
                    )}
              </div>

              <button
                type="submit"
                className="mt-5 w-full bg-blue-500 text-white px-1 py-2 rounded hover:bg-blue-400"
              >
                ลงทะเบียน
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
