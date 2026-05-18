// import { useState, useEffect } from "react";
// import { BASE_URL } from "../../config/api";

// interface GycoraEvent {
//   id: number;
//   name: string;
//   location: string;
//   start_date: string;
//   end_date: string | null;
//   description: string;
//   image_url: string | null;
//   link_url: string | null;
// }

// export default function EventPage() {
//   const [upcomingEvents, setUpcomingEvents] = useState<GycoraEvent[]>([]);
//   const [pastEvents, setPastEvents] = useState<GycoraEvent[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     window.scrollTo(0, 0);
    
//     const fetchEvents = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/events`);
//         if (res.ok) {
//           const data = await res.json();
//           setUpcomingEvents(data.data?.upcoming || []);
//           setPastEvents(data.data?.past || []);
//         }
//       } catch (error) {
//         console.error("Gagal memuat data event:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEvents();
//   }, []);

//   const formatDateRange = (startStr: string, endStr: string | null) => {
//     const startDate = new Date(startStr);
//     const endDate = endStr ? new Date(endStr) : startDate;
    
//     const startDay = startDate.getDate();
//     const startMonth = startDate.toLocaleString('id-ID', { month: 'long' });
//     const startYear = startDate.getFullYear();
    
//     const endDay = endDate.getDate();
//     const endMonth = endDate.toLocaleString('id-ID', { month: 'long' });
//     const endYear = endDate.getFullYear();
    
//     if (startStr === endStr || !endStr) {
//       return `${startDay} ${startMonth} ${startYear}`;
//     }
    
//     if (startMonth === endMonth && startYear === endYear) {
//       return `${startDay}–${endDay} ${startMonth} ${startYear}`;
//     }
    
//     if (startYear === endYear) {
//       return `${startDay} ${startMonth} – ${endDay} ${endMonth} ${startYear}`;
//     }
    
//     return `${startDay} ${startMonth} ${startYear} – ${endDay} ${endMonth} ${endYear}`;
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-white">
//         <div className="w-12 h-12 border-b-2 rounded-full border-gycora animate-spin"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen pb-24 font-sans bg-white">
      
//       {/* HEADER SECTION */}
//       <div className="bg-[#F4F9F6] py-20 text-center px-4 mb-16 border-b border-emerald-50">
//         <div className="max-w-3xl mx-auto animate-fade-in-up">
//           <h1 className="text-4xl md:text-5xl font-extrabold text-[#006A4E] mb-6 tracking-tight">
//             Temui Gycora Secara Langsung
//           </h1>
//           <p className="mb-4 text-lg leading-relaxed text-gray-600 md:text-xl">
//             Datang dan rasakan langsung pengalaman mencoba produk Gycora di berbagai event dan pop-up market pilihan kami.
//           </p>
//           <p className="text-lg leading-relaxed text-gray-600 md:text-xl">
//             Temukan promo spesial, produk favorit, dan pengalaman belanja yang lebih personal bersama Gycora.
//           </p>
//         </div>
//       </div>

//       <div className="max-w-6xl px-4 mx-auto space-y-32 sm:px-6 lg:px-8">
        
//         {/* =========================================
//             UPCOMING EVENTS SECTION (CARD HIJAU)
//         ========================================= */}
//         <section>
//           <div className="mb-12 text-center">
//             <h2 className="text-3xl font-extrabold text-[#006A4E] md:text-4xl">
//               Upcoming Event!
//             </h2>
//           </div>

//           {upcomingEvents.length === 0 ? (
//             <p className="py-10 italic text-center text-gray-500">Belum ada event mendatang. Stay tuned!</p>
//           ) : (
//             <div className="space-y-12">
//               {upcomingEvents.map((event, index) => {
//                 const isEven = index % 2 === 0;

//                 return (
//                   <div 
//                     key={`upcoming-${event.id}`} 
//                     className={`flex ${isEven ? 'flex-col-reverse md:flex-row' : 'flex-col-reverse md:flex-row-reverse'} bg-[#006A4E] rounded-3xl overflow-hidden shadow-2xl p-6 md:p-10 gap-8 items-center`}
//                   >
                    
//                     {/* Event Details */}
//                     <div className="w-full space-y-6 md:w-1/2">
//                       <div>
//                         <h3 className="mb-4 text-2xl font-bold text-white md:text-3xl">
//                           {event.name} — {event.location}
//                         </h3>
//                         <span className="inline-block px-5 py-2 text-sm font-bold text-white border-2 border-white rounded-full">
//                           {formatDateRange(event.start_date, event.end_date)}
//                         </span>
//                       </div>
                      
//                       <div className="text-base leading-relaxed whitespace-pre-wrap text-emerald-50">
//                         {event.description}
//                       </div>

