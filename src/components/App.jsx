import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Import Modular Components
import Login from './Login';
import Sidebar from './Sidebar';
import Header from './Header';
import DashboardTab from './DashboardTab';
import EventsTab from './EventsTab';
import ModerationTab from './ModerationTab';
import EventFormModal from './EventFormModal';
import AttendeesModal from './AttendeesModal';

// Initialize Supabase Client
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function App() {
  // Authentication states
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem("dbu_admin_logged_in") === "true"
  );
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  const [adminProfile, setAdminProfile] = useState(null);

  // Tab & Data states
  const [currentTab, setCurrentTab] = useState("dashboard");
  const [events, setEvents] = useState([]);
  const [reports, setReports] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLiveMode, setIsLiveMode] = useState(false);

  // Modal & Edit states
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedAttendees, setSelectedAttendees] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isEditing, setIsEditing] = useState(null);

  // New event form state
  const [formTitle, setFormTitle] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formDateTime, setFormDateTime] = useState("");
  const [formEndTime, setFormEndTime] = useState("");
  const [formLocation, setFormLocation] = useState("");
  const [formImageUrl, setFormImageUrl] = useState("");
  const [formTags, setFormTags] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      fetchLiveDashboardData();
      fetchAdminProfile();
    }
  }, [isLoggedIn]);

  async function fetchAdminProfile() {
    try {
      const { data: { user }, error: userErr } = await supabase.auth.getUser();
      if (userErr || !user) {
        setAdminProfile({
          name: "Gech",
          email: "gech@dbu.edu.et",
          department: "Computing",
          photo: ""
        });
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profile) {
        setAdminProfile({
          name: profile.name || user.email.split('@')[0],
          email: user.email,
          department: profile.department || 'Administrator',
          photo: profile.photos?.[0] || ""
        });
      } else {
        setAdminProfile({
          name: user.email.split('@')[0],
          email: user.email,
          department: 'Administrator',
          photo: ""
        });
      }
    } catch (err) {
      console.warn("Could not fetch admin details:", err);
      setAdminProfile({
        name: "Gech",
        email: "gech@dbu.edu.et",
        department: "Computing",
        photo: ""
      });
    }
  }

  async function handleLogin(e) {
    e.preventDefault();
    if (!loginEmail.trim() || !loginPassword.trim()) return;

    setAuthLoading(true);
    setAuthError("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword
      });

      if (error) throw error;

      if (data?.user) {
        const { data: profile, error: profileErr } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();

        if (profileErr) {
          throw new Error("Your authentication succeeded, but we could not find an associated DBU profile for this user account. Please check your DB setup.");
        }

        if (profile?.is_admin) {
          setAdminProfile({
            name: profile.name || data.user.email.split('@')[0],
            email: data.user.email,
            department: profile.department || 'Administrator',
            photo: profile.photos?.[0] || ""
          });
          setIsLoggedIn(true);
          localStorage.setItem("dbu_admin_logged_in", "true");
          setLoginEmail("");
          setLoginPassword("");
          setAuthError("");
        } else {
          throw new Error("Access Denied: Only DBU Connect administrators are authorized to access this portal.");
        }
      } else {
        throw new Error("Authentication failed: User profile object empty.");
      }
    } catch (err) {
      setAuthError(err.message || "Authentication failed. Please verify credentials.");
    } finally {
      setAuthLoading(false);
    }
  }

  function handleLogout() {
    setIsLoggedIn(false);
    localStorage.removeItem("dbu_admin_logged_in");
    supabase.auth.signOut().catch(() => { });
  }

  async function fetchLiveDashboardData() {
    setLoading(true);
    try {
      const { data: dbEvents, error: eventErr } = await supabase
        .from('events')
        .select('*')
        .order('date_time', { ascending: true });

      if (eventErr) throw eventErr;

      const { data: dbReports, error: reportErr } = await supabase
        .from('reports')
        .select('*')
        .order('created_at', { ascending: false });

      if (reportErr) throw reportErr;

      if (dbEvents && dbEvents.length > 0) {
        const mappedEvents = dbEvents.map(e => ({
          ...e,
          tags: Array.isArray(e.tags) ? e.tags : (e.tags ? e.tags.split(',') : []),
          date_time: typeof e.date_time === 'number' ? e.date_time : new Date(e.date_time).getTime(),
          end_time: e.end_time ? (typeof e.end_time === 'number' ? e.end_time : new Date(e.end_time).getTime()) : null,
        }));
        setEvents(mappedEvents);
        setIsLiveMode(true);
      } else {
        setEvents([]);
        setIsLiveMode(true);
      }

      if (dbReports && dbReports.length > 0) {
        setReports(dbReports);
      } else {
        setReports([]);
      }

    } catch (err) {
      console.warn("Supabase database offline or connection error:", err);
      setEvents([]);
      setReports([]);
      setIsLiveMode(false);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateOrUpdateEvent(e) {
    e.preventDefault();
    if (!formTitle.trim() || !formLocation.trim()) return;

    setLoading(true);
    const eventPayload = {
      title: formTitle,
      description: formDesc,
      date_time: new Date(formDateTime).getTime(),
      end_time: formEndTime ? new Date(formEndTime).getTime() : null,
      location: formLocation,
      image_url: formImageUrl || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600",
      tags: formTags.split(',').map(t => t.trim()).filter(Boolean),
      rsvp_status: "NONE",
      attendee_count: isEditing ? isEditing.attendee_count : 0,
      attendees_from_dept: isEditing ? isEditing.attendees_from_dept : 0
    };

    try {
      if (isEditing) {
        if (isLiveMode) {
          const { error } = await supabase
            .from('events')
            .update(eventPayload)
            .eq('id', isEditing.id);
          if (error) throw error;
        }
        setEvents(prev => prev.map(evt => evt.id === isEditing.id ? { ...evt, ...eventPayload } : evt));
      } else {
        const localId = "event_" + Math.random().toString(36).substr(2, 9);
        const newPayload = { ...eventPayload, id: localId };

        if (isLiveMode) {
          const { data, error } = await supabase
            .from('events')
            .insert([eventPayload])
            .select();
          if (error) throw error;
          if (data && data[0]) {
            newPayload.id = data[0].id;
          }
        }
        setEvents(prev => [newPayload, ...prev]);
      }

      closeFormModal();
      await fetchLiveDashboardData();
    } catch (err) {
      console.error("Failed to write event:", err);
      alert("Error saving event: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteEvent(id) {
    if (!confirm("Are you sure you want to delete this event? This will remove it from all DBU student devices instantly.")) return;

    setLoading(true);
    try {
      if (isLiveMode && !id.startsWith("event_")) {
        const { error } = await supabase
          .from('events')
          .delete()
          .eq('id', id);
        if (error) throw error;
      }
      setEvents(prev => prev.filter(e => e.id !== id));
    } catch (err) {
      console.error("Failed to delete event:", err);
      alert("Error deleting event: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleReportAction(id, newStatus) {
    setLoading(true);
    try {
      if (isLiveMode && !id.startsWith("rep_")) {
        const { error } = await supabase
          .from('reports')
          .update({ status: newStatus })
          .eq('id', id);
        if (error) throw error;
      }
      setReports(prev => prev.map(rep => rep.id === id ? { ...rep, status: newStatus } : rep));
    } catch (err) {
      console.error("Failed to action report:", err);
      alert("Error updating report: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  function openEditModal(event) {
    setIsEditing(event);
    setFormTitle(event.title);
    setFormDesc(event.description);
    setFormDateTime(new Date(event.date_time).toISOString().slice(0, 16));
    setFormEndTime(event.end_time ? new Date(event.end_time).toISOString().slice(0, 16) : "");
    setFormLocation(event.location);
    setFormImageUrl(event.image_url);
    setFormTags(event.tags.join(', '));
    setShowAddModal(true);
  }

  function closeFormModal() {
    setShowAddModal(false);
    setIsEditing(null);
    setFormTitle("");
    setFormDesc("");
    setFormDateTime("");
    setFormEndTime("");
    setFormLocation("");
    setFormImageUrl("");
    setFormTags("");
  }

  async function openAttendeesModal(event) {
    setSelectedEvent(event);
    setSelectedAttendees([]);

    try {
      const { data, error } = await supabase
        .from('event_rsvps')
        .select(`
          status,
          profiles (name, department, year, photos)
        `)
        .eq('event_id', event.id);

      if (error) throw error;
      if (data) {
        const mapped = data.map(row => ({
          name: row.profiles?.name || 'Anonymous Student',
          department: row.profiles?.department || 'Computing',
          year: row.profiles?.year || 1,
          status: row.status || 'GOING',
          photo: row.profiles?.photos?.[0] || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200"
        }));
        setSelectedAttendees(mapped);
      }
    } catch (err) {
      console.warn("Could not load attendees dynamically:", err);
    }
  }

  // Dynamic Charting Calculations
  const COLLEGE_BAR_DATA = [
    { name: 'Computing', count: events.filter(e => e.tags?.some(t => t.toLowerCase().includes('computing') || t.toLowerCase().includes('coding') || t.toLowerCase().includes('hackathon'))).reduce((sum, e) => sum + (e.attendee_count || 0), 0), color: '#14b8a6' },
    { name: 'Medicine', count: events.filter(e => e.tags?.some(t => t.toLowerCase().includes('medicine') || t.toLowerCase().includes('health') || t.toLowerCase().includes('seminar'))).reduce((sum, e) => sum + (e.attendee_count || 0), 0), color: '#f43f5e' },
    { name: 'Engineering', count: events.filter(e => e.tags?.some(t => t.toLowerCase().includes('engineering') || t.toLowerCase().includes('workshop'))).reduce((sum, e) => sum + (e.attendee_count || 0), 0), color: '#6366f1' },
    { name: 'Business', count: events.filter(e => e.tags?.some(t => t.toLowerCase().includes('business') || t.toLowerCase().includes('social') || t.toLowerCase().includes('music') || t.toLowerCase().includes('bonfire'))).reduce((sum, e) => sum + (e.attendee_count || 0), 0), color: '#f59e0b' }
  ];

  const CHART_ANALYTICS_DATA = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map(monthName => {
    const monthIndex = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].indexOf(monthName);
    const monthEvents = events.filter(e => new Date(e.date_time).getMonth() === monthIndex);
    const totalRSVPs = monthEvents.reduce((sum, e) => sum + (e.attendee_count || 0), 0);
    return { name: monthName, RSVPs: totalRSVPs, Events: monthEvents.length };
  });

  const filteredEvents = events.filter(e =>
    e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isLoggedIn) {
    return (
      <Login
        handleLogin={handleLogin}
        loginEmail={loginEmail}
        setLoginEmail={setLoginEmail}
        loginPassword={loginPassword}
        setLoginPassword={setLoginPassword}
        authError={authError}
        authLoading={authLoading}
      />
    );
  }

  return (
    <div className="app-container">
      <Sidebar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        adminProfile={adminProfile}
        handleLogout={handleLogout}
      />

      <main className="main-content">
        <Header
          currentTab={currentTab}
          isLiveMode={isLiveMode}
          fetchLiveDashboardData={fetchLiveDashboardData}
          loading={loading}
          setShowAddModal={setShowAddModal}
        />

        {currentTab === "dashboard" && (
          <DashboardTab
            events={events}
            reports={reports}
            CHART_ANALYTICS_DATA={CHART_ANALYTICS_DATA}
            COLLEGE_BAR_DATA={COLLEGE_BAR_DATA}
            setCurrentTab={setCurrentTab}
          />
        )}

        {currentTab === "events" && (
          <EventsTab
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filteredEvents={filteredEvents}
            openAttendeesModal={openAttendeesModal}
            openEditModal={openEditModal}
            handleDeleteEvent={handleDeleteEvent}
          />
        )}

        {currentTab === "moderation" && (
          <ModerationTab
            reports={reports}
            handleReportAction={handleReportAction}
          />
        )}
      </main>

      {/* Dynamic Overlay Dialogs */}
      {showAddModal && (
        <EventFormModal
          isEditing={isEditing}
          closeFormModal={closeFormModal}
          handleCreateOrUpdateEvent={handleCreateOrUpdateEvent}
          formTitle={formTitle}
          setFormTitle={setFormTitle}
          formDesc={formDesc}
          setFormDesc={setFormDesc}
          formDateTime={formDateTime}
          setFormDateTime={setFormDateTime}
          formEndTime={formEndTime}
          setFormEndTime={setFormEndTime}
          formLocation={formLocation}
          setFormLocation={setFormLocation}
          formImageUrl={formImageUrl}
          setFormImageUrl={setFormImageUrl}
          formTags={formTags}
          setFormTags={setFormTags}
          loading={loading}
        />
      )}

      {selectedEvent && (
        <AttendeesModal
          selectedEvent={selectedEvent}
          setSelectedEvent={setSelectedEvent}
          selectedAttendees={selectedAttendees}
        />
      )}
    </div>
  );
}
