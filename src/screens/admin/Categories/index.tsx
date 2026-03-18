import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../redux/store";
import {
  fetchAdminCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../../redux/reducer/adminCategory";
import type { ICategory } from "../../../types/category.type";
import AdminLayout from "../../../layout/AdminLayout";
import { Plus, Pencil, Trash2, X, Check, Loader2 } from "lucide-react";

const EMPTY: ICategory = { category_name: "", description: "" };

const CategoriesManager = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, loading } = useSelector((state: RootState) => state.adminCategory);

  const [modal, setModal] = useState<"add" | "edit" | null>(null);
  const [selected, setSelected] = useState<ICategory>(EMPTY);
  const [saving, setSaving] = useState(false);

  const isFetched = useRef(false);
  useEffect(() => {
    if (!isFetched.current) {
      dispatch(fetchAdminCategories());
      isFetched.current = true;
    }
  }, [dispatch]);

  const openAdd = () => { setSelected(EMPTY); setModal("add"); };
  const openEdit = (cat: ICategory) => { setSelected(cat); setModal("edit"); };
  const closeModal = () => { setModal(null); setSelected(EMPTY); };

  const handleSave = async () => {
    if (!selected.category_name.trim()) return;
    setSaving(true);
    if (modal === "add") {
      await dispatch(createCategory({ category_name: selected.category_name, description: selected.description }));
    } else if (modal === "edit" && selected._id) {
      await dispatch(updateCategory({ id: selected._id, data: { category_name: selected.category_name, description: selected.description } }));
    }
    setSaving(false);
    closeModal();
  };

  const handleDelete = (id: string) => {
    if (confirm("Bạn có chắc muốn xóa danh mục này?")) {
      dispatch(deleteCategory(id));
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Danh mục</h2>
            <p className="text-gray-500 text-sm mt-1">{categories.length} danh mục</p>
          </div>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl text-sm font-semibold transition shadow-md"
          >
            <Plus size={16} /> Thêm danh mục
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 size={32} className="animate-spin text-orange-500" />
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600 font-semibold">
                <tr>
                  <th className="text-left px-6 py-3">Tên danh mục</th>
                  <th className="text-left px-6 py-3">Mô tả</th>
                  <th className="text-right px-6 py-3">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {categories.length === 0 && (
                  <tr><td colSpan={3} className="text-center py-10 text-gray-400">Chưa có danh mục</td></tr>
                )}
                {categories.map((cat) => (
                  <tr key={cat._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-medium text-gray-800">{cat.category_name}</td>
                    <td className="px-6 py-4 text-gray-500">{cat.description || "—"}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openEdit(cat)} className="p-2 hover:bg-orange-50 rounded-lg text-orange-500 transition">
                          <Pencil size={15} />
                        </button>
                        <button onClick={() => handleDelete(cat._id!)} className="p-2 hover:bg-red-50 rounded-lg text-red-500 transition">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-gray-800">
                {modal === "add" ? "Thêm danh mục" : "Chỉnh sửa danh mục"}
              </h3>
              <button onClick={closeModal} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500">
                <X size={18} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Tên danh mục *</label>
                <input
                  value={selected.category_name}
                  onChange={(e) => setSelected((p) => ({ ...p, category_name: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50"
                  placeholder="Nhập tên danh mục"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Mô tả</label>
                <textarea
                  value={selected.description || ""}
                  onChange={(e) => setSelected((p) => ({ ...p, description: e.target.value }))}
                  rows={3}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50 resize-none"
                  placeholder="Nhập mô tả (tuỳ chọn)"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={closeModal} className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition">
                Hủy
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-xl text-sm font-semibold transition flex items-center justify-center gap-2 disabled:opacity-60"
              >
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

export default CategoriesManager;