//                       {event.link_url && (
//                         <div className="pt-2">
//                           <a 
//                             href={event.link_url} 
//                             target="_blank" 
//                             rel="noreferrer"
//                             className="inline-block px-6 py-3 text-sm font-bold text-[#006A4E] transition-all bg-white rounded-full shadow-lg hover:bg-gray-100 hover:-translate-y-0.5"
//                           >
//                             Visit Event
//                           </a>
//                         </div>
//                       )}
//                     </div>

//                     {/* Event Image */}
//                     <div className="w-full md:w-1/2">
//                       <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-inner bg-emerald-900/50 group">
//                         {event.image_url ? (
//                           <img 
//                             src={event.image_url} 
//                             alt={event.name} 
//                             className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
//                           />
//                         ) : (
//                           <div className="flex items-center justify-center w-full h-full font-medium text-emerald-200">
//                             Gambar Event Belum Tersedia
//                           </div>
//                         )}
//                         {/* Optional Label (Hidden by default, you can remove this if not needed for upcoming) */}
//                         <div className="absolute px-4 py-2 rounded-full shadow-sm top-4 left-4 bg-white/90 backdrop-blur-sm md:hidden">
//                            <span className="text-xs font-black tracking-widest text-[#006A4E] uppercase">Upcoming</span>
//                         </div>
//                       </div>
//                     </div>

//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </section>

//         {/* =========================================
//             PAST EVENTS SECTION (CARD ABU-ABU)
//         ========================================= */}
//         {pastEvents.length > 0 && (
//           <section className="pt-16 border-t border-gray-100">
//             <div className="mb-12 text-center">
//               <h2 className="text-3xl font-black tracking-wide text-gray-400 uppercase md:text-4xl">
//                 Past Events
//               </h2>
//             </div>

//             <div className="space-y-12">
//               {pastEvents.map((event, index) => {
//                 const isEven = index % 2 === 0;

//                 return (
//                   <div 
//                     key={`past-${event.id}`} 
//                     // [PERBAIKAN] Layout persis Upcoming, tapi warna diubah ke abu-abu gelap
//                     className={`flex ${isEven ? 'flex-col-reverse md:flex-row' : 'flex-col-reverse md:flex-row-reverse'} bg-gray-800 rounded-3xl overflow-hidden shadow-xl p-6 md:p-10 gap-8 items-center opacity-90 hover:opacity-100 transition-opacity duration-300`}
//                   >
                    
//                     {/* Event Details */}
//                     <div className="w-full space-y-6 md:w-1/2">
//                       <div>
//                         <h3 className="mb-4 text-2xl font-bold text-white md:text-3xl">
//                           {event.name} — {event.location}
//                         </h3>
//                         <span className="inline-block px-5 py-2 text-sm font-bold text-gray-300 border-2 border-gray-500 rounded-full">
//                           {formatDateRange(event.start_date, event.end_date)}
//                         </span>
//                       </div>
                      
//                       <div className="text-base leading-relaxed text-gray-300 whitespace-pre-wrap">
//                         {event.description}
//                       </div>
//                     </div>

//                     {/* Event Image */}
//                     <div className="w-full md:w-1/2">
//                       <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-inner bg-gray-900 grayscale-[20%] hover:grayscale-0 transition-all duration-500">
//                         {event.image_url ? (
//                           <img 
//                             src={event.image_url} 
//                             alt={event.name} 
//                             className="object-cover w-full h-full"
//                           />
//                         ) : (
//                           <div className="flex items-center justify-center w-full h-full font-medium text-gray-600">
//                             Gambar Event Belum Tersedia
//                           </div>
//                         )}
//                         <div className="absolute px-4 py-2 rounded-full shadow-sm top-4 left-4 bg-gray-900/80 backdrop-blur-sm">
//                            <span className="text-xs font-bold tracking-widest text-white uppercase">Past Event</span>
//                         </div>
//                       </div>
//                     </div>

//                   </div>
//                 );
//               })}
//             </div>
//           </section>
//         )}
//       </div>
//     </div>
//   );
// }

// import { useState, useEffect } from "react";
// import { BASE_URL } from "../../config/api";

// interface GycoraEvent {
//   id: number;
//   name: string;
//   location: string;
//   start_date: string;
//   end_date: string | null;
//   description: string;
//   image_url: string | null;
//   link_url: string | null;
// }

// export default function EventPage() {
//   const [upcomingEvents, setUpcomingEvents] = useState<GycoraEvent[]>([]);
//   const [pastEvents, setPastEvents] = useState<GycoraEvent[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     window.scrollTo(0, 0);
    
