import { useState, useMemo, Fragment } from "react";
import {
  Star,
  Clock,
  MapPin,
  Check,
  Users,
  IndianRupee,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Mail,
  Lock,
  FileCheck,
  CreditCard,
  UserPlus,
  UserMinus,
  Wallet,
  X,
  BadgeCheck,
  AlertCircle,
  Mic,
  Volume2,
  Navigation,
  Smartphone,
  HeartHandshake,
  MessageCircle,
  Phone,
  Pencil,
} from "lucide-react";

const COOP = {
  name: "Shakti Home Services Cooperative",
  region: "Lucknow, Uttar Pradesh",
};

const CATEGORY_COLOR = {
  "Home cleaning": "#3E7C4A",
  Plumbing: "#3E6B9E",
  Tutoring: "#B8791F",
  "Elder care": "#A34E6B",
};

const initialWorkers = () => [
  {
    id: "w1",
    name: "Radha Devi",
    email: "radha.devi@example.com",
    skill: "Home cleaning",
    rating: 4.8,
    completed: 34,
    verified: true,
    aadhaar: "XXXX-XXXX-4821",
    pan: "ABCDE1234F",
    pendingPayout: 640,
    bio: "Detail-oriented home-care professional who takes pride in a clean, welcoming space.",
    extraSkills: [
      "Kitchen deep clean",
      "Bathroom sanitisation",
      "Laundry care",
    ],
    languages: "Hindi, English",
    availability: "Mon–Sat · 9 AM–6 PM",
  },
  {
    id: "w2",
    name: "Suresh Kumar",
    email: "suresh.kumar@example.com",
    skill: "Plumbing",
    rating: 4.6,
    completed: 51,
    verified: true,
    aadhaar: "XXXX-XXXX-1190",
    pan: "PQRSX5678L",
    pendingPayout: 279,
    bio: "Experienced local plumber for everyday repairs and practical home solutions.",
    extraSkills: ["Leak detection", "Fixture fitting", "Drain cleaning"],
    languages: "Hindi, English",
    availability: "Mon–Sun · 8 AM–7 PM",
  },
  {
    id: "w3",
    name: "Anita Sharma",
    email: "anita.sharma@example.com",
    skill: "Tutoring",
    rating: 4.9,
    completed: 22,
    verified: true,
    aadhaar: "XXXX-XXXX-7734",
    pan: "MNBVC9081Z",
    pendingPayout: 0,
    bio: "Patient maths tutor focused on helping learners build confidence and strong fundamentals.",
    extraSkills: ["Exam preparation", "Science basics", "Homework support"],
    languages: "Hindi, English",
    availability: "Mon–Fri · 3 PM–8 PM",
  },
  {
    id: "w4",
    name: "Geeta Yadav",
    email: "geeta.yadav@example.com",
    skill: "Elder care",
    rating: 4.7,
    completed: 40,
    verified: false,
    aadhaar: "",
    pan: "",
    pendingPayout: 479,
    bio: "Compassionate companion-care worker, attentive to comfort, routine, and dignity.",
    extraSkills: [
      "Meal support",
      "Medication reminders",
      "Mobility assistance",
    ],
    languages: "Hindi, Bhojpuri",
    availability: "Mon–Sat · 10 AM–5 PM",
  },
];

const SERVICES = [
  {
    id: "s1",
    category: "Home cleaning",
    title: "Deep home cleaning",
    price: 799,
    duration: "3 hrs",
    workerId: "w1",
  },
  {
    id: "s2",
    category: "Plumbing",
    title: "Tap & pipe repair",
    price: 349,
    duration: "1 hr",
    workerId: "w2",
  },
  {
    id: "s3",
    category: "Tutoring",
    title: "Maths tuition, class 9–10",
    price: 249,
    duration: "1 hr",
    workerId: "w3",
  },
  {
    id: "s4",
    category: "Elder care",
    title: "Daytime companion care",
    price: 599,
    duration: "4 hrs",
    workerId: "w4",
  },
];

const WORKER_SHARE = 0.8;
const makeOtp = () => String(Math.floor(100000 + Math.random() * 900000));
const SLOTS = [
  "Today, 4:00 PM",
  "Today, 6:30 PM",
  "Tomorrow, 10:00 AM",
  "Tomorrow, 2:00 PM",
];

