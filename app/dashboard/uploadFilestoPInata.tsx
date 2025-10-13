"use client";

import { useState } from "react";
import { UploadModal } from "../../components/ui/upload-modal.js";
import { ethers } from "ethers";
import { TRUSTCHAIN_ABI } from "../../lib/contract-abi.js";
import { transactionType } from "viem";

declare const window: Window & typeof globalThis & { ethereum?: any };

export default function UploadFiles() {
  const [url, setUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const ContractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

  const uploadFile = async (selectedFile: File) => {
    try {
      setUploading(true);
      const data = new FormData();
      data.set("file", selectedFile);
      const uploadRequest = await fetch("/api/files", {
        method: "POST",
        body: data,
      });

      const arrayBuffer = await selectedFile.arrayBuffer(); 
      const hashBuffer = await crypto.subtle.digest("SHA-256", arrayBuffer); 
      const hashArray = Array.from(new Uint8Array(hashBuffer)); 
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); 
      console.log("sha256 hash", hashHex);  

      if(typeof window !== 'undefined' && window.ethereum) {
        console.log("window.ethereum", window.ethereum);
        console.log("isMetaMask?", window.ethereum?.isMetaMask);
        
        const ethereumProvider = window.ethereum.providers?.find((p: any) => p.isMetaMask) || window.ethereum;

        if (ethereumProvider) {
          const provider = new ethers.BrowserProvider(ethereumProvider);
          const signer = await provider.getSigner();
          const contract = new ethers.Contract(ContractAddress!, TRUSTCHAIN_ABI, signer);

          const tx = await contract.storeHash(hashHex)

          await tx.wait();
          console.log("Transaction Sent: ", tx.hash);
        } else {
          alert("Please install MetaMask to interact with this app.");
        }
      } else if (typeof window !== 'undefined') {
        alert("Please install MetaMask");
      }


      const signedUrl = await uploadRequest.json();
      setUrl(signedUrl);
      setUploading(false);
    } catch (e: any) {
      console.error("error during uploadfile:", e)
      setUploading(false);
    }
  };

  return (
    <UploadModal onUpload={uploadFile} uploading={uploading} />
  );
}