//     const fetchEvents = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/events`);
//         if (res.ok) {
//           const data = await res.json();
//           setUpcomingEvents(data.data?.upcoming || []);
//           setPastEvents(data.data?.past || []);
//         }
//       } catch (error) {
//         console.error("Gagal memuat data event:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEvents();
//   }, []);

//   const formatDateRange = (startStr: string, endStr: string | null) => {
//     const startDate = new Date(startStr);
//     const endDate = endStr ? new Date(endStr) : startDate;
    
//     const startDay = startDate.getDate();
//     const startMonth = startDate.toLocaleString('id-ID', { month: 'long' });
//     const startYear = startDate.getFullYear();
    
//     const endDay = endDate.getDate();
//     const endMonth = endDate.toLocaleString('id-ID', { month: 'long' });
//     const endYear = endDate.getFullYear();
    
//     if (startStr === endStr || !endStr) {
//       return `${startDay} ${startMonth} ${startYear}`;
//     }
    
//     if (startMonth === endMonth && startYear === endYear) {
//       return `${startDay}–${endDay} ${startMonth} ${startYear}`;
//     }
    
//     if (startYear === endYear) {
//       return `${startDay} ${startMonth} – ${endDay} ${endMonth} ${startYear}`;
//     }
    
//     return `${startDay} ${startMonth} ${startYear} – ${endDay} ${endMonth} ${endYear}`;
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-white">
//         <div className="w-12 h-12 border-b-2 rounded-full border-gycora animate-spin"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen pb-24 font-sans bg-white">
      
//       {/* HEADER SECTION */}
//       <div className="bg-[#F4F9F6] py-20 text-center px-4 mb-16 border-b border-emerald-50">
//         <div className="max-w-3xl mx-auto animate-fade-in-up">
//           <h1 className="text-4xl md:text-5xl font-extrabold text-[#006A4E] mb-6 tracking-tight">
//             Temui Gycora Secara Langsung
//           </h1>
//           <p className="mb-4 text-lg leading-relaxed text-gray-600 md:text-xl">
//             Datang dan rasakan langsung pengalaman mencoba produk Gycora di berbagai event dan pop-up market pilihan kami.
//           </p>
//           <p className="text-lg leading-relaxed text-gray-600 md:text-xl">
//             Temukan promo spesial, produk favorit, dan pengalaman belanja yang lebih personal bersama Gycora.
//           </p>
//         </div>
//       </div>

//       <div className="max-w-6xl px-4 mx-auto space-y-32 sm:px-6 lg:px-8">
        
//         {/* =========================================
//             UPCOMING EVENTS SECTION (CARD HIJAU)
//         ========================================= */}
//         <section>
//           <div className="mb-12 text-center">
//             <h2 className="text-3xl font-extrabold text-[#006A4E] md:text-4xl">
//               Upcoming Event!
//             </h2>
//           </div>

//           {upcomingEvents.length === 0 ? (
//             <p className="py-10 italic text-center text-gray-500">Belum ada event mendatang. Stay tuned!</p>
//           ) : (
//             <div className="space-y-12">
//               {upcomingEvents.map((event, index) => {
//                 const isEven = index % 2 === 0;

//                 return (
//                   <div 
//                     key={`upcoming-${event.id}`} 
//                     className={`flex ${isEven ? 'flex-col-reverse md:flex-row' : 'flex-col-reverse md:flex-row-reverse'} bg-[#006A4E] rounded-3xl overflow-hidden shadow-2xl p-6 md:p-10 gap-8 items-center`}
//                   >
                    
//                     {/* Event Details */}
//                     <div className="w-full space-y-6 md:w-1/2">
//                       <div>
//                         <h3 className="mb-4 text-2xl font-bold text-white md:text-3xl">
//                           {event.name} — {event.location}
//                         </h3>
//                         <span className="inline-block px-5 py-2 text-sm font-bold text-white border-2 border-white rounded-full">
//                           {formatDateRange(event.start_date, event.end_date)}
//                         </span>
//                       </div>
                      
//                       <div className="text-base leading-relaxed whitespace-pre-wrap text-emerald-50">
//                         {event.description}
//                       </div>

//                       {event.link_url && (
//                         <div className="pt-2">
//                           <a 
//                             href={event.link_url} 
//                             target="_blank" 
//                             rel="noreferrer"
//                             className="inline-block px-6 py-3 text-sm font-bold text-[#006A4E] transition-all bg-white rounded-full shadow-lg hover:bg-gray-100 hover:-translate-y-0.5"
//                           >
//                             Visit Event
//                           </a>
//                         </div>
//                       )}
//                     </div>

