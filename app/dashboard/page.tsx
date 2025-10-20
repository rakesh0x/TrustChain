"use client"

import { SidebarDemo } from "./sidebar";
import UploadFiles from "./uploadFilestoPInata";
import { useEffect, useState } from "react";
import { DataTableDemo, Transaction } from "../../components/ui/table-data";
import { GetDataTable } from "../get-doc/getDocumentsTable";

export default function Dashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedTransactions = JSON.parse(localStorage.getItem("transactions") || "[]");
      setTransactions(storedTransactions);
    }
  }, []);

  const handleUploadSuccess = (newTransaction: Transaction) => {
    setTransactions((prevTransactions) => [...prevTransactions, newTransaction]);
  };

  return (
    <div className="flex">
      <SidebarDemo/>
      <div className="flex flex-col flex-1 p-4">
        <UploadFiles onUploadSuccess={handleUploadSuccess}/>

        <h2 className="text-2xl font-bold mt-8 mb-4">Uploaded Images</h2>
        <DataTableDemo data={transactions} />
      </div>
    </div>
  )
}