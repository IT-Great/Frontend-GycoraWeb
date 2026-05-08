/* eslint-disable @typescript-eslint/no-explicit-any */
// // import { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom"; 
// // import Swal from "sweetalert2";
// // import { BASE_URL } from "../../config/api";

// // export default function AddProduct() {
// //   const navigate = useNavigate(); 
// //   const [categories, setCategories] = useState([]);
// //   const [isSubmitting, setIsSubmitting] = useState(false);
// //   const [formData, setFormData] = useState({
// //     category_id: "",
// //     sku: "",
// //     name: "",
// //     price: "",
// //     stock: "0",
// //     description: "",
// //     benefits: "",
// //   });

// //   useEffect(() => {
// //     fetch(`${BASE_URL}/api/categories`)
// //       .then((res) => res.json())
// //       .then((data) => setCategories(data.data ? data.data : data || []))
// //       .catch((err) => console.error("Gagal mengambil kategori:", err));
// //   }, []);

// //   const [imageFile, setImageFile] = useState<File | null>(null);

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setIsSubmitting(true);

// //     const data = new FormData();
// //     data.append("category_id", formData.category_id);
// //     data.append("sku", formData.sku);
// //     data.append("name", formData.name);
// //     data.append("price", formData.price);
// //     data.append("stock", formData.stock);
// //     if (formData.description) data.append("description", formData.description);
// //     if (formData.benefits) data.append("benefits", formData.benefits);
// //     if (imageFile) data.append("image", imageFile);

// //     try {
// //       const token = localStorage.getItem("admin_token");

// //       const res = await fetch(`${BASE_URL}/api/products`, {
// //         method: "POST",
// //         headers: {
// //           "Accept": "application/json",
// //           "Authorization": `Bearer ${token}`,
// //         },
// //         body: data, 
// //       });

// //       if (res.ok) {
// //         Swal.fire("Berhasil!", "Produk ditambahkan.", "success");
// //         navigate("/admin/products");
// //       } else {
// //         const errorData = await res.json();
// //         console.error("Validasi gagal:", errorData);
// //         Swal.fire("Gagal!", errorData.message || "Pastikan semua data terisi dengan benar.", "error");
// //       }
// //     } catch (error) {
// //       console.error("Gagal submit produk:", error);
// //       Swal.fire("Error!", "Gagal terhubung ke server.", "error");
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };

// //   return (
// //     <div className="max-w-4xl p-8 mx-auto font-sans">
// //       <div className="p-8 bg-white border border-gray-100 shadow-sm rounded-xl">
// //         <div className="flex items-center gap-4 mb-8">
// //           <button
// //             onClick={() => navigate("/admin/products")} 
// //             className="p-2 text-gray-400 transition rounded-lg hover:text-gray-600 hover:bg-gray-50"
// //             title="Kembali"
// //           >
// //             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
// //             </svg>
// //           </button>
// //           <div>
// //             <h1 className="text-2xl font-bold text-gray-900">Tambah Produk Baru</h1>
// //             <p className="mt-1 text-sm text-gray-500">Tambahkan item baru ke dalam katalog Gycora.</p>
// //           </div>
// //         </div>

// //         <form onSubmit={handleSubmit} className="space-y-6">
// //           <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
// //             <div>
// //               <label className="block mb-2 text-sm font-semibold text-gray-700">Kategori Produk</label>
// //               <select required value={formData.category_id} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gycora focus:ring-1 focus:ring-gycora transition-all" onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}>
// //                 <option value="" disabled>Pilih Kategori...</option>
// //                 {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
// //                 {categories.map((c: any) => (
// //                   <option key={c.id} value={c.id}>{c.name}</option>
// //                 ))}
// //               </select>
// //             </div>

// //             <div>
// //               <label className="block mb-2 text-sm font-semibold text-gray-700">SKU (Stock Keeping Unit)</label>
// //               <input type="text" required placeholder="Misal: SHP-01" value={formData.sku} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gycora focus:ring-1 focus:ring-gycora transition-all uppercase" onChange={(e) => setFormData({ ...formData, sku: e.target.value.toUpperCase() })} />
// //             </div>
// //           </div>

// //           <div>
// //             <label className="block mb-2 text-sm font-semibold text-gray-700">Nama Produk</label>
// //             <input type="text" required placeholder="Misal: Gycora Revitalizing Shampoo" value={formData.name} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gycora focus:ring-1 focus:ring-gycora transition-all" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
// //           </div>

// //           <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
// //             <div>
// //               <label className="block mb-2 text-sm font-semibold text-gray-700">Harga (Rp)</label>
// //               <div className="relative">
// //                 <span className="absolute left-3 top-2.5 text-gray-500">Rp</span>
// //                 <input type="number" required placeholder="0" value={formData.price} className="w-full pl-10 p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gycora focus:ring-1 focus:ring-gycora transition-all" onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
// //               </div>
// //             </div>

// //             <div>
// //               <label className="block mb-2 text-sm font-semibold text-gray-700">Stok Awal</label>
// //               <input type="number" required value={formData.stock} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gycora focus:ring-1 focus:ring-gycora transition-all" onChange={(e) => setFormData({ ...formData, stock: e.target.value })} />
// //             </div>
// //           </div>

// //           <div className="pt-4 space-y-6 border-t border-gray-100">
// //             <div>
// //               <label className="block mb-2 text-sm font-semibold text-gray-700">Foto Produk</label>
// //               <input type="file" accept="image/*" className="w-full p-2 border border-gray-200 rounded-lg outline-none bg-gray-50" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
// //             </div>
// //             <div>
// //               <label className="block mb-2 text-sm font-semibold text-gray-700">Deskripsi Produk (Opsional)</label>
// //               <textarea rows={4} value={formData.description} className="w-full p-3 transition-all border border-gray-200 rounded-lg outline-none resize-none bg-gray-50 focus:border-gycora focus:ring-1 focus:ring-gycora" onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Jelaskan detail produk ini..." />
// //             </div>
// //             <div>
// //               <label className="block mb-2 text-sm font-semibold text-gray-700">Manfaat / Benefits (Opsional)</label>
// //               <textarea rows={3} value={formData.benefits} className="w-full p-3 transition-all border border-gray-200 rounded-lg outline-none resize-none bg-gray-50 focus:border-gycora focus:ring-1 focus:ring-gycora" onChange={(e) => setFormData({ ...formData, benefits: e.target.value })} placeholder="Misal: Mencegah kerontokan, Melembutkan rambut..." />
// //             </div>
// //           </div>

// //           <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
// //             <button type="button" onClick={() => navigate("/admin/products")} className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
// //               Batal
// //             </button>
// //             <button type="submit" disabled={isSubmitting} className="px-6 py-2.5 text-sm font-medium text-white bg-gycora rounded-lg hover:bg-gycora-dark shadow-sm transition-colors disabled:opacity-50">
// //               {isSubmitting ? "Menyimpan..." : "Simpan Produk"}
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom"; 
// import Swal from "sweetalert2";
// import { BASE_URL } from "../../config/api";

// export default function AddProduct() {
//   const navigate = useNavigate(); 
//   const [categories, setCategories] = useState([]);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [formData, setFormData] = useState({
//     category_id: "",
//     sku: "",
//     name: "",
//     price: "",
//     stock: "0",
//     description: "",
//     benefits: "",
//     color: "",          // <-- BARU (String dipisahkan koma)
//     variant_video: "",  // <-- BARU
//     status: "active",   // <-- BARU
//   });

//   useEffect(() => {
//     fetch(`${BASE_URL}/api/categories`)
//       .then((res) => res.json())
//       .then((data) => setCategories(data.data ? data.data : data || []))
//       .catch((err) => console.error("Gagal mengambil kategori:", err));
//   }, []);

//   const [imageFile, setImageFile] = useState<File | null>(null);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       const token = localStorage.getItem("admin_token");
//       let uploadedImageUrl = null;

//       // 1. JIKA ADA GAMBAR: Upload langsung ke Clever Cloud S3
//       if (imageFile) {
//         Swal.fire({ title: "Mengunggah Gambar...", allowOutsideClick: false, didOpen: () => Swal.showLoading() });
        
//         const ext = imageFile.name.split('.').pop();
//         const contentType = imageFile.type;

//         // // A. Minta izin & URL S3 sementara ke Backend
//         // const presignedRes = await fetch(`${BASE_URL}/api/products/presigned-url`, {
//         //   method: "POST",
//         //   headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
//         //   body: JSON.stringify({ extension: ext, content_type: contentType })
//         // });
        
//         // if (!presignedRes.ok) throw new Error("Gagal mengambil Pre-signed URL");
//         // const { upload_url, file_url } = await presignedRes.json();

