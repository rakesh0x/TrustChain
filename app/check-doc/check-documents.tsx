"use client";

import { useState } from "react";
import { dataLength, ethers } from "ethers";
import { Trustchain_abi } from "@/lib/contract-abi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableDemo, Transaction } from "./data-table";
import { Toast } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

const deployedContractAddress = process.env.NEXT_PUBLIC_DEPLOYED_CONTRACT;
const jsonrpcurl = process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL;

export function CheckdocumentfromTrustchain() {
  const [hash, setHash] = useState("");
  const contractAddress = deployedContractAddress
  const [hashExists, setHashExists] = useState<boolean | null>(null);
  const [documentData, setDocumentData] = useState<Transaction[]>([])
  const toast = useToast();

  const provider = new ethers.JsonRpcProvider(
    jsonrpcurl
  );

  const checkHash = async () => {
    try {
      if (!hash) {
        toast.toast({ 
          title: "Error",
          description: "Please enter a hash",
          variant: "destructive"
        });
        return;
      }

      if (!contractAddress) {
        toast.toast({ 
          title: "Error",
          description: "Contract address is not defined",
          variant: "destructive"
        });
        return;
      }

      const contract = new ethers.Contract(contractAddress, Trustchain_abi, provider);
      const allDocs = await contract.getAllDocuments();

      console.log("All docs:", allDocs);

      interface Document {
        hash: string;
        [key: string]: any;
      }

      const foundDoc: Document | undefined = (allDocs as Document[]).find((doc) => doc.hash === hash);

      if (foundDoc) {
        setHashExists(true);
        console.log("Document found:", foundDoc);
        console.log("Document found:", foundDoc.owner);
        console.log("Document found:", foundDoc.timestamp);
        setDocumentData([{
          hash: foundDoc.hash,
          contractAddress: contractAddress || "",
          timestamp: UnixTimeToIST(foundDoc.timestamp?.toString() || "")
        }])

        toast.toast({ 
          title: "Document Found",
          description: "Document exists on Trustchain",
          variant: "success"
        })
      } else {
        setHashExists(false);
        setDocumentData([]);
        toast.toast({ 
          title: "Document Not Found",
          description: "Hash does not exist on Trustchain",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error checking hash:", error);
      setHashExists(false);
      toast.toast({ 
        title: "Error",
        description: "Failed to check document",
        variant: "destructive"
      });
    }
  };
  const UnixTimeToIST = (timestamp: any) => {
    const date = new Date((timestamp) * 1000);
    return date.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  };
  

  return (
    <div className="flex mt-0 flex-col  h-screen gap-4">
      <Input
        value={hash}
        onChange={(e) => setHash(e.target.value)}
        placeholder="Enter the hash"
        className="w-64 p-2 border rounded-lg mt-10 ml-3"
      />
      <Button onClick={checkHash} variant="default">
        Check Document
      </Button>      
      <DataTableDemo data={documentData}/>
    </div>
  );
}
