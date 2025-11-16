import AdminNav from "./AdminNav";
import { FcVoicePresentation } from "react-icons/fc";

export default function AdminQuery() {
  return (
    <div className="flex min-h-screen -mb-14 cursor-default">
      <AdminNav />
      <div className="flex-1 p-10">
        <div className="flex gap-2 mb-4 flex-wrap">
          <h1 className="text-2xl text-gray-700 font-bold">Manage Queries</h1>
          <FcVoicePresentation className="text-3xl" />
        </div>

        <table className="w-full">
          <thead className="uppercase text-xs bg-gray-100 text-gray-700 dark:text-gray-300 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3">S.No</th>
              <th className="px-6 py-3">Username</th>
              <th className="px-6 py-3">Query</th>
              <th className="px-6 py-3">Email-Id</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Action-1</th>
              <th className="px-6 py-3">Action-2</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            <tr className="border-b border-gray-300 text-center">
              <td className="px-6 py-3">1</td>
              <td className="px-6 py-3">Shailesh</td>
              <td className="px-6 py-3">Final Project</td>
              <td className="px-6 py-3">abc123@gmail.com</td>
              <td className="px-6 py-3">Unread</td>
              <td className="px-6 py-3"><button className="text-xs text-white bg-green-500 active:bg-green-600 px-3 py-2 rounded cursor-pointer font-semibold">Reply</button></td>
              <td className="px-6 py-3"><button className="text-xs text-white bg-red-500 active:bg-red-600 px-3 py-2 rounded cursor-pointer font-semibold">Delete</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
