"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";


export async function p2pTransfer(to: string, amount: number) {
  const session = await getServerSession(authOptions);
  const fromUser = session?.user?.id;
  if (!fromUser)  {
    return {
      message: "Error while sending..."
    }
  }
  console.log('session id exists');
  const toUser = await prisma.user.findFirst({
    where: {
      mobileNumber: to
    }
  });
  console.log('user found');
  console.log(JSON.stringify(toUser));


  if (!toUser)  {
    return {
      message: "User not found"
    }
  }

  console.log('user found, now proceeding to perfrom trxn');

  await prisma.$transaction(async (txn) => {
    // the below raw SQL query is to make sure that only one transaction at a time can modify the same userId's balance
    // to explicitly lock the balance row for the sending user so that only one transaction can access it at at time
    await txn.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(fromUser)} FOR UPDATE`;
    const fromBalance = await txn.balance.findUnique({
      where: { userId: Number(fromUser) }
    });

    if (!fromBalance || fromBalance.amount < amount)  {
      throw new Error("Insufficient funds");
    }

    await txn.balance.update({
      where: { userId: Number(fromUser) },
      data: { amount: { decrement: amount}}
    });

    await txn.balance.update({
      where: { userId: toUser.id },
      data: { amount: { increment: amount }}
    });

    await prisma.p2pTransfer.create({
      data: {
        amount: amount * 100,
        timestamp: new Date(),
        fromUserId: Number(fromUser),
        toUserId: toUser.id,
      }
    })
  })
}