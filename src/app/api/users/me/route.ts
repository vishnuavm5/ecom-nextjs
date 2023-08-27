import { getDataFromToken } from "@/helpers/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";

import User from "@/models/User";
import connectToDB from "@/dbConnect/dbConnect";

connectToDB();

export async function GET(req: NextRequest) {
  try {
    const userId = await getDataFromToken(req);
    const user = await User.findById({ _id: userId }).select("-password");
    return NextResponse.json({ msg: "user found", ...user }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
