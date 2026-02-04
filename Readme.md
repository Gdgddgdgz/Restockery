# 📦 Restockery - Smart SME Inventory & Supply Chain

**Restockery** is a next-generation, AI-driven inventory management prototype designed specifically for small and medium-sized retailers. Built during a 24-hour hackathon, it aims to eliminate stockouts and optimize cash flow by predicting hyperlocal demand shifts.

![Restockery Logo](/Restockery/public/logo.jpg)

Idea Video : [https://drive.google.com/file/d/1ZnQgggSV40utUENTgCyepI-k2QWkbF0K/view?usp=drive_link](url)

Demo Video : [https://drive.google.com/file/d/1_FRxWZ3nCGF8TeoJ4OJIRzvwS4oDgrPB/view?usp=drive_link](url)

## 🚀 The Vision
Small retailers often struggle with unpredictable demand during local events (Exams, Festivals, Holidays). Restockery uses **Demand Intelligence** to automatically adjust stock thresholds, ensuring retailers are always prepared for surges without over-investing in dormant inventory.

---

## ✨ Key Features

### 1. 🎮 Command Center (Smart Dashboard)
- **Neural Engine Integration**: A "Simulate Event" toggle that demonstrates real-time AI adaptation.
- **Dynamic Alert Banner**: Instant notifications when local events (like Exam Season) are detected within a 0.5km radius.
- **KPI Tracking**: Real-time visualization of "Total Inventory Value" and "Projected Revenue Saved" through AI intervention.

### 2. 🗺️ Demand Intelligence Layer (Interactive Map)
- **Hyperlocal Heatmaps**: Powered by Leaflet.js, showing demand intensity across "Educational Hubs", "Residential Sectors", and "Commercial Zones".
- **Visual Trends**: Area charts predicting demand velocity for the next 7 days based on upcoming local events.

### 3. 📦 Stock Intelligence & Audit
- **Dynamic Thresholding**: Progress bars that visually shift their "Safety Zone" based on AI predictions.
- **Immutable Ledger**: A full audit trail tracking system scans, sales, and restock orders.

### 4. 📲 Vendor Co-Pilot
- **WhatsApp Integration**: A streamlined flow to select the best-rated vendor and generate pre-filled restock messages for instant communication.
- **Actionable Alerts**: One-click "Auto-Restock" for critical items identified by the system.

---

## 🛠️ Tech Stack
- **Frontend**: React (Vite) + Tailwind CSS
- **State Internal**: Zustand (High-performance global state management)
- **Visuals**: Recharts (Analytics), Leaflet (Mapping), Framer Motion (Animations)
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

---

## 🏗️ Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- npm or yarn

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/ak1796/Restockery.git

# Navigate to project directory
cd Restockery

# Install dependencies
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to view the prototype.

---