//                     {/* Event Image */}
//                     <div className="w-full md:w-1/2">
//                       <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-inner bg-[#00543E] group flex items-center justify-center p-2">
//                         {event.image_url ? (
//                           <img 
//                             src={event.image_url} 
//                             alt={event.name} 
//                             // [PERBAIKAN] Menggunakan object-contain agar poster tidak terpotong
//                             className="object-contain w-full h-full transition-transform duration-700 group-hover:scale-105"
//                           />
//                         ) : (
//                           <div className="flex items-center justify-center w-full h-full font-medium text-emerald-200">
//                             Gambar Event Belum Tersedia
//                           </div>
//                         )}
//                         <div className="absolute z-10 px-4 py-2 rounded-full shadow-sm top-4 left-4 bg-white/90 backdrop-blur-sm md:hidden">
//                            <span className="text-xs font-black tracking-widest text-[#006A4E] uppercase">Upcoming</span>
//                         </div>
//                       </div>
//                     </div>

//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </section>

//         {/* =========================================
//             PAST EVENTS SECTION (CARD ABU-ABU)
//         ========================================= */}
//         {pastEvents.length > 0 && (
//           <section className="pt-16 border-t border-gray-100">
//             <div className="mb-12 text-center">
//               <h2 className="text-3xl font-black tracking-wide text-gray-400 uppercase md:text-4xl">
//                 Past Events
//               </h2>
//             </div>

//             <div className="space-y-12">
//               {pastEvents.map((event, index) => {
//                 const isEven = index % 2 === 0;

//                 return (
//                   <div 
//                     key={`past-${event.id}`} 
//                     className={`flex ${isEven ? 'flex-col-reverse md:flex-row' : 'flex-col-reverse md:flex-row-reverse'} bg-gray-800 rounded-3xl overflow-hidden shadow-xl p-6 md:p-10 gap-8 items-center opacity-90 hover:opacity-100 transition-opacity duration-300`}
//                   >
                    
//                     {/* Event Details */}
//                     <div className="w-full space-y-6 md:w-1/2">
//                       <div>
//                         <h3 className="mb-4 text-2xl font-bold text-white md:text-3xl">
//                           {event.name} — {event.location}
//                         </h3>
//                         <span className="inline-block px-5 py-2 text-sm font-bold text-gray-300 border-2 border-gray-500 rounded-full">
//                           {formatDateRange(event.start_date, event.end_date)}
//                         </span>
//                       </div>
                      
//                       <div className="text-base leading-relaxed text-gray-300 whitespace-pre-wrap">
//                         {event.description}
//                       </div>
//                     </div>

//                     {/* Event Image */}
//                     <div className="w-full md:w-1/2">
//                       <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-inner bg-gray-900 grayscale-[20%] hover:grayscale-0 transition-all duration-500 flex items-center justify-center p-2">
//                         {event.image_url ? (
//                           <img 
//                             src={event.image_url} 
//                             alt={event.name} 
//                             // [PERBAIKAN] Menggunakan object-contain agar poster tidak terpotong
//                             className="object-contain w-full h-full"
//                           />
//                         ) : (
//                           <div className="flex items-center justify-center w-full h-full font-medium text-gray-600">
//                             Gambar Event Belum Tersedia
//                           </div>
//                         )}
//                         <div className="absolute z-10 px-4 py-2 rounded-full shadow-sm top-4 left-4 bg-gray-900/80 backdrop-blur-sm">
//                            <span className="text-xs font-bold tracking-widest text-white uppercase">Past Event</span>
//                         </div>
//                       </div>
//                     </div>

//                   </div>
//                 );
//               })}
//             </div>
//           </section>
//         )}
//       </div>
//     </div>
//   );
// }

// import { useState, useEffect } from "react";
// import { BASE_URL } from "../../config/api";
// import { useLanguage } from "../../context/LanguageContext"; // [BARU] Import Language Context

// interface GycoraEvent {
//   id: number;
//   name: string;
//   location: string;
//   start_date: string;
//   end_date: string | null;
//   description: string;
//   image_url: string | null;
//   link_url: string | null;
// }

// export default function EventPage() {
//   const { t, lang } = useLanguage(); // [BARU] Inisialisasi hook bahasa
//   const [upcomingEvents, setUpcomingEvents] = useState<GycoraEvent[]>([]);
//   const [pastEvents, setPastEvents] = useState<GycoraEvent[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     window.scrollTo(0, 0);
    
//     const fetchEvents = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/events`);
//         if (res.ok) {
//           const data = await res.json();
//           setUpcomingEvents(data.data?.upcoming || []);
//           setPastEvents(data.data?.past || []);
//         }
//       } catch (error) {
//         console.error("Gagal memuat data event:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEvents();
//   }, []);

