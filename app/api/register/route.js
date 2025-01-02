import User from "@/app/(models)/User";
import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = {
      email: email,
      name: name,
      password: passwordHash,
      level: 0,
      avatar: 0,
      border: 0,
      displayBadge: 0,
      experience: 0,
      first_login: true,
      watched_stocks: ["AAPL"],
      achievements: [],
      pending_investments: [],
      curr_investments: [],
      prev_investments: [],
      opt_in: true,
      balance: 5000,
      settings: {
        mode: "dark",
      },
    };

    await connectMongoDB();
    await User.create(newUser);

    return NextResponse.json({ message: "User Created" }, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Failure", err }, { status: 500 });
  }
}
