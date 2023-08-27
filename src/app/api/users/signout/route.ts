import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json(
      { sucess: true, msg: "logout successful" },
      { status: 201 }
    );
    response.cookies.set("token", "", { httpOnly: true });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
