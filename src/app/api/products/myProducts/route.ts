import { NextRequest, NextResponse as res } from "next/server";
import Item from "@/models/Item";
import connectToDB from "@/dbConnect/dbConnect";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connectToDB();

export async function GET(req: NextRequest) {
  try {
    const userId = await getDataFromToken(req);

    const myProducts = await Item.find({ sellerInfo: userId }).select([
      "-rating",
      "-sellerInfo",
      "-Orders",
      "-__v",
      "-description",
      "-img2",
      "-img3",
      "-img4",
      "-category",
      "-stock",
    ]);
    //console.log(myProducts);
    return res.json({ myProducts }, { status: 200 });
  } catch (error: any) {
    return res.json({ error: error.message }, { status: 400 });
  }
}