//   const formatDateRange = (startStr: string, endStr: string | null) => {
//     const startDate = new Date(startStr);
//     const endDate = endStr ? new Date(endStr) : startDate;
    
//     // [PERBAIKAN] Sesuaikan bahasa (locale) kalender dengan bahasa aplikasi yang aktif (id-ID atau en-US)
//     const localeStr = lang === "en" ? "en-US" : "id-ID";
    
//     const startDay = startDate.getDate();
//     const startMonth = startDate.toLocaleString(localeStr, { month: 'long' });
//     const startYear = startDate.getFullYear();
    
//     const endDay = endDate.getDate();
//     const endMonth = endDate.toLocaleString(localeStr, { month: 'long' });
//     const endYear = endDate.getFullYear();
    
//     if (startStr === endStr || !endStr) {
//       return `${startDay} ${startMonth} ${startYear}`;
//     }
    
//     if (startMonth === endMonth && startYear === endYear) {
//       return `${startDay}–${endDay} ${startMonth} ${startYear}`;
//     }
    
//     if (startYear === endYear) {
//       return `${startDay} ${startMonth} – ${endDay} ${endMonth} ${startYear}`;
//     }
    
//     return `${startDay} ${startMonth} ${startYear} – ${endDay} ${endMonth} ${endYear}`;
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-white">
//         <div className="w-12 h-12 border-b-2 rounded-full border-gycora animate-spin"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen pb-24 font-sans bg-white">
      
//       {/* HEADER SECTION */}
//       <div className="bg-[#F4F9F6] py-20 text-center px-4 mb-16 border-b border-emerald-50">
//         <div className="max-w-3xl mx-auto animate-fade-in-up">
//           <h1 className="text-4xl md:text-5xl font-extrabold text-[#006A4E] mb-6 tracking-tight">
//             {t("event_header_title")}
//           </h1>
//           <p className="mb-4 text-lg leading-relaxed text-gray-600 md:text-xl">
//             {t("event_header_desc1")}
//           </p>
//           <p className="text-lg leading-relaxed text-gray-600 md:text-xl">
//             {t("event_header_desc2")}
//           </p>
//         </div>
//       </div>

//       <div className="max-w-6xl px-4 mx-auto space-y-32 sm:px-6 lg:px-8">
        
//         {/* =========================================
//             UPCOMING EVENTS SECTION (CARD HIJAU)
//         ========================================= */}
//         <section>
//           <div className="mb-12 text-center">
//             <h2 className="text-3xl font-extrabold text-[#006A4E] md:text-4xl">
//               {t("upcoming_events_title")}
//             </h2>
//           </div>

//           {upcomingEvents.length === 0 ? (
//             <p className="py-10 italic text-center text-gray-500">{t("no_upcoming_events")}</p>
//           ) : (
//             <div className="space-y-12">
//               {upcomingEvents.map((event, index) => {
//                 const isEven = index % 2 === 0;

//                 return (
//                   <div 
//                     key={`upcoming-${event.id}`} 
//                     className={`flex ${isEven ? 'flex-col-reverse md:flex-row' : 'flex-col-reverse md:flex-row-reverse'} bg-[#006A4E] rounded-3xl overflow-hidden shadow-2xl p-6 md:p-10 gap-8 items-center`}
//                   >
                    
//                     {/* Event Details */}
//                     <div className="w-full space-y-6 md:w-1/2">
//                       <div>
//                         <h3 className="mb-4 text-2xl font-bold text-white md:text-3xl">
//                           {event.name} — {event.location}
//                         </h3>
//                         <span className="inline-block px-5 py-2 text-sm font-bold text-white border-2 border-white rounded-full">
//                           {formatDateRange(event.start_date, event.end_date)}
//                         </span>
//                       </div>
                      
//                       <div className="text-base leading-relaxed whitespace-pre-wrap text-emerald-50">
//                         {event.description}
//                       </div>

//                       {event.link_url && (
//                         <div className="pt-2">
//                           <a 
//                             href={event.link_url} 
//                             target="_blank" 
//                             rel="noreferrer"
//                             className="inline-block px-6 py-3 text-sm font-bold text-[#006A4E] transition-all bg-white rounded-full shadow-lg hover:bg-gray-100 hover:-translate-y-0.5"
//                           >
//                             {t("visit_event")}
//                           </a>
//                         </div>
//                       )}
//                     </div>