//         // // B. Upload file langsung ke URL Clever Cloud S3
//         // const s3UploadRes = await fetch(upload_url, {
//         //   method: "PUT",
//         //   body: imageFile,
//         //   headers: { "Content-Type": contentType } // Wajib sama persis dengan yang direquest
//         // });

//         const presignedRes = await fetch(`${BASE_URL}/api/products/presigned-url`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
//           body: JSON.stringify({ extension: ext, content_type: contentType })
//         });
        
//         if (!presignedRes.ok) throw new Error("Gagal mengambil Pre-signed URL");
        
//         // Tangkap upload_headers dari backend Laravel
//         const { upload_url, upload_headers, file_url } = await presignedRes.json();

//         // Gunakan upload_url sebagai URL, dan gabungkan upload_headers untuk keamanan S3
//         const s3UploadRes = await fetch(upload_url, {
//           method: "PUT",
//           body: imageFile,
//           headers: {
//             ...upload_headers, // Gunakan header otentikasi spesifik yang diminta oleh S3
//             "Content-Type": contentType,
//             "x-amz-acl": "public-read" // <-- TAMBAHKAN BARIS INI JUGA!
//           }
//         });

//         if (!s3UploadRes.ok) throw new Error("Gagal mengunggah ke S3");
//         uploadedImageUrl = file_url; // Simpan URL publiknya
//       }

//       Swal.fire({ title: "Menyimpan Data...", allowOutsideClick: false, didOpen: () => Swal.showLoading() });

//       // Format color menjadi Array untuk Laravel
//       const colorArray = formData.color 
//             ? formData.color.split(",").map(c => c.trim()).filter(c => c) 
//             : null;

//       // 2. SIMPAN DATA KE LARAVEL (Gunakan format JSON yang lebih cepat dan bersih)
//       const payload = {
//         ...formData,
//         color: colorArray,
//         image_url: uploadedImageUrl // Masukkan URL S3 ke database
//       };

//       const res = await fetch(`${BASE_URL}/api/products`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
//         body: JSON.stringify(payload), 
//       });

//       if (res.ok) {
//         Swal.fire("Berhasil!", "Produk ditambahkan.", "success");
//         navigate("/admin/products");
//       } else {
//         const errorData = await res.json();
//         Swal.fire("Gagal!", errorData.message || "Pastikan semua data terisi dengan benar.", "error");
//       }
//     } catch (error) {
//       console.error("Gagal submit produk:", error);
//       Swal.fire("Error!", "Terjadi kesalahan saat mengunggah atau menyimpan.", "error");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="max-w-4xl p-8 mx-auto font-sans">
//       <div className="p-8 bg-white border border-gray-100 shadow-sm rounded-xl">
//         <div className="flex items-center gap-4 mb-8">
//           <button
//             onClick={() => navigate("/admin/products")} 
//             className="p-2 text-gray-400 transition rounded-lg hover:text-gray-600 hover:bg-gray-50"
//             title="Kembali"
//           >
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//             </svg>
//           </button>
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900">Tambah Produk Baru</h1>
//             <p className="mt-1 text-sm text-gray-500">Tambahkan item baru ke dalam katalog Gycora.</p>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//             <div>
//               <label className="block mb-2 text-sm font-semibold text-gray-700">Kategori Produk</label>
//               <select required value={formData.category_id} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gycora focus:ring-1 focus:ring-gycora transition-all" onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}>
//                 <option value="" disabled>Pilih Kategori...</option>
//                 {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
//                 {categories.map((c: any) => (
//                   <option key={c.id} value={c.id}>{c.name}</option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block mb-2 text-sm font-semibold text-gray-700">SKU (Stock Keeping Unit)</label>
//               <input type="text" required placeholder="Misal: SHP-01" value={formData.sku} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gycora focus:ring-1 focus:ring-gycora transition-all uppercase" onChange={(e) => setFormData({ ...formData, sku: e.target.value.toUpperCase() })} />
//             </div>
//           </div>

//           <div>
//             <label className="block mb-2 text-sm font-semibold text-gray-700">Nama Produk</label>
//             <input type="text" required placeholder="Misal: Gycora Revitalizing Shampoo" value={formData.name} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gycora focus:ring-1 focus:ring-gycora transition-all" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
//           </div>

//           <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//             <div>
//               <label className="block mb-2 text-sm font-semibold text-gray-700">Harga (Rp)</label>
//               <div className="relative">
//                 <span className="absolute left-3 top-2.5 text-gray-500">Rp</span>
//                 <input type="number" required placeholder="0" value={formData.price} className="w-full pl-10 p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gycora focus:ring-1 focus:ring-gycora transition-all" onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
//               </div>
//             </div>

//             <div>
//               <label className="block mb-2 text-sm font-semibold text-gray-700">Stok Awal</label>
//               <input type="number" required value={formData.stock} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gycora focus:ring-1 focus:ring-gycora transition-all" onChange={(e) => setFormData({ ...formData, stock: e.target.value })} />
//             </div>
//           </div>

//           <div className="pt-4 space-y-6 border-t border-gray-100">
//             <div>
//               <label className="block mb-2 text-sm font-semibold text-gray-700">Foto Produk</label>
//               <input type="file" accept="image/*" className="w-full p-2 border border-gray-200 rounded-lg outline-none bg-gray-50" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
//             </div>
//             <div>
//               <label className="block mb-2 text-sm font-semibold text-gray-700">Deskripsi Produk (Opsional)</label>
//               <textarea rows={4} value={formData.description} className="w-full p-3 transition-all border border-gray-200 rounded-lg outline-none resize-none bg-gray-50 focus:border-gycora focus:ring-1 focus:ring-gycora" onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Jelaskan detail produk ini..." />
//             </div>
//             <div>
//               <label className="block mb-2 text-sm font-semibold text-gray-700">Manfaat / Benefits (Opsional)</label>
//               <textarea rows={3} value={formData.benefits} className="w-full p-3 transition-all border border-gray-200 rounded-lg outline-none resize-none bg-gray-50 focus:border-gycora focus:ring-1 focus:ring-gycora" onChange={(e) => setFormData({ ...formData, benefits: e.target.value })} placeholder="Misal: Mencegah kerontokan, Melembutkan rambut..." />
//             </div>
//           </div>

//           <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
//             <button type="button" onClick={() => navigate("/admin/products")} className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
//               Batal
//             </button>
//             <button type="submit" disabled={isSubmitting} className="px-6 py-2.5 text-sm font-medium text-white bg-gycora rounded-lg hover:bg-gycora-dark shadow-sm transition-colors disabled:opacity-50">
//               {isSubmitting ? "Menyimpan..." : "Simpan Produk"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom"; 
// import Swal from "sweetalert2";
// import { BASE_URL } from "../../config/api";

// export default function AddProduct() {
//   const navigate = useNavigate(); 
//   const [categories, setCategories] = useState([]);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [formData, setFormData] = useState({
//     category_id: "",
//     sku: "",
//     name: "",
//     price: "",
//     stock: "0",
//     description: "",
//     benefits: "",
//     color: "",          
//     variant_video: "",  
//     status: "active",   
//   });

//   useEffect(() => {
//     fetch(`${BASE_URL}/api/categories`)
//       .then((res) => res.json())
//       .then((data) => setCategories(data.data ? data.data : data || []))
//       .catch((err) => console.error("Gagal mengambil kategori:", err));
//   }, []);

//   const [imageFile, setImageFile] = useState<File | null>(null);
  
//   // --- STATE VARIAN GAMBAR (Maks 5) ---
//   const [variantFiles, setVariantFiles] = useState<File[]>([]);
//   const [variantPreviews, setVariantPreviews] = useState<string[]>([]);

//   const handleVariantChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = Array.from(e.target.files || []);
//     if (variantFiles.length + files.length > 5) {
//       Swal.fire("Batas Tercapai", "Maksimal hanya 5 gambar varian yang diperbolehkan.", "warning");
//       return;
//     }
//     const newFiles = [...variantFiles, ...files];
//     setVariantFiles(newFiles);
//     setVariantPreviews(newFiles.map(file => URL.createObjectURL(file)));
//   };

//   const removeVariant = (index: number) => {
//     const newFiles = [...variantFiles];
//     newFiles.splice(index, 1);
//     setVariantFiles(newFiles);
//     setVariantPreviews(newFiles.map(file => URL.createObjectURL(file)));
//   };

//   // --- FUNGSI UPLOAD S3 BERSAMA ---
//   const uploadToS3 = async (file: File, token: string) => {
//     const ext = file.name.split('.').pop();
//     const contentType = file.type;

