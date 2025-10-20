"use client";

import { SidebarDemo } from "../dashboard/sidebar";
import { CheckdocumentfromTrustchain } from "./check-documents";

export default function CheckDocumentAvail() {
    return (
        <div className="flex">
            <SidebarDemo/>
            <div className="ml-2 w-full">
                <CheckdocumentfromTrustchain/>
            </div>
        </div>
    )
}