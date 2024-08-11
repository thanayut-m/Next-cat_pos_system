import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { email, password, confirmPassword, first_name, last_name } =
      await request.json();s

    if (!email || !password || !confirmPassword || !first_name || !last_name) {
      return NextResponse.json(
        { error: "กรุณากรอกข้อมูลให้ครบถ้วน" },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      console.log("Password:", password);
      console.log("Confirm Password:", confirmPassword);
      return NextResponse.json({ error: "รหัสผ่านไม่ตรงกัน" }, { status: 400 });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    if (!first_name || !last_name) {
      return NextResponse.json(
        { error: "ข้อมูลชื่อหรือชื่อสกุลไม่ถูกต้อง" },
        { status: 400 }
      );
    }

    const user = await prisma.users.create({
      data: {
        email,
        password: hashedPassword,
        first_name,
        last_name,
      },
    });
    return NextResponse.json({ message: "สร้างผู้ใช้สำเร็จแล้ว", user });
  } catch (error) {
    console.error("Error creating user:", error);
    const errorMessage = error.message;
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
