"use client"

import { SidebarDemo } from "./sidebar";
import UploadFiles from "./uploadFilestoPInata";
import { useEffect, useState } from "react";
import { DataTableDemo, Transaction } from "../../components/ui/table-data";
import { GetDataTable } from "../get-doc/getDocumentsTable";
import { useAuth, RedirectToSignIn } from '@clerk/nextjs';
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { userId, isSignedIn } = useAuth();
  const router = useRouter();

  // ALWAYS define hooks first
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    if(!userId) {
      
      router.push("/")
    }
  }, [userId, router])

  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem("transactions") || "[]");
    setTransactions(storedTransactions);
  }, []);

  const handleUploadSuccess = (newTransaction: Transaction) => {
    setTransactions((prevTransactions) => [...prevTransactions, newTransaction]);
  };

  if(!userId) {
    return null;
  }

  return (
    <div className="flex">
      <SidebarDemo />
      <div className="flex flex-col flex-1 p-4">
        <UploadFiles onUploadSuccess={handleUploadSuccess} />

        <h2 className="text-2xl font-bold mt-8 mb-4">Uploaded Images</h2>
        <DataTableDemo data={transactions} />
      </div>
    </div>
  )
}
