import { signin } from "@/Validations/validation";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "@/models/User";
import connectToDB from "@/dbConnect/dbConnect";

connectToDB();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const parsedInput = signin.safeParse(reqBody);
    if (!parsedInput.success) {
      return NextResponse.json(
        { success: false, msg: "Invalid Input" },
        { status: 401 }
      );
    }
    console.log(parsedInput.data);
    const { email, password } = parsedInput.data;
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { success: false, msg: "User doesnt exist" },
        { status: 401 }
      );
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json(
        { success: false, msg: "Incorrect Password" },
        { status: 401 }
      );
    }
    const tokenData = {
      id: user._id,
      name: user.fullName,
      email,
      isSeller: user.isSeller,
    };

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });
    const response = NextResponse.json(
      {
        success: true,
        msg: "successfully logged in",
        email: user.email,
        isSeller: user.isSeller,
        fullName: user.fullName,
        id: user._id,
      },
      { status: 200 }
    );
    response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (error) {
    console.log(error);
  }
}
