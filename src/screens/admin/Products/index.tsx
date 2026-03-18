import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../redux/store";
import {
  fetchAdminProducts,
  createAdminProduct,
  updateAdminProduct,
  deleteAdminProduct,
} from "../../../redux/reducer/adminProduct";
import { fetchAdminCategories } from "../../../redux/reducer/adminCategory";
import type { IProduct } from "../../../types/product.type";
import AdminLayout from "../../../layout/AdminLayout";
import { Plus, Pencil, Trash2, X, Check, Loader2, ChevronLeft, ChevronRight } from "lucide-react";

const EMPTY: Omit<IProduct, "_id"> = {
  product_name: "",
  image_url: "",
  price: 0,
  category_id: "",
  status: true,
};

const ProductsManager = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, page, totalPages } = useSelector((state: RootState) => state.adminProduct);
  const { categories } = useSelector((state: RootState) => state.adminCategory);
  const [modal, setModal] = useState<"add" | "edit" | null>(null);
  const [selected, setSelected] = useState<Partial<IProduct>>(EMPTY);
  const [saving, setSaving] = useState(false);

  const isFetched = useRef(false);
  useEffect(() => {
    if (!isFetched.current) {
      dispatch(fetchAdminProducts({ page, limit: 10 }));
      dispatch(fetchAdminCategories());
      isFetched.current = true;
    }
  }, [dispatch, page]);

  const openAdd = () => { setSelected(EMPTY); setModal("add"); };
  const openEdit = (p: IProduct) => { setSelected(p); setModal("edit"); };
  const closeModal = () => { setModal(null); setSelected(EMPTY); };

  const handleSave = async () => {
    setSaving(true);
    if (modal === "add") {
      await dispatch(createAdminProduct(selected));
    } else if (modal === "edit" && selected._id) {
      const { _id, ...rest } = selected as IProduct;
      await dispatch(updateAdminProduct({ id: _id!, data: rest }));
    }
    setSaving(false);
    closeModal();
    dispatch(fetchAdminProducts({ page, limit: 10 }));
  };

  const handleDelete = (id: string) => {
    if (confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
      dispatch(deleteAdminProduct(id));
    }
  };

  const formatPrice = (n: number) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(n);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Sản phẩm</h2>
            <p className="text-gray-500 text-sm mt-1">{products.length} sản phẩm (trang {page}/{totalPages})</p>
          </div>
          <button onClick={openAdd} className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl text-sm font-semibold transition shadow-md">
            <Plus size={16} /> Thêm sản phẩm
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-16"><Loader2 size={32} className="animate-spin text-orange-500" /></div>
          ) : (
            <>
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-600 font-semibold">
                  <tr>
                    <th className="text-left px-6 py-3">Sản phẩm</th>
                    <th className="text-left px-6 py-3">Danh mục</th>
                    <th className="text-left px-6 py-3">Giá</th>
                    <th className="text-left px-6 py-3">Trạng thái</th>
                    <th className="text-right px-6 py-3">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {products.length === 0 && (
                    <tr><td colSpan={5} className="text-center py-10 text-gray-400">Chưa có sản phẩm</td></tr>
                  )}
                  {products.map((p) => (
                    <tr key={p._id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {p.image_url ? (
                            <img src={p.image_url} alt={p.product_name} className="w-10 h-10 rounded-lg object-cover border border-gray-100" />
                          ) : (
                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-xs">N/A</div>
                          )}
                          <span className="font-medium text-gray-800">{p.product_name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                        {typeof p.category_id === "string"
                          ? (categories.find((c) => c._id === p.category_id)?.category_name || p.category_id)
                          : (p.category_id as unknown as { category_name?: string })?.category_name || "—"}
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-800">{formatPrice(p.price)}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${p.status ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-500"}`}>
                          {p.status ? "Kinh doanh" : "Ngừng bán"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => openEdit(p)} className="p-2 hover:bg-orange-50 rounded-lg text-orange-500 transition"><Pencil size={15} /></button>
                          <button onClick={() => handleDelete(p._id!)} className="p-2 hover:bg-red-50 rounded-lg text-red-500 transition"><Trash2 size={15} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100">
                  <button
                    disabled={page <= 1}
                    onClick={() => dispatch(fetchAdminProducts({ page: page - 1 }))}
                    className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-40"
                  ><ChevronLeft size={16} /></button>
                  <span className="text-sm text-gray-600">Trang {page} / {totalPages}</span>
                  <button
                    disabled={page >= totalPages}
                    onClick={() => dispatch(fetchAdminProducts({ page: page + 1 }))}
                    className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-40"
                  ><ChevronRight size={16} /></button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-gray-800">{modal === "add" ? "Thêm sản phẩm" : "Chỉnh sửa sản phẩm"}</h3>
              <button onClick={closeModal} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500"><X size={18} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Tên sản phẩm *</label>
                <input
                  value={selected.product_name || ""}
                  onChange={(e) => setSelected((p) => ({ ...p, product_name: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50"
                  placeholder="Nhập tên sản phẩm"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Giá (VND) *</label>
                  <input
                    type="number"
                    value={selected.price || 0}
                    onChange={(e) => setSelected((p) => ({ ...p, price: Number(e.target.value) }))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Danh mục *</label>
                  <select
                    value={typeof selected.category_id === "string" ? selected.category_id : ""}
                    onChange={(e) => setSelected((p) => ({ ...p, category_id: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50"
                  >
                    <option value="">Chọn danh mục</option>
                    {categories.map((c) => <option key={c._id} value={c._id}>{c.category_name}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">URL ảnh</label>
                <input
                  value={selected.image_url || ""}
                  onChange={(e) => setSelected((p) => ({ ...p, image_url: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50"
                  placeholder="https://..."
                />
              </div>
              <div className="flex items-center gap-3">
                <label className="text-sm font-semibold text-gray-700">Đang kinh doanh</label>
                <button
                  type="button"
                  onClick={() => setSelected((p) => ({ ...p, status: !p.status }))}
                  className={`w-11 h-6 rounded-full transition-colors ${selected.status ? "bg-orange-500" : "bg-gray-300"}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform mx-1 ${selected.status ? "translate-x-5" : "translate-x-0"}`} />
                </button>
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

export default ProductsManager;
