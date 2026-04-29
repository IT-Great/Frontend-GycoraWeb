/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useMemo } from "react";
import { BASE_URL } from "../../config/api";
import Swal from "sweetalert2";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  usertype: string;
}

interface AuditLog {
  id: number;
  user_id: number | null;
  user: User | null;
  action: string;
  model_type: string;
  model_id: number;
  old_values: Record<string, any> | null;
  new_values: Record<string, any> | null;
  ip_address: string;
  created_at: string;
}

export default function AdminAuditLogPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

  // Filters State
  const [search, setSearch] = useState("");
  const [actionFilter, setActionFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const fetchLogs = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("admin_token");
      const res = await fetch(`${BASE_URL}/api/admin/audit-logs`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json"
        }
      });
      if (res.ok) {
        const data = await res.json();
        setLogs(data.data ? data.data : data);
        setCurrentPage(1);
      } else {
        throw new Error("Failed to fetch logs");
      }
    } catch (error) {
      console.error("Gagal mengambil audit log", error);
      Swal.fire("Error", "Gagal memuat log sistem.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const resetFilters = () => {
    setSearch("");
    setActionFilter("All");
    setDateFilter("");
    setCurrentPage(1);
  };

  // Reset pagination saat filter berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [search, actionFilter, dateFilter, itemsPerPage]);

  // ==========================================
  // LOGIKA FILTERING (CLIENT SIDE)
  // ==========================================
  const filteredLogs = useMemo(() => {
    let result = logs;

    if (actionFilter !== "All") {
      result = result.filter((log) => log.action === actionFilter);
    }

    if (dateFilter) {
      result = result.filter((log) => {
        const logDate = new Date(log.created_at).toISOString().split("T")[0];
        return logDate === dateFilter;
      });
    }

    if (search) {
      const q = search.toLowerCase();
      result = result.filter((log) => {
        const actorName = log.user
          ? `${log.user.first_name} ${log.user.last_name}`.toLowerCase()
          : "system/deleted user";
        const moduleType = log.model_type ? log.model_type.toLowerCase() : "";
        return actorName.includes(q) || moduleType.includes(q);
      });
    }

    return result;
  }, [logs, search, actionFilter, dateFilter]);

  // ==========================================
  // LOGIKA PAGINATION
  // ==========================================
  const totalItems = filteredLogs.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  const paginatedLogs = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredLogs.slice(start, start + itemsPerPage);
  }, [filteredLogs, currentPage, itemsPerPage]);

  const showingStart = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const showingEnd = Math.min(currentPage * itemsPerPage, totalItems);

  // Pagination Array Generator
  const getVisiblePages = () => {
    const maxVisible = 5;
    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 3) {
      return [1, 2, 3, 4, "...", totalPages];
    }
    if (currentPage >= totalPages - 2) {
      return [1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }
    return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
  };

  // ==========================================
  // HELPERS FORMATTER
  // ==========================================
  const isEmpty = (obj: any) => !obj || Object.keys(obj).length === 0;

  const formatKey = (key: string) => {
    if (!key) return "";
    return key
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const formatValue = (val: any) => {
    if (val === null || val === undefined || val === "") return "-";
    if (typeof val === "boolean") return val ? "Yes" : "No";
    if (typeof val === "object") return JSON.stringify(val);
    return String(val);
  };

  // Clean class name untuk module type (misal: "App\Models\Product" -> "Product")
  const formatModuleType = (modelString: string) => {
      const parts = modelString.split("\\");
      return parts[parts.length - 1];
  }


  return (
    <div className="relative min-h-[600px] p-6 md:p-8 bg-white border border-gray-100 shadow-sm rounded-2xl animate-fade-in-up font-sans m-8">
      
      {/* HEADER */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">System Audit Trail</h1>
          <p className="text-sm text-gray-500">Monitor all critical data changes in real-time.</p>
        </div>
        <button
          onClick={fetchLogs}
          className="p-2 transition bg-gray-100 rounded-lg hover:bg-gray-200"
          title="Refresh Logs"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>

      {/* FILTERS */}
      <div className="flex flex-col items-center justify-between gap-4 mb-6 md:flex-row">
        <div className="flex flex-wrap items-center w-full gap-3 md:w-auto">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">Show:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="px-3 py-1.5 text-sm font-bold border border-gray-200 rounded-lg outline-none cursor-pointer bg-gray-50 focus:ring-1 focus:ring-gycora"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>

          <div className="hidden w-px h-6 bg-gray-200 md:block"></div>

          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="px-3 py-1.5 text-sm font-bold text-gray-600 border border-gray-200 rounded-lg outline-none cursor-pointer bg-gray-50 focus:ring-1 focus:ring-gycora"
          >
            <option value="All">All Actions</option>
            <option value="created">Created</option>
            <option value="updated">Updated</option>
            <option value="deleted">Deleted</option>
          </select>

          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-3 py-1.5 text-sm font-bold text-gray-600 border border-gray-200 rounded-lg outline-none cursor-pointer bg-gray-50 focus:ring-1 focus:ring-gycora"
          />

          {(actionFilter !== "All" || dateFilter !== "" || search !== "") && (
            <button
              onClick={resetFilters}
              className="text-xs font-bold text-red-500 hover:underline"
            >
              Clear Filter
            </button>
          )}
        </div>

        <div className="w-full md:w-72">
          <div className="relative">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search actor, module..."
              className="w-full py-2 pl-10 pr-4 text-sm transition border border-gray-200 outline-none bg-gray-50 rounded-xl focus:ring-1 focus:ring-gycora"
            />
            <svg className="top-2.5 left-3 absolute w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto border border-gray-100 rounded-xl">
        <table className="w-full text-left border-collapse bg-white/50">
          <thead>
            <tr className="text-xs tracking-widest text-gray-400 uppercase border-b border-gray-100 bg-gray-50/50">
              <th className="p-4 font-bold">Timestamp</th>
              <th className="p-4 font-bold">Actor</th>
              <th className="p-4 font-bold">Action</th>
              <th className="p-4 font-bold">Module</th>
              <th className="p-4 font-bold text-right">Details</th>
            </tr>
          </thead>

          {isLoading ? (
            <tbody>
              {Array.from({ length: Math.min(itemsPerPage, 10) }).map((_, i) => (
                <tr key={i} className="border-b border-gray-50">
                  <td colSpan={5} className="px-4 py-6">
                    <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : paginatedLogs.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan={5} className="py-16 text-sm italic text-center text-gray-400">
                  No audit logs found matching your criteria.
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody className="text-gray-600">
              {paginatedLogs.map((log) => (
                <tr key={log.id} className="transition border-b border-gray-50 hover:bg-gray-50/80">
                  <td className="p-4 text-xs">{new Date(log.created_at).toLocaleString('id-ID')}</td>
                  <td className="p-4 text-sm font-bold text-gray-800">
                    {log.user ? `${log.user.first_name} ${log.user.last_name}` : "System / Auto"}
                    <span className="block text-[10px] font-normal text-gray-400 mt-0.5">
                      {log.user?.usertype ? log.user.usertype.toUpperCase() : "SYSTEM"} | IP: {log.ip_address || "N/A"}
                    </span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest rounded-md ${
                        log.action === "created" ? "bg-emerald-100 text-emerald-700" :
                        log.action === "updated" ? "bg-blue-100 text-blue-700" :
                        log.action === "deleted" ? "bg-red-100 text-red-700" :
                        "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {log.action}
                    </span>
                  </td>
                  <td className="p-4 text-sm font-bold">
                    {formatModuleType(log.model_type)}
                    <span className="ml-1 text-xs font-normal text-gray-400">#{log.model_id}</span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => setSelectedLog(log)}
                      className="text-xs font-bold text-gycora hover:underline"
                    >
                      View Payload
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>

      {/* PAGINATION */}
      {!isLoading && totalItems > 0 && (
        <div className="flex flex-col items-center justify-between gap-4 pt-4 mt-6 border-t border-gray-100 md:flex-row">
          <p className="text-sm text-gray-500">
            Showing <span className="font-bold text-gray-900">{showingStart}</span> to{" "}
            <span className="font-bold text-gray-900">{showingEnd}</span> of{" "}
            <span className="font-bold text-gray-900">{totalItems}</span> entries
          </p>

          {totalPages > 1 && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => p - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 text-xs font-bold tracking-widest text-gray-600 uppercase transition border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Prev
              </button>

              <div className="hidden gap-1 sm:flex">
                {getVisiblePages().map((page, index) => (
                  <button
                    key={index}
                    onClick={() => typeof page === "number" ? setCurrentPage(page) : null}
                    disabled={page === "..."}
                    className={`flex items-center justify-center w-8 h-8 text-xs font-bold transition rounded-lg ${
                      currentPage === page
                        ? "bg-black text-white border-black shadow-sm"
                        : "hover:bg-gray-50 border-gray-200 text-gray-600"
                    } ${page === "..." ? "cursor-default border-transparent hover:bg-transparent" : "border"}`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage((p) => p + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-xs font-bold tracking-widest text-gray-600 uppercase transition border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}

      {/* MODAL DETAIL */}
      {selectedLog && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedLog(null)}
        >
          <div
            className="w-full max-w-4xl p-6 bg-white rounded-2xl shadow-xl max-h-[85vh] flex flex-col animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6 shrink-0">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Data Change Analysis</h3>
                <p className="mt-1 text-xs text-gray-500">
                  Module: <span className="font-bold text-black">{formatModuleType(selectedLog.model_type)} #{selectedLog.model_id}</span> | 
                  Action: <span className="ml-1 font-bold tracking-wider text-black uppercase">{selectedLog.action}</span>
                </p>
              </div>
              <button
                onClick={() => setSelectedLog(null)}
                className="p-2 text-gray-400 transition-colors bg-gray-100 rounded-full hover:text-black hover:bg-gray-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6 pr-2 overflow-y-auto md:grid-cols-2 custom-scrollbar grow">
              
              {/* OLD VALUES */}
              <div className="p-5 border border-red-100 bg-red-50/50 rounded-xl h-fit">
                <h4 className="flex items-center gap-2 pb-3 mb-4 text-xs font-black tracking-widest text-red-800 uppercase border-b border-red-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Previous Data
                </h4>

                {isEmpty(selectedLog.old_values) ? (
                  <div className="py-4 text-sm italic text-center text-red-400">No previous data recorded.</div>
                ) : (
                  <ul className="space-y-4">
                    {Object.entries(selectedLog.old_values!).map(([key, value]) => (
                      <li key={key} className="flex flex-col">
                        <span className="text-[10px] font-bold text-red-800/60 uppercase tracking-widest mb-1">{formatKey(key)}</span>
                        <span className="text-sm font-medium leading-relaxed break-words text-red-950">{formatValue(value)}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* NEW VALUES */}
              <div className="p-5 border border-emerald-100 bg-emerald-50/50 rounded-xl h-fit">
                <h4 className="flex items-center gap-2 pb-3 mb-4 text-xs font-black tracking-widest uppercase border-b text-emerald-800 border-emerald-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Updated Data
                </h4>

                {isEmpty(selectedLog.new_values) ? (
                  <div className="py-4 text-sm italic text-center text-emerald-400">No new data recorded.</div>
                ) : (
                  <ul className="space-y-4">
                    {Object.entries(selectedLog.new_values!).map(([key, value]) => (
                      <li key={key} className="flex flex-col">
                        <span className="text-[10px] font-bold text-emerald-800/60 uppercase tracking-widest mb-1">{formatKey(key)}</span>
                        <span className="text-sm font-medium leading-relaxed break-words text-emerald-950">{formatValue(value)}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}