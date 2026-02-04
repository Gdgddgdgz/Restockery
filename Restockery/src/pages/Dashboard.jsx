import React from 'react';
import { useInventoryStore } from '../store/useInventoryStore';
import { AlertTriangle, TrendingUp, Package, ShieldCheck, Zap, ArrowRight, BrainCircuit, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const StatCard = ({ icon: Icon, label, value, subtext, color, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        className="bg-white p-6 rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-slate-100 flex items-start justify-between group hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300"
    >
        <div>
            <div className={`p-3 rounded-xl w-fit ${color} bg-opacity-10 text-opacity-100 mb-4 group-hover:scale-110 transition-transform`}>
                <Icon size={24} className={`text-${color.split('-')[1]}-600`} />
            </div>
            <h3 className="text-4xl font-extrabold text-slate-800 tracking-tight">{value}</h3>
            <p className="text-slate-500 text-sm font-semibold uppercase tracking-wide mt-2">{label}</p>
        </div>
        {subtext && (
            <div className="flex flex-col items-end">
                <div className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center gap-1">
                    <TrendingUp size={12} /> {subtext}
                </div>
            </div>
        )}
    </motion.div>
);

const Dashboard = () => {
    const { products, examSeason, toggleExamSeason, getTotalValue } = useInventoryStore();

    const totalValue = getTotalValue();
    const lowStockItems = products.filter(p => p.stock < p.minStock);

    // Premium Metrics
    const lossAvoided = examSeason ? '₹ 12,500' : '₹ 2,400';

    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">Dashboard</h1>
                    <p className="text-slate-500 font-medium text-lg flex items-center gap-2">
                        <Activity size={18} className="text-indigo-500" />
                        System Status: <span className="text-emerald-600 font-bold">Operational</span>
                    </p>
                </div>

                <button
                    onClick={toggleExamSeason}
                    className={`relative group flex items-center gap-3 pl-5 pr-6 py-3.5 rounded-xl font-bold transition-all shadow-lg overflow-hidden border ${examSeason
                            ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-white border-orange-300 shadow-orange-200'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:shadow-xl'
                        }`}
                >
                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    <Zap size={20} className={examSeason ? 'fill-current animate-pulse' : 'text-slate-400 group-hover:text-yellow-500'} />
                    <span className="tracking-tight">{examSeason ? 'SCENARIO ACTIVE: EXAMS' : 'Trigger Simulation'}</span>
                </button>
            </div>

            {/* Intelligent Alert Banner */}
            <AnimatePresence>
                {examSeason && (
                    <motion.div
                        initial={{ height: 0, opacity: 0, scale: 0.95 }}
                        animate={{ height: 'auto', opacity: 1, scale: 1 }}
                        exit={{ height: 0, opacity: 0, scale: 0.95 }}
                        className="rounded-2xl shadow-2xl overflow-hidden"
                    >
                        <div className="bg-slate-900 relative overflow-hidden">
                            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                            <div className="absolute -right-20 -top-20 w-96 h-96 bg-indigo-500 rounded-full blur-[100px] opacity-30"></div>

                            <div className="relative p-8 flex flex-col md:flex-row items-center justify-between gap-6 z-10">
                                <div className="flex items-start gap-6">
                                    <div className="bg-gradient-to-br from-rose-500 to-orange-500 p-4 rounded-2xl shadow-lg shadow-rose-900/20">
                                        <BrainCircuit size={32} className="text-white animate-pulse" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-2xl text-white tracking-tight">Predictive Intervention Triggered</h3>
                                        <p className="text-slate-300 font-medium mt-1 text-lg">
                                            "Final Exams" detected in <span className="text-white font-bold decoration-orange-400 underline decoration-2 underline-offset-4">0.5km radius</span>.
                                        </p>
                                        <p className="text-slate-400 text-sm mt-2">
                                            Auto-adjusting inventory thresholds to prevent stockouts.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <div className="text-right">
                                        <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Estimated Impact</div>
                                        <div className="text-3xl font-extrabold text-white">₹ 12,500 <span className="text-lg text-emerald-400 font-medium">Saved</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    icon={Package}
                    label="Inventory Valuation"
                    value={`₹ ${totalValue.toLocaleString()}`}
                    color="bg-blue-600"
                    delay={0.1}
                    subtext="+12% WoW"
                />
                <StatCard
                    icon={ShieldCheck}
                    label="Efficiency Gains"
                    value={lossAvoided}
                    color="bg-emerald-500"
                    delay={0.2}
                />
                <StatCard
                    icon={AlertTriangle}
                    label="Critical Actions"
                    value={lowStockItems.length}
                    color={lowStockItems.length > 0 ? "bg-rose-500" : "bg-slate-400"}
                    delay={0.3}
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Actionable Insights */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-slate-100 p-8">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                Supply Chain Alerts
                            </h2>
                            <p className="text-slate-500 text-sm mt-1">Prioritized by revenue impact.</p>
                        </div>
                        {lowStockItems.length > 0 && (
                            <span className="bg-rose-50 text-rose-600 px-3 py-1 rounded-full text-xs font-extrabold tracking-wide uppercase border border-rose-100">
                                {lowStockItems.length} Urgent Items
                            </span>
                        )}
                    </div>

                    {lowStockItems.length === 0 ? (
                        <div className="text-center py-16 bg-slate-50/50 rounded-2xl border-2 border-dashed border-slate-100">
                            <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <ShieldCheck size={32} className="text-emerald-600" />
                            </div>
                            <h3 className="text-slate-900 font-bold text-lg">All Systems Nominal</h3>
                            <p className="text-slate-500">Inventory levels are optimized.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {lowStockItems.map((product) => (
                                <div key={product.id} className="group flex items-center justify-between p-5 rounded-2xl border border-slate-100 hover:border-indigo-600 hover:shadow-lg transition-all duration-300 cursor-pointer bg-white">
                                    <div className="flex items-center gap-5">
                                        <div className="h-14 w-14 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center font-bold text-slate-400 text-xs shadow-inner">
                                            IMG
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 text-lg group-hover:text-indigo-700 transition-colors">{product.name}</h4>
                                            <div className="flex items-center gap-3 mt-1 text-sm">
                                                <span className="font-semibold text-slate-500">Current: <span className="text-rose-600 font-bold">{product.stock}</span></span>
                                                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                                <span className="font-semibold text-slate-500">Required: {product.minStock}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="flex items-center gap-2 pl-5 pr-4 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-xl shadow-lg shadow-slate-200 group-hover:bg-indigo-600 group-hover:shadow-indigo-200 transition-all transform group-hover:-translate-y-0.5">
                                        Auto-Restock <ArrowRight size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* AI Logic Visualizer */}
                <div className="bg-gradient-to-b from-indigo-900 via-indigo-900 to-slate-900 rounded-2xl p-8 text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-indigo-500 rounded-full blur-[80px] opacity-25"></div>
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-fuchsia-500 rounded-full blur-[80px] opacity-20"></div>

                    <h3 className="relative font-bold text-lg mb-8 flex items-center gap-3 tracking-wide">
                        <BrainCircuit className="text-indigo-400" /> NEURAL ENGINE
                    </h3>

                    <div className="relative space-y-8">
                        <div className="flex gap-5 relative">
                            <div className="flex flex-col items-center">
                                <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.8)] z-10"></div>
                                <div className="w-0.5 h-full bg-indigo-500/30 absolute top-3"></div>
                            </div>
                            <div>
                                <div className="text-xs font-bold text-indigo-300 uppercase tracking-widest mb-1">Sync Complete</div>
                                <p className="text-base font-medium text-slate-100">Regional Calendar Analysis</p>
                                <p className="text-xs text-indigo-300 mt-1">Processed 14 Local Events</p>
                            </div>
                        </div>

                        <div className="flex gap-5">
                            <div className="flex flex-col items-center">
                                <div className={`w-3 h-3 rounded-full shadow-[0_0_15px_rgba(244,63,94,0.8)] z-10 ${examSeason ? 'bg-rose-500 animate-pulse' : 'bg-slate-600'}`}></div>
                            </div>
                            <div>
                                <div className="text-xs font-bold text-indigo-300 uppercase tracking-widest mb-1">Real-time Inference</div>
                                <p className="text-base font-medium text-slate-100">
                                    {examSeason ? "Demand Spikes Detected." : "Standard Pattern Matching."}
                                </p>
                                {examSeason && (
                                    <div className="mt-2 inline-block px-2 py-1 bg-white/10 rounded text-xs font-mono text-indigo-200 border border-white/5">
                                        Confidence: 98.4%
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="pt-6 border-t border-white/10">
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Upcoming Horizon</div>
                            <div className="font-bold text-xl text-white">Holi Festival</div>
                            <div className="text-sm text-indigo-300">March 15 • +140% Colors Demand</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
