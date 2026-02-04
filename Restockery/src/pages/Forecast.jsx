import React from 'react';
import { useInventoryStore } from '../store/useInventoryStore';
import { Calendar, TrendingUp, Zap, Info } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MapContainer, TileLayer, Circle, Tooltip as LeafletTooltip } from 'react-leaflet';

const data = [
    { name: 'Mon', demand: 40 },
    { name: 'Tue', demand: 30 },
    { name: 'Wed', demand: 20 },
    { name: 'Thu', demand: 27 },
    { name: 'Fri', demand: 18 },
    { name: 'Sat', demand: 23 },
    { name: 'Sun', demand: 34 },
];

const examData = [
    { name: 'Mon', demand: 80 },
    { name: 'Tue', demand: 95 },
    { name: 'Wed', demand: 120 },
    { name: 'Thu', demand: 110 },
    { name: 'Fri', demand: 90 },
    { name: 'Sat', demand: 100 },
    { name: 'Sun', demand: 85 },
];

const Forecast = () => {
    const { examSeason } = useInventoryStore();

    // Determine peak hours (9 AM - 9 PM for demo purposes)
    const currentHour = new Date().getHours();
    const peakHours = currentHour >= 9 && currentHour <= 21;

    // Map Center (Mumbai/Generic City)
    const position = [19.0760, 72.8777]; // Mumbai Coordinates

    return (
        <div className="space-y-6 h-[calc(100vh-140px)] flex flex-col">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Demand Intelligence</h1>
                    <p className="text-slate-500 font-medium">Hyperlocal AI predictions & event tracking.</p>
                </div>
                <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 text-sm font-bold shadow-sm flex items-center gap-2 text-indigo-600">
                    <Calendar size={18} />
                    <span>Next 7 Days</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
                {/* Real Map Section */}
                <div className="lg:col-span-2 bg-white rounded-3xl shadow-2xl border border-slate-100 flex flex-col relative overflow-hidden">
                    {/* Diagnostic Overlay - Now pointer-events-none so it doesn't block map */}
                    <div className="absolute top-6 left-6 z-[1000] pointer-events-none">
                        <div className="bg-slate-900/90 backdrop-blur-xl px-4 py-2.5 rounded-2xl shadow-2xl border border-white/10 flex items-center gap-3">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                            </span>
                            <span className="text-white font-bold text-sm tracking-tight">Live Demand Intel</span>
                        </div>
                    </div>

                    <MapContainer center={position} zoom={13} scrollWheelZoom={true} className="w-full h-full z-0">
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                        />

                        {/* School Zone - Dynamic based on Exam Season */}
                        <Circle
                            center={[19.0860, 72.8877]}
                            pathOptions={{ fillColor: examSeason ? '#ef4444' : '#10b981', color: examSeason ? '#ef4444' : '#10b981', fillOpacity: 0.5, weight: 0 }}
                            radius={examSeason ? 1200 : 800}
                        >
                            <LeafletTooltip direction="top" offset={[0, -10]} opacity={1} permanent={examSeason}>
                                <div className="text-center p-2">
                                    <div className="font-extrabold text-sm text-slate-900">Educational Hub</div>
                                    <div className="text-xs mt-0.5 font-semibold" style={{ color: examSeason ? '#ef4444' : '#10b981' }}>
                                        {examSeason ? '🔥 Demand Surge - Exams' : '✅ Stable Activity'}
                                    </div>
                                </div>
                            </LeafletTooltip>
                        </Circle>

                        {/* Residential Area */}
                        <Circle
                            center={[19.0600, 72.8500]}
                            pathOptions={{ fillColor: '#3b82f6', color: '#3b82f6', fillOpacity: 0.4, weight: 0 }}
                            radius={1000}
                        >
                            <LeafletTooltip direction="top" offset={[0, -10]} opacity={1}>
                                <div className="text-center p-2">
                                    <div className="font-extrabold text-sm text-slate-900">Residential Sector</div>
                                    <div className="text-xs mt-0.5 font-semibold text-blue-600">
                                        {peakHours ? '🏠 Peak Hours' : '😴 Normal Usage'}
                                    </div>
                                </div>
                            </LeafletTooltip>
                        </Circle>

                        {/* Market Area */}
                        <Circle
                            center={[19.0700, 72.9000]}
                            pathOptions={{ fillColor: '#f59e0b', color: '#f59e0b', fillOpacity: 0.4, weight: 0 }}
                            radius={600}
                        >
                            <LeafletTooltip direction="top" offset={[0, -10]} opacity={1}>
                                <div className="text-center p-2">
                                    <div className="font-extrabold text-sm text-slate-900">Commercial Zone</div>
                                    <div className="text-xs mt-0.5 font-semibold text-amber-600">
                                        {peakHours ? '🛒 High Activity' : '🛒 High cost'}
                                    </div>
                                </div>
                            </LeafletTooltip>
                        </Circle>

                    </MapContainer>
                </div>

                {/* AI & Analytics Sidebar */}
                <div className="flex flex-col gap-6">
                    {/* AI Insight Card */}
                    <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl shadow-xl p-6 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-3 opacity-20">
                            <Zap size={100} />
                        </div>
                        <h2 className="font-bold text-lg mb-2 flex items-center gap-2">
                            <Zap className="fill-yellow-300 text-yellow-300" /> AI Insights
                        </h2>
                        <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10">
                            <p className="text-sm leading-relaxed opacity-95">
                                {examSeason
                                    ? "Critical Alert: Local school schedules indicate a significant uptick in stationery demand. Recommend 40% threshold increase."
                                    : "Inventory levels aligned with historical averages. No immediate intervention required."}
                            </p>
                            <div className="mt-3 flex items-center gap-2 text-xs font-bold text-indigo-100">
                                <Info size={12} /> Confidence Score: {examSeason ? '98.2%' : '94.5%'}
                            </div>
                        </div>
                    </div>

                    {/* Chart */}
                    <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 flex-1 flex flex-col">
                        <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <TrendingUp size={20} className="text-indigo-600" /> Growth Projection
                        </h2>
                        <div className="flex-1 w-full min-h-[150px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={examSeason ? examData : data}>
                                    <defs>
                                        <linearGradient id="colorDemand" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={12} tickMargin={10} stroke="#94a3b8" />
                                    <YAxis axisLine={false} tickLine={false} fontSize={12} stroke="#94a3b8" />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                                    />
                                    <Area type="monotone" dataKey="demand" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorDemand)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Forecast;
