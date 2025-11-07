import AdminNav from "./AdminNav";

export default function AdminProduct() {
  return (
    <div className="flex min-h-screen -mb-14">
      <AdminNav />
      <div className="flex-1 p-10">
        <h1 className="text-2xl text-gray-700 font-bold">Manage Products 🛒</h1>
        <div className="shadow-lg p-4 rounded space-y-2"></div>
      </div>
    </div>
  );
}
