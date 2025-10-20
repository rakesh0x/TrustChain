"use client";

import { SidebarDemo } from "../dashboard/sidebar";
import { DataTableDemo } from "./data-table-check"

export default function CheckDocumentAvail() {
    return (
        <div className="flex flex-col p-2">
            <SidebarDemo/>
            <div className="ml-2 w-full">
                <DataTableDemo/>
            </div>
        </div>
    )
}