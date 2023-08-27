import { NextRequest, NextResponse as res } from "next/server";
import { itemDataBackend } from "@/Validations/validation";
import Item from "@/models/Item";

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    //console.log(reqBody);
    const parsedInput = itemDataBackend.safeParse(reqBody);
    if (parsedInput.success) {
      const data = parsedInput.data;
      //console.log(data);
      const newItem = new Item({ ...data });
      await newItem.save();
      return res.json(
        { success: true, msg: "successfully created Product" },
        { status: 201 }
      );
    } else {
      return res.json(
        { success: false, msg: "invalid input" },
        { status: 400 }
      );
    }
  } catch (error: any) {
    return res.json({ error: error.message }, { status: 400 });
  }
}