//     const presignedRes = await fetch(`${BASE_URL}/api/products/presigned-url`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
//       body: JSON.stringify({ extension: ext, content_type: contentType })
//     });
    
//     if (!presignedRes.ok) throw new Error("Gagal mengambil Pre-signed URL");
//     const { upload_url, upload_headers, file_url } = await presignedRes.json();

//     const s3UploadRes = await fetch(upload_url, {
//       method: "PUT",
//       body: file,
//       headers: {
//         ...upload_headers, 
//         "Content-Type": contentType,
//         "x-amz-acl": "public-read" 
//       }
//     });

//     if (!s3UploadRes.ok) throw new Error("Gagal mengunggah ke S3");
//     return file_url; // Kembalikan URL Publik S3
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       const token = localStorage.getItem("admin_token");
//       if (!token) throw new Error("Token tidak ditemukan");

//       Swal.fire({ title: "Mengunggah Gambar...", text: "Mohon tunggu sebentar.", allowOutsideClick: false, didOpen: () => Swal.showLoading() });
      
//       let uploadedImageUrl = null;
//       let uploadedVariantUrls: string[] = [];

//       // 1. Upload Gambar Utama
//       if (imageFile) {
//         uploadedImageUrl = await uploadToS3(imageFile, token);
//       }

//       // 2. Upload Gambar Varian (Paralel / Bersamaan agar cepat)
//       if (variantFiles.length > 0) {
//         uploadedVariantUrls = await Promise.all(variantFiles.map(file => uploadToS3(file, token)));
//       }

//       Swal.fire({ title: "Menyimpan Data...", allowOutsideClick: false, didOpen: () => Swal.showLoading() });

//       const colorArray = formData.color ? formData.color.split(",").map(c => c.trim()).filter(c => c) : null;

//       const payload = {
//         ...formData,
//         color: colorArray,
//         image_url: uploadedImageUrl,
//         variant_images: uploadedVariantUrls.length > 0 ? uploadedVariantUrls : null, // Kirim array URL Varian
//       };

//       const res = await fetch(`${BASE_URL}/api/products`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
//         body: JSON.stringify(payload), 
//       });

//       if (res.ok) {
//         Swal.fire("Berhasil!", "Produk ditambahkan.", "success");
//         navigate("/admin/products");
//       } else {
//         const errorData = await res.json();
//         Swal.fire("Gagal!", errorData.message || "Pastikan semua data terisi dengan benar.", "error");
//       }
//     } catch (error) {
//       console.error("Gagal submit produk:", error);
//       Swal.fire("Error!", "Terjadi kesalahan saat mengunggah atau menyimpan.", "error");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="max-w-4xl p-8 mx-auto font-sans">
//       <div className="p-8 bg-white border border-gray-100 shadow-sm rounded-xl">
//         <div className="flex items-center gap-4 mb-8">
//           <button
//             onClick={() => navigate("/admin/products")} 
//             className="p-2 text-gray-400 transition rounded-lg hover:text-gray-600 hover:bg-gray-50"
//             title="Kembali"
//           >
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//             </svg>
//           </button>
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900">Tambah Produk Baru</h1>
//             <p className="mt-1 text-sm text-gray-500">Tambahkan item baru beserta variannya.</p>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* INFORMASI DASAR */}
//           <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//             <div>
//               <label className="block mb-2 text-sm font-semibold text-gray-700">Kategori Produk</label>
//               <select required value={formData.category_id} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gycora focus:ring-1 focus:ring-gycora transition-all" onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}>
//                 <option value="" disabled>Pilih Kategori...</option>
//                 {categories.map((c: any) => (
//                   <option key={c.id} value={c.id}>{c.name}</option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className="block mb-2 text-sm font-semibold text-gray-700">SKU</label>
//               <input type="text" required placeholder="Misal: SHP-01" value={formData.sku} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gycora focus:ring-1 focus:ring-gycora transition-all uppercase" onChange={(e) => setFormData({ ...formData, sku: e.target.value.toUpperCase() })} />
//             </div>
//           </div>

//           <div>
//             <label className="block mb-2 text-sm font-semibold text-gray-700">Nama Produk</label>
//             <input type="text" required placeholder="Misal: Gycora Shampoo" value={formData.name} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gycora focus:ring-1 focus:ring-gycora transition-all" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
//           </div>

//           <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//             <div>
//               <label className="block mb-2 text-sm font-semibold text-gray-700">Harga (Rp)</label>
//               <div className="relative">
//                 <span className="absolute left-3 top-2.5 text-gray-500">Rp</span>
//                 <input type="number" required placeholder="0" value={formData.price} className="w-full pl-10 p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gycora focus:ring-1 focus:ring-gycora transition-all" onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
//               </div>
//             </div>
//             <div>
//               <label className="block mb-2 text-sm font-semibold text-gray-700">Stok Awal</label>
//               <input type="number" required value={formData.stock} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gycora focus:ring-1 focus:ring-gycora transition-all" onChange={(e) => setFormData({ ...formData, stock: e.target.value })} />
//             </div>
//           </div>

//           {/* MEDIA (GAMBAR UTAMA & VARIAN) */}
//           <div className="pt-6 space-y-6 border-t border-gray-100">
//             <h2 className="text-lg font-bold text-gray-900">Media Produk</h2>
            
//             <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//               <div>
//                 <label className="block mb-2 text-sm font-semibold text-gray-700">Foto Utama (Wajib)</label>
//                 <input type="file" accept="image/*" required className="w-full p-2 text-sm border border-gray-200 rounded-lg outline-none bg-gray-50" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
//               </div>
//               <div>
//                 <label className="block mb-2 text-sm font-semibold text-gray-700">Video Demo (URL Youtube/S3) - Opsional</label>
//                 <input type="text" placeholder="https://..." value={formData.variant_video} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gycora focus:ring-1 focus:ring-gycora transition-all" onChange={(e) => setFormData({ ...formData, variant_video: e.target.value })} />
//               </div>
//             </div>

//             {/* VARIANT IMAGES SECTION */}
//             <div>
//               <label className="flex justify-between block mb-2 text-sm font-semibold text-gray-700">
//                 <span>Gambar Varian (Opsional, Maks 5)</span>
//                 <span className="text-xs text-gray-400">{variantFiles.length} / 5</span>
//               </label>
              
//               <div className="flex flex-wrap gap-4 mt-2">
//                 {/* Tombol Tambah Varian */}
//                 {variantFiles.length < 5 && (
//                   <label className="flex items-center justify-center w-24 h-24 text-gray-400 transition bg-white border-2 border-gray-200 border-dashed cursor-pointer rounded-xl hover:bg-gray-50 hover:text-gycora hover:border-gycora shrink-0">
//                     <input type="file" accept="image/*" multiple onChange={handleVariantChange} className="hidden" />
//                     <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
//                   </label>
//                 )}

//                 {/* Preview Varian */}
//                 {variantPreviews.map((src, idx) => (
//                   <div key={idx} className="relative w-24 h-24 overflow-hidden border border-gray-200 rounded-xl shrink-0 group">
//                     <img src={src} alt="Variant" className="object-cover w-full h-full" />
//                     <button type="button" onClick={() => removeVariant(idx)} className="absolute inset-0 flex items-center justify-center w-full h-full text-white transition-opacity opacity-0 bg-black/50 group-hover:opacity-100">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           <div className="pt-6 space-y-6 border-t border-gray-100">
//             <h2 className="text-lg font-bold text-gray-900">Detail Spesifik</h2>
//             <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//               <div>
//                 <label className="block mb-2 text-sm font-semibold text-gray-700">Varian Warna (Pisahkan koma)</label>
//                 <input type="text" placeholder="Misal: Merah, Putih, Hitam" value={formData.color} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gycora focus:ring-1 focus:ring-gycora transition-all" onChange={(e) => setFormData({ ...formData, color: e.target.value })} />
//               </div>
//               <div>
//                 <label className="block mb-2 text-sm font-semibold text-gray-700">Status Awal</label>
//                 <select required value={formData.status} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gycora focus:ring-1 focus:ring-gycora transition-all" onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
//                   <option value="active">Aktif (Tampil di Katalog)</option>
//                   <option value="inactive">Nonaktif (Sembunyikan)</option>
//                 </select>
//               </div>
//             </div>
            
