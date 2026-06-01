# 📅 DBU Connect | Campus Admin & Events Portal

Welcome to the **DBU Connect Admin Portal**—a state-of-the-art, high-fidelity administrative suite designed exclusively to schedule, audit, and manage campus events, match rates, and student profile moderation logs at Debre Berhan University.

This application is built in a separate, isolated directory (`/web-dashboard`) to keep the codebase modular, clean, and distinct from the native Android client codebase.

---

## 🚀 Key Features

*   **📊 Overview Analytics:** Live KPI cards tracking scheduled events, cumulative RSVPs across colleges, open reports, and average spark rates. Includes responsive **Recharts** displaying monthly engagement curves and college registration bar metrics.
*   **📅 Full Event CRUD:** Schedule acoustic nights, computing hackathons, and medical seminars directly to your Supabase backend. Includes location, title, custom cover banners, timestamps, and tags.
*   **👥 Live RSVP Sheets:** Click any event card to slide in a detailed modal displaying the profiles of students attending (name, profile photo, department, and current year).
*   **🛡️ Moderation Center:** Real-time access to student report logs. Admins can audit reports submitted by DBU students and either keep/dismiss profiles or lock/ban offending accounts instantly.
*   **⚡ Smart Dual-Mode Failsafe:** Auto-detects Supabase credentials. If your remote tables are empty or network access is limited, the app **automatically loads a premium mock demo dataset** so it remains 100% operational immediately!

---

## ⚙️ How to Run Locally

1.  **Navigate to the folder:**
    ```bash
    cd web-dashboard
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Launch the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:5173](http://localhost:5173) in your web browser.

---

## ☁️ Deploying to Vercel (1-Click)

The dashboard is pre-configured with `vercel.json` rewrite rules for Single Page Application (SPA) routing, making Vercel hosting seamless.

### Option A: Vercel CLI
```bash
npm install -g vercel
vercel
```

### Option B: Vercel Dashboard (Recomended)
1. Push your code to your GitHub repository.
2. Go to **[Vercel](https://vercel.com/)** and click **"Add New Project"**.
3. Select your repository.
4. Set the **Root Directory** to `web-dashboard` (Vercel will auto-configure build commands `npm run build` and output directory `dist`!).
5. Add the following **Environment Variables** (optional, fallback credentials are pre-packaged for zero-config success):
   * `VITE_SUPABASE_URL`
   * `VITE_SUPABASE_ANON_KEY`
6. Click **Deploy**!

---

## 🛠️ Database Schema Integration

The web app interfaces with the following Supabase PostgreSQL tables:
*   `public.events` (CRUD for schedules)
*   `public.event_rsvps` (Reads attendees)
*   `public.profiles` (Reads attendee profile metadata)
*   `public.reports` (Audits student feedback)
