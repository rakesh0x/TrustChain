"use client";

import { useState } from "react";
import { ethers } from "ethers";
import { Trustchain_abi } from "@/lib/contract-abi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const deployedContractAddress = process.env.NEXT_PUBLIC_DEPLOYED_CONTRACT;
const jsonrpcurl = process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL;

export function CheckdocumentfromTrustchain() {
  const [hash, setHash] = useState("");
  const contractAddress = deployedContractAddress
  const [hashExists, setHashExists] = useState<boolean | null>(null);

  const provider = new ethers.JsonRpcProvider(
    jsonrpcurl
  );

  const checkHash = async () => {
    try {
      if (!hash) {
        alert("Please enter a hash");
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
      } else {
        setHashExists(false);
      }
    } catch (error) {
      console.error("Error checking hash:", error);
      setHashExists(false);
    }
  };

  return (
    <div className="flex mt-0 flex-col items-center justify-center h-screen gap-4">
      <Input
        value={hash}
        onChange={(e) => setHash(e.target.value)}
        placeholder="Enter the hash"
        className="w-64 p-2 border rounded-lg"
      />

      <Button onClick={checkHash} variant="default">
        Check Document
      </Button>

      {hashExists !== null && (
        <p className="text-lg">
          {hashExists
            ? "✅ Document Exists on Blockchain"
            : "❌ Hash not found"}
        </p>
      )}
    </div>
  );
}
