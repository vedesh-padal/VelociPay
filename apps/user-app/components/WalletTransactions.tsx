import { TransactionsCard } from "./TransactionsCard"

type walletTxnType = {
  time: Date;
  amount: number;
  status: 'Success' | 'Failure' | 'Processing';
  provider: string;
};

type WalletTxns = {
  successTxns: walletTxnType[];
  failedTxns: walletTxnType[];
  processingTxns: walletTxnType[];
};

export const WalletTransactions = ({
  walletTxns,
  title
}: {
  walletTxns: WalletTxns,
  title: string
}) => {
  
  const { successTxns, failedTxns, processingTxns } = walletTxns;
  
  return (
    <div>
      <div className="text-2xl text-[#6a51a6] pt-8 mb-4 font-bold">
        {title}
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <TransactionsCard
            transactions={successTxns} 
            title="Successful Transactions"
            className="bg-gray-300 border-1 border-slate-400 rounded-md"
          />
        </div>
        <div>
          <TransactionsCard
            transactions={processingTxns} 
            title="Processing Transactions" 
            className="bg-gray-300 border-1 border-slate-400 rounded-md"
          />
        </div>
        <div>
          <TransactionsCard
            transactions={failedTxns} 
            title="Failed Transactions" 
            className="bg-gray-300 border-1 border-slate-400 rounded-md"
          />
        </div>
      </div>
    </div>
  )
}