//                     {/* Event Image */}
//                     <div className="w-full md:w-1/2">
//                       <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-inner bg-[#00543E] group flex items-center justify-center p-2">
//                         {event.image_url ? (
//                           <img 
//                             src={event.image_url} 
//                             alt={event.name} 
//                             className="object-contain w-full h-full transition-transform duration-700 group-hover:scale-105"
//                           />
//                         ) : (
//                           <div className="flex items-center justify-center w-full h-full font-medium text-emerald-200">
//                             {t("no_event_image")}
//                           </div>
//                         )}
//                         <div className="absolute z-10 px-4 py-2 rounded-full shadow-sm top-4 left-4 bg-white/90 backdrop-blur-sm md:hidden">
//                            <span className="text-xs font-black tracking-widest text-[#006A4E] uppercase">{t("upcoming_label")}</span>
//                         </div>
//                       </div>
//                     </div>

//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </section>

//         {/* =========================================
//             PAST EVENTS SECTION (CARD ABU-ABU)
//         ========================================= */}
//         {pastEvents.length > 0 && (
//           <section className="pt-16 border-t border-gray-100">
//             <div className="mb-12 text-center">
//               <h2 className="text-3xl font-black tracking-wide text-gray-400 uppercase md:text-4xl">
//                 {t("past_events_title")}
//               </h2>
//             </div>

//             <div className="space-y-12">
//               {pastEvents.map((event, index) => {
//                 const isEven = index % 2 === 0;

//                 return (
//                   <div 
//                     key={`past-${event.id}`} 
//                     className={`flex ${isEven ? 'flex-col-reverse md:flex-row' : 'flex-col-reverse md:flex-row-reverse'} bg-gray-800 rounded-3xl overflow-hidden shadow-xl p-6 md:p-10 gap-8 items-center opacity-90 hover:opacity-100 transition-opacity duration-300`}
//                   >
                    
//                     {/* Event Details */}
//                     <div className="w-full space-y-6 md:w-1/2">
//                       <div>
//                         <h3 className="mb-4 text-2xl font-bold text-white md:text-3xl">
//                           {event.name} — {event.location}
//                         </h3>
//                         <span className="inline-block px-5 py-2 text-sm font-bold text-gray-300 border-2 border-gray-500 rounded-full">
//                           {formatDateRange(event.start_date, event.end_date)}
//                         </span>
//                       </div>
                      
//                       <div className="text-base leading-relaxed text-gray-300 whitespace-pre-wrap">
//                         {event.description}
//                       </div>
//                     </div>

//                     {/* Event Image */}
//                     <div className="w-full md:w-1/2">
//                       <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-inner bg-gray-900 grayscale-[20%] hover:grayscale-0 transition-all duration-500 flex items-center justify-center p-2">
//                         {event.image_url ? (
//                           <img 
//                             src={event.image_url} 
//                             alt={event.name} 
//                             className="object-contain w-full h-full"
//                           />
//                         ) : (
//                           <div className="flex items-center justify-center w-full h-full font-medium text-gray-600">
//                             {t("no_event_image")}
//                           </div>
//                         )}
//                         <div className="absolute z-10 px-4 py-2 rounded-full shadow-sm top-4 left-4 bg-gray-900/80 backdrop-blur-sm">
//                            <span className="text-xs font-bold tracking-widest text-white uppercase">{t("past_event_label")}</span>
//                         </div>
//                       </div>
//                     </div>

//                   </div>
//                 );
//               })}
//             </div>
//           </section>
//         )}
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { BASE_URL } from "../../config/api";
import { useLanguage } from "../../context/LanguageContext";

interface GycoraEvent {
  id: number;
  name: string;
  location: string;
  start_date: string;
  end_date: string | null;
  description: string;
  image_url: string | null;
  link_url: string | null;
  // --- [BARU] Tambahkan field opsional untuk menyimpan versi terjemahannya ---
  name_en?: string;
  location_en?: string;
  description_en?: string;
}

// [BARU] Fungsi utilitas untuk menembak API terjemahan publik (Gratis, tanpa Auth)
// const translateText = async (text: string, langTo: string): Promise<string> => {
//   if (!text) return "";
//   try {
//     // Menggunakan API publik MyMemory (Gratis 500 kata/hari)
//     const response = await fetch(
//       `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=id|${langTo}`
//     );
//     const data = await response.json();
//     if (data && data.responseData && data.responseData.translatedText) {
//       return data.responseData.translatedText;
//     }
//     return text; // Fallback ke teks asli jika error/limit habis
//   } catch (error) {
//     console.error("Gagal menerjemahkan teks dari API:", error);
//     return text;
//   }
// };