//             <div>
//               <label className="block mb-2 text-sm font-semibold text-gray-700">Deskripsi (Opsional)</label>
//               <textarea rows={4} value={formData.description} className="w-full p-3 transition-all border border-gray-200 rounded-lg outline-none resize-none bg-gray-50 focus:border-gycora focus:ring-1 focus:ring-gycora" onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
//             </div>
//             <div>
//               <label className="block mb-2 text-sm font-semibold text-gray-700">Manfaat / Benefits (Opsional)</label>
//               <textarea rows={3} value={formData.benefits} className="w-full p-3 transition-all border border-gray-200 rounded-lg outline-none resize-none bg-gray-50 focus:border-gycora focus:ring-1 focus:ring-gycora" onChange={(e) => setFormData({ ...formData, benefits: e.target.value })} />
//             </div>
//           </div>

//           <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
//             <button type="button" onClick={() => navigate("/admin/products")} className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
//               Batal
//             </button>
//             <button type="submit" disabled={isSubmitting} className="px-6 py-2.5 text-sm font-medium text-white bg-gycora rounded-lg hover:bg-gycora-dark shadow-sm transition-colors disabled:opacity-50">
//               {isSubmitting ? "Menyimpan..." : "Simpan Produk"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom"; 
// import Swal from "sweetalert2";
// import { BASE_URL } from "../../config/api";

// export default function AddProduct() {
//   const navigate = useNavigate(); 
//   const [categories, setCategories] = useState([]);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [formData, setFormData] = useState({
//     category_id: "",
//     sku: "",
//     name: "",
//     price: "",
//     stock: "0",
//     description: "",
//     benefits: "",
//     status: "active",   
//   });

//   // --- STATE MEDIA & VARIAN BARU ---
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [videoFile, setVideoFile] = useState<File | null>(null);
//   const [videoPreview, setVideoPreview] = useState<string | null>(null);
  
//   const [variantFiles, setVariantFiles] = useState<File[]>([]);
//   const [variantPreviews, setVariantPreviews] = useState<string[]>([]);

//   // State untuk Color Picker (Array of Hex Codes)
//   const [colors, setColors] = useState<string[]>([]);

//   useEffect(() => {
//     fetch(`${BASE_URL}/api/categories`)
//       .then((res) => res.json())
//       .then((data) => setCategories(data.data ? data.data : data || []))
//       .catch((err) => console.error("Gagal mengambil kategori:", err));
//   }, []);

//   // --- HANDLERS COLOR PICKER ---
//   const addColor = () => setColors([...colors, "#000000"]);
//   const updateColor = (index: number, value: string) => {
//     const newColors = [...colors];
//     newColors[index] = value;
//     setColors(newColors);
//   };
//   const removeColor = (index: number) => {
//     const newColors = [...colors];
//     newColors.splice(index, 1);
//     setColors(newColors);
//   };

//   // --- HANDLERS MEDIA ---
//   const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       if (file.size > 50 * 1024 * 1024) { // Batas 50MB misalnya
//         Swal.fire("File Terlalu Besar", "Ukuran video maksimal 50MB", "warning");
//         return;
//       }
//       setVideoFile(file);
//       setVideoPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleVariantChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = Array.from(e.target.files || []);
//     if (variantFiles.length + files.length > 5) {
//       Swal.fire("Batas Tercapai", "Maksimal hanya 5 gambar varian yang diperbolehkan.", "warning");
//       return;
//     }
//     const newFiles = [...variantFiles, ...files];
//     setVariantFiles(newFiles);
//     setVariantPreviews(newFiles.map(file => URL.createObjectURL(file)));
//   };

//   const removeVariant = (index: number) => {
//     const newFiles = [...variantFiles];
//     newFiles.splice(index, 1);
//     setVariantFiles(newFiles);
//     setVariantPreviews(newFiles.map(file => URL.createObjectURL(file)));
//   };

//   // --- FUNGSI UPLOAD S3 BERSAMA ---
//   const uploadToS3 = async (file: File, token: string) => {
//     const ext = file.name.split('.').pop();
//     const contentType = file.type;

//     const presignedRes = await fetch(`${BASE_URL}/api/products/presigned-url`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
//       body: JSON.stringify({ extension: ext, content_type: contentType })
//     });
    
//     if (!presignedRes.ok) throw new Error("Gagal mengambil Pre-signed URL");
//     const { upload_url, upload_headers, file_url } = await presignedRes.json();

//     const s3UploadRes = await fetch(upload_url, {
//       method: "PUT",
//       body: file,
//       headers: { ...upload_headers, "Content-Type": contentType, "x-amz-acl": "public-read" }
//     });

//     if (!s3UploadRes.ok) throw new Error("Gagal mengunggah ke S3");
//     return file_url;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       const token = localStorage.getItem("admin_token");
//       if (!token) throw new Error("Token tidak ditemukan");

//       Swal.fire({ title: "Mengunggah Media...", text: "Mohon tunggu sebentar.", allowOutsideClick: false, didOpen: () => Swal.showLoading() });
      
//       let uploadedImageUrl = null;
//       let uploadedVideoUrl = null;
//       let uploadedVariantUrls: string[] = [];

//       // 1. Upload Gambar Utama
//       if (imageFile) uploadedImageUrl = await uploadToS3(imageFile, token);
      
//       // 2. Upload Video (Jika Ada)
//       if (videoFile) uploadedVideoUrl = await uploadToS3(videoFile, token);

//       // 3. Upload Gambar Varian (Paralel)
//       if (variantFiles.length > 0) {
//         uploadedVariantUrls = await Promise.all(variantFiles.map(file => uploadToS3(file, token)));
//       }

//       Swal.fire({ title: "Menyimpan Data...", allowOutsideClick: false, didOpen: () => Swal.showLoading() });

//       const payload = {
//         ...formData,
//         color: colors.length > 0 ? colors : null,
//         image_url: uploadedImageUrl,
//         variant_video: uploadedVideoUrl,
//         variant_images: uploadedVariantUrls.length > 0 ? uploadedVariantUrls : null,
//       };

//       const res = await fetch(`${BASE_URL}/api/products`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
//         body: JSON.stringify(payload), 
//       });

//       if (res.ok) {
//         Swal.fire("Berhasil!", "Produk ditambahkan.", "success");
//         navigate("/admin/products");
//       } else {
//         const errorData = await res.json();
//         Swal.fire("Gagal!", errorData.message || "Pastikan semua data terisi dengan benar.", "error");
//       }
//     } catch (error) {
//       console.error("Gagal submit produk:", error);
//       Swal.fire("Error!", "Terjadi kesalahan saat mengunggah atau menyimpan.", "error");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="max-w-4xl p-8 mx-auto font-sans">
//       <div className="p-8 bg-white border border-gray-100 shadow-sm rounded-xl">
//         <div className="flex items-center gap-4 mb-8">
//           <button
//             onClick={() => navigate("/admin/products")} 
//             className="p-2 text-gray-400 transition rounded-lg hover:text-gray-600 hover:bg-gray-50"
//             title="Kembali"
//           >
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
//           </button>
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900">Tambah Produk Baru</h1>
//             <p className="mt-1 text-sm text-gray-500">Tambahkan item baru beserta varian dan video demo.</p>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* INFORMASI DASAR */}
//           <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//             <div>
//               <label className="block mb-2 text-sm font-semibold text-gray-700">Kategori Produk</label>
//               <select required value={formData.category_id} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gycora focus:ring-1 focus:ring-gycora transition-all" onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}>
//                 <option value="" disabled>Pilih Kategori...</option>
//                 {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
//                 {categories.map((c: any) => (
//                   <option key={c.id} value={c.id}>{c.name}</option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className="block mb-2 text-sm font-semibold text-gray-700">SKU</label>
//               <input type="text" required placeholder="Misal: SHP-01" value={formData.sku} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gycora focus:ring-1 focus:ring-gycora transition-all uppercase" onChange={(e) => setFormData({ ...formData, sku: e.target.value.toUpperCase() })} />
//             </div>
//           </div>

//           <div>
//             <label className="block mb-2 text-sm font-semibold text-gray-700">Nama Produk</label>
//             <input type="text" required placeholder="Misal: Gycora Shampoo" value={formData.name} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gycora focus:ring-1 focus:ring-gycora transition-all" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
//           </div>

//           <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//             <div>
//               <label className="block mb-2 text-sm font-semibold text-gray-700">Harga (Rp)</label>
//               <div className="relative">
//                 <span className="absolute left-3 top-2.5 text-gray-500">Rp</span>
//                 <input type="number" required placeholder="0" value={formData.price} className="w-full pl-10 p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gycora focus:ring-1 focus:ring-gycora transition-all" onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
//               </div>
//             </div>
//             <div>
//               <label className="block mb-2 text-sm font-semibold text-gray-700">Stok Awal</label>
//               <input type="number" required value={formData.stock} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gycora focus:ring-1 focus:ring-gycora transition-all" onChange={(e) => setFormData({ ...formData, stock: e.target.value })} />
//             </div>
//           </div>

