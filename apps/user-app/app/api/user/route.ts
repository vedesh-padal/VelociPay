import { NextResponse } from "next/server";
import { PrismaClient } from "@repo/db/client";

const client = new PrismaClient();

export const GET = async () => {
  await client.user.create({
    data: {
      email: "vp12@email.com",
      name: "Hum Being"
    }
  })
  return NextResponse.json({
    message: "hi there!"
  })
}