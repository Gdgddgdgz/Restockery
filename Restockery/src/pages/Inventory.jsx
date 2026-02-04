import React, { useState } from 'react';
import { useInventoryStore } from '../store/useInventoryStore';
import { Search, History, Package, Filter, Download, Box, AlertCircle } from 'lucide-react';
import ReorderModal from '../components/ReorderModal';

const Inventory = () => {
    const { products, auditLog, examSeason } = useInventoryStore();
    const [activeTab, setActiveTab] = useState('stock'); // 'stock' | 'audit'
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Stock Intelligence</h1>
                    <p className="text-slate-500 font-medium">Real-time SKUs and automated replenishment.</p>
                </div>

                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 shadow-sm hover:bg-slate-50 transition-colors">
                        <Download size={18} /> Export Report
                    </button>
                    <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
                        <button
                            onClick={() => setActiveTab('stock')}
                            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all shadow-sm ${activeTab === 'stock' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700 bg-transparent shadow-none'}`}
                        >
                            Live Stock
                        </button>
                        <button
                            onClick={() => setActiveTab('audit')}
                            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all shadow-sm ${activeTab === 'audit' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700 bg-transparent shadow-none'}`}
                        >
                            Audit Trails
                        </button>
                    </div>
                </div>
            </div>

            <ReorderModal
                isOpen={!!selectedProduct}
                onClose={() => setSelectedProduct(null)}
                product={selectedProduct}
            />

            {activeTab === 'stock' ? (
                <div className="bg-white rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-slate-100 overflow-hidden">
                    {/* Controls */}
                    <div className="p-5 border-b border-slate-50 flex gap-4 bg-slate-50/30">
                        <div className="relative flex-1 max-w-sm">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search SKU or Category..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2.5 w-full border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                            />
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-white bg-white shadow-sm">
                            <Filter size={16} /> Filters
                        </button>
                    </div>

                    <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-4 text-xs font-extrabold text-slate-500 uppercase tracking-wider">Product Name</th>
                                <th className="px-6 py-4 text-xs font-extrabold text-slate-500 uppercase tracking-wider">Category</th>
                                <th className="px-6 py-4 text-xs font-extrabold text-slate-500 uppercase tracking-wider w-1/3">Stock Level Analysis</th>
                                <th className="px-6 py-4 text-xs font-extrabold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filteredProducts.map(p => {
                                const stockPercent = Math.min((p.stock / (p.minStock * 2)) * 100, 100);
                                const isLow = p.stock < p.minStock;
                                return (
                                    <tr key={p.id} className="group hover:bg-indigo-50/30 transition-colors">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400">
                                                    <Box size={18} />
                                                </div>
                                                <div>
                                                    <div className="font-bold text-slate-900">{p.name}</div>
                                                    {examSeason && isLow && (
                                                        <div className="text-[10px] bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded border border-rose-200 inline-block mt-1 font-bold">
                                                            HIGH VELOCITY ITEM
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">
                                                {p.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex justify-between text-xs mb-2">
                                                <span className={`${isLow ? "text-rose-600 font-extrabold" : "text-emerald-700 font-bold"}`}>
                                                    {p.stock} Units Available
                                                </span>
                                                <span className="text-slate-400 font-medium">Threshold: {p.minStock}</span>
                                            </div>
                                            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                                                <div
                                                    className={`h-full rounded-full transition-all duration-500 ${isLow ? 'bg-gradient-to-r from-rose-500 to-red-500' : 'bg-gradient-to-r from-emerald-400 to-emerald-500'}`}
                                                    style={{ width: `${stockPercent}%` }}
                                                />
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <button
                                                onClick={() => setSelectedProduct(p)}
                                                className={`text-sm px-4 py-2 rounded-lg font-bold transition-all shadow-sm ${isLow
                                                    ? 'bg-rose-600 text-white hover:bg-rose-700 shadow-rose-200'
                                                    : 'bg-white border border-slate-200 text-slate-700 hover:border-indigo-500 hover:text-indigo-600'
                                                    }`}
                                            >
                                                {isLow ? 'Auto-Restock' : 'Order'}
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="bg-white rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-slate-100 overflow-hidden">
                    <div className="p-6 border-b border-slate-50 bg-slate-50/30">
                        <h3 className="font-bold text-slate-800">Immutable Ledger</h3>
                    </div>
                    <div className="divide-y divide-slate-50">
                        {auditLog.map((log) => (
                            <div key={log.id} className="p-5 flex items-start gap-4 hover:bg-slate-50 transition-colors">
                                <div className={`mt-1 p-2.5 rounded-xl border ${log.type === 'alert' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                    log.type === 'in' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-blue-50 text-blue-600 border-blue-100'
                                    }`}>
                                    {log.type === 'alert' ? <AlertCircle size={18} /> : log.type === 'in' ? <Package size={18} /> : <History size={18} />}
                                </div>
                                <div>
                                    <div className="flex items-center gap-3">
                                        <span className="font-bold text-slate-900">{log.action}</span>
                                        <span className="text-xs font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded">{log.time}</span>
                                    </div>
                                    <p className="text-sm font-medium text-slate-500 mt-1">{log.detail}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Inventory;