//           {/* MEDIA (GAMBAR UTAMA, VIDEO & VARIAN) */}
//           <div className="pt-6 space-y-6 border-t border-gray-100">
//             <h2 className="text-lg font-bold text-gray-900">Media Produk</h2>
            
//             <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//               <div>
//                 <label className="block mb-2 text-sm font-semibold text-gray-700">Foto Utama (Wajib)</label>
//                 <input type="file" accept="image/*" required className="w-full p-2 text-sm border border-gray-200 rounded-lg outline-none bg-gray-50" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
//               </div>
//               <div>
//                 <label className="flex justify-between block mb-2 text-sm font-semibold text-gray-700">
//                   <span>Video Demo (Opsional)</span>
//                   {videoFile && <button type="button" onClick={() => {setVideoFile(null); setVideoPreview(null);}} className="text-xs text-red-500 hover:underline">Hapus</button>}
//                 </label>
//                 <input type="file" accept="video/mp4,video/webm,video/quicktime" className="w-full p-2 text-sm border border-gray-200 rounded-lg outline-none bg-gray-50" onChange={handleVideoChange} />
//                 {videoPreview && (
//                   <video src={videoPreview} controls className="object-contain w-full h-32 mt-2 bg-black rounded-lg" />
//                 )}
//               </div>
//             </div>

//             {/* VARIANT IMAGES SECTION */}
//             <div>
//               <label className="flex justify-between block mb-2 text-sm font-semibold text-gray-700">
//                 <span>Gambar Varian (Opsional, Maks 5)</span>
//                 <span className="text-xs text-gray-400">{variantFiles.length} / 5</span>
//               </label>
              
//               <div className="flex flex-wrap gap-4 mt-2">
//                 {variantFiles.length < 5 && (
//                   <label className="flex items-center justify-center w-24 h-24 text-gray-400 transition bg-white border-2 border-gray-200 border-dashed cursor-pointer rounded-xl hover:bg-gray-50 hover:text-gycora hover:border-gycora shrink-0">
//                     <input type="file" accept="image/*" multiple onChange={handleVariantChange} className="hidden" />
//                     <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
//                   </label>
//                 )}

//                 {variantPreviews.map((src, idx) => (
//                   <div key={idx} className="relative w-24 h-24 overflow-hidden border border-gray-200 rounded-xl shrink-0 group">
//                     <img src={src} alt="Variant" className="object-cover w-full h-full" />
//                     <button type="button" onClick={() => removeVariant(idx)} className="absolute inset-0 flex items-center justify-center w-full h-full text-white transition-opacity opacity-0 bg-black/50 group-hover:opacity-100">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           <div className="pt-6 space-y-6 border-t border-gray-100">
//             <h2 className="text-lg font-bold text-gray-900">Detail Spesifik</h2>
//             <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              
//               {/* VARIAN WARNA (COLOR PICKER) */}
//               <div>
//                 <label className="flex justify-between block mb-2 text-sm font-semibold text-gray-700">
//                   <span>Varian Warna (Opsional)</span>
//                   <button type="button" onClick={addColor} className="text-xs font-bold text-gycora hover:underline">+ Tambah Warna</button>
//                 </label>
//                 {colors.length === 0 ? (
//                   <p className="text-xs italic text-gray-400">Tidak ada varian warna. Klik tambah untuk menambahkan.</p>
//                 ) : (
//                   <div className="flex flex-wrap gap-2 p-3 border border-gray-200 bg-gray-50 rounded-xl">
//                     {colors.map((c, i) => (
//                       <div key={i} className="flex items-center gap-1 p-1 bg-white border border-gray-200 rounded-lg shadow-sm">
//                         <input type="color" value={c} onChange={(e) => updateColor(i, e.target.value)} className="w-6 h-6 p-0 border-none rounded cursor-pointer" />
//                         <button type="button" onClick={() => removeColor(i)} className="ml-1 text-gray-400 hover:text-red-500">
//                           <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               <div>
//                 <label className="block mb-2 text-sm font-semibold text-gray-700">Status Awal</label>
//                 <select required value={formData.status} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gycora focus:ring-1 focus:ring-gycora transition-all" onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
//                   <option value="active">Aktif (Tampil di Katalog)</option>
//                   <option value="inactive">Nonaktif (Sembunyikan)</option>
//                 </select>
//               </div>
//             </div>
            
//             <div>
//               <label className="block mb-2 text-sm font-semibold text-gray-700">Deskripsi (Opsional)</label>
//               <textarea rows={4} value={formData.description} className="w-full p-3 transition-all border border-gray-200 rounded-lg outline-none resize-none bg-gray-50 focus:border-gycora focus:ring-1 focus:ring-gycora" onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
//             </div>
//             <div>
//               <label className="block mb-2 text-sm font-semibold text-gray-700">Manfaat / Benefits (Opsional)</label>
//               <textarea rows={3} value={formData.benefits} className="w-full p-3 transition-all border border-gray-200 rounded-lg outline-none resize-none bg-gray-50 focus:border-gycora focus:ring-1 focus:ring-gycora" onChange={(e) => setFormData({ ...formData, benefits: e.target.value })} />
//             </div>
//           </div>

//           <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
//             <button type="button" onClick={() => navigate("/admin/products")} className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
//               Batal
//             </button>
//             <button type="submit" disabled={isSubmitting} className="px-6 py-2.5 text-sm font-medium text-white bg-gycora rounded-lg hover:bg-gycora-dark shadow-sm transition-colors disabled:opacity-50">
//               {isSubmitting ? "Menyimpan..." : "Simpan Produk"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom"; 
// import Swal from "sweetalert2";
// import { BASE_URL } from "../../config/api";

// // --- TAMBAHAN: Interface untuk Warna ---
// interface ColorItem {
//   hex: string;
//   name: string;
// }

// export default function AddProduct() {
//   const navigate = useNavigate(); 
//   const [categories, setCategories] = useState([]);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [formData, setFormData] = useState({
//     category_id: "",
//     sku: "",
//     name: "",
//     price: "",
//     stock: "0",
//     description: "",
//     benefits: "",
//     status: "active",   
//   });

//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [videoFile, setVideoFile] = useState<File | null>(null);
//   const [videoPreview, setVideoPreview] = useState<string | null>(null);
  
//   const [variantFiles, setVariantFiles] = useState<File[]>([]);
//   const [variantPreviews, setVariantPreviews] = useState<string[]>([]);

//   // --- UBAH: State Colors menjadi Array of Objects ---
//   const [colors, setColors] = useState<ColorItem[]>([]);

//   useEffect(() => {
//     fetch(`${BASE_URL}/api/categories`)
//       .then((res) => res.json())
//       .then((data) => setCategories(data.data ? data.data : data || []))
//       .catch((err) => console.error("Gagal mengambil kategori:", err));
//   }, []);

//   // --- UBAH: Handlers Color Picker ---
//   const addColor = () => setColors([...colors, { hex: "#000000", name: "" }]);
  
//   const updateColorHex = (index: number, value: string) => {
//     const newColors = [...colors];
//     newColors[index].hex = value;
//     setColors(newColors);
//   };

//   const updateColorName = (index: number, value: string) => {
//     const newColors = [...colors];
//     newColors[index].name = value;
//     setColors(newColors);
//   };

//   const removeColor = (index: number) => {
//     const newColors = [...colors];
//     newColors.splice(index, 1);
//     setColors(newColors);
//   };

//   const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       if (file.size > 50 * 1024 * 1024) { 
//         Swal.fire("File Terlalu Besar", "Ukuran video maksimal 50MB", "warning");
//         return;
//       }
//       setVideoFile(file);
//       setVideoPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleVariantChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = Array.from(e.target.files || []);
//     if (variantFiles.length + files.length > 5) {
//       Swal.fire("Batas Tercapai", "Maksimal hanya 5 gambar varian yang diperbolehkan.", "warning");
//       return;
//     }
//     const newFiles = [...variantFiles, ...files];
//     setVariantFiles(newFiles);
//     setVariantPreviews(newFiles.map(file => URL.createObjectURL(file)));
//   };

//   const removeVariant = (index: number) => {
//     const newFiles = [...variantFiles];
//     newFiles.splice(index, 1);
//     setVariantFiles(newFiles);
//     setVariantPreviews(newFiles.map(file => URL.createObjectURL(file)));
//   };

//   const uploadToS3 = async (file: File, token: string) => {
//     const ext = file.name.split('.').pop();
//     const contentType = file.type;

//     const presignedRes = await fetch(`${BASE_URL}/api/products/presigned-url`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
//       body: JSON.stringify({ extension: ext, content_type: contentType })
//     });
    
