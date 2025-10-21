"use client";

import { useState } from "react";
import { ethers } from "ethers";
import { Trustchain_abi } from "@/lib/contract-abi";
import { number } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function CheckdocumentfromTrustchain() {
  const [hash, setHash] = useState("");
  const [contractAddress, setContractAddress] = useState("0xE4D231f711CF9ea4F82592A8135D1e56355EC497");
  const [hashExists, setHashExists] = useState<boolean | null>(null);
  const [index, setIndex] = useState("");

  // Connect to your local blockchain
  const provider = new ethers.JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/jrwsleF2pRmk5BJQx6fzf");

  const checkHash = async () => {
    try {
      if (!contractAddress || !hash) {
        alert("Please enter contract address and hash");
        return;
      }

      const contract = new ethers.Contract(contractAddress, Trustchain_abi, provider);
      
      const doc = await contract.getDocument(Number(index));
     
      if (doc && doc[1] === hash) {
        setHashExists(true);
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

      <Button
        onClick={checkHash}
        variant="default"
      >
        Check Document
      </Button>

      {hashExists !== null && (
        <p className="text-lg">
          {hashExists
            ? "Document Exists on Blockchain"
            : "Hash not found"}
        </p>
      )}
    </div>
  );
}