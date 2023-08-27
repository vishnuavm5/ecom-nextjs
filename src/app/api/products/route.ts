import { NextResponse as res } from "next/server";
import Item from "@/models/Item";
import connectToDB from "@/dbConnect/dbConnect";

connectToDB();

export async function GET() {
  try {
    const allitems = await Item.find({}).select([
      "-img2",
      "-img3",
      "-img4",
      "-stock",
      "-__v",
      "-sellerInfo",
      "-description",
    ]);
    return res.json({ allitems }, { status: 200 });
  } catch (error: any) {
    return res.json({ error: error.message }, { status: 400 });
  }
}
