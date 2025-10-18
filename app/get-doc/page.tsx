"use client"

import { useEffect, useState } from "react"
import { GetDataTable } from "./getDocumentsTable"
import { SidebarDemo } from "../dashboard/sidebar";

export default function getDocuments() {
    const [cid, setCid] = useState<string | null>(null);
    const [hash, setHash] = useState<string | null>(null);
    const [imageUrlFormat, setImageUrlFormat] = useState<string | null>(null);

    useEffect(() => {
        const storedCid = localStorage.getItem('cid');
        const storedHash = localStorage.getItem('hash');

        setCid(storedCid);
        setHash(storedHash);
        if (storedCid) {
            setImageUrlFormat(`https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${storedCid}`);
        }

    }, [])
    

    return (

        <div className="flex  flex-2 p-3">
            <SidebarDemo/>
            <div className="ml-2 w-full">
                <GetDataTable data={[{ ImageURL: imageUrlFormat || '', hash: hash || '' }]}  />
            </div>
        </div>
    )
}