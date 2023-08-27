import connectToDB from "@/dbConnect/dbConnect";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { signup } from "@/Validations/validation";

connectToDB();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const parsedInput = signup.safeParse(reqBody);
    if (!parsedInput.success) {
      return NextResponse.json(
        { success: false, msg: "Invalid input" },
        { status: 411 }
      );
    }
    console.log(parsedInput.data);
    const { email, password, confirmPassword, ...restinput } = parsedInput.data;
    const isUser = await User.findOne({ email });
    if (isUser) {
      return NextResponse.json(
        { success: false, msg: "User already exists" },
        { status: 401 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      ...restinput,
    });
    await newUser.save();
    return NextResponse.json(
      { success: true, msg: "Successfully created" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
  }
}
