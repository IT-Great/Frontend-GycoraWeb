/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config/api"; // Sesuaikan path

export default function AdminEventDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventDetail = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/events`);
        const data = await res.json();
        const allEvents = [...(data.data.upcoming || []), ...(data.data.past || [])];
        
        const foundEvent = allEvents.find((e: any) => e.id === Number(id));
        if (foundEvent) {
          setEvent(foundEvent);
        } else {
          navigate("/admin/events");
        }
      } catch (error) {
        console.error("Gagal load detail:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEventDetail();
  }, [id, navigate]);

  if (loading) return <div className="p-8 text-center text-gray-500">Memuat data...</div>;
  if (!event) return null;

  const isPast = new Date(event.end_date || event.start_date) < new Date();

  return (
    <div className="max-w-4xl p-6 mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2 transition-colors bg-gray-100 rounded-full hover:bg-gray-200">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            </button>
            <h1 className="text-2xl font-bold text-gray-800">Detail Event</h1>
        </div>
        <Link 
          to={`/admin/events/edit/${event.id}`}
          className="px-6 py-2 font-medium text-white transition-colors rounded-lg shadow-sm bg-amber-500 hover:bg-amber-600"
        >
          Edit Event
        </Link>
      </div>

      <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-2xl">
        {event.image_url ? (
            <div className="w-full h-64 bg-gray-100">
                <img src={event.image_url} alt="Cover" className="object-cover w-full h-full" />
            </div>
        ) : (
            <div className="flex items-center justify-center w-full h-32 bg-emerald-50">
                <span className="font-bold tracking-widest uppercase text-emerald-300">No Image</span>
            </div>
        )}

        <div className="p-8">
            <div className="flex items-center gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    !event.is_active ? 'bg-red-100 text-red-600' :
                    isPast ? 'bg-gray-100 text-gray-600' : 'bg-gycora-light text-gycora-dark'
                }`}>
                    {!event.is_active ? 'Status: Nonaktif' : isPast ? 'Past Event' : 'Upcoming Event'}
                </span>
                <span className="flex items-center gap-1 text-sm font-medium text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    {new Date(event.start_date).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})} 
                    {event.end_date && event.end_date !== event.start_date ? ` - ${new Date(event.end_date).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}` : ''}
                </span>
            </div>

            <h2 className="mb-2 text-3xl font-extrabold text-gray-900">{event.name} — {event.location}</h2>
            
            <div className="mt-8 prose text-gray-600 whitespace-pre-wrap">
                {event.description}
            </div>

            {event.link_url && (
                <div className="pt-6 mt-8 border-t border-gray-100">
                    <a 
                        href={event.link_url} 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-block px-6 py-3 font-bold text-white transition-colors bg-gray-900 rounded-lg hover:bg-black"
                    >
                        🔗 Buka Link Visit Event
                    </a>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}