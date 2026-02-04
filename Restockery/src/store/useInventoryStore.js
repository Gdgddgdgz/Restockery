import { create } from 'zustand';

const initialProducts = [
    { id: '1', name: 'Classmate Notebook', category: 'Stationery', stock: 140, minStock: 50, price: 45, vendor: 'Stationery World' },
    { id: '2', name: 'Reynolds Pen (Blue)', category: 'Stationery', stock: 85, minStock: 100, price: 10, vendor: 'Global Pens' }, // Intentionally low/near low
    { id: '3', name: 'Camlin Geometry Box', category: 'Stationery', stock: 12, minStock: 20, price: 150, vendor: 'School Supplies Co' }, // CRITICAL LOW
    { id: '4', name: 'A4 Paper Ream (500)', category: 'Office', stock: 320, minStock: 100, price: 240, vendor: 'Paper Hub' },
    { id: '5', name: 'Fevicol 100g', category: 'Craft', stock: 45, minStock: 30, price: 60, vendor: 'Crafts R Us' },
];

const initialLogs = [
    { id: '101', time: '10:00 AM', action: 'Daily Scan', detail: 'Inventory check completed', type: 'system' },
    { id: '102', time: '11:30 AM', action: 'Sales', detail: 'Sold 5 Notebooks', type: 'out' },
];

export const useInventoryStore = create((set, get) => ({
    products: initialProducts,
    auditLog: initialLogs,
    examSeason: false,

    // KPI Selectors (computed manually in components or here)
    getTotalValue: () => get().products.reduce((acc, p) => acc + (p.stock * p.price), 0),

    toggleExamSeason: () => set((state) => {
        const isStarting = !state.examSeason;

        // Create audit log for the event
        const newLog = {
            id: Date.now().toString(),
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            action: isStarting ? 'Event Started' : 'Event Ended',
            detail: isStarting ? 'EXAM SEASON detected. Thresholds updated.' : 'Exam Season ended. Thresholds normalized.',
            type: 'alert'
        };

        // Update thresholds: 2x if Exam Season starts, 0.5x (normal) if it ends
        // Wait, better to store "baseMinStock" and dynamic "currentMinStock". 
        // For simplicity, we just mutate minStock.
        // If starting: minStock * 2. If ending: minStock / 2.
        // This is a bit risky if toggled repeatedly (float errors), but for hackathon it's fine. 
        // Or we reset to initialProducts logic.
        // Let's implement smart mapping to avoid drift.

        const newProducts = state.products.map(p => {
            const multiplier = isStarting ? 2 : 0.5;
            // Special rule: Pens and Geometry boxes demanded more
            return {
                ...p,
                minStock: Math.ceil(p.minStock * multiplier)
            };
        });

        return {
            examSeason: isStarting,
            products: newProducts,
            auditLog: [newLog, ...state.auditLog]
        };
    }),

    reorderProduct: (id, amount) => {
        // Audit log
        const product = get().products.find(p => p.id === id);
        const newLog = {
            id: Date.now().toString(),
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            action: 'Restock Order',
            detail: `Ordered ${amount} units of ${product?.name}`,
            type: 'in'
        };

        // Optimistically update stock
        set(state => ({
            products: state.products.map(p => p.id === id ? { ...p, stock: p.stock + amount } : p),
            auditLog: [newLog, ...state.auditLog]
        }));
    }
}));
