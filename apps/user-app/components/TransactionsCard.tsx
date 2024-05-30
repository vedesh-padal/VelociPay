"use client";

import { Card } from "@repo/ui/card";
import CustomScrollbar from "@repo/ui/custom-scrollbar";

export const TransactionsCard = ({ transactions, title, className, from }: {
  transactions: {
    time: Date,
    amount: number,
    // TODO: Can the type of `status` be more specific?
    status?: string,
    provider?: string,
    toUser?: string,
    fromUser?: string
  }[],
  title: string,
  className?: string,
  from?: string
}) => {

  if (!transactions.length) {
    return <Card title={title} className={className}>
      <div className="text-center py-8">
        No Recent Transactions
      </div>
    </Card>
  }

  return (
    <Card title={title} className={`${className} `} >
      <CustomScrollbar>
        {transactions
          .sort((a, b) => b.time.getTime() - a.time.getTime()) // Sort by time in descending order
          .map(t => (
            <div
              className="flex justify-between py-0.5"
              key={t.time.toString()}
            >
              <div>
                <div className="flex gap-6 mt-1 ">
                  <div className="text-sm">
                  { t.status === "Processing" && `To be Received` }  
                  { t.status === "Success" && `Received` }
                  { t.status === "Failure" && `Failed` }
                  {/* { from === "p2p" && t.fromUser && t.fromUser.length > 0 && 'Received' } */}
                  {/* { from === "p2p" && t.toUser && t.toUser.length > 0 && 'Sent' } */}
                  { title === "Sent Transactions" && 'Sent' }
                  { title === "Received Transactions" && 'Received' }
                  {' '} INR
                  </div>
                  { from === "transfer" && (
                    <div className="rounded-full border border-slate-500 bg-slate-200 w-auto p-0.5 px-1 mt-[2px] text-slate-700 text-[8px] font-semibold cursor-default">
                      {t.status}
                    </div>
                  ) }
                </div>
                <div className="text-slate-600 text-xs mt-[2px]">
                  {new Date(t.time).toLocaleString()}
                </div>
              </div>
              <div className="flex flex-col justify-center">
              {/* { from === "p2p" && t.fromUser && t.fromUser.length > 0 && ('+') } { from === "p2p" && t.toUser && t.toUser.length > 0 && ('-') } Rs {t.amount / 100} */}
              { title === "Sent Transactions" && ('-') } { title === "Received Transactions" && ('+') } Rs {t.amount / 100}

              </div>
            </div>
          ))}
      </CustomScrollbar>
    </Card>
  )
}