// Fungsi utilitas untuk translasi teks dinamis dari API secara real-time
const translateText = async (text: string, langTo: string): Promise<string> => {
  if (!text) return "";
  try {
    // Tambahkan parameter email Anda di &de= untuk menambah limit gratis harian
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=id|${langTo}&de=admin@gycora.com`
    );
    const data = await response.json();
    
    if (data && data.responseData && data.responseData.translatedText) {
      const translated = data.responseData.translatedText;
      
      // Deteksi jika API mengirimkan pesan warning karena limit habis
      if (translated.includes("MYMEMORY WARNING")) {
        console.warn("Limit API Translate habis, fallback ke teks asli.");
        return text; // Tampilkan teks asli agar web tidak rusak
      }
      
      return translated;
    }
    return text;
  } catch (error) {
    console.error("Gagal menerjemahkan teks API:", error);
    return text;
  }
};

export default function EventPage() {
  const { t, lang } = useLanguage(); 
  const [upcomingEvents, setUpcomingEvents] = useState<GycoraEvent[]>([]);
  const [pastEvents, setPastEvents] = useState<GycoraEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/events`);
        if (res.ok) {
          const data = await res.json();
          let upcoming: GycoraEvent[] = data.data?.upcoming || [];
          let past: GycoraEvent[] = data.data?.past || [];

          // --- [BARU] PROSES TERJEMAHAN DINAMIS JIKA BAHASA INGGRIS ---
          if (lang === "en") {
            // Fungsi pembantu untuk memproses satu array event
            const translateEventArray = async (events: GycoraEvent[]) => {
              return await Promise.all(
                events.map(async (event) => {
                  return {
                    ...event,
                    name_en: await translateText(event.name, "en"),
                    location_en: await translateText(event.location, "en"),
                    description_en: await translateText(event.description, "en"),
                  };
                })
              );
            };

            // Terjemahkan secara paralel (Background Processing)
            upcoming = await translateEventArray(upcoming);
            past = await translateEventArray(past);
          }

          setUpcomingEvents(upcoming);
          setPastEvents(past);
        }
      } catch (error) {
        console.error("Gagal memuat data event:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [lang]); // [PENTING] Tambahkan 'lang' agar mengambil & menerjemahkan ulang setiap bahasa diganti

  const formatDateRange = (startStr: string, endStr: string | null) => {
    const startDate = new Date(startStr);
    const endDate = endStr ? new Date(endStr) : startDate;
    
    const localeStr = lang === "en" ? "en-US" : "id-ID";
    
    const startDay = startDate.getDate();
    const startMonth = startDate.toLocaleString(localeStr, { month: 'long' });
    const startYear = startDate.getFullYear();
    
    const endDay = endDate.getDate();
    const endMonth = endDate.toLocaleString(localeStr, { month: 'long' });
    const endYear = endDate.getFullYear();
    
    if (startStr === endStr || !endStr) {
      return `${startDay} ${startMonth} ${startYear}`;
    }
    
    if (startMonth === endMonth && startYear === endYear) {
      return `${startDay}–${endDay} ${startMonth} ${startYear}`;
    }
    
    if (startYear === endYear) {
      return `${startDay} ${startMonth} – ${endDay} ${endMonth} ${startYear}`;
    }
    
    return `${startDay} ${startMonth} ${startYear} – ${endDay} ${endMonth} ${endYear}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="w-12 h-12 border-b-2 rounded-full border-gycora animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24 font-sans bg-white">
      
      {/* HEADER SECTION */}
      <div className="bg-[#F4F9F6] py-20 text-center px-4 mb-16 border-b border-emerald-50">
        <div className="max-w-3xl mx-auto animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#006A4E] mb-6 tracking-tight">
            {t("event_header_title")}
          </h1>
          <p className="mb-4 text-lg leading-relaxed text-gray-600 md:text-xl">
            {t("event_header_desc1")}
          </p>
          <p className="text-lg leading-relaxed text-gray-600 md:text-xl">
            {t("event_header_desc2")}
          </p>
        </div>
      </div>

      <div className="max-w-6xl px-4 mx-auto space-y-32 sm:px-6 lg:px-8">
        
        {/* =========================================
            UPCOMING EVENTS SECTION (CARD HIJAU)
        ========================================= */}
        <section>
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-extrabold text-[#006A4E] md:text-4xl">
              {t("upcoming_events_title")}
            </h2>
          </div>

          {upcomingEvents.length === 0 ? (
            <p className="py-10 italic text-center text-gray-500">{t("no_upcoming_events")}</p>
          ) : (
            <div className="space-y-12">
              {upcomingEvents.map((event, index) => {
                const isEven = index % 2 === 0;
                
                // [BARU] Pilih variabel mana yang akan ditampilkan berdasarkan bahasa
                const displayEventName = lang === "en" ? (event.name_en || event.name) : event.name;
                const displayEventLoc = lang === "en" ? (event.location_en || event.location) : event.location;
                const displayEventDesc = lang === "en" ? (event.description_en || event.description) : event.description;

                return (
                  <div 
                    key={`upcoming-${event.id}`} 
                    className={`flex ${isEven ? 'flex-col-reverse md:flex-row' : 'flex-col-reverse md:flex-row-reverse'} bg-[#006A4E] rounded-3xl overflow-hidden shadow-2xl p-6 md:p-10 gap-8 items-center`}
                  >
                    
                    {/* Event Details */}
                    <div className="w-full space-y-6 md:w-1/2">
                      <div>
                        <h3 className="mb-4 text-2xl font-bold text-white md:text-3xl">
                          {displayEventName} — {displayEventLoc}
                        </h3>
                        <span className="inline-block px-5 py-2 text-sm font-bold text-white border-2 border-white rounded-full">
                          {formatDateRange(event.start_date, event.end_date)}
                        </span>
                      </div>
                      
                      <div className="text-base leading-relaxed whitespace-pre-wrap text-emerald-50">
                        {displayEventDesc}
                      </div>

                      {event.link_url && (
                        <div className="pt-2">
                          <a 
                            href={event.link_url} 
                            target="_blank" 
                            rel="noreferrer"
                            className="inline-block px-6 py-3 text-sm font-bold text-[#006A4E] transition-all bg-white rounded-full shadow-lg hover:bg-gray-100 hover:-translate-y-0.5"
                          >
                            {t("visit_event")}
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Event Image */}
                    <div className="w-full md:w-1/2">
                      <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-inner bg-[#00543E] group flex items-center justify-center p-2">
                        {event.image_url ? (
                          <img 
                            src={event.image_url} 
                            alt={displayEventName} 
                            className="object-contain w-full h-full transition-transform duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex items-center justify-center w-full h-full font-medium text-emerald-200">
                            {t("no_event_image")}
                          </div>
                        )}
                        <div className="absolute z-10 px-4 py-2 rounded-full shadow-sm top-4 left-4 bg-white/90 backdrop-blur-sm md:hidden">
                           <span className="text-xs font-black tracking-widest text-[#006A4E] uppercase">{t("upcoming_label")}</span>
                        </div>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* =========================================
            PAST EVENTS SECTION (CARD ABU-ABU)
        ========================================= */}
        {pastEvents.length > 0 && (
          <section className="pt-16 border-t border-gray-100">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-black tracking-wide text-gray-400 uppercase md:text-4xl">
                {t("past_events_title")}
              </h2>
            </div>

            <div className="space-y-12">
              {pastEvents.map((event, index) => {
                const isEven = index % 2 === 0;

                // [BARU] Pilih variabel mana yang akan ditampilkan berdasarkan bahasa
                const displayEventName = lang === "en" ? (event.name_en || event.name) : event.name;
                const displayEventLoc = lang === "en" ? (event.location_en || event.location) : event.location;
                const displayEventDesc = lang === "en" ? (event.description_en || event.description) : event.description;

                return (
                  <div 
                    key={`past-${event.id}`} 
                    className={`flex ${isEven ? 'flex-col-reverse md:flex-row' : 'flex-col-reverse md:flex-row-reverse'} bg-gray-800 rounded-3xl overflow-hidden shadow-xl p-6 md:p-10 gap-8 items-center opacity-90 hover:opacity-100 transition-opacity duration-300`}
                  >
                    
                    {/* Event Details */}
                    <div className="w-full space-y-6 md:w-1/2">
                      <div>
                        <h3 className="mb-4 text-2xl font-bold text-white md:text-3xl">
                          {displayEventName} — {displayEventLoc}
                        </h3>
                        <span className="inline-block px-5 py-2 text-sm font-bold text-gray-300 border-2 border-gray-500 rounded-full">
                          {formatDateRange(event.start_date, event.end_date)}
                        </span>
                      </div>
                      
                      <div className="text-base leading-relaxed text-gray-300 whitespace-pre-wrap">
                        {displayEventDesc}
                      </div>
                    </div>

                    {/* Event Image */}
                    <div className="w-full md:w-1/2">
                      <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-inner bg-gray-900 grayscale-[20%] hover:grayscale-0 transition-all duration-500 flex items-center justify-center p-2">
                        {event.image_url ? (
                          <img 
                            src={event.image_url} 
                            alt={displayEventName} 
                            className="object-contain w-full h-full"
                          />
                        ) : (
                          <div className="flex items-center justify-center w-full h-full font-medium text-gray-600">
                            {t("no_event_image")}
                          </div>
                        )}
                        <div className="absolute z-10 px-4 py-2 rounded-full shadow-sm top-4 left-4 bg-gray-900/80 backdrop-blur-sm">
                           <span className="text-xs font-bold tracking-widest text-white uppercase">{t("past_event_label")}</span>
                        </div>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}