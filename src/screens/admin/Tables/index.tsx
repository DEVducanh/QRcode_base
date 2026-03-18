import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../redux/store";
import {
  fetchAdminTables,
  createAdminTable,
  updateAdminTable,
  deleteAdminTable,
} from "../../../redux/reducer/adminTable";
import type { Table } from "../../../types/table";
import AdminLayout from "../../../layout/AdminLayout";
import { Plus, Pencil, Trash2, X, Check, Loader2 } from "lucide-react";

const EMPTY: Omit<Table, "_id"> = { table_number: "", table_code: "", capacity: 4, status: "available" };

const TablesManager = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tables, loading } = useSelector((state: RootState) => state.adminTable);
  const [modal, setModal] = useState<"add" | "edit" | null>(null);
  const [selected, setSelected] = useState<Partial<Table>>(EMPTY);
  const [saving, setSaving] = useState(false);

  const isFetched = useRef(false);
  useEffect(() => {
    if (!isFetched.current) {
      dispatch(fetchAdminTables());
      isFetched.current = true;
    }
  }, [dispatch]);

  const openAdd = () => { setSelected(EMPTY); setModal("add"); };
  const openEdit = (t: Table) => { setSelected(t); setModal("edit"); };
  const closeModal = () => { setModal(null); setSelected(EMPTY); };

  const handleSave = async () => {
    setSaving(true);
    if (modal === "add") {
      await dispatch(createAdminTable(selected));
    } else if (modal === "edit" && selected._id) {
      const { _id, ...rest } = selected;
      await dispatch(updateAdminTable({ id: _id!, data: rest }));
    }
    setSaving(false);
    closeModal();
  };

  const statusBadge = (status?: string) => {
    const map: Record<string, { label: string; cls: string }> = {
      available: { label: "Trống", cls: "bg-emerald-100 text-emerald-700" },
      unavailable: { label: "Đang dùng", cls: "bg-orange-100 text-orange-700" },
    };
    const s = map[status || ""] || { label: status || "—", cls: "bg-gray-100 text-gray-500" };
    return <span className={`px-2 py-1 rounded-full text-xs font-semibold ${s.cls}`}>{s.label}</span>;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Quản lý bàn</h2>
            <p className="text-gray-500 text-sm mt-1">{tables.length} bàn</p>
          </div>
          <button onClick={openAdd} className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl text-sm font-semibold transition shadow-md">
            <Plus size={16} /> Thêm bàn
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-16"><Loader2 size={32} className="animate-spin text-orange-500" /></div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600 font-semibold">
                <tr>
                  <th className="text-left px-6 py-3">Số bàn</th>
                  <th className="text-left px-6 py-3">Mã QR</th>
                  <th className="text-left px-6 py-3">Sức chứa</th>
                  <th className="text-left px-6 py-3">Trạng thái</th>
                  <th className="text-right px-6 py-3">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {tables.length === 0 && (
                  <tr><td colSpan={5} className="text-center py-10 text-gray-400">Chưa có bàn</td></tr>
                )}
                {tables.map((t) => (
                  <tr key={t._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-semibold text-gray-800">Bàn {t.table_number}</td>
                    <td className="px-6 py-4"><code className="bg-gray-100 px-2 py-0.5 rounded text-xs">{t.table_code}</code></td>
                    <td className="px-6 py-4 text-gray-600">{t.capacity ?? "—"} người</td>
                    <td className="px-6 py-4">{statusBadge(t.status)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openEdit(t)} className="p-2 hover:bg-orange-50 rounded-lg text-orange-500 transition"><Pencil size={15} /></button>
                        <button onClick={() => { if(confirm("Xóa bàn này?")) dispatch(deleteAdminTable(t._id!)); }} className="p-2 hover:bg-red-50 rounded-lg text-red-500 transition"><Trash2 size={15} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {modal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-gray-800">{modal === "add" ? "Thêm bàn" : "Chỉnh sửa bàn"}</h3>
              <button onClick={closeModal} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500"><X size={18} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Số bàn *</label>
                <input value={selected.table_number || ""} onChange={(e) => setSelected((p) => ({ ...p, table_number: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50" placeholder="VD: 1, 2, A..." />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Mã QR (table_code) *</label>
                <input value={selected.table_code || ""} onChange={(e) => setSelected((p) => ({ ...p, table_code: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50" placeholder="VD: TABLE-001" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Sức chứa</label>
                <input type="number" value={selected.capacity || 4} onChange={(e) => setSelected((p) => ({ ...p, capacity: Number(e.target.value) }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={closeModal} className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition">Hủy</button>
              <button onClick={handleSave} disabled={saving} className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-xl text-sm font-semibold transition flex items-center justify-center gap-2 disabled:opacity-60">
                {saving ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
                {modal === "add" ? "Thêm" : "Lưu"}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default TablesManager;
