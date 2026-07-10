/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import html2pdf from "html2pdf.js";
import * as XLSX from "xlsx";
import { BASE_URL } from "../../config/api";

export default function TransactionPage() {
  const navigate = useNavigate();

  // --- STATE ---
  const [transactions, setTransactions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [activeUnifiedTab, setActiveUnifiedTab] = useState("all");
  const [countdowns, setCountdowns] = useState<Record<number, string>>({});

  const timerIntervalRef = useRef<any>(null);

  // 👇 [PERBAIKAN] State untuk Otorisasi CRUD Transaksi 👇
  const [adminUser, setAdminUser] = useState<any>(null);
  const [allowedModules, setAllowedModules] = useState<string[]>([]);

  useEffect(() => {
    // Ambil data user & otorisasi dari localStorage saat komponen dimuat
    const userStr = localStorage.getItem("admin_user");
    if (userStr) {
      const user = JSON.parse(userStr);
      setAdminUser(user);
      try {
        const policiesStr = localStorage.getItem("admin_access_policies");
        if (policiesStr) {
          const policies = JSON.parse(policiesStr);
          if (user.usertype !== "superadmin") {
            setAllowedModules(policies[user.usertype] || []);
          }
        }
      } catch (error) {
        console.error("Gagal membaca kebijakan akses:", error);
      }
    }
  }, []);

  // Fungsi Helper RBAC
  const canAccess = (key: string) => {
    if (!adminUser) return false;
    if (adminUser.usertype === "superadmin") return true; 
    return allowedModules.includes(key);
  };
  // 👆 ========================================== 👆

  // --- TABS DEFINITION ---
  const unifiedTabs = [
    { label: "All Orders", value: "all" },
    { label: "Unpaid", value: "unpaid" },
    { label: "To Ship", value: "to_ship" },
    { label: "In Transit", value: "shipping" },
    { label: "Completed", value: "completed" },
    { label: "Cancelled", value: "cancelled" },
    { label: "Issues / Returns", value: "issues" },
  ];

  // --- HELPERS ---
  const formatPrice = (v: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(v || 0);

  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatStatus = (status: string) =>
    status ? status.replace(/_/g, " ") : "";

  const getGrandTotal = (trx: any) => {
    if (!trx) return 0;
    const total = parseFloat(trx.total_amount || 0);
    const shipping = parseFloat(trx.shipping_cost || 0);
    const promo = parseFloat(trx.promo_discount || 0);
    const points = (trx.points_used || 0) * 1000;
    return total + shipping - promo - points;
  };

  const getPaymentLogo = (methodString: string) => {
    if (!methodString) return null;
    const channel = methodString.split(" ")[1]?.toLowerCase();
    const map: Record<string, string> = {
      bca: "bca.png",
      bni: "bni.png",
      bri: "bri.png",
      mandiri: "mandiri.png",
      bsi: "bsi.png",
      permata: "permata.png",
      ovo: "ovo.png",
      dana: "dana.png",
      linkaja: "linkaja.png",
      shopeepay: "shopeepay.png",
      alfamart: "alfamart.png",
      indomaret: "indomaret.png",
      qris: "qris.png",
    };
    return map[channel] ? "/payment_images/" + map[channel] : null;
  };

  const getCourierLogo = (company: string) => {
    if (!company) return null;
    const map: Record<string, string> = {
      jne: "jne.png",
      sicepat: "sicepat.png",
      jnt: "jnt.png",
      anteraja: "anteraja.png",
      gojek: "gojek.png",
      grab: "grab.png",
      paxel: "paxel.png",
      ninja: "ninja.png",
    };
    return map[company.toLowerCase()]
      ? "/courier_images/" + map[company.toLowerCase()]
      : null;
  };

  const getPaymentStatusText = (status: string) =>
    [
      "completed",
      "processing",
      "refund_requested",
      "refund_approved",
      "refund_rejected",
    ].includes(status)
      ? "PAID"
      : status === "cancelled"
        ? "CANCELLED"
        : status === "refunded"
          ? "REFUNDED"
          : "UNPAID";

  const getPaymentStatusColor = (status: string) =>
    [
      "completed",
      "processing",
      "refund_requested",
      "refund_approved",
      "refund_rejected",
    ].includes(status)
      ? "text-emerald-600"
      : status === "cancelled"
        ? "text-red-500"
        : status === "refunded"
          ? "text-teal-600"
          : "text-orange-500";

  const statusClass = (status: string) => {
    const map: Record<string, string> = {
      pending: "bg-orange-100 text-orange-700",
      processing: "bg-blue-100 text-blue-700",
      completed: "bg-emerald-100 text-emerald-700",
      cancelled: "bg-red-100 text-red-700",
      refund_requested: "bg-purple-100 text-purple-700",
      refund_approved: "bg-indigo-100 text-indigo-700",
      refund_rejected: "bg-gray-200 text-gray-600 line-through",
      refunded: "bg-teal-100 text-teal-700",
      refund_manual_required: "bg-pink-100 text-pink-700",
      returned: "bg-gray-800 text-white",
      shipping_failed: "bg-red-800 text-white",
    };
    return map[status] || "bg-gray-100 text-gray-500";
  };

  const shippingStatusClass = (status: string) => {
    if (!status) return "bg-gray-50 border-gray-200 text-gray-500";
    const str = status.toLowerCase();
    if (["delivered"].includes(str))
      return "bg-emerald-50 border-emerald-200 text-emerald-700";
    if (
      ["cancelled", "rejected", "disposed", "courier_not_found"].includes(str)
    )
      return "bg-red-50 border-red-200 text-red-700";
    if (["on_hold", "return_in_transit", "returned"].includes(str))
      return "bg-amber-50 border-amber-200 text-amber-700";
    if (
      [
        "picking_up",
        "picked",
        "dropping_off",
        "allocated",
        "confirmed",
      ].includes(str)
    )
      return "bg-blue-50 border-blue-200 text-blue-700";
    return "bg-gray-50 border-gray-200 text-gray-600";
  };

  // --- LOGIC & COMPUTED ---
  const getUnifiedTabCount = (tabValue: string) => {
    return transactions.filter((order) => {
      if (tabValue === "all") return true;
      const shipStatus = order.shipping_status
        ? order.shipping_status.toLowerCase()
        : "pending";

      if (tabValue === "unpaid") return order.status === "pending";
      if (tabValue === "to_ship")
        return (
          order.status === "processing" &&
          [
            "pending",
            "placed",
            "confirmed",
            "allocated",
            "picking_up",
            "picked",
          ].includes(shipStatus)
        );
      if (tabValue === "shipping") return shipStatus === "dropping_off";
      if (tabValue === "completed")
        return order.status === "completed" || shipStatus === "delivered";
      if (tabValue === "cancelled") return order.status === "cancelled";
      if (tabValue === "issues")
        return (
          order.status.includes("refund") ||
          ["returned", "shipping_failed"].includes(order.status) ||
          [
            "on_hold",
            "return_in_transit",
            "rejected",
            "disposed",
            "courier_not_found",
          ].includes(shipStatus)
        );

      return false;
    }).length;
  };

  const filteredTransactions = useMemo(() => {
    const query = searchQuery.toLowerCase();

    // 1. Filter data
    const result = transactions.filter((order) => {
      let matchSearch = true;
      if (query) {
        matchSearch =
          order.order_id.toLowerCase().includes(query) ||
          order.user.first_name.toLowerCase().includes(query) ||
          order.user.email.toLowerCase().includes(query) ||
          (order.tracking_number &&
            order.tracking_number.toLowerCase().includes(query));
      }

      let matchTab = false;
      const tabValue = activeUnifiedTab;
      const shipStatus = order.shipping_status
        ? order.shipping_status.toLowerCase()
        : "pending";

      if (tabValue === "all") matchTab = true;
      else if (tabValue === "unpaid") matchTab = order.status === "pending";
      else if (tabValue === "to_ship")
        matchTab =
          order.status === "processing" &&
          [
            "pending",
            "placed",
            "confirmed",
            "allocated",
            "picking_up",
            "picked",
          ].includes(shipStatus);
      else if (tabValue === "shipping")
        matchTab = shipStatus === "dropping_off";
      else if (tabValue === "completed")
        matchTab = order.status === "completed" || shipStatus === "delivered";
      else if (tabValue === "cancelled")
        matchTab = order.status === "cancelled";
      else if (tabValue === "issues")
        matchTab =
          order.status.includes("refund") ||
          ["returned", "shipping_failed"].includes(order.status) ||
          [
            "on_hold",
            "return_in_transit",
            "rejected",
            "disposed",
            "courier_not_found",
          ].includes(shipStatus);

      return matchSearch && matchTab;
    });

    // 2. Custom Sort: Prioritize 'refund_requested'
    result.sort((a, b) => {
      const isARefund = a.status === "refund_requested" ? 1 : 0;
      const isBRefund = b.status === "refund_requested" ? 1 : 0;
      if (isARefund > isBRefund) return -1;
      if (isARefund < isBRefund) return 1;
      return b.id - a.id;
    });

    return result;
  }, [transactions, searchQuery, activeUnifiedTab]);

  const totalRevenue = useMemo(() => {
    return transactions
      .filter((t) => t.status === "completed")
      .reduce((acc, curr) => acc + getGrandTotal(curr), 0);
  }, [transactions]);

  // Pagination Variables
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const paginatedTransactions = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredTransactions.slice(start, start + itemsPerPage);
  }, [filteredTransactions, currentPage, itemsPerPage]);

  const showingStart =
    filteredTransactions.length === 0
      ? 0
      : (currentPage - 1) * itemsPerPage + 1;
  const showingEnd = Math.min(
    currentPage * itemsPerPage,
    filteredTransactions.length,
  );

  const visiblePages = useMemo(() => {
    const maxVisible = 7;
    if (totalPages <= maxVisible)
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (currentPage <= 4) return [1, 2, 3, 4, 5, "...", totalPages];
    if (currentPage >= totalPages - 3)
      return [
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  }, [currentPage, totalPages]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, itemsPerPage, activeUnifiedTab]);

  // --- TIMERS & API ---
  const calculateTimeLeft = (referenceDate: string) => {
    if (!referenceDate) return "Expired";
    const expiryTime = new Date(referenceDate).getTime() + 86400000;
    const now = new Date().getTime();
    const diff = expiryTime - now;

    if (diff <= 0) return "Expired";

    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const startTimers = (currentOrders: any[]) => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);

    timerIntervalRef.current = setInterval(() => {
      setCountdowns((prev) => {
        const newCountdowns = { ...prev };
        currentOrders.forEach((trx) => {
          if (["pending"].includes(trx.status)) {
            const timeReference = trx.payment?.created_at || trx.created_at;
            const timeLeft = calculateTimeLeft(timeReference);
            newCountdowns[trx.id] = timeLeft;

            if (timeLeft === "Expired" && !trx.isCancelling) {
              trx.isCancelling = true;
              // Silently cancel on backend if expired. Handled by generic fetch or specific autoCancel.
            }
          }
        });
        return newCountdowns;
      });
    }, 1000);
  };

  const fetchTransactions = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("admin_token");
      const res = await fetch(`${BASE_URL}/api/admin/transactions`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      if (!res.ok) throw new Error("Gagal load transaksi");

      const data = await res.json();
      const filteredData = data.filter(
        (o: any) => o.status !== "awaiting_payment",
      );
      const mappedData = filteredData.map((o: any) => ({
        ...o,
        isCancelling: false,
      }));

      setTransactions(mappedData);
      startTimers(mappedData);
    } catch (error: any) {
      console.error("Fetch transactions error:", error); 
      Swal.fire("Error", "Failed to fetch transactions", "error");
    } finally {
      setTimeout(() => setIsLoading(false), 500);
    }
  };

  useEffect(() => {
    fetchTransactions();
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- ACTIONS ---
  const goToDetail = (trx: any) => {
    // 👇 [PERBAIKAN] Cek RBAC sebelum redirect
    if (!canAccess('transactions.detail')) {
        Swal.fire("Akses Ditolak", "Anda tidak memiliki izin untuk melihat detail transaksi.", "error");
        return;
    }

    // Navigasi dengan melempar data state
    navigate(`/admin/transactions/${trx.id}`, {
      state: { transactionData: JSON.parse(JSON.stringify(trx)) },
    });
  };

  const handleRefundAction = async (
    e: React.MouseEvent,
    id: number,
    action: "approve" | "reject",
  ) => {
    e.stopPropagation(); // Mencegah baris (row) ikut ter-klik
    const endpoint = action === "approve" ? "refund-approve" : "refund-reject";
    const confirmText =
      action === "approve"
        ? "Setujui permintaan refund ini?"
        : "Tolak permintaan refund ini?";

    const result = await Swal.fire({
      title: "Konfirmasi",
      text: confirmText,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#059669",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, lanjutkan!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem("admin_token");
        const res = await fetch(
          `${BASE_URL}/api/admin/transactions/${id}/${endpoint}`,
          {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        if (res.ok) {
          Swal.fire("Sukses", `Refund berhasil di-${action}`, "success");
          fetchTransactions();
        } else {
          throw new Error("Action failed");
        }
      } catch (err: any) {
        console.error("Refund action error:", err); 
        Swal.fire("Error", "Gagal memproses tindakan", "error");
      }
    }
  };

  // --- EXPORTS ---
  const exportToPDF = () => {
    const element = document.getElementById("exportable-table");
    if (!element) return;

    // Sembunyikan elemen no-export
    const noExportElements = element.querySelectorAll(".no-export");
    noExportElements.forEach((el) => el.classList.add("hidden"));

    // Tampilkan header export
    const headers = element.querySelectorAll(".export-header");
    headers.forEach((h) => {
      h.classList.remove("hidden");
      h.classList.add("block");
    });

    const opt = {
      margin: 0.3,
      filename: `Transaction_Report_${new Date().toISOString().split("T")[0]}.pdf`,
      image: { type: "jpeg" as const, quality: 0.98 }, 
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { 
        unit: "in" as const, 
        format: "letter" as const, 
        orientation: "landscape" as const 
      }, 
    };

    html2pdf()
      .set(opt)
      .from(element)
      .save()
      .then(() => {
        // Kembalikan seperti semula
        headers.forEach((h) => {
          h.classList.add("hidden");
          h.classList.remove("block");
        });
        noExportElements.forEach((el) => el.classList.remove("hidden"));
      });
  };

  const exportToExcel = () => {
    const excelData = paginatedTransactions.map((item, index) => ({
      No: index + 1,
      "Order ID": item.order_id,
      Date: formatDate(item.created_at),
      "Customer Name": `${item.user.first_name} ${item.user.last_name}`,
      Email: item.user.email,
      "Total Items": item.details.length,
      "Payment Method": item.payment_method
        ? item.payment_method.replace(/_/g, " ").toUpperCase()
        : "-",
      "Payment Status": getPaymentStatusText(item.status),
      "Shipping Method":
        item.shipping_method === "free"
          ? "In-Store Pickup"
          : `${item.courier_company} - ${item.courier_type}`,
      "Tracking Number": item.tracking_number || "-",
      "Subtotal (IDR)": parseFloat(item.total_amount),
      "Shipping Cost (IDR)": parseFloat(item.shipping_cost),
      "Promo Code": item.promo_code || "-",
      "Promo Discount (IDR)": parseFloat(item.promo_discount || 0),
      "Points Discount (IDR)": (item.points_used || 0) * 1000,
      "Grand Total (IDR)": getGrandTotal(item),
      "Points Earned": item.status === "completed" ? item.point || 0 : 0,
      "Transaction Status": item.status.replace(/_/g, " ").toUpperCase(),
      "Shipping Status":
        item.shipping_method === "free"
          ? "IN-STORE"
          : (item.shipping_status || "PENDING").toUpperCase(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");
    XLSX.writeFile(
      workbook,
      `Transaction_Data_${new Date().toISOString().split("T")[0]}.xlsx`,
    );
  };

  // --- RENDER ---
  return (
    <div className="relative bg-white shadow-sm p-8 border border-gray-100 rounded-2xl min-h-[600px] font-sans">
      {/* HEADER SECTION */}
      <div className="flex flex-col items-start justify-between gap-4 mb-8 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Transaction Monitoring
          </h1>
          <p className="text-sm text-gray-500">
            Kelola dan lacak pesanan pelanggan secara real-time.
          </p>
        </div>
        <div className="flex items-center gap-4 px-6 py-3 border border-gray-100 bg-gray-50 rounded-2xl">
          <div>
            <span className="block font-black text-[10px] text-gray-400 uppercase tracking-widest">
              Total Revenue
            </span>
            <span className="text-xl font-bold text-gycora">
              {formatPrice(totalRevenue)}
            </span>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="mb-8 border-b border-gray-200">
        <div className="flex gap-6 overflow-x-auto custom-scrollbar">
          {unifiedTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveUnifiedTab(tab.value)}
              className={`pb-4 font-bold text-xs uppercase tracking-widest transition-colors whitespace-nowrap border-b-2 flex items-center gap-2 ${
                activeUnifiedTab === tab.value
                  ? "border-gycora text-gycora"
                  : "border-transparent text-gray-400 hover:text-gray-700"
              }`}
            >
              {tab.label}
              {getUnifiedTabCount(tab.value) > 0 && (
                <span
                  className={`px-2 py-0.5 rounded-full text-[9px] font-black ${
                    activeUnifiedTab === tab.value
                      ? "bg-gycora text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {getUnifiedTabCount(tab.value)}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* FILTER & EXPORT ACTIONS */}
      <div className="flex flex-col items-center justify-between gap-4 mb-6 md:flex-row">
        <div className="relative w-full md:w-80">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            placeholder="Cari ID Pesanan, Nama, Email..."
            className="w-full py-2 pl-10 pr-4 text-sm transition border border-gray-200 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-gycora"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          
          {/* 👇 BUNGKUS TOMBOL EXPORT DENGAN RBAC 👇 */}
          {canAccess('transactions.export') && (
            <>
              <button
                onClick={exportToPDF}
                disabled={paginatedTransactions.length === 0 || isLoading}
                className="flex items-center gap-2 px-3 py-2 text-xs font-bold tracking-widest text-red-600 uppercase transition bg-red-50 hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                PDF
              </button>
              <button
                onClick={exportToExcel}
                disabled={paginatedTransactions.length === 0 || isLoading}
                className="flex items-center gap-2 px-3 py-2 text-xs font-bold tracking-widest uppercase transition bg-emerald-50 hover:bg-emerald-100 text-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Excel
              </button>
            </>
          )}

          <div className="w-px h-6 mx-1 bg-gray-200"></div>

          <span className="text-xs font-bold tracking-wide text-gray-400 uppercase">
            Show:
          </span>
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="px-3 py-2 text-sm font-bold border border-gray-200 outline-none cursor-pointer bg-gray-50 rounded-xl focus:ring-2 focus:ring-gycora"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      {/* DATA TABLE SECTION */}
      {isLoading ? (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="border-b text-gray-400 text-[10px] uppercase tracking-widest">
                <th className="pb-4 pl-2">Order Details</th>
                <th className="pb-4">Product Sample</th>
                <th className="pb-4">Logistics (Pay & Ship)</th>
                <th className="pb-4">Financials</th>
                <th className="pb-4">Trans. Status</th>
                <th className="pb-4">Ship. Status</th>
                <th className="pb-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="border-b border-gray-50">
                  <td className="py-6 pl-2 w-[15%]">
                    <div className="space-y-2">
                      <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
                      <div className="w-16 h-3 bg-gray-100 rounded animate-pulse"></div>
                    </div>
                  </td>
                  <td className="py-6 w-[15%]">
                    <div className="flex -space-x-3">
                      <div className="w-10 h-10 bg-gray-200 border-2 border-white rounded-full animate-pulse"></div>
                      <div className="w-10 h-10 bg-gray-200 border-2 border-white rounded-full animate-pulse"></div>
                    </div>
                  </td>
                  <td className="py-6 w-[20%]">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 bg-gray-200 rounded h-7 animate-pulse"></div>
                        <div className="w-16 h-3 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-6 w-[15%] pr-2">
                    <div className="space-y-2">
                      <div className="w-full h-3 bg-gray-100 rounded animate-pulse"></div>
                      <div className="w-full h-4 mt-2 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </td>
                  <td className="py-6 w-[10%]">
                    <div className="w-16 h-5 bg-gray-200 rounded-full animate-pulse"></div>
                  </td>
                  <td className="py-6 w-[10%]">
                    <div className="w-20 h-5 bg-gray-200 rounded-full animate-pulse"></div>
                  </td>
                  <td className="py-6 w-[10%]">
                    <div className="w-16 h-5 mx-auto bg-gray-200 rounded-full animate-pulse"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="overflow-x-auto" id="exportable-table">
          <div className="hidden mb-4 export-header">
            <h2 className="text-2xl font-bold text-gray-900">
              Transaction Report
            </h2>
            <p className="text-sm text-gray-500">
              Generated on: {new Date().toLocaleString()}
            </p>
          </div>

          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 text-[10px] uppercase tracking-widest">
                <th className="pb-4 pl-2">Order Details</th>
                <th className="pb-4 no-export">Product Sample</th>
                <th className="pb-4">Logistics (Pay & Ship)</th>
                <th className="pb-4">Financials</th>
                <th className="pb-4">Trans. Status</th>
                <th className="pb-4">Ship. Status</th>
                <th className="pb-4 text-center no-export">Action</th>
              </tr>
            </thead>

            {paginatedTransactions.length > 0 ? (
              <tbody className="text-sm text-gray-600">
                {paginatedTransactions.map((trx) => (
                  <tr
                    key={trx.id}
                    onClick={() => goToDetail(trx)}
                    className={`align-top transition border-b group border-gray-50 ${canAccess('transactions.detail') ? 'cursor-pointer hover:bg-emerald-50/20' : 'cursor-default'}`}
                  >
                    {/* ORDER DETAILS */}
                    <td className="py-6 pl-2 w-[15%]">
                      <div className="flex flex-col gap-1">
                        <span className="font-mono text-sm font-bold text-gray-900">
                          {trx.order_id}
                        </span>
                        <span className="text-xs text-gray-400">
                          {formatDate(trx.created_at)}
                        </span>
                        <div className="mt-2">
                          <span
                            className="block font-bold text-gray-800 text-xs truncate max-w-[150px]"
                            title={
                              trx.user.first_name + " " + trx.user.last_name
                            }
                          >
                            {trx.user.first_name} {trx.user.last_name}
                          </span>
                          <span
                            className="block text-gray-400 text-[10px] truncate max-w-[150px]"
                            title={trx.user.email}
                          >
                            {trx.user.email}
                          </span>
                        </div>
                        {trx.status === "pending" &&
                          countdowns[trx.id] !== "Expired" && (
                            <div className="flex items-center gap-1 px-2 py-1 mt-2 text-red-600 rounded-md no-export bg-red-50 w-fit">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-3 h-3 animate-pulse"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              <span className="font-mono font-bold text-[10px]">
                                {countdowns[trx.id]}
                              </span>
                            </div>
                          )}
                      </div>
                    </td>

                    {/* PRODUCT SAMPLE */}
                    <td className="py-6 w-[15%] no-export">
                      <div className="flex flex-col gap-2">
                        <div className="flex py-1 pl-1 -space-x-3 overflow-hidden">
                          {trx.details
                            .slice(0, 3)
                            .map((detail: any, idx: number) => (
                              <img
                                key={idx}
                                src={detail.product.image_url}
                                className="inline-block object-cover w-10 h-10 bg-gray-100 border-2 border-white rounded-full shadow-sm"
                              />
                            ))}
                          {trx.details.length > 3 && (
                            <div className="flex items-center justify-center h-10 w-10 rounded-full border-2 border-white bg-gray-100 text-[10px] font-bold text-gray-500">
                              +{trx.details.length - 3}
                            </div>
                          )}
                        </div>
                        <span className="text-xs font-medium text-gray-500">
                          {trx.details.length} Items
                        </span>
                      </div>
                    </td>

                    {/* LOGISTICS */}
                    <td className="py-6 w-[20%]">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-7 bg-white border border-gray-200 rounded flex justify-center items-center p-0.5 shrink-0 no-export">
                            {getPaymentLogo(trx.payment_method) ? (
                              <img
                                src={getPaymentLogo(trx.payment_method)!}
                                className="object-contain w-full h-full"
                              />
                            ) : (
                              <span className="text-[8px] font-bold text-gray-400">
                                PAY
                              </span>
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-gray-800 text-[11px] uppercase">
                              {trx.payment_method
                                ? trx.payment_method.replace(/_/g, " ")
                                : "Not Selected"}
                            </p>
                            <p
                              className={`text-[9px] font-bold uppercase tracking-wider ${getPaymentStatusColor(trx.status)}`}
                            >
                              {getPaymentStatusText(trx.status)}
                            </p>
                          </div>
                        </div>

                        {trx.shipping_method !== "free" ? (
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-7 bg-white border border-gray-200 rounded flex justify-center items-center p-0.5 shrink-0 no-export">
                              {getCourierLogo(trx.courier_company) ? (
                                <img
                                  src={getCourierLogo(trx.courier_company)!}
                                  className="object-contain w-full h-full"
                                />
                              ) : (
                                <span className="text-[8px] font-bold text-gray-400">
                                  SHIP
                                </span>
                              )}
                            </div>
                            <div>
                              <p className="font-bold text-gray-800 text-[11px] uppercase truncate w-32">
                                {trx.courier_company || "Pending"} -{" "}
                                {trx.courier_type || "-"}
                              </p>
                              <p className="text-[10px] text-gray-500 font-mono">
                                Resi:{" "}
                                <span className="font-bold text-gray-900">
                                  {trx.tracking_number || "Waiting..."}
                                </span>
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-10 p-1 text-gray-400 bg-gray-100 border border-gray-200 rounded h-7 shrink-0 no-export">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-4 h-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                />
                              </svg>
                            </div>
                            <div>
                              <p className="font-bold text-gray-800 text-[11px] uppercase">
                                No Courier
                              </p>
                              <p className="text-[10px] text-gray-500 font-medium mt-0.5">
                                In-store Pickup
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>

                    {/* FINANCIALS */}
                    <td className="py-6 w-[15%] pr-2">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex justify-between text-[10px] text-gray-500">
                          <span>Subtotal:</span>
                          <span>{formatPrice(trx.total_amount)}</span>
                        </div>
                        <div className="flex justify-between text-[10px] text-gray-500">
                          <span>Shipping:</span>
                          <span>{formatPrice(trx.shipping_cost)}</span>
                        </div>

                        {trx.promo_discount > 0 && (
                          <div className="flex justify-between text-[9px] text-emerald-600 font-bold">
                            <span>
                              Promo (
                              <span className="font-mono">
                                {trx.promo_code}
                              </span>
                              )
                            </span>
                            <span>-{formatPrice(trx.promo_discount)}</span>
                          </div>
                        )}
                        {trx.points_used > 0 && (
                          <div className="flex justify-between text-[9px] text-yellow-600 font-bold">
                            <span>Pts ({trx.points_used})</span>
                            <span>-{formatPrice(trx.points_used * 1000)}</span>
                          </div>
                        )}

                        <div className="flex justify-between text-sm font-bold text-gray-900 border-t border-dashed border-gray-200 pt-1.5 mt-1">
                          <span>Total:</span>
                          <span>{formatPrice(getGrandTotal(trx))}</span>
                        </div>

                        {trx.point > 0 && trx.status === "completed" && (
                          <div className="flex justify-between items-center text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded border border-emerald-100 mt-1">
                            <span className="flex items-center gap-1">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-3 h-3"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              Points Earned:
                            </span>
                            <span>+{trx.point}</span>
                          </div>
                        )}
                      </div>
                    </td>

                    {/* STATUSES */}
                    <td className="py-6 w-[10%]">
                      <span
                        className={`px-3 py-1 rounded-full font-bold text-[9px] uppercase tracking-tighter block w-fit ${statusClass(trx.status)}`}
                      >
                        {formatStatus(trx.status)}
                      </span>
                    </td>
                    <td className="py-6 w-[10%]">
                      {trx.shipping_method === "free" ? (
                        <span className="px-3 py-1 rounded-full font-bold text-[9px] uppercase tracking-tighter block w-fit border bg-gray-100 text-gray-600">
                          In-Store Pickup
                        </span>
                      ) : (
                        <span
                          className={`px-3 py-1 rounded-full font-bold text-[9px] uppercase tracking-tighter block w-fit border ${shippingStatusClass(trx.shipping_status)}`}
                        >
                          {formatStatus(trx.shipping_status || "Pending")}
                        </span>
                      )}
                    </td>

                    {/* ACTIONS */}
                    <td
                      className="py-6 text-center w-[15%] no-export"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {trx.status === "refund_requested" ? (
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-full p-3 text-left border border-red-100 bg-red-50 rounded-xl">
                            <p className="font-bold text-[9px] text-red-600 uppercase tracking-widest mb-1 border-b border-red-100 pb-1">
                              Refund Reason
                            </p>
                            <p
                              className="text-[10px] text-gray-700 italic line-clamp-3 mb-2"
                              title={trx.refund_reason}
                            >
                              "{trx.refund_reason || "No reason provided"}"
                            </p>
                            {trx.refund_proof_url && (
                              <a
                                href={trx.refund_proof_url}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 text-[9px] font-bold text-blue-600 hover:underline bg-white px-2 py-1 rounded border border-blue-100 w-fit"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="w-3 h-3"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                  />
                                </svg>
                                View Proof
                              </a>
                            )}
                          </div>
                          
                          {/* 👇 BUNGKUS TOMBOL APPROVE/REJECT REFUND DENGAN RBAC 👇 */}
                          {canAccess('transactions.refund') ? (
                            <div className="flex justify-center w-full gap-2">
                              <button
                                onClick={(e) =>
                                  handleRefundAction(e, trx.id, "approve")
                                }
                                className="bg-emerald-100 hover:bg-emerald-200 py-2 flex-1 rounded-lg text-emerald-700 transition shadow-sm font-bold text-[10px] uppercase tracking-widest flex justify-center items-center gap-1"
                                title="Approve Refund"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="w-3 h-3"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                                Accept
                              </button>
                              <button
                                onClick={(e) =>
                                  handleRefundAction(e, trx.id, "reject")
                                }
                                className="bg-red-100 hover:bg-red-200 py-2 flex-1 rounded-lg text-red-700 transition shadow-sm font-bold text-[10px] uppercase tracking-widest flex justify-center items-center gap-1"
                                title="Reject Refund"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="w-3 h-3"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                                Deny
                              </button>
                            </div>
                          ) : (
                            <span className="text-[10px] italic text-gray-400 text-center w-full">Menunggu Persetujuan</span>
                          )}
                        </div>
                      ) : ["completed", "processing"].includes(trx.status) ? (
                        <div className="flex justify-center">
                          {canAccess('transactions.detail') ? (
                            <button
                              onClick={() => goToDetail(trx)}
                              className="text-[10px] font-bold text-gycora hover:text-gycora-dark hover:underline uppercase tracking-widest"
                            >
                              View Detail
                            </button>
                          ) : (
                            <span className="text-gray-300 text-[10px] italic">
                              No Access
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-300 text-[10px] italic">
                          No Action
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td
                    colSpan={7}
                    className="py-20 font-serif italic text-center text-gray-400"
                  >
                    {searchQuery
                      ? "No transactions match your search."
                      : "No transactions found."}
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
      )}

      {/* PAGINATION */}
      {!isLoading && filteredTransactions.length > 0 && (
        <div className="flex flex-col items-center justify-between gap-4 pt-6 mt-8 border-t border-gray-100 md:flex-row">
          <p className="text-sm text-gray-400">
            Showing{" "}
            <span className="font-bold text-gray-900">{showingStart}</span> to{" "}
            <span className="font-bold text-gray-900">{showingEnd}</span> of{" "}
            <span className="font-bold text-gray-900">
              {filteredTransactions.length}
            </span>{" "}
            orders
          </p>

          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((prev) => prev - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm font-medium transition border rounded-xl hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            <div className="flex gap-1">
              {visiblePages.map((page, index) => (
                <button
                  key={index}
                  onClick={() =>
                    typeof page === "number" ? setCurrentPage(page) : null
                  }
                  disabled={page === "..."}
                  className={`w-10 h-10 rounded-xl font-medium transition flex items-center justify-center text-sm ${
                    currentPage === page
                      ? "bg-gycora text-white border-gycora"
                      : "hover:bg-gray-50 border-gray-200"
                  } ${page === "..." ? "cursor-default border-transparent hover:bg-transparent" : "border"}`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-sm font-medium transition border rounded-xl hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}