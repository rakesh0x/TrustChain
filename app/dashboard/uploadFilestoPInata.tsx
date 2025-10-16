"use client"
import { useState } from "react";
import { ethers } from "ethers";
import { Trustchain_abi } from "../../lib/contract-abi.ts";
import { UploadModal } from "../../components/ui/upload-modal.tsx";

export default function UploadFiles() {
  const [url, setUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const ContractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
  const rpcUrl = process.env.NEXT_PUBLIC_HARDHAT_RPC_URL || "http://127.0.0.1:8545";

  const uploadFile = async (selectedFile: File) => {
    try {
      setUploading(true);

      // ✅ Step 1: Upload file
      const data = new FormData();
      data.set("file", selectedFile);
      const uploadRequest = await fetch("/api/files", { method: "POST", body: data });

      // ✅ Step 2: Hash file contents
      const arrayBuffer = await selectedFile.arrayBuffer();
      const hashBuffer = await crypto.subtle.digest("SHA-256", arrayBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      console.log("sha256 hash", hashHex);

      // ✅ Step 3: Connect to Hardhat local node (no MetaMask needed)
      const provider = new ethers.JsonRpcProvider(rpcUrl);

      // by default Hardhat provides 20 accounts, we can use index 0
      const signer = await provider.getSigner(0);

      // ✅ Step 4: Create contract instance
      const contract = new ethers.Contract(ContractAddress!, Trustchain_abi, signer);

      // ✅ Step 5: Send transaction
      const tx = await contract.storeHash(hashHex);
      await tx.wait();
      console.log("Transaction Sent: ", tx.hash);

      // ✅ Step 6: Handle upload result
      const signedUrl = await uploadRequest.json();
      setUrl(signedUrl);
      setUploading(false);
    } catch (e: any) {
      console.error("Error during uploadFile:", e);
      setUploading(false);
    }
  };

  return <UploadModal onUpload={uploadFile} uploading={uploading} />;
}