//     if (!presignedRes.ok) throw new Error("Gagal mengambil Pre-signed URL");
//     const { upload_url, upload_headers, file_url } = await presignedRes.json();

//     const s3UploadRes = await fetch(upload_url, {
//       method: "PUT",
//       body: file,
//       headers: { ...upload_headers, "Content-Type": contentType, "x-amz-acl": "public-read" }
//     });

//     if (!s3UploadRes.ok) throw new Error("Gagal mengunggah ke S3");
//     return file_url;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     // Validasi: Pastikan nama warna tidak boleh kosong jika warna ditambahkan
//     const hasEmptyColorNames = colors.some(c => c.name.trim() === "");
//     if (hasEmptyColorNames) {
//       Swal.fire("Peringatan", "Harap isi nama/label untuk semua varian warna yang ditambahkan.", "warning");
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const token = localStorage.getItem("admin_token");
//       if (!token) throw new Error("Token tidak ditemukan");

//       Swal.fire({ title: "Mengunggah Media...", text: "Mohon tunggu sebentar.", allowOutsideClick: false, didOpen: () => Swal.showLoading() });
      
//       let uploadedImageUrl = null;
//       let uploadedVideoUrl = null;
//       let uploadedVariantUrls: string[] = [];

//       if (imageFile) uploadedImageUrl = await uploadToS3(imageFile, token);
//       if (videoFile) uploadedVideoUrl = await uploadToS3(videoFile, token);
//       if (variantFiles.length > 0) {
//         uploadedVariantUrls = await Promise.all(variantFiles.map(file => uploadToS3(file, token)));
//       }

//       Swal.fire({ title: "Menyimpan Data...", allowOutsideClick: false, didOpen: () => Swal.showLoading() });

//       const payload = {
//         ...formData,
//         color: colors.length > 0 ? colors : null, // Backend akan mengubah ini menjadi JSON otomatis
//         image_url: uploadedImageUrl,
//         variant_video: uploadedVideoUrl,
//         variant_images: uploadedVariantUrls.length > 0 ? uploadedVariantUrls : null,
//       };

//       const res = await fetch(`${BASE_URL}/api/products`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
//         body: JSON.stringify(payload), 
//       });

//       if (res.ok) {
//         Swal.fire("Berhasil!", "Produk ditambahkan.", "success");
//         navigate("/admin/products");
//       } else {
//         const errorData = await res.json();
//         Swal.fire("Gagal!", errorData.message || "Pastikan semua data terisi dengan benar.", "error");
//       }
//     } catch (error) {
//       console.error("Gagal submit produk:", error);
//       Swal.fire("Error!", "Terjadi kesalahan saat mengunggah atau menyimpan.", "error");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="max-w-4xl p-8 mx-auto font-sans">
//       <div className="p-8 bg-white border border-gray-100 shadow-sm rounded-xl">
//         <div className="flex items-center gap-4 mb-8">
//           <button
//             onClick={() => navigate("/admin/products")} 
//             className="p-2 text-gray-400 transition rounded-lg hover:text-gray-600 hover:bg-gray-50"
//             title="Kembali"
//           >
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
//           </button>
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900">Tambah Produk Baru</h1>
//             <p className="mt-1 text-sm text-gray-500">Tambahkan item baru beserta varian dan video demo.</p>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* INFORMASI DASAR */}
//           <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//             <div>
//               <label className="block mb-2 text-sm font-semibold text-gray-700">Kategori Produk</label>
//               <select required value={formData.category_id} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gycora focus:ring-1 focus:ring-gycora transition-all" onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}>
//                 <option value="" disabled>Pilih Kategori...</option>
//                 {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
//                 {categories.map((c: any) => (
//                   <option key={c.id} value={c.id}>{c.name}</option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className="block mb-2 text-sm font-semibold text-gray-700">SKU</label>
//               <input type="text" required placeholder="Misal: SHP-01" value={formData.sku} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gycora focus:ring-1 focus:ring-gycora transition-all uppercase" onChange={(e) => setFormData({ ...formData, sku: e.target.value.toUpperCase() })} />
//             </div>
//           </div>

//           <div>
//             <label className="block mb-2 text-sm font-semibold text-gray-700">Nama Produk</label>
//             <input type="text" required placeholder="Misal: Gycora Shampoo" value={formData.name} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gycora focus:ring-1 focus:ring-gycora transition-all" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
//           </div>

//           <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//             <div>
//               <label className="block mb-2 text-sm font-semibold text-gray-700">Harga (Rp)</label>
//               <div className="relative">
//                 <span className="absolute left-3 top-2.5 text-gray-500">Rp</span>
//                 <input type="number" required placeholder="0" value={formData.price} className="w-full pl-10 p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gycora focus:ring-1 focus:ring-gycora transition-all" onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
//               </div>
//             </div>
//             <div>
//               <label className="block mb-2 text-sm font-semibold text-gray-700">Stok Awal</label>
//               <input type="number" required value={formData.stock} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gycora focus:ring-1 focus:ring-gycora transition-all" onChange={(e) => setFormData({ ...formData, stock: e.target.value })} />
//             </div>
//           </div>

//           {/* MEDIA (GAMBAR UTAMA, VIDEO & VARIAN) */}
//           <div className="pt-6 space-y-6 border-t border-gray-100">
//             <h2 className="text-lg font-bold text-gray-900">Media Produk</h2>
            
//             <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//               <div>
//                 <label className="block mb-2 text-sm font-semibold text-gray-700">Foto Utama (Wajib)</label>
//                 <input type="file" accept="image/*" required className="w-full p-2 text-sm border border-gray-200 rounded-lg outline-none bg-gray-50" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
//               </div>
//               <div>
//                 <label className="flex justify-between block mb-2 text-sm font-semibold text-gray-700">
//                   <span>Video Demo (Opsional)</span>
//                   {videoFile && <button type="button" onClick={() => {setVideoFile(null); setVideoPreview(null);}} className="text-xs text-red-500 hover:underline">Hapus</button>}
//                 </label>
//                 <input type="file" accept="video/mp4,video/webm,video/quicktime" className="w-full p-2 text-sm border border-gray-200 rounded-lg outline-none bg-gray-50" onChange={handleVideoChange} />
//                 {videoPreview && (
//                   <video src={videoPreview} controls className="object-contain w-full h-32 mt-2 bg-black rounded-lg" />
//                 )}
//               </div>
//             </div>

//             {/* VARIANT IMAGES SECTION */}
//             <div>
//               <label className="flex justify-between block mb-2 text-sm font-semibold text-gray-700">
//                 <span>Gambar Varian (Opsional, Maks 5)</span>
//                 <span className="text-xs text-gray-400">{variantFiles.length} / 5</span>
//               </label>
              
//               <div className="flex flex-wrap gap-4 mt-2">
//                 {variantFiles.length < 5 && (
//                   <label className="flex items-center justify-center w-24 h-24 text-gray-400 transition bg-white border-2 border-gray-200 border-dashed cursor-pointer rounded-xl hover:bg-gray-50 hover:text-gycora hover:border-gycora shrink-0">
//                     <input type="file" accept="image/*" multiple onChange={handleVariantChange} className="hidden" />
//                     <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
//                   </label>
//                 )}

//                 {variantPreviews.map((src, idx) => (
//                   <div key={idx} className="relative w-24 h-24 overflow-hidden border border-gray-200 rounded-xl shrink-0 group">
//                     <img src={src} alt="Variant" className="object-cover w-full h-full" />
//                     <button type="button" onClick={() => removeVariant(idx)} className="absolute inset-0 flex items-center justify-center w-full h-full text-white transition-opacity opacity-0 bg-black/50 group-hover:opacity-100">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           <div className="pt-6 space-y-6 border-t border-gray-100">
//             <h2 className="text-lg font-bold text-gray-900">Detail Spesifik</h2>
//             <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              
//               {/* UBAH: VARIAN WARNA (COLOR PICKER DENGAN LABEL) */}
//               <div className="md:col-span-2">
//                 <div className="flex items-center justify-between pb-2 mb-4 border-b border-gray-100">
//                   <label className="text-sm font-semibold text-gray-700">Varian Warna Produk</label>
//                   <button type="button" onClick={addColor} className="flex items-center gap-1 text-xs font-bold transition-colors text-gycora hover:text-gycora-dark">
//                     <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
//                     Tambah Varian
//                   </button>
//                 </div>
                
