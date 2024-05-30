import { TransactionsCard } from "./TransactionsCard"

type Transaction = {
  time: Date,
  amount: number,
  // TODO: Can the type of `status` be more specific?
  toUser?: string | any,
  fromUser?: string | any
};

export const P2PTransactions = ({
  p2pSent,
  p2pReceived,
  title
}: {
  p2pSent: Transaction[],
  p2pReceived: Transaction[],
  title: string,
}) => {
  return (
    <div>
      <div className="text-2xl text-[#6a51a6] pt-8 mb-4 font-bold">
        {title}
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <TransactionsCard
            from="p2p"
            transactions={p2pSent} 
            title="Sent Transactions"
            className="bg-gray-300 border-1 border-slate-400 rounded-md"
          />
        </div>
        <div>
          <TransactionsCard
            from="p2p"
            transactions={p2pReceived} 
            title="Received Transactions" 
            className="bg-gray-300 border-1 border-slate-400 rounded-md"
          />
        </div>
      </div>
    </div>
  )
}