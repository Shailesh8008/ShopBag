import AdminNav from "./AdminNav";
import { FcVoicePresentation } from "react-icons/fc";

export default function AdminQuery() {
  return (
    <div className="flex min-h-screen -mb-14">
      <AdminNav />
      <div className="flex-1 p-10">
        <div className="flex gap-2 mb-4 flex-wrap">
          <h1 className="text-2xl text-gray-700 font-bold">Manage Queries</h1>
          <FcVoicePresentation className="text-3xl" />
        </div>
        <div className="shadow-lg p-4 rounded space-y-2"></div>
      </div>
    </div>
  );
}
