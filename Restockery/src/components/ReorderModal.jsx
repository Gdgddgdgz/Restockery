import React, { useState, useEffect } from 'react';
import { MessageCircle, Check, Loader, Star, X } from 'lucide-react';
import { useInventoryStore } from '../store/useInventoryStore';
import toast from 'react-hot-toast';

const ReorderModal = ({ isOpen, onClose, product }) => {
    const { reorderProduct } = useInventoryStore();
    const [step, setStep] = useState(1); // 1: Vendor, 2: Preview, 3: Sending
    const [selectedVendor, setSelectedVendor] = useState(null);

    useEffect(() => {
        if (isOpen) setStep(1);
    }, [isOpen]);

    if (!isOpen || !product) return null;

    // Mock Vendors relevant to product category
    const vendors = [
        { id: 1, name: product.vendor || 'Best Supplies', rating: 4.8, price: product.price, time: '2 hrs' },
        { id: 2, name: 'Wholesale Depot', rating: 4.5, price: product.price - 2, time: '1 day' },
        { id: 3, name: 'QuickStox', rating: 4.2, price: product.price + 5, time: '30 mins' },
    ];

    const handleSend = () => {
        setStep(3);
        // Simulate Network/WhatsApp delay
        setTimeout(() => {
            reorderProduct(product.id, 50); // Default reorder qty
            toast.success(`Order placed with ${selectedVendor.name}! Stock updated.`);
            onClose();
        }, 2000);
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="bg-slate-50 p-4 border-b border-slate-100 flex justify-between items-center">
                    <h2 className="font-bold text-lg text-slate-800">Restock {product.name}</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
                </div>

                {/* Content */}
                <div className="p-6">
                    {step === 1 && (
                        <div className="space-y-4">
                            <p className="text-sm text-slate-500 mb-2">Select a vendor to message:</p>
                            {vendors.map(v => (
                                <div
                                    key={v.id}
                                    onClick={() => { setSelectedVendor(v); setStep(2); }}
                                    className="border border-slate-200 rounded-xl p-4 hover:border-blue-500 hover:bg-blue-50 cursor-pointer transition-all flex justify-between items-center group"
                                >
                                    <div>
                                        <h3 className="font-bold text-slate-800 group-hover:text-blue-700">{v.name}</h3>
                                        <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                                            <Star size={12} className="fill-amber-400 text-amber-400" /> {v.rating} • ⚡ {v.time}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-slate-900">₹{v.price}</div>
                                        <div className="text-xs text-slate-400">/unit</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {step === 2 && selectedVendor && (
                        <div className="space-y-4">
                            <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                                <div className="flex items-center gap-2 mb-2 text-green-800 font-bold text-sm">
                                    <MessageCircle size={16} /> WhatsApp Preview
                                </div>
                                <p className="text-sm text-slate-700 font-mono bg-white p-3 rounded border border-green-100">
                                    Hi {selectedVendor.name}, I need 50 units of {product.name}.
                                    Last price was ₹{selectedVendor.price}. Can you confirm delivery by 4 PM?
                                </p>
                            </div>
                            <button
                                onClick={handleSend}
                                className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-green-200"
                            >
                                Send Message <MessageCircle size={20} />
                            </button>
                            <button onClick={() => setStep(1)} className="w-full py-2 text-slate-400 text-sm hover:text-slate-600">Back</button>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="text-center py-8">
                            <Loader className="animate-spin mx-auto text-blue-600 mb-4" size={32} />
                            <h3 className="font-bold text-slate-800">Contacting Vendor...</h3>
                            <p className="text-slate-500 text-sm">Waiting for WhatsApp confirmation</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReorderModal;