//                 {colors.length === 0 ? (
//                   <div className="py-6 text-center border border-gray-200 border-dashed rounded-xl bg-gray-50">
//                     <p className="text-sm text-gray-400">Tidak ada varian warna khusus.</p>
//                   </div>
//                 ) : (
//                   <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
//                     {colors.map((c, i) => (
//                       <div key={i} className="flex flex-col gap-2 p-3 transition-colors bg-white border border-gray-200 shadow-sm rounded-xl hover:border-gycora/30">
//                         <div className="flex items-center justify-between">
//                           <div className="flex items-center gap-3">
//                             <div className="relative">
//                               <input 
//                                 type="color" 
//                                 value={c.hex} 
//                                 onChange={(e) => updateColorHex(i, e.target.value)} 
//                                 className="w-8 h-8 p-0 border-none rounded-full shadow-sm cursor-pointer" 
//                               />
//                               <div className="absolute inset-0 rounded-full pointer-events-none ring-1 ring-inset ring-black/10"></div>
//                             </div>
//                             <span className="font-mono text-xs font-medium text-gray-500 uppercase">{c.hex}</span>
//                           </div>
//                           <button type="button" onClick={() => removeColor(i)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
//                             <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
//                           </button>
//                         </div>
//                         <input 
//                           type="text" 
//                           placeholder="Nama Warna (misal: Rose Gold)" 
//                           value={c.name}
//                           onChange={(e) => updateColorName(i, e.target.value)}
//                           className="w-full px-3 py-2 text-xs transition border border-gray-200 rounded-lg outline-none bg-gray-50 focus:ring-1 focus:ring-gycora"
//                         />
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               <div className="md:col-span-2">
//                 <label className="block mb-2 text-sm font-semibold text-gray-700">Status Awal</label>
//                 <select required value={formData.status} className="w-full md:w-1/2 p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gycora focus:ring-1 focus:ring-gycora transition-all" onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
//                   <option value="active">Aktif (Tampil di Katalog)</option>
//                   <option value="inactive">Nonaktif (Sembunyikan)</option>
//                 </select>
//               </div>
//             </div>
            
//             <div>
//               <label className="block mb-2 text-sm font-semibold text-gray-700">Deskripsi (Opsional)</label>
//               <textarea rows={4} value={formData.description} className="w-full p-3 transition-all border border-gray-200 rounded-lg outline-none resize-none bg-gray-50 focus:border-gycora focus:ring-1 focus:ring-gycora" onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
//             </div>
//             <div>
//               <label className="block mb-2 text-sm font-semibold text-gray-700">Manfaat / Benefits (Opsional)</label>
//               <textarea rows={3} value={formData.benefits} className="w-full p-3 transition-all border border-gray-200 rounded-lg outline-none resize-none bg-gray-50 focus:border-gycora focus:ring-1 focus:ring-gycora" onChange={(e) => setFormData({ ...formData, benefits: e.target.value })} />
//             </div>
//           </div>

//           <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
//             <button type="button" onClick={() => navigate("/admin/products")} className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
//               Batal
//             </button>
//             <button type="submit" disabled={isSubmitting} className="px-6 py-2.5 text-sm font-medium text-white bg-gycora rounded-lg hover:bg-gycora-dark shadow-sm transition-colors disabled:opacity-50">
//               {isSubmitting ? "Menyimpan..." : "Simpan Produk"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api";

interface ColorItem {
  hex: string;
  name: string;
}

