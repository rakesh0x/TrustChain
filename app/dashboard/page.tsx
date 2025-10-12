import { SidebarDemo } from "./sidebar";
import UploadFiles from "./uploadFilestoPInata";

export default function Dashboard() {
  return (
    <div className="flex">
      <SidebarDemo/>
      <UploadFiles/>
    </div>
  )
}