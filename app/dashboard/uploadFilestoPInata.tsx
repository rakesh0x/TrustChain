"use client"
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Trustchain_abi } from "../../lib/contract-abi.ts";
import { UploadModal } from "../../components/ui/upload-modal.tsx";
import { transactionType } from "viem";

interface UploadFilesProps {
  onUploadSuccess: (transaction: { hash: string; contractAddress: string; timestamp: string, ImageURL: string }) => void;
}

declare const window: Window & typeof globalThis & { ethereum?: any };

export default function UploadFiles({ onUploadSuccess }: UploadFilesProps) {
  const [url, setUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const ContractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
  const rpcUrl = process.env.NEXT_PUBLIC_HARDHAT_RPC_URL || "http://127.0.0.1:8545";

  useEffect(() => {
    if (typeof window !== 'undefined') {
    }
  }, []);

  const uploadFile = async (selectedFile: File) => {
    try {
      setUploading(true);
      const data = new FormData();
      data.set("file", selectedFile);
      const uploadRequest = await fetch("/api/files", { method: "POST", body: data });
      const { cid, url } = await uploadRequest.json();
      if (typeof window !== 'undefined') {
        localStorage.setItem("cid", cid);
        console.log("CID sent to local storage.")
      }
      console.log("CID:", cid);
      console.log("URL:", url);

      const arrayBuffer = await selectedFile.arrayBuffer();
      const hashBuffer = await crypto.subtle.digest("SHA-256", arrayBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      console.log("sha256 hash", hashHex);
      const provider = new ethers.JsonRpcProvider(rpcUrl);

      const signer = await provider.getSigner(0);

      const contract = new ethers.Contract(ContractAddress!, Trustchain_abi, signer);

      const tx = await contract.storeHash(hashHex);
      await tx.wait();
      console.log("Transaction Sent after network switch: ", tx.hash);

      // Store transaction data in local storage
      if (typeof window !== 'undefined') {
        const transactions = JSON.parse(localStorage.getItem("transactions") || "[]");
        transactions.push({
          hash: hashHex,
          contractAddress: ContractAddress,
          timestamp: new Date().toISOString(),
          ImageURL: url,
        });
        localStorage.setItem("transactions", JSON.stringify(transactions));
      }
      onUploadSuccess({
        hash: hashHex,
        contractAddress: ContractAddress!,
        timestamp: new Date().toISOString(),
        ImageURL: url, 
      });

    } catch (switchError: any) {
      console.error("Error during uploadFile:", switchError);
      setUploading(false);
    }
  };

  return <UploadModal onUpload={uploadFile} uploading={uploading} />;
}
