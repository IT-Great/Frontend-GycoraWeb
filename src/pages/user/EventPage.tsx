import { useState, useEffect } from "react";
import { BASE_URL } from "../../config/api";

interface GycoraEvent {
  id: number;
  name: string;
  location: string;
  start_date: string;
  end_date: string | null;
  description: string;
  image_url: string | null;
  link_url: string | null;
}

export default function EventPage() {
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
          setUpcomingEvents(data.data?.upcoming || []);
          setPastEvents(data.data?.past || []);
        }
      } catch (error) {
        console.error("Gagal memuat data event:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const formatDateRange = (startStr: string, endStr: string | null) => {
    const startDate = new Date(startStr);
    const endDate = endStr ? new Date(endStr) : startDate;
    
    const startDay = startDate.getDate();
    const startMonth = startDate.toLocaleString('id-ID', { month: 'long' });
    const startYear = startDate.getFullYear();
    
    const endDay = endDate.getDate();
    const endMonth = endDate.toLocaleString('id-ID', { month: 'long' });
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
            Temui Gycora Secara Langsung
          </h1>
          <p className="mb-4 text-lg leading-relaxed text-gray-600 md:text-xl">
            Datang dan rasakan langsung pengalaman mencoba produk Gycora di berbagai event dan pop-up market pilihan kami.
          </p>
          <p className="text-lg leading-relaxed text-gray-600 md:text-xl">
            Temukan promo spesial, produk favorit, dan pengalaman belanja yang lebih personal bersama Gycora.
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
              Upcoming Event!
            </h2>
          </div>

          {upcomingEvents.length === 0 ? (
            <p className="py-10 italic text-center text-gray-500">Belum ada event mendatang. Stay tuned!</p>
          ) : (
            <div className="space-y-12">
              {upcomingEvents.map((event) => (
                <div 
                  key={`upcoming-${event.id}`} 
                  // [PERBAIKAN] Menggunakan card berwarna hijau persis seperti referensi
                  className="flex flex-col-reverse md:flex-row bg-[#006A4E] rounded-3xl overflow-hidden shadow-2xl p-6 md:p-10 gap-8 items-center"
                >
                  
                  {/* Event Details (Kiri) */}
                  <div className="w-full space-y-6 md:w-1/2">
                    <div>
                      <h3 className="mb-4 text-2xl font-bold text-white md:text-3xl">
                        {event.name} — {event.location}
                      </h3>
                      {/* Tanggal menggunakan pill outline putih */}
                      <span className="inline-block px-5 py-2 text-sm font-bold text-white border-2 border-white rounded-full">
                        {formatDateRange(event.start_date, event.end_date)}
                      </span>
                    </div>
                    
                    <div className="text-base leading-relaxed whitespace-pre-wrap text-emerald-50">
                      {event.description}
                    </div>

                    {event.link_url && (
                      <div className="pt-2">
                        <a 
                          href={event.link_url} 
                          target="_blank" 
                          rel="noreferrer"
                          // Tombol putih dengan teks hijau
                          className="inline-block px-6 py-3 text-sm font-bold text-[#006A4E] transition-all bg-white rounded-full shadow-lg hover:bg-gray-100 hover:-translate-y-0.5"
                        >
                          Visit Event
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Event Image (Kanan) */}
                  <div className="w-full md:w-1/2">
                    <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-inner bg-emerald-900/50">
                      {event.image_url ? (
                        <img 
                          src={event.image_url} 
                          alt={event.name} 
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full font-medium text-emerald-200">
                          Gambar Event Belum Tersedia
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </section>

        {/* =========================================
            PAST EVENTS SECTION (CLEAN ZIG-ZAG)
        ========================================= */}
        {pastEvents.length > 0 && (
          <section className="pt-16 border-t border-gray-100">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-black tracking-wide text-gray-400 uppercase md:text-4xl">
                Past Events
              </h2>
              <div className="w-24 h-1.5 bg-gray-200 mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="space-y-20 md:space-y-32">
              {pastEvents.map((event, index) => {
                const isEven = index % 2 === 0;

                return (
                  <div 
                    key={`past-${event.id}`} 
                    className={`flex flex-col gap-10 md:gap-16 items-center opacity-80 hover:opacity-100 transition-opacity duration-300 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  >
                    <div className="w-full md:w-1/2">
                      <div className="relative rounded-3xl overflow-hidden shadow-lg border border-gray-100 bg-gray-50 aspect-[4/3] sm:aspect-video grayscale-[30%] hover:grayscale-0 transition-all duration-500">
                        {event.image_url ? (
                          <img 
                            src={event.image_url} 
                            alt={event.name} 
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <div className="flex items-center justify-center w-full h-full font-medium text-gray-400">
                            Gambar Event Belum Tersedia
                          </div>
                        )}
                        <div className="absolute px-4 py-2 rounded-full shadow-sm top-4 left-4 bg-gray-900/80 backdrop-blur-sm">
                           <span className="text-xs font-bold tracking-widest text-white uppercase">Past Event</span>
                        </div>
                      </div>
                    </div>

                    <div className="w-full space-y-6 md:w-1/2">
                      <div>
                        <h3 className="mb-2 text-3xl font-extrabold text-gray-700 md:text-4xl">
                          {event.name} — {event.location}
                        </h3>
                        <p className="flex items-center gap-2 text-lg font-bold text-gray-500">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                          {formatDateRange(event.start_date, event.end_date)}
                        </p>
                      </div>
                      
                      <div className="prose prose-lg text-gray-500 whitespace-pre-wrap">
                        {event.description}
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