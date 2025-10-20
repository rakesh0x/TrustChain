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
  const rpcUrl = process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL;

  useEffect(() => {
    if (typeof window !== 'undefined') {
    }
  }, []);

  const uploadFile = async (selectedFile: File) => {
    try {
      setUploading(true);

      //getting cid from the api endpoint
      const data = new FormData();
      data.set("file", selectedFile);
      const uploadRequest = await fetch("/api/files", { method: "POST", body: data });
      const { cid, url } = await uploadRequest.json();

      // storing it to local storage
      localStorage.setItem("cid", cid);
      console.log("CID:", cid);
      console.log("URL:", url);

      //converting it to hash 
      const arrayBuffer = await selectedFile.arrayBuffer();
      const hashBuffer = await crypto.subtle.digest("SHA-256", arrayBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      console.log("sha256 hash", hashHex);

      //metamask wallet sign-in 
      if (!window.ethereum) throw new Error("MetaMask not detected");
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();

      //storing all the data in contract call 
      const contract = new ethers.Contract(ContractAddress!, Trustchain_abi, signer);

      // Send transaction
      const tx = await contract.storeHash(hashHex);
      await tx.wait();
      console.log("Transaction Sent:", tx.hash);

      // Store locally in localstorage
      const transactions = JSON.parse(localStorage.getItem("transactions") || "[]");
      transactions.push({
        hash: hashHex,
        contractAddress: ContractAddress,
        timestamp: new Date().toISOString(),
        ImageURL: url,
      });
      localStorage.setItem("transactions", JSON.stringify(transactions));

      onUploadSuccess({
        hash: hashHex,
        contractAddress: ContractAddress!,
        timestamp: new Date().toISOString(),
        ImageURL: url,
      });
    } catch (error: any) {
      console.error("Error during uploadFile:", error);
    } finally {
      setUploading(false);
    }
  };

  return <UploadModal onUpload={uploadFile} uploading={uploading} />;
}
