import connectToDB from "@/dbConnect/dbConnect";
import Item from "@/models/Item";
import { NextRequest, NextResponse as res } from "next/server";

connectToDB();
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    console.log(req.url);
    const id = searchParams.get("id");
    const product = await Item.findById({ _id: id }).select([
      "-Orders",
      "-stock",
      "-__v",
      "-_id",
    ]);
    //console.log(product);
    return res.json({ success: true, ...product }, { status: 200 });
  } catch (error: any) {
    return res.json({ error: error.message }, { status: 400 });
  }
}