export default function AddProduct() {
  const navigate = useNavigate(); 
  const [categories, setCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    category_id: "",
    sku: "",
    name: "",
    price: "",
    discount_price: "", // Tambahan field harga diskon
    voucher_discount_price: "", // <--- BARU
    stock: "0",
    description: "",
    benefits: "",
    status: "active",   
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  
  const [variantFiles, setVariantFiles] = useState<File[]>([]);
  const [variantPreviews, setVariantPreviews] = useState<string[]>([]);

  const [colors, setColors] = useState<ColorItem[]>([]);

  useEffect(() => {
    fetch(`${BASE_URL}/api/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data.data ? data.data : data || []))
      .catch((err) => console.error("Gagal mengambil kategori:", err));
  }, []);

  const addColor = () => setColors([...colors, { hex: "#000000", name: "" }]);
  
  const updateColorHex = (index: number, value: string) => {
    const newColors = [...colors];
    newColors[index].hex = value;
    setColors(newColors);
  };

  const updateColorName = (index: number, value: string) => {
    const newColors = [...colors];
    newColors[index].name = value;
    setColors(newColors);
  };

  const removeColor = (index: number) => {
    const newColors = [...colors];
    newColors.splice(index, 1);
    setColors(newColors);
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 50 * 1024 * 1024) { 
        Swal.fire("File Terlalu Besar", "Ukuran video maksimal 50MB", "warning");
        return;
      }
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const handleVariantChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (variantFiles.length + files.length > 7) {
      Swal.fire("Batas Tercapai", "Maksimal hanya 7 gambar varian yang diperbolehkan.", "warning");
      return;
    }
    const newFiles = [...variantFiles, ...files];
    setVariantFiles(newFiles);
    setVariantPreviews(newFiles.map(file => URL.createObjectURL(file)));
  };

  const removeVariant = (index: number) => {
    const newFiles = [...variantFiles];
    newFiles.splice(index, 1);
    setVariantFiles(newFiles);
    setVariantPreviews(newFiles.map(file => URL.createObjectURL(file)));
  };

  const uploadToS3 = async (file: File, token: string) => {
    const ext = file.name.split('.').pop();
    const contentType = file.type;

    const presignedRes = await fetch(`${BASE_URL}/api/products/presigned-url`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      body: JSON.stringify({ extension: ext, content_type: contentType })
    });
    
    if (!presignedRes.ok) throw new Error("Gagal mengambil Pre-signed URL");
    const { upload_url, upload_headers, file_url } = await presignedRes.json();

    const s3UploadRes = await fetch(upload_url, {
      method: "PUT",
      body: file,
      headers: { ...upload_headers, "Content-Type": contentType, "x-amz-acl": "public-read" }
    });

    if (!s3UploadRes.ok) throw new Error("Gagal mengunggah ke S3");
    return file_url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const hasEmptyColorNames = colors.some(c => c.name.trim() === "");
    if (hasEmptyColorNames) {
      Swal.fire("Peringatan", "Harap isi nama/label untuk semua varian warna yang ditambahkan.", "warning");
      return;
    }

    // Validasi tambahan: Harga diskon tidak boleh lebih besar dari harga asli
    if (formData.discount_price && Number(formData.discount_price) >= Number(formData.price)) {
      Swal.fire("Peringatan", "Harga diskon harus lebih kecil dari harga asli.", "warning");
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("admin_token");
      if (!token) throw new Error("Token tidak ditemukan");

      Swal.fire({ title: "Mengunggah Media...", text: "Mohon tunggu sebentar.", allowOutsideClick: false, didOpen: () => Swal.showLoading() });
      
      let uploadedImageUrl = null;
      let uploadedVideoUrl = null;
      let uploadedVariantUrls: string[] = [];

      if (imageFile) uploadedImageUrl = await uploadToS3(imageFile, token);
      if (videoFile) uploadedVideoUrl = await uploadToS3(videoFile, token);
      if (variantFiles.length > 0) {
        uploadedVariantUrls = await Promise.all(variantFiles.map(file => uploadToS3(file, token)));
      }

      Swal.fire({ title: "Menyimpan Data...", allowOutsideClick: false, didOpen: () => Swal.showLoading() });

      const payload = {
        ...formData,
        // Pastikan null jika string kosong agar backend memprosesnya dengan benar
        discount_price: formData.discount_price === "" ? null : formData.discount_price,
        voucher_discount_price: formData.voucher_discount_price === "" ? null : formData.voucher_discount_price, // <--- BARU
        color: colors.length > 0 ? colors : null, 
        image_url: uploadedImageUrl,
        variant_video: uploadedVideoUrl,
        variant_images: uploadedVariantUrls.length > 0 ? uploadedVariantUrls : null,
      };

      const res = await fetch(`${BASE_URL}/api/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(payload), 
      });

      if (res.ok) {
        Swal.fire("Berhasil!", "Produk ditambahkan.", "success");
        navigate("/admin/products");
      } else {
        const errorData = await res.json();
        Swal.fire("Gagal!", errorData.message || "Pastikan semua data terisi dengan benar.", "error");
      }
    } catch (error) {
      console.error("Gagal submit produk:", error);
      Swal.fire("Error!", "Terjadi kesalahan saat mengunggah atau menyimpan.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl p-8 mx-auto font-sans">
      <div className="p-8 bg-white border border-gray-100 shadow-sm rounded-xl">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate("/admin/products")} 
            className="p-2 text-gray-400 transition rounded-lg hover:text-gray-600 hover:bg-gray-50"
            title="Kembali"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Tambah Produk Baru</h1>
            <p className="mt-1 text-sm text-gray-500">Tambahkan item baru beserta varian dan video demo.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* INFORMASI DASAR */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">Kategori Produk</label>
              <select required value={formData.category_id} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gycora focus:ring-1 focus:ring-gycora transition-all" onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}>
                <option value="" disabled>Pilih Kategori...</option>
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {categories.map((c: any) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">SKU</label>
              <input type="text" required placeholder="Misal: SHP-01" value={formData.sku} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gycora focus:ring-1 focus:ring-gycora transition-all uppercase" onChange={(e) => setFormData({ ...formData, sku: e.target.value.toUpperCase() })} />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Nama Produk</label>
            <input type="text" required placeholder="Misal: Gycora Shampoo" value={formData.name} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gycora focus:ring-1 focus:ring-gycora transition-all" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          </div>

          {/* UBAH: GRID MENJADI 3 KOLOM AGAR DISCOUNT PRICE MUAT */}
          {/* <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">Harga Asli (Rp)</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-500">Rp</span>
                <input type="number" required placeholder="0" value={formData.price} className="w-full pl-10 p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gycora focus:ring-1 focus:ring-gycora transition-all" onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
              </div>
            </div>
            
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">Harga Diskon (Opsional)</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-500">Rp</span>
                <input type="number" placeholder="Kosongkan jika tidak ada diskon" value={formData.discount_price} className="w-full pl-10 p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gycora focus:ring-1 focus:ring-gycora transition-all" onChange={(e) => setFormData({ ...formData, discount_price: e.target.value })} />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">Stok Awal</label>
              <input type="number" required value={formData.stock} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gycora focus:ring-1 focus:ring-gycora transition-all" onChange={(e) => setFormData({ ...formData, stock: e.target.value })} />
            </div>
          </div> */}

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">Harga Asli (Rp)</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-500">Rp</span>
                <input type="number" required placeholder="0" value={formData.price} className="w-full pl-10 p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gycora focus:ring-1 focus:ring-gycora transition-all" onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
              </div>
            </div>
            
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">Harga Diskon Publik (Opsional)</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-500">Rp</span>
                <input type="number" placeholder="Kosongkan jika tidak ada" value={formData.discount_price} className="w-full pl-10 p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gycora focus:ring-1 focus:ring-gycora transition-all" onChange={(e) => setFormData({ ...formData, discount_price: e.target.value })} />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">Harga Diskon Voucher 20 Kode (Opsional)</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-500">Rp</span>
                <input type="number" placeholder="Harga khusus pemakai kode generate" value={formData.voucher_discount_price} className="w-full pl-10 p-2.5 border-amber-200 bg-amber-50 rounded-lg outline-none focus:border-gycora focus:ring-1 focus:ring-gycora transition-all" onChange={(e) => setFormData({ ...formData, voucher_discount_price: e.target.value })} />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">Stok Awal</label>
              <input type="number" required value={formData.stock} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gycora focus:ring-1 focus:ring-gycora transition-all" onChange={(e) => setFormData({ ...formData, stock: e.target.value })} />
            </div>
          </div>

          {/* MEDIA (GAMBAR UTAMA, VIDEO & VARIAN) */}
          <div className="pt-6 space-y-6 border-t border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">Media Produk</h2>
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">Foto Utama (Wajib)</label>
                <input type="file" accept="image/*" required className="w-full p-2 text-sm border border-gray-200 rounded-lg outline-none bg-gray-50" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
              </div>
              <div>
                <label className="flex justify-between block mb-2 text-sm font-semibold text-gray-700">
                  <span>Video Demo (Opsional)</span>
                  {videoFile && <button type="button" onClick={() => {setVideoFile(null); setVideoPreview(null);}} className="text-xs text-red-500 hover:underline">Hapus</button>}
                </label>
                <input type="file" accept="video/mp4,video/webm,video/quicktime" className="w-full p-2 text-sm border border-gray-200 rounded-lg outline-none bg-gray-50" onChange={handleVideoChange} />
                {videoPreview && (
                  <video src={videoPreview} controls className="object-contain w-full h-32 mt-2 bg-black rounded-lg" />
                )}
              </div>
            </div>

            {/* VARIANT IMAGES SECTION */}
            <div>
              <label className="flex justify-between block mb-2 text-sm font-semibold text-gray-700">
                <span>Gambar Varian (Opsional, Maks 5)</span>
                <span className="text-xs text-gray-400">{variantFiles.length} / 5</span>
              </label>
              
              <div className="flex flex-wrap gap-4 mt-2">
                {variantFiles.length < 5 && (
                  <label className="flex items-center justify-center w-24 h-24 text-gray-400 transition bg-white border-2 border-gray-200 border-dashed cursor-pointer rounded-xl hover:bg-gray-50 hover:text-gycora hover:border-gycora shrink-0">
                    <input type="file" accept="image/*" multiple onChange={handleVariantChange} className="hidden" />
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                  </label>
                )}

                {variantPreviews.map((src, idx) => (
                  <div key={idx} className="relative w-24 h-24 overflow-hidden border border-gray-200 rounded-xl shrink-0 group">
                    <img src={src} alt="Variant" className="object-cover w-full h-full" />
                    <button type="button" onClick={() => removeVariant(idx)} className="absolute inset-0 flex items-center justify-center w-full h-full text-white transition-opacity opacity-0 bg-black/50 group-hover:opacity-100">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-6 space-y-6 border-t border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">Detail Spesifik</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              
              <div className="md:col-span-2">
                <div className="flex items-center justify-between pb-2 mb-4 border-b border-gray-100">
                  <label className="text-sm font-semibold text-gray-700">Varian Warna Produk</label>
                  <button type="button" onClick={addColor} className="flex items-center gap-1 text-xs font-bold transition-colors text-gycora hover:text-gycora-dark">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                    Tambah Varian
                  </button>
                </div>
                
                {colors.length === 0 ? (
                  <div className="py-6 text-center border border-gray-200 border-dashed rounded-xl bg-gray-50">
                    <p className="text-sm text-gray-400">Tidak ada varian warna khusus.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {colors.map((c, i) => (
                      <div key={i} className="flex flex-col gap-2 p-3 transition-colors bg-white border border-gray-200 shadow-sm rounded-xl hover:border-gycora/30">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <input 
                                type="color" 
                                value={c.hex} 
                                onChange={(e) => updateColorHex(i, e.target.value)} 
                                className="w-8 h-8 p-0 border-none rounded-full shadow-sm cursor-pointer" 
                              />
                              <div className="absolute inset-0 rounded-full pointer-events-none ring-1 ring-inset ring-black/10"></div>
                            </div>
                            <span className="font-mono text-xs font-medium text-gray-500 uppercase">{c.hex}</span>
                          </div>
                          <button type="button" onClick={() => removeColor(i)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          </button>
                        </div>
                        <input 
                          type="text" 
                          placeholder="Nama Warna (misal: Rose Gold)" 
                          value={c.name}
                          onChange={(e) => updateColorName(i, e.target.value)}
                          className="w-full px-3 py-2 text-xs transition border border-gray-200 rounded-lg outline-none bg-gray-50 focus:ring-1 focus:ring-gycora"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block mb-2 text-sm font-semibold text-gray-700">Status Awal</label>
                <select required value={formData.status} className="w-full md:w-1/2 p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gycora focus:ring-1 focus:ring-gycora transition-all" onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                  <option value="active">Aktif (Tampil di Katalog)</option>
                  <option value="inactive">Nonaktif (Sembunyikan)</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">Deskripsi (Opsional)</label>
              <textarea rows={4} value={formData.description} className="w-full p-3 transition-all border border-gray-200 rounded-lg outline-none resize-none bg-gray-50 focus:border-gycora focus:ring-1 focus:ring-gycora" onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
            </div>
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">Manfaat / Benefits (Opsional)</label>
              <textarea rows={3} value={formData.benefits} className="w-full p-3 transition-all border border-gray-200 rounded-lg outline-none resize-none bg-gray-50 focus:border-gycora focus:ring-1 focus:ring-gycora" onChange={(e) => setFormData({ ...formData, benefits: e.target.value })} />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
            <button type="button" onClick={() => navigate("/admin/products")} className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Batal
            </button>
            <button type="submit" disabled={isSubmitting} className="px-6 py-2.5 text-sm font-medium text-white bg-gycora rounded-lg hover:bg-gycora-dark shadow-sm transition-colors disabled:opacity-50">
              {isSubmitting ? "Menyimpan..." : "Simpan Produk"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}