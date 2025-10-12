"use client";

import { useState } from "react";
import { UploadModal } from "../../components/ui/upload-modal";
import { ethers } from "ethers";
import trustchain from "../../contracts/trustchain.json"
import { transactionType } from "viem";

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

      const ethereum = (window.ethereum as any)?.providers?.find(
        (p: any) => p.isMetaMask
      ) || window.ethereum;

      if(ethereum || !ethereum.metamask) {
        console.log("window.ethereum", window.ethereum);
        console.log("isMetaMask?", window.ethereum?.isMetaMask);
          alert("Please install MetaMask and use it to interact with this app.");
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const contract = new ethers.Contract(ContractAddress!, trustchain, signer);

          const tx = await contract.storeHash(hashHex)

          await tx.wait();
          console.log("Transaction Sent: ", tx.hash);
      } else {
        alert("please install metamask");
      }


      const signedUrl = await uploadRequest.json();
      setUrl(signedUrl);
      setUploading(false);
    } catch (e: any) {
      console.error("error during uploadfile:", e)
      setUploading(false);
      alert("Trouble uploading file: " + (e?.message || e));
    }
  };

  return (
    <UploadModal onUpload={uploadFile} uploading={uploading} />
  );
}