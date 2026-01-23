import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { scanQRCode } from "../../redux/reducer/table";

/**
 * QR Scan Page
 * URL format: /table/:tableCode
 *
 * Flow:
 * 1. Lấy tableCode từ URL params
 * 2. Gọi API để lấy table, session, cart
 * 3. Lưu vào Redux store và localStorage
 * 4. Redirect về trang chủ để bắt đầu mua hàng
 */
const QRScan = () => {
  const { tableCode } = useParams<{ tableCode: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { loading, error, currentTable } = useAppSelector(
    (state) => state.table,
  );

  useEffect(() => {
    if (!tableCode) {
      navigate("/");
      return;
    }

    dispatch(scanQRCode(tableCode))
      .unwrap()
      .then(() => {
        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch((err) => {
        console.error("QR scan failed:", err);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      });
  }, [tableCode, dispatch, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700">
            Đang quét mã QR...
          </h2>
          <p className="text-gray-500 mt-2">Vui lòng đợi trong giây lát</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="bg-red-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
            <svg
              className="h-8 w-8 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Quét mã QR thất bại
          </h2>
          <p className="text-red-600 mb-4">{error}</p>
          <p className="text-gray-500 text-sm">Đang chuyển về trang chủ...</p>
        </div>
      </div>
    );
  }

  if (currentTable) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="bg-green-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
            <svg
              className="h-8 w-8 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Quét mã thành công!
          </h2>
          <p className="text-gray-600">
            Bàn số:{" "}
            <span className="font-bold">{currentTable.table_number}</span>
          </p>
          <p className="text-gray-500 text-sm mt-4">
            Đang chuyển đến trang đặt món...
          </p>
        </div>
      </div>
    );
  }

  return null;
};

export default QRScan;