const seedBookings = () => [
  {
    id: "b1",
    serviceId: "s1",
    workerId: "w1",
    consumer: "Meena Kapoor",
    slot: "Mon, 11:00 AM",
    status: "Completed",
    rating: 5,
    review: "Very thorough, on time.",
    price: 799,
  },
  {
    id: "b2",
    serviceId: "s2",
    workerId: "w2",
    consumer: "Arvind Rao",
    slot: "Mon, 3:00 PM",
    status: "Completed",
    rating: 4,
    review: "Fixed it quickly.",
    price: 349,
  },
  {
    id: "b3",
    serviceId: "s4",
    workerId: "w4",
    consumer: "Farah Khan",
    slot: "Tue, 9:00 AM",
    status: "Completed",
    rating: 5,
    review: "Extremely caring.",
    price: 599,
  },
];

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600&display=swap');
.svc * { box-sizing: border-box; }
.svc {
  --bg: #F6F1E4; --surface: #FFFFFF; --ink: #21271F; --muted: #6E6F5E;
  --forest: #2E5233; --forest-2: #1B3721; --ochre: #B87A1F; --border: #E5DFCB; --soft: #EAF0E6;
  --danger: #A34635; --danger-soft: #F5E3DE;
  font-family: 'Inter', system-ui, sans-serif; color: var(--ink);
  background: radial-gradient(circle at 1px 1px, rgba(46,82,51,0.06) 1px, transparent 0) 0 0/16px 16px, var(--bg);
  min-height: 100%; padding-bottom: 80px;
}
.svc-header { position: sticky; top: 0; z-index: 30; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; padding: 18px 28px; background: rgba(246,241,228,0.9); backdrop-filter: blur(6px); border-bottom: 1px solid var(--border); }
.svc-brand { display: flex; align-items: center; gap: 12px; }
.svc-mark { width: 38px; height: 38px; border-radius: 11px; background: linear-gradient(155deg, var(--forest), var(--forest-2)); display: flex; align-items: center; justify-content: center; box-shadow: 0 3px 10px rgba(27,55,33,0.25); }
.svc-word { font-family: 'Fraunces', serif; font-size: 20px; font-weight: 600; letter-spacing: -0.01em; line-height: 1.1; }
.svc-sub { font-size: 12px; color: var(--muted); margin-top: 1px; }
.svc-tabs { display: inline-flex; background: #EEE9D8; border: 1px solid var(--border); border-radius: 999px; padding: 4px; gap: 2px; }
.svc-tab { border: none; background: transparent; cursor: pointer; padding: 8px 14px; border-radius: 999px; font-size: 13px; font-family: inherit; color: var(--ink); transition: background .18s ease, color .18s ease; white-space: nowrap; }
.svc-tab.active { background: var(--forest); color: #fff; font-weight: 600; box-shadow: 0 2px 8px rgba(46,82,51,0.35); }
.svc-logout { font-size: 12.5px; color: var(--muted); background: none; border: none; cursor: pointer; text-decoration: underline; }
.svc-main { max-width: 980px; margin: 0 auto; padding: 38px 28px 0; }
.svc-title { font-family: 'Fraunces', serif; font-size: 26px; font-weight: 600; letter-spacing: -0.01em; }
.svc-eyebrow { font-size: 12.5px; color: var(--muted); margin-top: 4px; display: flex; align-items: center; gap: 5px; }
.svc-hero { position: relative; overflow: hidden; padding: 26px 28px; border-radius: 18px; color: #fff; background: linear-gradient(135deg, #1B3721 0%, #2E5233 62%, #467551 100%); box-shadow: 0 18px 40px rgba(27,55,33,.18); }
.svc-hero::after { content: ''; position: absolute; width: 260px; height: 260px; right: -72px; top: -130px; border-radius: 50%; background: rgba(255,255,255,.08); box-shadow: -54px 126px 0 rgba(255,255,255,.045); }
.svc-hero-copy { position: relative; z-index: 1; max-width: 560px; }
.svc-hero .svc-title { font-size: 30px; }
.svc-hero .svc-eyebrow { color: rgba(255,255,255,.76); }
.svc-trust-row { position: relative; z-index: 1; display: flex; flex-wrap: wrap; gap: 8px; margin-top: 18px; }
.svc-trust-item { display: inline-flex; align-items: center; gap: 5px; padding: 6px 9px; border-radius: 999px; font-size: 11px; font-weight: 500; background: rgba(255,255,255,.12); color: rgba(255,255,255,.92); }
.svc-section-head { display: flex; align-items: end; justify-content: space-between; gap: 12px; margin-bottom: 12px; }
.svc-section-head .svc-section-title { margin-bottom: 0; }
.svc-section-link { border: none; background: transparent; color: var(--forest); font: 600 12.5px inherit; cursor: pointer; padding: 4px; }
.svc-info-strip { display: flex; align-items: flex-start; gap: 9px; padding: 12px 14px; border: 1px solid #D5E4D2; background: var(--soft); color: var(--forest-2); border-radius: 12px; font-size: 12.5px; line-height: 1.45; margin-top: 14px; }
.svc-info-strip span { color: var(--muted); }
.svc-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 22px; }
@media (max-width: 620px) { .svc-grid { grid-template-columns: 1fr; } }
.svc-card { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 18px 18px 18px 20px; position: relative; overflow: hidden; transition: transform .18s ease, box-shadow .18s ease; }
.svc-card::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 4px; background: var(--accent); }
.svc-card:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(33,39,31,0.10); }
.svc-chip { font-size: 10.5px; font-weight: 600; color: var(--accent); }
.svc-card-title { font-size: 15.5px; font-weight: 600; margin-top: 3px; }
.svc-meta { display: flex; align-items: center; gap: 12px; font-size: 12.5px; color: var(--muted); margin-top: 8px; }
.svc-meta-item { display: flex; align-items: center; gap: 4px; }
.svc-card-foot { display: flex; align-items: center; justify-content: space-between; margin-top: 14px; }
.svc-card-actions { display: flex; align-items: center; gap: 8px; }
.svc-link-btn { border: none; background: transparent; color: var(--forest); cursor: pointer; padding: 7px 2px; font: 600 12px inherit; }
.svc-price { font-size: 17px; font-weight: 600; display: flex; align-items: center; }
.svc-btn { border: none; cursor: pointer; font-family: inherit; font-weight: 600; font-size: 13.5px; border-radius: 9px; padding: 9px 16px; background: linear-gradient(155deg, var(--forest), var(--forest-2)); color: #fff; display: inline-flex; align-items: center; gap: 6px; transition: box-shadow .18s ease, transform .12s ease; box-shadow: 0 2px 6px rgba(46,82,51,0.3); }
.svc-btn:hover { box-shadow: 0 4px 14px rgba(46,82,51,0.42); }
.svc-btn:active { transform: scale(0.97); }
.svc-btn:disabled { opacity: 0.45; cursor: not-allowed; box-shadow: none; }
.svc-btn.ochre { background: linear-gradient(155deg, var(--ochre), #8f5b12); box-shadow: 0 2px 6px rgba(184,121,31,0.35); }
.svc-btn.danger { background: linear-gradient(155deg, var(--danger), #7a3527); box-shadow: 0 2px 6px rgba(163,70,53,0.3); }
.svc-btn.ghost { background: transparent; color: var(--muted); box-shadow: none; font-weight: 500; padding: 9px 6px; }
.svc-btn.full { width: 100%; justify-content: center; padding: 11px; }
.svc-section { margin-top: 34px; }
.svc-section-title { font-size: 15px; font-weight: 600; margin-bottom: 12px; }
.svc-row { background: var(--surface); border: 1px solid var(--border); border-radius: 14px; padding: 15px 16px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; margin-bottom: 8px; transition: box-shadow .18s ease, transform .18s ease; }
.svc-row:hover { box-shadow: 0 8px 18px rgba(33,39,31,0.07); transform: translateY(-1px); }
.svc-row-title { font-size: 14px; font-weight: 600; display: flex; align-items: center; gap: 6px; }
.svc-row-meta { font-size: 12px; color: var(--muted); margin-top: 2px; }
.svc-pill { font-size: 11px; padding: 4px 11px; border-radius: 999px; font-weight: 600; white-space: nowrap; }
.svc-pill.requested { background: #F3E4C4; color: #8A5A0E; }
.svc-pill.confirmed { background: #DCEBDD; color: var(--forest-2); }
.svc-pill.completed { background: #E7E2D2; color: #514E3F; }
.svc-pill.verified { background: #DCEBDD; color: var(--forest-2); }
.svc-pill.unverified { background: var(--danger-soft); color: var(--danger); }
.svc-stars { display: inline-flex; align-items: center; gap: 3px; font-size: 13px; }
.svc-stat-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
@media (max-width: 620px) { .svc-stat-grid { grid-template-columns: 1fr 1fr; } }
.svc-stat { background: var(--surface); border: 1px solid var(--border); border-radius: 13px; padding: 14px; transition: transform .18s ease; }
.svc-stat:hover { transform: translateY(-2px); }
.svc-stat-num { font-family: 'Fraunces', serif; font-size: 23px; font-weight: 600; }
.svc-stat-label { font-size: 11.5px; color: var(--muted); margin-top: 1px; }
.svc-panel { background: var(--surface); border: 1px solid var(--border); border-radius: 14px; padding: 18px 20px; }
.svc-bar-track { height: 10px; border-radius: 999px; background: #EDE8D8; overflow: hidden; }
.svc-bar-fill { height: 100%; border-radius: 999px; transition: width .5s cubic-bezier(.4,0,.2,1); }
.svc-modal-backdrop { position: fixed; inset: 0; z-index: 50; display: flex; align-items: center; justify-content: center; padding: 24px; background: rgba(33,39,31,0.5); backdrop-filter: blur(2px); animation: svcFade .18s ease; }
.svc-modal { position: relative; background: var(--surface); border-radius: 16px; padding: 22px; width: 100%; max-width: 400px; max-height: 88vh; overflow-y: auto; box-shadow: 0 24px 60px rgba(0,0,0,0.25); animation: svcPop .22s cubic-bezier(.34,1.56,.64,1); }
.svc-modal-close { position: absolute; top: 12px; right: 12px; width: 32px; height: 32px; display: inline-flex; align-items: center; justify-content: center; border: 1px solid var(--border); border-radius: 50%; background: #fff; color: var(--muted); cursor: pointer; padding: 0; }
.svc-modal-close:hover { background: var(--soft); color: var(--forest-2); }
.svc-modal-head { padding-right: 42px; }
@keyframes svcFade { from { opacity: 0; } to { opacity: 1; } }
@keyframes svcPop { from { opacity: 0; transform: scale(0.92) translateY(8px); } to { opacity: 1; transform: scale(1) translateY(0); } }
.svc-slot-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 10px; }
.svc-slot { border-radius: 10px; padding: 9px 10px; font-size: 12.5px; text-align: left; cursor: pointer; border: 1.5px solid var(--border); background: #fff; font-family: inherit; color: var(--ink); transition: border-color .15s ease, background .15s ease; }
.svc-slot.active { border-color: var(--forest); background: var(--soft); color: var(--forest-2); font-weight: 600; }
.svc-toast { position: fixed; bottom: 26px; left: 50%; transform: translateX(-50%); background: var(--ink); color: #fff; font-size: 13px; padding: 11px 18px; border-radius: 999px; display: flex; align-items: center; gap: 8px; z-index: 60; box-shadow: 0 10px 30px rgba(0,0,0,0.25); animation: svcRise .25s ease; }
@keyframes svcRise { from { opacity: 0; transform: translate(-50%, 10px); } to { opacity: 1; transform: translate(-50%, 0); } }
.svc-star-btn { background: none; border: none; cursor: pointer; padding: 1px; line-height: 0; }
.svc-select { font-family: inherit; font-size: 13px; padding: 8px 12px; border-radius: 9px; border: 1px solid var(--border); background: #fff; color: var(--ink); }
.svc-field { display: flex; flex-direction: column; gap: 5px; margin-top: 14px; }
.svc-field label { font-size: 12px; color: var(--muted); font-weight: 500; }
.svc-input-wrap { display: flex; align-items: center; gap: 8px; border: 1.5px solid var(--border); border-radius: 10px; padding: 10px 12px; background: #fff; }
.svc-input-wrap input { border: none; outline: none; font-family: inherit; font-size: 13.5px; width: 100%; background: transparent; color: var(--ink); }
.svc-auth-wrap { min-height: 70vh; display: flex; align-items: center; justify-content: center; padding: 24px; }
.svc-auth-card { background: var(--surface); border: 1px solid var(--border); border-radius: 18px; padding: 32px 28px; width: 100%; max-width: 380px; box-shadow: 0 20px 50px rgba(33,39,31,0.08); }
.svc-auth-toggle { display: flex; gap: 4px; background: #EEE9D8; border-radius: 999px; padding: 4px; margin-top: 20px; }
.svc-auth-toggle button { flex: 1; border: none; background: transparent; padding: 8px; border-radius: 999px; font-size: 12.5px; font-family: inherit; cursor: pointer; color: var(--ink); }
.svc-auth-toggle button.active { background: var(--forest); color: #fff; font-weight: 600; }
.svc-doc-row { display: flex; align-items: center; justify-content: space-between; padding: 10px 0; border-top: 1px solid var(--border); }
.svc-badge-verified { display: inline-flex; align-items: center; gap: 4px; font-size: 11px; font-weight: 600; color: var(--forest-2); }
.svc-badge-unverified { display: inline-flex; align-items: center; gap: 4px; font-size: 11px; font-weight: 600; color: var(--danger); }
.svc-progress-steps { display: flex; align-items: center; gap: 7px; margin: 12px 0 2px; }
.svc-progress-step { display: flex; align-items: center; gap: 6px; font-size: 11px; color: var(--muted); }
.svc-progress-dot { width: 18px; height: 18px; display: inline-flex; align-items: center; justify-content: center; border-radius: 50%; color: var(--forest-2); background: var(--soft); font-size: 10px; font-weight: 600; }
.svc-progress-line { height: 1px; width: 20px; background: var(--border); }
.svc-voice-btn { position: relative; z-index: 1; margin-top: 18px; border: 1px solid rgba(255,255,255,.28); background: rgba(255,255,255,.10); color: #fff; border-radius: 10px; padding: 10px 12px; display: inline-flex; align-items: center; gap: 8px; font: 500 12.5px inherit; cursor: pointer; }
.svc-voice-btn.recording { background: #A34635; border-color: #A34635; animation: svcPulse 1.3s ease-in-out infinite; }
@keyframes svcPulse { 50% { box-shadow: 0 0 0 7px rgba(163,70,53,.18); } }
.svc-status-track { display: flex; align-items: center; gap: 5px; margin-top: 8px; }
.svc-status-node { width: 22px; height: 22px; flex: 0 0 auto; display: inline-flex; align-items: center; justify-content: center; border-radius: 50%; background: #EEE9D8; color: var(--muted); font-size: 10px; }
.svc-status-node.done { background: var(--soft); color: var(--forest-2); }
.svc-status-node.current { background: var(--forest); color: #fff; }
.svc-status-connector { height: 2px; flex: 1; max-width: 42px; background: var(--border); }
.svc-status-connector.done { background: var(--forest); }
.svc-status-caption { display: flex; gap: 5px; font-size: 10.5px; color: var(--muted); margin-top: 4px; }
.svc-status-caption span { width: 22px; text-align: center; }
.svc-status-caption span:not(:last-child) { margin-right: 12px; }
.svc-payment-choice { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 11px 12px; margin-top: 12px; border: 1px solid var(--border); border-radius: 11px; background: #fff; font-size: 12.5px; }
.svc-payment-choice strong { display: block; font-size: 12.5px; }
.svc-payment-choice span { color: var(--muted); font-size: 11.5px; }
.svc-help-fab { position: fixed; right: 24px; bottom: 24px; z-index: 38; border: none; border-radius: 999px; padding: 12px 15px; background: linear-gradient(155deg, var(--danger), #7A3527); color: #fff; box-shadow: 0 10px 24px rgba(163,70,53,.30); display: inline-flex; align-items: center; gap: 8px; font: 600 13px inherit; cursor: pointer; }
.svc-chat { position: fixed; right: 24px; bottom: 82px; z-index: 45; width: min(370px, calc(100vw - 32px)); background: var(--surface); border: 1px solid var(--border); border-radius: 18px; overflow: hidden; box-shadow: 0 20px 48px rgba(33,39,31,.22); }
.svc-chat-head { padding: 15px 16px; display: flex; align-items: center; justify-content: space-between; color: #fff; background: linear-gradient(135deg, var(--forest-2), var(--forest)); }
.svc-chat-body { padding: 14px; max-height: 330px; overflow-y: auto; }
.svc-chat-bubble { max-width: 88%; padding: 10px 12px; margin-bottom: 10px; border-radius: 12px 12px 12px 3px; background: var(--soft); color: var(--ink); font-size: 12.5px; line-height: 1.45; }
.svc-chat-bubble.user { margin-left: auto; border-radius: 12px 12px 3px 12px; background: #EEE9D8; }
.svc-chat-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 7px; margin-top: 12px; }
.svc-chat-action { text-align: left; padding: 9px; border: 1px solid var(--border); background: #fff; border-radius: 10px; color: var(--forest-2); font: 500 11.5px inherit; cursor: pointer; }
.svc-chat-emergency { width: 100%; margin-top: 12px; padding: 10px; border: none; border-radius: 10px; background: var(--danger-soft); color: var(--danger); font: 600 12px inherit; cursor: pointer; }
.svc-otp-card { margin-top: 10px; padding: 10px 12px; border-radius: 10px; border: 1px dashed #CDB67B; background: #FFF8E9; color: #654B13; }
.svc-otp-code { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 18px; font-weight: 700; letter-spacing: .16em; margin-top: 4px; }
.svc-profile-grid { display: grid; grid-template-columns: 1.15fr .85fr; gap: 14px; margin-top: 14px; }
.svc-profile-label { color: var(--muted); font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: .05em; }
.svc-skill-tags { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 8px; }
.svc-skill-tag { display: inline-flex; align-items: center; padding: 5px 8px; border-radius: 999px; background: var(--soft); color: var(--forest-2); font-size: 11px; font-weight: 500; }
.svc-textarea { width: 100%; min-height: 86px; resize: vertical; font: inherit; font-size: 13px; line-height: 1.45; color: var(--ink); border: 1.5px solid var(--border); border-radius: 10px; padding: 10px 12px; background: #fff; }
@media (max-width: 620px) { .svc-profile-grid { grid-template-columns: 1fr; } }
@media (max-width: 620px) { .svc-help-fab { right: 16px; bottom: 16px; } .svc-chat { right: 16px; bottom: 74px; } }
@media (max-width: 620px) { .svc-main { padding: 24px 16px 0; } .svc-header { padding: 14px 16px; } .svc-hero { padding: 22px 20px; } .svc-hero .svc-title { font-size: 26px; } .svc-header > div:last-child { width: 100%; justify-content: space-between; } .svc-tabs { overflow-x: auto; max-width: 100%; } }
`;

function StatusPill({ status }) {
  const cls =
    { Requested: "requested", Confirmed: "confirmed", "In progress": "confirmed", Completed: "completed" }[
      status
    ] || "requested";
  return <span className={`svc-pill ${cls}`}>{status}</span>;
}
function Stars({ rating }) {
  return (
    <span className="svc-stars">
      <Star size={13} fill="#B8791F" color="#B8791F" />
      {rating.toFixed(1)}
    </span>
  );
}
function BookingProgress({ status }) {
  const stage = { Requested: 1, Confirmed: 2, "In progress": 2, Completed: 3 }[status] || 1;
  const steps = [
    <Clock size={11} />,
    <Navigation size={11} />,
    <Check size={11} />,
  ];
  return (
    <div aria-label={`Booking status: ${status}`}>
      <div className="svc-status-track">
        {steps.map((icon, i) => (
          <Fragment key={`step-${i}`}>
            <span
              className={`svc-status-node ${stage > i + 1 ? "done" : ""} ${
                stage === i + 1 ? "current" : ""
              }`}
            >
              {icon}
            </span>
            {i < 2 && (
              <span
                className={`svc-status-connector ${
                  stage > i + 1 ? "done" : ""
                }`}
              />
            )}
          </Fragment>
        ))}
      </div>
      <div className="svc-status-caption">
        <span>Requested</span>
        <span>In progress</span>
        <span>Done</span>
      </div>
    </div>
  );
}

export default function App() {
  const [session, setSession] = useState(null); // { role, name, email, workerId }
  const [authMode, setAuthMode] = useState("consumer");
  const [authEmail, setAuthEmail] = useState("");
  const [authPass, setAuthPass] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [publicWorkerApply, setPublicWorkerApply] = useState(false);

  const [role, setRole] = useState("consumer");
  const [bookings, setBookings] = useState(seedBookings());
  const [workers, setWorkers] = useState(initialWorkers());
  const [bookingModal, setBookingModal] = useState(null);
  const [profileModal, setProfileModal] = useState(null);
  const [ratingModal, setRatingModal] = useState(null);
  const [selectedRating, setSelectedRating] = useState(0);
  const [ratingReview, setRatingReview] = useState("");
  const [otpModal, setOtpModal] = useState(null);
  const [otpInput, setOtpInput] = useState("");
  const [chosenSlot, setChosenSlot] = useState(SLOTS[0]);
  const [activeWorker, setActiveWorker] = useState("w1");
  const [toast, setToast] = useState(null);
  const [verifyModal, setVerifyModal] = useState(null);
  const [addWorkerModal, setAddWorkerModal] = useState(false);
  const [payModal, setPayModal] = useState(null);
  const [voiceBooking, setVoiceBooking] = useState(false);
  const [helpChatOpen, setHelpChatOpen] = useState(false);
  const [helpMessages, setHelpMessages] = useState([
    {
      from: "bot",
      text: "Hi, I’m SevaSetu Help. I can help with an urgent service, an active booking, or a safety concern.",
    },
  ]);
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileDraft, setProfileDraft] = useState({
    bio: "",
    extraSkills: "",
    languages: "",
    availability: "",
  });
  const [newWorker, setNewWorker] = useState({
    name: "",
    email: "",
    skill: "Home cleaning",
    phone: "",
    experience: "",
    location: "",
    skills: "",
  });
  const [workerApplications, setWorkerApplications] = useState([]);
  const [aadhaarInput, setAadhaarInput] = useState("");
  const [panInput, setPanInput] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };
  const askHelp = (topic) => {
    const replies = {
      "Urgent service":
        "I’ll prioritise your request. Choose a service above and select the earliest available slot; a cooperative coordinator will be alerted.",
      "Active booking":
        "Open My bookings to see the latest stage. If your worker is delayed, we can request a callback from the coordinator.",
      "Safety concern":
        "Your safety comes first. Move to a safe place and contact local emergency services if there is immediate danger. I can also alert the cooperative coordinator.",
      "Talk to support":
        "A cooperative coordinator can call you shortly. Please keep your phone nearby.",
    };
    setHelpMessages((prev) => [
      ...prev,
      { from: "user", text: topic },
      { from: "bot", text: replies[topic] },
    ]);
    if (topic === "Talk to support")
      showToast("Urgent callback request sent to the cooperative");
  };
  const startProfileEdit = () => {
    setProfileDraft({
      bio: worker.bio || "",
      extraSkills: (worker.extraSkills || []).join(", "),
      languages: worker.languages || "",
      availability: worker.availability || "",
    });
    setEditingProfile(true);
  };
  const saveProfile = () => {
    setWorkers((prev) =>
      prev.map((w) =>
        w.id === activeWorker
          ? {
              ...w,
              bio: profileDraft.bio.trim(),
              extraSkills: profileDraft.extraSkills
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean),
              languages: profileDraft.languages.trim(),
              availability: profileDraft.availability.trim(),
            }
          : w
      )
    );
    setEditingProfile(false);
    showToast("Your worker profile has been updated");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!authEmail) {
      showToast("Enter an email to continue");
      return;
    }
    if (authMode === "worker") {
      const w = workers.find(
        (x) => x.email.toLowerCase() === authEmail.toLowerCase()
      );
      if (!w) {
        showToast("No worker account found with that email");
        return;
      }
      setSession({
        role: "worker",
        name: w.name,
        email: w.email,
        workerId: w.id,
      });
      setActiveWorker(w.id);
      setRole("worker");
    } else if (authMode === "admin") {
      setSession({
        role: "admin",
        name: "Cooperative Admin",
        email: authEmail,
      });
      setRole("admin");
    } else {
      const name =
        authEmail
          .split("@")[0]
          .replace(/[^a-zA-Z]/g, " ")
          .trim() || "Priya Sharma";
      setSession({
        role: "consumer",
        name: name.charAt(0).toUpperCase() + name.slice(1),
        email: authEmail,
      });
      setRole("consumer");
    }
    showToast("Logged in successfully");
  };

  const logout = () => {
    setSession(null);
    setAuthEmail("");
    setAuthPass("");
    setShowLogin(false);
  };

  const consumerName =
    session?.role === "consumer" ? session.name : "Priya Sharma";

  const confirmBooking = () => {
    const svc = bookingModal;
    setBookings((prev) => [
      {
        id: "b" + Math.random().toString(36).slice(2, 7),
        serviceId: svc.id,
        workerId: svc.workerId,
        consumer: consumerName,
        slot: chosenSlot,
        status: "Requested",
        rating: null,
        review: "",
        startOtp: makeOtp(),
        completionOtp: makeOtp(),
        price: svc.price,
      },
      ...prev,
    ]);
    setBookingModal(null);
    showToast("Booking requested — the worker will confirm shortly");
  };
  const updateStatus = (id, status) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    );
    showToast(status === "Confirmed" ? "Booking confirmed" : status === "In progress" ? "Work started" : "Marked as completed");
  };
  const rateBooking = (id, rating, review) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, rating, review } : b))
    );
    showToast("Thanks for your feedback");
  };
  const openOtpCheck = (booking, phase) => {
    setOtpModal({ booking, phase });
    setOtpInput("");
  };
  const verifyOtp = () => {
    const expected = otpModal.phase === "start" ? otpModal.booking.startOtp : otpModal.booking.completionOtp;
    if (otpInput !== expected) {
      showToast("That OTP does not match. Please ask the customer for the code.");
      return;
    }
    updateStatus(otpModal.booking.id, otpModal.phase === "start" ? "In progress" : "Completed");
    showToast(otpModal.phase === "start" ? "Start OTP verified — work can begin" : "Completion OTP verified — work marked done");
    setOtpModal(null);
  };
  const openRating = (booking) => {
    setRatingModal(booking);
    setSelectedRating(0);
    setRatingReview("");
  };
  const submitRating = () => {
    if (!selectedRating) {
      showToast("Please choose a star rating");
      return;
    }
    rateBooking(
      ratingModal.id,
      selectedRating,
      ratingReview.trim() || "Thank you for the service!"
    );
    setRatingModal(null);
  };

  const submitVerification = () => {
    if (aadhaarInput.length < 8 || panInput.length < 8) {
      showToast("Enter valid Aadhaar and PAN details");
      return;
    }
    setWorkers((prev) =>
      prev.map((w) =>
        w.id === verifyModal.id
          ? {
              ...w,
              verified: true,
              aadhaar: "XXXX-XXXX-" + aadhaarInput.slice(-4),
              pan: panInput.toUpperCase(),
            }
          : w
      )
    );
    showToast("Aadhaar & PAN verified — worker is now active");
    setVerifyModal(null);
    setAadhaarInput("");
    setPanInput("");
  };

  const resetWorkerForm = () => {
    setNewWorker({
      name: "", email: "", skill: "Home cleaning", phone: "",
      experience: "", location: "", skills: "",
    });
  };

  const submitWorkerApplication = () => {
    if (!newWorker.name || !newWorker.email || !newWorker.phone) {
      showToast("Please enter name, email and phone number");
      return;
    }

    const application = {
      id: "app" + Math.random().toString(36).slice(2, 7),
      name: newWorker.name.trim(),
      email: newWorker.email.trim(),
      phone: newWorker.phone.trim(),
      skill: newWorker.skill,
      experience: newWorker.experience.trim() || "Not specified",
      location: newWorker.location.trim() || COOP.region,
      skills: newWorker.skills.trim() || "General service skills",
      status: "Pending",
      appliedAt: new Date().toLocaleDateString(),
    };

    setWorkerApplications((prev) => [application, ...prev]);
    setAddWorkerModal(false);
    setPublicWorkerApply(false);
    resetWorkerForm();
    showToast("Application submitted — awaiting cooperative approval");
  };

  const addWorkerDirectly = () => {
    if (!newWorker.name || !newWorker.email || !newWorker.phone) {
      showToast("Please enter name, email and phone number");
      return;
    }

    const id = "w" + Math.random().toString(36).slice(2, 6);
    setWorkers((prev) => [
      ...prev,
      {
        id,
        name: newWorker.name.trim(),
        email: newWorker.email.trim(),
        skill: newWorker.skill,
        rating: 0,
        completed: 0,
        verified: false,
        aadhaar: "",
        pan: "",
        pendingPayout: 0,
        bio: `${newWorker.experience.trim() || "Experience not specified"}. ${newWorker.skills.trim() || "General service skills"}`,
        extraSkills: newWorker.skills.split(",").map((x) => x.trim()).filter(Boolean),
        languages: "Hindi, English",
        availability: "To be confirmed",
      },
    ]);

    setAddWorkerModal(false);
    resetWorkerForm();
    showToast("Worker added — pending Aadhaar/PAN verification");
  };

  const acceptWorkerApplication = (application) => {
    const id = "w" + Math.random().toString(36).slice(2, 6);
    setWorkers((prev) => [
      ...prev,
      {
        id,
        name: application.name,
        email: application.email,
        skill: application.skill,
        rating: 0,
        completed: 0,
        verified: false,
        aadhaar: "",
        pan: "",
        pendingPayout: 0,
        bio: `${application.experience} of experience. ${application.skills}`,
        extraSkills: application.skills.split(",").map((x) => x.trim()).filter(Boolean),
        languages: "Hindi, English",
        availability: "To be confirmed",
      },
    ]);
    setWorkerApplications((prev) =>
      prev.map((a) => a.id === application.id ? { ...a, status: "Accepted" } : a)
    );
    showToast(`${application.name} accepted — verify their ID to activate them`);
  };

  const rejectWorkerApplication = (application) => {
    setWorkerApplications((prev) =>
      prev.map((a) => a.id === application.id ? { ...a, status: "Rejected" } : a)
    );
    showToast(`${application.name}'s application was rejected`);
  };
  const removeWorker = (id) => {
    setWorkers((prev) => prev.filter((w) => w.id !== id));
    showToast("Worker removed from cooperative");
  };
  const payWorker = (id) => {
    setWorkers((prev) =>
      prev.map((w) => (w.id === id ? { ...w, pendingPayout: 0 } : w))
    );
    showToast("Payout marked as paid");
    setPayModal(null);
  };

  const myBookings = bookings.filter((b) => b.consumer === consumerName);
  const workerBookings = bookings.filter((b) => b.workerId === activeWorker);
  const worker = workers.find((w) => w.id === activeWorker) || workers[0];
  const workerEarnings = workerBookings
    .filter((b) => b.status === "Completed")
    .reduce((sum, b) => sum + b.price * WORKER_SHARE, 0);

  const stats = useMemo(() => {
    const completed = bookings.filter((b) => b.status === "Completed");
    const totalRevenue = completed.reduce((s, b) => s + b.price, 0);
    const rated = completed.filter((b) => b.rating);
    const avgRating = rated.length
      ? rated.reduce((s, b) => s + b.rating, 0) / rated.length
      : 0;
    return {
      totalBookings: bookings.length,
      completed: completed.length,
      totalRevenue,
      workerPayout: Math.round(totalRevenue * WORKER_SHARE),
      coopShare: Math.round(totalRevenue * (1 - WORKER_SHARE)),
      avgRating,
      totalPending: workers.reduce((s, w) => s + w.pendingPayout, 0),
    };
  }, [bookings, workers]);

  if (!session) {
    if (publicWorkerApply) {
      return (
        <div className="svc">
          <style>{CSS}</style>
          <div className="svc-header" style={{ justifyContent: "space-between" }}>
            <div className="svc-brand">
              <div className="svc-mark"><Users size={18} color="#fff" /></div>
              <div><div className="svc-word">SevaSetu</div><div className="svc-sub">{COOP.name}</div></div>
            </div>
            <button className="svc-btn secondary" onClick={() => setPublicWorkerApply(false)}>
              <ArrowRight size={14} /> Back to home
            </button>
          </div>
          <div style={{ maxWidth: 760, margin: "0 auto", padding: "42px 22px 70px", width: "100%", boxSizing: "border-box" }}>
            <div className="svc-card">
              <div className="svc-eyebrow">JOIN THE COOPERATIVE</div>
              <div className="svc-title" style={{ fontSize: 30, marginTop: 8 }}>Become a SevaSetu worker</div>
              <div style={{ color: "var(--muted)", fontSize: 13, lineHeight: 1.6, marginTop: 8, marginBottom: 22 }}>Apply without creating an account first. Your application will be reviewed by the cooperative admin. If accepted, you can then complete identity verification and start receiving work.</div>

              <div className="svc-field"><label>Full name *</label><div className="svc-input-wrap"><input placeholder="e.g. Ramesh Yadav" value={newWorker.name} onChange={(e) => setNewWorker({ ...newWorker, name: e.target.value })} /></div></div>
              <div className="svc-field"><label>Phone number *</label><div className="svc-input-wrap"><Phone size={15} color="#6E6F5E" /><input type="tel" placeholder="9876543210" value={newWorker.phone} onChange={(e) => setNewWorker({ ...newWorker, phone: e.target.value })} /></div></div>
              <div className="svc-field"><label>Email *</label><div className="svc-input-wrap"><Mail size={15} color="#6E6F5E" /><input type="email" placeholder="ramesh@example.com" value={newWorker.email} onChange={(e) => setNewWorker({ ...newWorker, email: e.target.value })} /></div></div>
              <div className="svc-field"><label>Service you provide</label><select className="svc-select" style={{ width: "100%" }} value={newWorker.skill} onChange={(e) => setNewWorker({ ...newWorker, skill: e.target.value })}>{Object.keys(CATEGORY_COLOR).map((c) => <option key={c}>{c}</option>)}</select></div>
              <div className="svc-field"><label>Years of experience</label><div className="svc-input-wrap"><input placeholder="e.g. 4 years" value={newWorker.experience} onChange={(e) => setNewWorker({ ...newWorker, experience: e.target.value })} /></div></div>
              <div className="svc-field"><label>Location</label><div className="svc-input-wrap"><MapPin size={15} color="#6E6F5E" /><input placeholder="e.g. Gomti Nagar, Lucknow" value={newWorker.location} onChange={(e) => setNewWorker({ ...newWorker, location: e.target.value })} /></div></div>
              <div className="svc-field"><label>Skills</label><div className="svc-input-wrap"><input placeholder="e.g. deep cleaning, bathroom cleaning" value={newWorker.skills} onChange={(e) => setNewWorker({ ...newWorker, skills: e.target.value })} /></div></div>
              <button className="svc-btn full" style={{ marginTop: 20 }} onClick={submitWorkerApplication}><UserPlus size={14} /> Submit worker application</button>
            </div>
          </div>
        </div>
      );
    }

    if (!showLogin) {
      return (
        <div className="svc">
          <style>{CSS}</style>
          <div className="svc-header" style={{ justifyContent: "space-between" }}>
            <div className="svc-brand">
              <div className="svc-mark">
                <Users size={18} color="#fff" />
              </div>
              <div>
                <div className="svc-word">SevaSetu</div>
                <div className="svc-sub">{COOP.name}</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button className="svc-btn" onClick={() => setPublicWorkerApply(true)}>
                <UserPlus size={14} />
                Become a worker
              </button>
              <button className="svc-btn" onClick={() => setShowLogin(true)}>
                <ArrowRight size={14} />
                Login
              </button>
            </div>
          </div>

          <div style={{ maxWidth: 1120, margin: "0 auto", padding: "58px 22px 80px", width: "100%", boxSizing: "border-box" }}>
            <div style={{ maxWidth: 760 }}>
              <div className="svc-eyebrow">WORKER-OWNED HOME SERVICES · LUCKNOW</div>
              <div className="svc-title" style={{ fontSize: 46, lineHeight: 1.08, marginTop: 10 }}>
                Reliable local services, powered by the cooperative.
              </div>
              <p style={{ color: "var(--muted)", fontSize: 16, lineHeight: 1.7, maxWidth: 650, marginTop: 18 }}>
                SevaSetu connects households with identity-verified local workers while keeping pricing transparent and putting a larger share of every booking back into workers' hands.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
                <button className="svc-btn" onClick={() => setShowLogin(true)}>
                  Get started <ArrowRight size={14} />
                </button>
                <button className="svc-btn secondary" onClick={() => setPublicWorkerApply(true)}>
                  <UserPlus size={14} /> Apply as a worker
                </button>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 14, marginTop: 48 }}>
              {[
                [ShieldCheck, "Verified workers", "Identity verification helps build trust before a worker becomes active."],
                [IndianRupee, "Transparent pricing", "Clear service prices with an 80% worker payout model."],
                [Clock, "Easy booking", "Choose a service, pick a slot and track the booking status."],
                [Users, "Cooperative model", "Workers are members of a local cooperative, not just platform listings."],
              ].map(([Icon, title, text]) => (
                <div className="svc-card" key={title}>
                  <Icon size={22} color="var(--accent)" />
                  <div className="svc-card-title" style={{ marginTop: 12 }}>{title}</div>
                  <div style={{ color: "var(--muted)", fontSize: 12, lineHeight: 1.6, marginTop: 7 }}>{text}</div>
                </div>
              ))}
            </div>

            <div className="svc-card" style={{ marginTop: 14, padding: 22 }}>
              <div className="svc-eyebrow">HOW SEVASETU WORKS</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 18, marginTop: 14 }}>
                {[
                  ["01", "Choose a service", "Find cleaning, plumbing, tutoring, elder care and more."],
                  ["02", "Book a worker", "See transparent pricing and select an available slot."],
                  ["03", "Track the work", "Use status updates and OTP checks for a safer service."],
                  ["04", "Rate & support", "Share feedback and help strengthen the local cooperative."],
                ].map(([num, title, text]) => (
                  <div key={num}>
                    <div style={{ fontWeight: 800, color: "var(--accent)", fontSize: 12 }}>{num}</div>
                    <div className="svc-card-title" style={{ marginTop: 5 }}>{title}</div>
                    <div style={{ color: "var(--muted)", fontSize: 12, lineHeight: 1.55, marginTop: 5 }}>{text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="svc">
        <style>{CSS}</style>
        <div className="svc-header">
          <div className="svc-brand">
            <div className="svc-mark">
              <Users size={18} color="#fff" />
            </div>
            <div>
              <div className="svc-word">SevaSetu</div>
              <div className="svc-sub">{COOP.name}</div>
            </div>
          </div>
          <button className="svc-btn secondary" onClick={() => setShowLogin(false)}>
            <ArrowRight size={14} /> Back to home
          </button>
        </div>
        <div className="svc-auth-wrap">
          <div className="svc-auth-card">
            <div className="svc-title" style={{ fontSize: 25 }}>Who are you?</div>
            <div className="svc-eyebrow" style={{ marginBottom: 18 }}>Choose your SevaSetu account type to continue</div>
            <div style={{ display: "grid", gap: 10 }}>
              {[
                ["consumer", "User", "Book trusted local services", Users],
                ["worker", "Worker", "Manage jobs and earnings", Users],
                ["admin", "Coop admin", "Manage the cooperative", ShieldCheck],
              ].map(([v, title, text, Icon]) => (
                <button
                  type="button"
                  key={v}
                  onClick={() => setAuthMode(v)}
                  style={{
                    display: "flex", alignItems: "center", gap: 12, textAlign: "left", width: "100%",
                    padding: 14, borderRadius: 12, border: authMode === v ? "1.5px solid var(--accent)" : "1px solid var(--border)",
                    background: authMode === v ? "rgba(62, 87, 62, .07)" : "#fff", cursor: "pointer"
                  }}
                >
                  <span style={{ width: 36, height: 36, borderRadius: 10, display: "grid", placeItems: "center", background: "var(--soft)" }}><Icon size={17} /></span>
                  <span style={{ flex: 1 }}><strong style={{ display: "block", fontSize: 13 }}>{title}</strong><span style={{ display: "block", color: "var(--muted)", fontSize: 11, marginTop: 3 }}>{text}</span></span>
                  {authMode === v && <Check size={16} color="var(--accent)" />}
                </button>
              ))}
            </div>

            <form onSubmit={handleLogin} style={{ marginTop: 22 }}>
              <div className="svc-field">
                <label>Email address</label>
                <div className="svc-input-wrap">
                  <Mail size={15} color="#6E6F5E" />
                  <input
                    type="email"
                    placeholder={authMode === "worker" ? "radha.devi@example.com" : "you@example.com"}
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                  />
                </div>
                {authMode === "worker" && <div style={{ fontSize: 11, color: "var(--muted)" }}>Try: radha.devi@example.com</div>}
              </div>
              <div className="svc-field">
                <label>Password</label>
                <div className="svc-input-wrap">
                  <Lock size={15} color="#6E6F5E" />
                  <input type="password" placeholder="••••••••" value={authPass} onChange={(e) => setAuthPass(e.target.value)} />
                </div>
              </div>
              <button className="svc-btn full" style={{ marginTop: 22 }} type="submit">
                Log in <ArrowRight size={14} />
              </button>
              <div style={{ textAlign: "center", fontSize: 12, color: "var(--muted)", marginTop: 14 }}>Prototype login — any password works</div>
            </form>

            {authMode === "worker" && (
              <button type="button" className="svc-btn secondary full" style={{ marginTop: 14 }} onClick={() => setPublicWorkerApply(true)}>
                <UserPlus size={14} /> Don't have a worker account? Apply here
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="svc">
      <style>{CSS}</style>
      <div className="svc-header">
        <div className="svc-brand">
          <div className="svc-mark">
            <Users size={18} color="#fff" />
          </div>
          <div>
            <div className="svc-word">SevaSetu</div>
            <div className="svc-sub">{COOP.name}</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div className="svc-tabs">
            {session.role === "consumer" && (
              <button className="svc-tab active">User</button>
            )}
            {session.role === "worker" && (
              <button className="svc-tab active">Worker</button>
            )}
            {session.role === "admin" &&
              [
                ["admin", "Dashboard"],
                ["verification", "Verification"],
                ["members", "Manage members"],
              ].map(([v, l]) => (
                <button
                  key={v}
                  className={`svc-tab ${role === v ? "active" : ""}`}
                  onClick={() => setRole(v)}
                >
                  {l}
                </button>
              ))}
          </div>
          <button className="svc-logout" onClick={logout}>
            Log out ({session.name})
          </button>
        </div>
      </div>

      <div className="svc-main">
        {role === "consumer" && (
          <>
            <div className="svc-hero">
              <div className="svc-hero-copy">
                <div className="svc-title">
                  Everyday help, rooted in your community.
                </div>
                <div className="svc-eyebrow">
                  <Sparkles size={13} />
                  Book reliable local support from a worker-owned cooperative.
                </div>
                <div className="svc-trust-row">
                  <span className="svc-trust-item">
                    <ShieldCheck size={12} />
                    Identity-verified workers
                  </span>
                  <span className="svc-trust-item">
                    <IndianRupee size={12} />
                    80% goes to the worker
                  </span>
                  <span className="svc-trust-item">
                    <Check size={12} />
                    Clear status updates
                  </span>
                </div>
                <button
                  type="button"
                  className={`svc-voice-btn ${voiceBooking ? "recording" : ""}`}
                  onClick={() => {
                    setVoiceBooking((v) => !v);
                    showToast(
                      voiceBooking
                        ? "Voice booking paused"
                        : "Listening in Hindi — tell us the service you need"
                    );
                  }}
                >
                  <Mic size={15} />
                  {voiceBooking
                    ? "Listening… tap to stop"
                    : "Book by voice · Hindi / English"}
                  <Volume2 size={14} />
                </button>
              </div>
            </div>
            <div className="svc-section-head" style={{ marginTop: 30 }}>
              <div>
                <div className="svc-section-title">Choose a service</div>
                <div className="svc-eyebrow">
                  Transparent pricing. No hidden platform fee.
                </div>
              </div>
            </div>
            <div className="svc-grid">
              {SERVICES.map((s) => {
                const w = workers.find((x) => x.id === s.workerId);
                return (
                  <div
                    key={s.id}
                    className="svc-card"
                    style={{ "--accent": CATEGORY_COLOR[s.category] }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                      }}
                    >
                      <div
                        className="svc-chip"
                        style={{ color: CATEGORY_COLOR[s.category] }}
                      >
                        {s.category}
                      </div>
                      {w?.verified ? (
                        <span className="svc-badge-verified">
                          <BadgeCheck size={12} />
                          Verified
                        </span>
                      ) : (
                        <span className="svc-badge-unverified">
                          <AlertCircle size={12} />
                          Pending
                        </span>
                      )}
                    </div>
                    <div className="svc-card-title">{s.title}</div>
                    <div className="svc-meta">
                      <span className="svc-meta-item">
                        <Clock size={13} />
                        {s.duration}
                      </span>
                      <Stars rating={w.rating} />
                    </div>
                    <div className="svc-card-foot">
                      <div className="svc-price">
                        <IndianRupee size={15} />
                        {s.price}
                      </div>
                      <div className="svc-card-actions">
                        <button
                          className="svc-link-btn"
                          onClick={() => setProfileModal(w)}
                        >
                          View profile
                        </button>
                        <button
                          className="svc-btn"
                          disabled={!w?.verified}
                          onClick={() => {
                            setBookingModal(s);
                            setChosenSlot(SLOTS[0]);
                          }}
                        >
                          Book
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="svc-info-strip">
              <ShieldCheck size={16} />
              <div>
                <strong>Why SevaSetu?</strong>
                <br />
                <span>
                  Every booking supports a verified local worker and helps
                  strengthen the cooperative.
                </span>
              </div>
            </div>
            <div className="svc-section">
              <div className="svc-section-head">
                <div className="svc-section-title">My bookings</div>
                <span className="svc-eyebrow">
                  Track every request in one place
                </span>
              </div>
              {myBookings.length === 0 && (
                <div style={{ color: "var(--muted)", fontSize: 13 }}>
                  No bookings yet — book a service above.
                </div>
              )}
              {myBookings.map((b) => {
                const svc = SERVICES.find((s) => s.id === b.serviceId);
                const w = workers.find((x) => x.id === b.workerId);
                return (
                  <div key={b.id} className="svc-row">
                    <div>
                      <div className="svc-row-title">{svc.title}</div>
                      <div className="svc-row-meta">
                        {w.name} · {b.slot}
                      </div>
                      <BookingProgress status={b.status} />
                      {b.status === "Confirmed" && b.startOtp && <div className="svc-otp-card"><div style={{ fontSize: 11.5, fontWeight: 600 }}>Share this start-work OTP only when the worker arrives</div><div className="svc-otp-code">{b.startOtp}</div></div>}
                      {b.status === "In progress" && b.completionOtp && <div className="svc-otp-card"><div style={{ fontSize: 11.5, fontWeight: 600 }}>Share this completion OTP only after the work is finished</div><div className="svc-otp-code">{b.completionOtp}</div></div>}
                      {b.review && (
                        <div
                          className="svc-row-meta"
                          style={{ fontStyle: "italic", marginTop: 4 }}
                        >
                          “{b.review}”
                        </div>
                      )}
                    </div>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 12 }}
                    >
                      {b.status === "Completed" && !b.rating && (
                        <button className="svc-btn ochre" onClick={() => openRating(b)}><Star size={13} />Rate service</button>
                      )}
                      {b.status === "Completed" && b.rating && (
                        <Stars rating={b.rating} />
                      )}
                      <StatusPill status={b.status} />
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {role === "worker" && (
          <>
            <div className="svc-hero">
              <div
                className="svc-hero-copy"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 14,
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <div className="svc-title">Your work, your earnings.</div>
                  <div className="svc-eyebrow">
                    {worker.name} · {worker.email}
                  </div>
                </div>
                {worker.verified ? (
                  <span className="svc-trust-item">
                    <BadgeCheck size={13} />
                    Verified worker
                  </span>
                ) : (
                  <span className="svc-trust-item">
                    <AlertCircle size={13} />
                    Verification pending
                  </span>
                )}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 10,
                marginTop: 28,
              }}
            >
              <div>
                <div className="svc-section-title">Worker queue</div>
                <div className="svc-eyebrow">
                  Confirm requests, then mark completed work.
                </div>
              </div>
              {worker.verified ? (
                <span className="svc-pill verified">Verified</span>
              ) : (
                <span className="svc-pill unverified">
                  Verification pending
                </span>
              )}
            </div>
            <div className="svc-grid" style={{ marginTop: 20 }}>
              <div
                className="svc-panel"
                style={{
                  background: "linear-gradient(155deg, #2E5233, #1B3721)",
                  color: "#fff",
                  border: "none",
                }}
              >
                <div style={{ fontSize: 12, opacity: 0.85 }}>Your earnings</div>
                <div
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontSize: 26,
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    marginTop: 3,
                  }}
                >
                  <IndianRupee size={19} />
                  {workerEarnings.toFixed(0)}
                </div>
                <div style={{ fontSize: 11.5, opacity: 0.8, marginTop: 4 }}>
                  {Math.round(WORKER_SHARE * 100)}% of job value — rest
                  supports the cooperative
                </div>
              </div>
              <div className="svc-panel">
                <div style={{ fontSize: 12, color: "var(--muted)" }}>
                  Track record
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginTop: 6,
                  }}
                >
                  <Stars rating={worker.rating} />
                  <span style={{ fontSize: 12, color: "var(--muted)" }}>
                    · {worker.completed} jobs completed
                  </span>
                </div>
              </div>
            </div>
            <div className="svc-panel svc-section">
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: 12,
                }}
              >
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>
                    My worker profile
                  </div>
                  <div className="svc-eyebrow">
                    Help customers understand your experience before they book.
                  </div>
                </div>
                {!editingProfile && (
                  <button className="svc-btn ghost" onClick={startProfileEdit}>
                    <Pencil size={13} />
                    Edit profile
                  </button>
                )}
              </div>
              {!editingProfile ? (
                <div className="svc-profile-grid">
                  <div>
                    <div className="svc-profile-label">About me</div>
                    <div
                      style={{ fontSize: 13, lineHeight: 1.5, marginTop: 6 }}
                    >
                      {worker.bio ||
                        "Add a short introduction so customers can get to know you."}
                    </div>
                    <div
                      className="svc-profile-label"
                      style={{ marginTop: 17 }}
                    >
                      Extra skills
                    </div>
                    <div className="svc-skill-tags">
                      {(worker.extraSkills || []).length ? (
                        worker.extraSkills.map((skill) => (
                          <span key={skill} className="svc-skill-tag">
                            {skill}
                          </span>
                        ))
                      ) : (
                        <span className="svc-row-meta">
                          Add the services you do best
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="svc-profile-label">Primary work</div>
                    <div
                      style={{ fontSize: 13, fontWeight: 600, marginTop: 6 }}
                    >
                      {worker.skill}
                    </div>
                    <div
                      className="svc-profile-label"
                      style={{ marginTop: 17 }}
                    >
                      Past record
                    </div>
                    <div style={{ fontSize: 13, marginTop: 6 }}>
                      <Stars rating={worker.rating} />{" "}
                      <span className="svc-row-meta">
                        · {worker.completed} completed jobs
                      </span>
                    </div>
                    <div
                      className="svc-profile-label"
                      style={{ marginTop: 17 }}
                    >
                      Languages & availability
                    </div>
                    <div
                      style={{ fontSize: 12.5, lineHeight: 1.6, marginTop: 6 }}
                    >
                      {worker.languages || "Add languages"}
                      <br />
                      {worker.availability || "Add availability"}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="svc-profile-grid">
                  <div>
                    <div className="svc-field">
                      <label>About me</label>
                      <textarea
                        className="svc-textarea"
                        value={profileDraft.bio}
                        onChange={(e) =>
                          setProfileDraft({
                            ...profileDraft,
                            bio: e.target.value,
                          })
                        }
                        placeholder="Briefly describe your experience and the care you bring to your work."
                      />
                    </div>
                    <div className="svc-field">
                      <label>Extra skills</label>
                      <div className="svc-input-wrap">
                        <input
                          value={profileDraft.extraSkills}
                          onChange={(e) =>
                            setProfileDraft({
                              ...profileDraft,
                              extraSkills: e.target.value,
                            })
                          }
                          placeholder="e.g. Deep cleaning, laundry care"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="svc-field">
                      <label>Languages</label>
                      <div className="svc-input-wrap">
                        <input
                          value={profileDraft.languages}
                          onChange={(e) =>
                            setProfileDraft({
                              ...profileDraft,
                              languages: e.target.value,
                            })
                          }
                          placeholder="e.g. Hindi, English"
                        />
                      </div>
                    </div>
                    <div className="svc-field">
                      <label>Availability</label>
                      <div className="svc-input-wrap">
                        <input
                          value={profileDraft.availability}
                          onChange={(e) =>
                            setProfileDraft({
                              ...profileDraft,
                              availability: e.target.value,
                            })
                          }
                          placeholder="e.g. Mon–Sat · 9 AM–6 PM"
                        />
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 8, marginTop: 18 }}>
                      <button className="svc-btn" onClick={saveProfile}>
                        <Check size={14} />
                        Save profile
                      </button>
                      <button
                        className="svc-btn ghost"
                        onClick={() => setEditingProfile(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="svc-section">
              {workerBookings.length === 0 && (
                <div style={{ color: "var(--muted)", fontSize: 13 }}>
                  No bookings assigned right now.
                </div>
              )}
              {workerBookings.map((b) => {
                const svc = SERVICES.find((s) => s.id === b.serviceId);
                return (
                  <div key={b.id} className="svc-row">
                    <div>
                      <div className="svc-row-title">{svc.title}</div>
                      <div className="svc-row-meta">
                        {b.consumer} · {b.slot}
                      </div>
                    </div>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 8 }}
                    >
                      <StatusPill status={b.status} />
                      {b.status === "Requested" && (
                        <button
                          className="svc-btn"
                          onClick={() => updateStatus(b.id, "Confirmed")}
                        >
                          Confirm
                        </button>
                      )}
                      {b.status === "Confirmed" && (
                        <button
                          className="svc-btn ochre"
                          onClick={() => openOtpCheck(b, "start")}
                        >
                          <ShieldCheck size={13} />
                          Verify start OTP
                        </button>
                      )}
                      {b.status === "In progress" && (
                        <button
                          className="svc-btn ochre"
                          onClick={() => openOtpCheck(b, "completion")}
                        >
                          <Check size={13} />
                          Verify completion OTP
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {role === "admin" && (
          <>
            <div className="svc-hero">
              <div className="svc-hero-copy">
                <div className="svc-title">
                  A stronger local services economy.
                </div>
                <div className="svc-eyebrow">
                  <MapPin size={13} />
                  {COOP.name} · {COOP.region}
                </div>
                <div className="svc-trust-row">
                  <span className="svc-trust-item">
                    <Users size={12} />
                    {workers.length} cooperative members
                  </span>
                  <span className="svc-trust-item">
                    <BadgeCheck size={12} />
                    {workers.filter((w) => w.verified).length} verified
                  </span>
                </div>
              </div>
            </div>
            <div className="svc-section-head" style={{ marginTop: 28 }}>
              <div>
                <div className="svc-section-title">Cooperative snapshot</div>
                <div className="svc-eyebrow">
                  Live picture of service quality and shared earnings.
                </div>
              </div>
            </div>
            <div className="svc-stat-grid" style={{ marginTop: 20 }}>
              {[
                ["Bookings", stats.totalBookings],
                ["Completed", stats.completed],
                ["Avg. rating", stats.avgRating.toFixed(1)],
                ["Workers", workers.length],
              ].map(([label, value]) => (
                <div key={label} className="svc-stat">
                  <div className="svc-stat-num">{value}</div>
                  <div className="svc-stat-label">{label}</div>
                </div>
              ))}
            </div>
            <div className="svc-panel svc-section">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                <ShieldCheck size={16} color="#2E5233" />
                Fair earnings split
              </div>
              <div
                style={{ fontSize: 12, color: "var(--muted)", marginTop: 3 }}
              >
                Worker payout vs. a typical commercial gig platform
              </div>
              <div
                style={{
                  marginTop: 18,
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: 12,
                      color: "var(--muted)",
                      marginBottom: 5,
                    }}
                  >
                    <span>SevaSetu worker keeps</span>
                    <span>{Math.round(WORKER_SHARE * 100)}%</span>
                  </div>
                  <div className="svc-bar-track">
                    <div
                      className="svc-bar-fill"
                      style={{
                        width: `${WORKER_SHARE * 100}%`,
                        background: "linear-gradient(90deg, #3E7C4A, #2E5233)",
                      }}
                    />
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: 12,
                      color: "var(--muted)",
                      marginBottom: 5,
                    }}
                  >
                    <span>Typical gig platform worker keeps</span>
                    <span>70%</span>
                  </div>
                  <div className="svc-bar-track">
                    <div
                      className="svc-bar-fill"
                      style={{ width: "70%", background: "#B4B2A9" }}
                    />
                  </div>
                </div>
              </div>
              <div
                style={{
                  marginTop: 16,
                  paddingTop: 14,
                  borderTop: "1px solid var(--border)",
                  fontSize: 12.5,
                  color: "var(--muted)",
                }}
              >
                Total revenue ₹{stats.totalRevenue} → workers ₹
                {stats.workerPayout} · cooperative ₹{stats.coopShare}{" "}
                · pending payouts ₹{stats.totalPending}
              </div>
            </div>
            <div className="svc-panel svc-section">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                <HeartHandshake size={16} color="#2E5233" />
                Community impact
              </div>
              <div className="svc-eyebrow">
                The numbers judges can use to understand the cooperative’s
                value.
              </div>
              <div className="svc-stat-grid" style={{ marginTop: 16 }}>
                {[
                  ["Worker earnings", `₹${stats.workerPayout}`],
                  [
                    "Verified workforce",
                    `${workers.filter((w) => w.verified).length}/${
                      workers.length
                    }`,
                  ],
                  ["Services completed", stats.completed],
                  ["Community fund", `₹${stats.coopShare}`],
                ].map(([label, value]) => (
                  <div key={label} className="svc-stat">
                    <div className="svc-stat-num">{value}</div>
                    <div className="svc-stat-label">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {role === "verification" && (
          <>
            <div className="svc-title">Worker verification</div>
            <div className="svc-eyebrow">
              <FileCheck size={13} />
              Aadhaar & PAN checks before a worker can accept bookings
            </div>
            {workerApplications.length > 0 && (
              <div className="svc-section" style={{ marginBottom: 16 }}>
                <div className="svc-section-head">
                  <div>
                    <div className="svc-section-title">Worker applications</div>
                    <div className="svc-eyebrow">Review people who want to join the cooperative</div>
                  </div>
                  <span className="svc-pill requested">
                    {workerApplications.filter((a) => a.status === "Pending").length} pending
                  </span>
                </div>
                {workerApplications.map((app) => (
                  <div key={app.id} className="svc-row">
                    <div style={{ flex: 1 }}>
                      <div className="svc-row-title">
                        {app.name}{" "}
                        <span className={`svc-pill ${app.status === "Pending" ? "requested" : app.status === "Accepted" ? "verified" : "unverified"}`}>
                          {app.status}
                        </span>
                      </div>
                      <div className="svc-row-meta">
                        {app.skill} · {app.experience} · {app.location}
                      </div>
                      <div className="svc-row-meta" style={{ marginTop: 4 }}>
                        {app.phone} · {app.email}
                      </div>
                      <div className="svc-row-meta" style={{ marginTop: 4 }}>
                        Skills: {app.skills} · Applied {app.appliedAt}
                      </div>
                    </div>
                    {app.status === "Pending" && (
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <button className="svc-btn" onClick={() => acceptWorkerApplication(app)}>
                          <Check size={13} /> Accept
                        </button>
                        <button className="svc-btn danger" onClick={() => rejectWorkerApplication(app)}>
                          <X size={13} /> Reject
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            <div className="svc-section">
              {workers.map((w) => (
                <div key={w.id} className="svc-row">
                  <div>
                    <div className="svc-row-title">{w.name}</div>
                    <div className="svc-row-meta">
                      {w.email} · {w.skill}
                    </div>
                    {w.verified && (
                      <div className="svc-row-meta">
                        Aadhaar {w.aadhaar} · PAN {w.pan}
                      </div>
                    )}
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    {w.verified ? (
                      <span className="svc-pill verified">Verified</span>
                    ) : (
                      <>
                        <span className="svc-pill unverified">Unverified</span>
                        <button
                          className="svc-btn"
                          onClick={() => setVerifyModal(w)}
                        >
                          Verify now
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {role === "members" && (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                flexWrap: "wrap",
                gap: 10,
              }}
            >
              <div>
                <div className="svc-title">Manage members</div>
                <div className="svc-eyebrow">
                  Add, remove, and pay cooperative workers
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button
                  className="svc-btn"
                  onClick={() => {
                    resetWorkerForm();
                    setAddWorkerModal(true);
                  }}
                >
                  <UserPlus size={14} />
                  Add Worker
                </button>
              </div>
            </div>
            <div className="svc-section">
              {workers.map((w) => (
                <div key={w.id} className="svc-row">
                  <div>
                    <div className="svc-row-title">
                      {w.name}{" "}
                      {w.verified ? (
                        <span className="svc-badge-verified">
                          <BadgeCheck size={12} />
                          Verified
                        </span>
                      ) : (
                        <span className="svc-badge-unverified">
                          <AlertCircle size={12} />
                          Unverified
                        </span>
                      )}
                    </div>
                    <div className="svc-row-meta">
                      {w.email} · {w.skill} ·{" "}
                      <Stars rating={w.rating} />
                    </div>
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <div
                      style={{
                        fontSize: 12.5,
                        color:
                          w.pendingPayout > 0 ? "var(--ochre)" : "var(--muted)",
                        fontWeight: 600,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Wallet size={13} style={{ marginRight: 3 }} />
                      <IndianRupee size={11} />
                      {w.pendingPayout} due
                    </div>
                    {w.pendingPayout > 0 && (
                      <button
                        className="svc-btn ochre"
                        onClick={() => setPayModal(w)}
                      >
                        <CreditCard size={13} />
                        Pay
                      </button>
                    )}
                    <button
                      className="svc-btn danger"
                      onClick={() => removeWorker(w.id)}
                    >
                      <UserMinus size={13} />
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {session?.role === "consumer" && (
        <>
          {helpChatOpen && (
            <aside className="svc-chat" aria-label="Emergency help chat">
              <div className="svc-chat-head">
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <MessageCircle size={17} />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>
                      SevaSetu Help
                    </div>
                    <div style={{ fontSize: 10.5, opacity: 0.76 }}>
                      Emergency support · usually replies quickly
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setHelpChatOpen(false)}
                  aria-label="Close emergency help"
                  style={{
                    border: "none",
                    background: "transparent",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  <X size={17} />
                </button>
              </div>
              <div className="svc-chat-body">
                {helpMessages.map((message, index) => (
                  <div
                    key={index}
                    className={`svc-chat-bubble ${
                      message.from === "user" ? "user" : ""
                    }`}
                  >
                    {message.text}
                  </div>
                ))}
                <div className="svc-chat-actions">
                  {[
                    "Urgent service",
                    "Active booking",
                    "Safety concern",
                    "Talk to support",
                  ].map((topic) => (
                    <button
                      key={topic}
                      type="button"
                      className="svc-chat-action"
                      onClick={() => askHelp(topic)}
                    >
                      {topic}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  className="svc-chat-emergency"
                  onClick={() => {
                    askHelp("Talk to support");
                  }}
                >
                  <Phone
                    size={14}
                    style={{ verticalAlign: "-2px", marginRight: 5 }}
                  />
                  Request urgent callback
                </button>
              </div>
            </aside>
          )}
          <button
            type="button"
            className="svc-help-fab"
            onClick={() => setHelpChatOpen((open) => !open)}
          >
            <MessageCircle size={17} />
            {helpChatOpen ? "Close help" : "Need urgent help?"}
          </button>
        </>
      )}

      {profileModal && (
        <div className="svc-modal-backdrop">
          <div className="svc-modal">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: 12,
              }}
            >
              <div>
                <div
                  className="svc-chip"
                  style={{ color: CATEGORY_COLOR[profileModal.skill] }}
                >
                  {profileModal.skill}
                </div>
                <div className="svc-card-title">Meet {profileModal.name}</div>
                <div className="svc-badge-verified" style={{ marginTop: 5 }}>
                  {profileModal.verified ? (
                    <>
                      <BadgeCheck size={13} />
                      Identity verified
                    </>
                  ) : (
                    <>
                      <AlertCircle size={13} />
                      Verification in progress
                    </>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setProfileModal(null)}
                aria-label="Close worker profile"
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                }}
              >
                <X size={17} />
              </button>
            </div>
            <div className="svc-profile-grid" style={{ marginTop: 20 }}>
              <div>
                <div className="svc-profile-label">About</div>
                <div style={{ fontSize: 13, lineHeight: 1.55, marginTop: 6 }}>
                  {profileModal.bio || "A trusted cooperative worker."}
                </div>
                <div className="svc-profile-label" style={{ marginTop: 18 }}>
                  Extra skills
                </div>
                <div className="svc-skill-tags">
                  {(profileModal.extraSkills || []).map((skill) => (
                    <span key={skill} className="svc-skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <div className="svc-profile-label">Past work</div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                    marginTop: 6,
                  }}
                >
                  <Stars rating={profileModal.rating} />
                  <span className="svc-row-meta">
                    · {profileModal.completed} jobs completed
                  </span>
                </div>
                <div className="svc-profile-label" style={{ marginTop: 18 }}>
                  Languages
                </div>
                <div style={{ fontSize: 12.5, marginTop: 6 }}>
                  {profileModal.languages || "Hindi"}
                </div>
                <div className="svc-profile-label" style={{ marginTop: 18 }}>
                  Availability
                </div>
                <div style={{ fontSize: 12.5, marginTop: 6 }}>
                  {profileModal.availability || "Contact cooperative"}
                </div>
              </div>
            </div>
            <div className="svc-info-strip">
              <HeartHandshake size={15} />
              <div>
                <strong>Local work, fair earnings</strong>
                <br />
                <span>
                  80% of the service fee goes directly to this worker.
                </span>
              </div>
            </div>
            <button
              className="svc-btn full"
              style={{ marginTop: 18 }}
              disabled={!profileModal.verified}
              onClick={() => {
                const service = SERVICES.find(
                  (s) => s.workerId === profileModal.id
                );
                setProfileModal(null);
                setBookingModal(service);
                setChosenSlot(SLOTS[0]);
              }}
            >
              Book {profileModal.name.split(" ")[0]}
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {otpModal && (
        <div className="svc-modal-backdrop">
          <div className="svc-modal">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}><div><div className="svc-chip" style={{ color: "var(--ochre)" }}>Secure work verification</div><div className="svc-card-title">{otpModal.phase === "start" ? "Verify arrival OTP" : "Verify completion OTP"}</div><div className="svc-eyebrow">Ask the customer for the 6-digit OTP shown in their booking.</div></div><button type="button" onClick={() => setOtpModal(null)} aria-label="Close OTP verification" style={{ border: "none", background: "transparent", cursor: "pointer" }}><X size={17} /></button></div>
            <div className="svc-field"><label>Customer OTP</label><div className="svc-input-wrap"><ShieldCheck size={16} color="#2E5233" /><input inputMode="numeric" maxLength={6} value={otpInput} onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ""))} placeholder="Enter 6-digit OTP" /></div></div>
            <div className="svc-info-strip"><ShieldCheck size={15} /><div><strong>{otpModal.phase === "start" ? "Start only after verification" : "Complete only after verification"}</strong><br /><span>This protects both the customer and worker with a shared confirmation.</span></div></div>
            <button className="svc-btn full" style={{ marginTop: 18 }} onClick={verifyOtp}><Check size={14} />Verify OTP</button>
          </div>
        </div>
      )}

      {ratingModal && (
        <div className="svc-modal-backdrop">
          <div className="svc-modal">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}><div><div className="svc-chip" style={{ color: "var(--ochre)" }}>Service completed</div><div className="svc-card-title">How was your experience?</div><div className="svc-eyebrow">Your feedback helps the worker build trust in the community.</div></div><button type="button" onClick={() => setRatingModal(null)} aria-label="Close rating" style={{ border: "none", background: "transparent", cursor: "pointer" }}><X size={17} /></button></div>
            <div style={{ display: "flex", justifyContent: "center", gap: 8, margin: "24px 0 8px" }}>
              {[1, 2, 3, 4, 5].map((rating) => <button key={rating} type="button" className="svc-star-btn" aria-label={`${rating} star${rating > 1 ? "s" : ""}`} onClick={() => setSelectedRating(rating)}><Star size={30} fill={rating <= selectedRating ? "#B8791F" : "transparent"} color="#B8791F" /></button>)}
            </div>
            <div style={{ textAlign: "center", minHeight: 20, fontSize: 12.5, color: "var(--muted)" }}>{selectedRating ? `${selectedRating} of 5 stars` : "Tap a star to rate"}</div>
            <div className="svc-field"><label>Tell us more (optional)</label><textarea className="svc-textarea" value={ratingReview} onChange={(e) => setRatingReview(e.target.value)} placeholder="What did the worker do well?" /></div>
            <div className="svc-info-strip"><HeartHandshake size={15} /><div><strong>Your review makes a difference</strong><br /><span>It helps good local workers earn more bookings.</span></div></div>
            <button className="svc-btn full" style={{ marginTop: 18 }} onClick={submitRating}><Check size={14} />Submit feedback</button>
          </div>
        </div>
      )}

      {bookingModal && (
        <div className="svc-modal-backdrop">
          <div className="svc-modal">
            <div
              className="svc-chip"
              style={{ color: CATEGORY_COLOR[bookingModal.category] }}
            >
              {bookingModal.category}
            </div>
            <div className="svc-card-title">{bookingModal.title}</div>
            <div className="svc-progress-steps" aria-label="Booking progress">
              <div className="svc-progress-step">
                <span className="svc-progress-dot">1</span>Choose time
              </div>
              <span className="svc-progress-line" />
              <div className="svc-progress-step">
                <span className="svc-progress-dot">2</span>Worker confirms
              </div>
            </div>
            <div
              style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 10 }}
            >
              Choose a slot
            </div>
            <div className="svc-slot-grid">
              {SLOTS.map((slot) => (
                <button
                  key={slot}
                  className={`svc-slot ${chosenSlot === slot ? "active" : ""}`}
                  onClick={() => setChosenSlot(slot)}
                >
                  {slot}
                </button>
              ))}
            </div>
            <div className="svc-payment-choice">
              <div>
                <strong>
                  <Smartphone
                    size={14}
                    style={{ verticalAlign: "-2px", marginRight: 5 }}
                  />
                  UPI after worker confirmation
                </strong>
                <span>
                  ₹{Math.round(bookingModal.price * WORKER_SHARE)} to your
                  worker · ₹
                  {Math.round(bookingModal.price * (1 - WORKER_SHARE))} supports
                  the cooperative
                </span>
              </div>
              <IndianRupee size={18} color="#2E5233" />
            </div>
            <div className="svc-info-strip" style={{ marginTop: 14 }}>
              <ShieldCheck size={15} />
              <div>
                <strong>Pay after confirmation</strong>
                <br />
                <span>
                  Your worker will review and confirm this request first.
                </span>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <button
                className="svc-btn ghost"
                onClick={() => setBookingModal(null)}
              >
                Cancel
              </button>
              <button className="svc-btn" onClick={confirmBooking}>
                Confirm booking
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      {verifyModal && (
        <div className="svc-modal-backdrop">
          <div className="svc-modal">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div className="svc-card-title">Verify {verifyModal.name}</div>
              <button className="svc-modal-close" aria-label="Close" onClick={() => setVerifyModal(null)}>
                <X size={16} />
              </button>
            </div>
            <div className="svc-field">
              <label>Aadhaar number</label>
              <div className="svc-input-wrap">
                <FileCheck size={15} color="#6E6F5E" />
                <input
                  placeholder="1234 5678 9012"
                  value={aadhaarInput}
                  onChange={(e) => setAadhaarInput(e.target.value)}
                />
              </div>
            </div>
            <div className="svc-field">
              <label>PAN number</label>
              <div className="svc-input-wrap">
                <CreditCard size={15} color="#6E6F5E" />
                <input
                  placeholder="ABCDE1234F"
                  value={panInput}
                  onChange={(e) => setPanInput(e.target.value.toUpperCase())}
                />
              </div>
            </div>
            <button
              className="svc-btn full"
              style={{ marginTop: 20 }}
              onClick={submitVerification}
            >
              <ShieldCheck size={14} />
              Verify & activate worker
            </button>
          </div>
        </div>
      )}

      {addWorkerModal && (
        <div className="svc-modal-backdrop">
          <div className="svc-modal">
            <div className="svc-modal-head">
              <div className="svc-card-title">Add a New Worker</div>
              <div className="svc-eyebrow">Add a worker directly to the cooperative. They will still need Aadhaar/PAN verification before activation.</div>
              <button
                type="button"
                className="svc-modal-close"
                aria-label="Close"
                onClick={() => setAddWorkerModal(false)}
              >
                <X size={16} />
              </button>
            </div>

            <div className="svc-field">
              <label>Full name *</label>
              <div className="svc-input-wrap">
                <input placeholder="e.g. Ramesh Yadav" value={newWorker.name} onChange={(e) => setNewWorker({ ...newWorker, name: e.target.value })} />
              </div>
            </div>

            <div className="svc-field">
              <label>Phone number *</label>
              <div className="svc-input-wrap">
                <Phone size={15} color="#6E6F5E" />
                <input type="tel" placeholder="9876543210" value={newWorker.phone} onChange={(e) => setNewWorker({ ...newWorker, phone: e.target.value })} />
              </div>
            </div>

            <div className="svc-field">
              <label>Email *</label>
              <div className="svc-input-wrap">
                <Mail size={15} color="#6E6F5E" />
                <input type="email" placeholder="ramesh@example.com" value={newWorker.email} onChange={(e) => setNewWorker({ ...newWorker, email: e.target.value })} />
              </div>
            </div>

            <div className="svc-field">
              <label>Service you provide</label>
              <select className="svc-select" style={{ width: "100%" }} value={newWorker.skill} onChange={(e) => setNewWorker({ ...newWorker, skill: e.target.value })}>
                {Object.keys(CATEGORY_COLOR).map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>

            <div className="svc-field">
              <label>Years of experience</label>
              <div className="svc-input-wrap">
                <input placeholder="e.g. 4 years" value={newWorker.experience} onChange={(e) => setNewWorker({ ...newWorker, experience: e.target.value })} />
              </div>
            </div>

            <div className="svc-field">
              <label>Location</label>
              <div className="svc-input-wrap">
                <MapPin size={15} color="#6E6F5E" />
                <input placeholder="e.g. Gomti Nagar, Lucknow" value={newWorker.location} onChange={(e) => setNewWorker({ ...newWorker, location: e.target.value })} />
              </div>
            </div>

            <div className="svc-field">
              <label>Skills</label>
              <textarea className="svc-textarea" style={{ minHeight: 70 }} placeholder="e.g. Pipe fitting, leakage repair, drain cleaning" value={newWorker.skills} onChange={(e) => setNewWorker({ ...newWorker, skills: e.target.value })} />
            </div>

            <button className="svc-btn full" style={{ marginTop: 18 }} onClick={addWorkerDirectly}>
              <UserPlus size={14} />
              Add Worker
            </button>
          </div>
        </div>
      )}
      {payModal && (
        <div className="svc-modal-backdrop">
          <div className="svc-modal">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div className="svc-card-title">Pay {payModal.name}</div>
              <button className="svc-modal-close" aria-label="Close" onClick={() => setPayModal(null)}>
                <X size={16} />
              </button>
            </div>
            <div
              className="svc-panel"
              style={{
                marginTop: 14,
                background: "var(--soft)",
                border: "none",
              }}
            >
              <div style={{ fontSize: 12, color: "var(--muted)" }}>
                Amount due
              </div>
              <div
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: 24,
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <IndianRupee size={18} />
                {payModal.pendingPayout}
              </div>
            </div>
            <button
              className="svc-btn full"
              style={{ marginTop: 18 }}
              onClick={() => payWorker(payModal.id)}
            >
              <CreditCard size={14} />
              Confirm payout
            </button>
          </div>
        </div>
      )}

      {toast && (
        <div className="svc-toast">
          <Check size={14} />
          {toast}
        </div>
      )}
    </div>
  );
}
