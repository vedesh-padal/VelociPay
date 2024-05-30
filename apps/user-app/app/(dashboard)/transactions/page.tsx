import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import { WalletTransactions } from "../../../components/WalletTransactions";
import { P2PTransactions } from "../../../components/P2PTransactions";


async function getP2PTransactionsSent() {
  const session = await getServerSession(authOptions);
  const txns = await prisma.p2pTransfer.findMany({
    where: {
      fromUserId: Number(session?.user?.id)
    },
    include: {
      toUser: {
        select: {
          id: true,
          name: true
        }
      }
    }
  });
  return txns.map(t => ({
    time: t.timestamp,
    amount: t.amount,
    toUser: t.toUser.name
  }))
}

async function getP2PTransactionsReceived() {
  const session = await getServerSession(authOptions);
  const txns = await prisma.p2pTransfer.findMany({
    where: {
      toUserId: Number(session?.user?.id)
    },
    include: {
      fromUser: {
        select: {
          id: true,
          name: true
        }
      }
    }
  });
  return txns.map(t => ({
    time: t.timestamp,
    amount: t.amount,
    fromUser: t.fromUser.name
  }))
}

type Txn = {
  time: Date,
  amount: number,
  status: 'Success' | 'Failure' | 'Processing',
  provider: string
}

async function getWalletTxns() {
  const session = await getServerSession(authOptions);

  const txns = await prisma.onRampTransaction.findMany({
    where: {
      userId: Number(session?.user?.id)
    }
  });

  const successTxns: Txn[] = [];
  const failedTxns: Txn[] = [];
  const processingTxns: Txn[] = [];

  txns.forEach(txn => {
    switch (txn.status) {
      case "Success":
        successTxns.push({
          time: txn.startTime,
          amount: txn.amount,
          status: txn.status,
          provider: txn.provider
        });
        break;
      case "Failure":
        failedTxns.push({
          time: txn.startTime,
          amount: txn.amount,
          status: txn.status,
          provider: txn.provider
        });
        break;
      case "Processing":
        processingTxns.push({
          time: txn.startTime,
          amount: txn.amount,
          status: txn.status,
          provider: txn.provider
        });
        break;
    }
  });

  return { successTxns, failedTxns, processingTxns };

}

export default async () => {

  const p2pSent = await getP2PTransactionsSent();
  const p2pReceived = await getP2PTransactionsReceived();
  const walletTxns = await getWalletTxns();

  return (
    <div className="w-screen">
      <div className="text-4xl text-[#6a51a6] pt-8 mb-4 font-bold">
        Transactions
      </div>
      <div className="flex-col p-4">
        <P2PTransactions title="P2P Transactions" p2pSent={p2pSent} p2pReceived={p2pReceived} />
      </div>
      <div className="flex-col p-4">
        <WalletTransactions title="Wallet Transactions" walletTxns={walletTxns} />
      </div>
    </div>
  )
}