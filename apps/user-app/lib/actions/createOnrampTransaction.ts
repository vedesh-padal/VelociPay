// server action
"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";


export async function createOnrampTransaction(amount: number, provider: string) {
  // extracting who this user is:
  const session = await getServerSession(authOptions);
  if(!session?.user || !session?.user?.id)  {
    return {
      message: "Unathenticated request"
    }
  }
  // ideally this token for that much amount of this transaction should come from a banking API, since we don't have it, we are generating it ourselves
  // const token = await axios.get("https://api.hdfcbank.com/getToken", {
  //   amount: 20030
  // });
  const token = (Math.random() * Math.pow(10, 17)).toString();
  console.log('token: ', token)
  console.log(`amount: ${amount}`)
  await prisma.onRampTransaction.create({
    data: {
      userId: Number(session?.user?.id),
      provider,
      status: "Processing",
      startTime: new Date(),
      token: token,
      amount: amount * 100
    }
  })

  new Date()

  return {
    message: "Done"
  }
}