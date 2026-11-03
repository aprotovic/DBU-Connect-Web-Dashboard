# 📅 DBU Connect | Campus Admin & Events Portal

[![Vite](https://img.shields.io/badge/Bundler-Vite-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev)
[![React](https://img.shields.io/badge/Frontend-React%2018-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Supabase](https://img.shields.io/badge/Database-Supabase%20PostgreSQL-3ECF8E?style=flat&logo=supabase&logoColor=white)](https://supabase.com)

The central web administrative dashboard for **Debre Berhan University's** campus ecosystem. Designed to manage university-wide events, track live student RSVPs across colleges, and audit student moderation feedback logs.

---

## ✨ Features

- **📊 Live Campus Analytics:** Dynamic KPI overview displaying scheduled seminars, total student RSVPs by college, and engagement trends rendered with **Recharts**.
- **📅 Full Event Lifecycle (CRUD):** Schedule academic conferences, computing hackathons, and cultural nights directly to Supabase PostgreSQL.
- **👥 Slide-In RSVP Sheets:** Detailed attendee inspection modals detailing student names, university departments, and academic year.
- **🛡️ Moderation Center:** Real-time audit center enabling campus administrators to review reports, resolve student disputes, and manage account locks.
- **⚡ Dual-Mode Failsafe Engine:** Automatically detects Supabase network connectivity. If remote credentials are absent or network is restricted, the app loads a realistic mock dataset for zero-downtime demonstration.

---

## 🛠️ Tech Stack

- **Framework:** React 18 (TypeScript / JavaScript), Vite
- **Styling & UI:** Tailwind CSS, Lucide React Icons
- **Data Visualization:** Recharts
- **Database & Auth:** Supabase (PostgreSQL with Row Level Security)
- **Deployment:** Pre-configured with `vercel.json` for 1-click SPA hosting

---

## 🚀 Quick Start

```bash
# 1. Clone repository
git clone https://github.com/aprotovic/DBU-Connect-Web-Dashboard.git
cd DBU-Connect-Web-Dashboard

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```
Open **http://localhost:5173** in your browser.

---

## 📄 License
MIT License • Debre Berhan University Campus Tech Initiative • [aprotovic](https://github.com/aprotovic)
