import { NextApiRequest, NextApiResponse } from "next";
import { pinata } from "../../image-store/pinata-config";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  if (req.method === "GET") {
    try {
      const { cid } = req.query;
      if (!cid || typeof cid !== "string") {
        return res.status(400).json({ error: "CID is required" });
      }

      const gatewayUrl = `https://apricot-realistic-bobolink-877.mypinata.cloud/${cid}`;

      res.status(200).json({ gatewayUrl });
    } catch (error: any) {
      console.error("error retrieving image from pinata", error.message || error);
      res.status(500).json({ error: "Failed to retrieve image", details: error.message || "Unknown error" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
