import { TransactionsTable } from "@/module/(dashboard)/transactions/component/transaction"

export default function Page() {
  return (
   <div className="h-auto overflow-y-auto scrollbar-hide w-full  ">
       <TransactionsTable/>
    </div>
  )
}
