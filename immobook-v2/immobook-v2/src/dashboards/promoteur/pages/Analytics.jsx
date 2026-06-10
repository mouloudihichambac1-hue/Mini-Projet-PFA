import { useState, useMemo } from "react";

// ─── Icons ─────────────────────────────────────────────────────────────────────
const IconEye = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
  </svg>
);
const IconUsers = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const IconBuilding = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <path d="M3 21h18M3 7l9-4 9 4M4 21V7M20 21V7M9 21v-4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4" />
  </svg>
);
const IconCoins = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <circle cx="8" cy="8" r="6" /><path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
    <path d="M7 6h1v4" /><path d="m16.71 13.88.7.71-2.82 2.82" />
  </svg>
);
const IconTrendUp = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" />
  </svg>
);
const IconTrendDown = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
    <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" /><polyline points="16 17 22 17 22 11" />
  </svg>
);
const IconCalendar = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" />
  </svg>
);
const IconChevronDown = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);
const IconDot = () => (
  <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4" /></svg>
);
const IconBarChart = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <line x1="18" x2="18" y1="20" y2="10" /><line x1="12" x2="12" y1="20" y2="4" />
    <line x1="6" x2="6" y1="20" y2="14" /><line x1="2" x2="22" y1="20" y2="20" />
  </svg>
);
const IconActivity = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);
const IconPin = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
  </svg>
);
const IconFilter = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);
const IconDownload = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" />
  </svg>
);

// ─── Mock Data ─────────────────────────────────────────────────────────────────
const PERIODS = ["7 derniers jours", "Ce mois", "Ce trimestre", "Cette année"];

const KPI_DATA = {
  "7 derniers jours":   { views: 2841,  leads: 17,  properties: 12, valuation: 24.5, vGrowth: 8,  lGrowth: 3  },
  "Ce mois":            { views: 14208, leads: 84,  properties: 12, valuation: 24.5, vGrowth: 12, lGrowth: 5  },
  "Ce trimestre":       { views: 38750, leads: 231, properties: 14, valuation: 31.2, vGrowth: 18, lGrowth: 11 },
  "Cette année":        { views: 91340, leads: 605, properties: 18, valuation: 47.8, vGrowth: 34, lGrowth: 22 },
};

const PROPERTIES_VIEWS = [
  { id: 1, name: "Villa Palmeraie", city: "Marrakech", type: "Villa",       views: 3840, leads: 22, convRate: 0.57, gradient: "from-violet-500 to-indigo-600" },
  { id: 2, name: "Appt Ain Diab",   city: "Casablanca", type: "Appartement", views: 2970, leads: 18, convRate: 0.61, gradient: "from-blue-500 to-cyan-500"     },
  { id: 3, name: "Riad Médina",     city: "Marrakech",  type: "Riad",        views: 2410, leads: 14, convRate: 0.58, gradient: "from-rose-500 to-pink-500"     },
  { id: 4, name: "Penthouse Maarif",city: "Casablanca", type: "Appartement", views: 1980, leads: 11, convRate: 0.55, gradient: "from-amber-500 to-orange-500"  },
  { id: 5, name: "Terrain Malabata",city: "Tanger",     type: "Terrain",     views: 1540, leads:  9, convRate: 0.58, gradient: "from-emerald-500 to-teal-500"  },
  { id: 6, name: "Villa Agdal",     city: "Rabat",      type: "Villa",       views: 1210, leads:  7, convRate: 0.58, gradient: "from-fuchsia-500 to-purple-600" },
];

const TRAFFIC_SOURCES = [
  { label: "Recherche directe", pct: 42, color: "bg-indigo-500" },
  { label: "Réseaux sociaux",   pct: 28, color: "bg-violet-500" },
  { label: "Google Ads",        pct: 18, color: "bg-blue-400"   },
  { label: "Référencement",     pct: 12, color: "bg-cyan-400"   },
];

const LEADS_DATA = [
  { id: 1,  name: "Mehdi Karimi",    property: "Villa Palmeraie",  city: "Marrakech",  date: "Aujourd'hui, 10:32",   status: "Visite planifiée", avatar: "MK", color: "bg-violet-500" },
  { id: 2,  name: "Yasmine Tazi",    property: "Appt Ain Diab",    city: "Casablanca", date: "Aujourd'hui, 09:15",   status: "En attente",       avatar: "YT", color: "bg-blue-500"   },
  { id: 3,  name: "Anas Berrada",    property: "Riad Médina",      city: "Marrakech",  date: "Hier, 16:48",          status: "Contacté",         avatar: "AB", color: "bg-rose-500"   },
  { id: 4,  name: "Sara El Fassi",   property: "Penthouse Maarif", city: "Casablanca", date: "Hier, 14:20",          status: "Visite planifiée", avatar: "SE", color: "bg-amber-500"  },
  { id: 5,  name: "Youssef Mansour", property: "Villa Palmeraie",  city: "Marrakech",  date: "Hier, 11:03",          status: "En attente",       avatar: "YM", color: "bg-emerald-500"},
  { id: 6,  name: "Nadia Chaoui",    property: "Terrain Malabata", city: "Tanger",     date: "22 Jan, 09:55",        status: "Refusé",           avatar: "NC", color: "bg-gray-400"   },
  { id: 7,  name: "Omar El Haddad",  property: "Villa Agdal",      city: "Rabat",      date: "21 Jan, 15:30",        status: "Contacté",         avatar: "OH", color: "bg-fuchsia-500"},
  { id: 8,  name: "Leila Bennani",   property: "Appt Ain Diab",    city: "Casablanca", date: "21 Jan, 10:12",        status: "Visite planifiée", avatar: "LB", color: "bg-teal-500"   },
];

const WEEKLY_VIEWS = [
  { day: "Lun", views: 320 },
  { day: "Mar", views: 510 },
  { day: "Mer", views: 480 },
  { day: "Jeu", views: 695 },
  { day: "Ven", views: 820 },
  { day: "Sam", views: 430 },
  { day: "Dim", views: 290 },
];

// ─── Status Badge ──────────────────────────────────────────────────────────────
const STATUS_STYLES = {
  "Visite planifiée": "bg-emerald-100 text-emerald-700 border border-emerald-200",
  "En attente":       "bg-amber-100  text-amber-700  border border-amber-200",
  "Contacté":         "bg-blue-100   text-blue-700   border border-blue-200",
  "Refusé":           "bg-gray-100   text-gray-500   border border-gray-200",
};
const STATUS_DOT = {
  "Visite planifiée": "bg-emerald-500",
  "En attente":       "bg-amber-400",
  "Contacté":         "bg-blue-500",
  "Refusé":           "bg-gray-400",
};

function StatusBadge({ status }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_STYLES[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[status]}`} />
      {status}
    </span>
  );
}

// ─── KPI Card ──────────────────────────────────────────────────────────────────
function KpiCard({ icon, label, value, growth, growthPositive, accent, sub }) {
  return (
    <div className={`relative overflow-hidden bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 p-5 flex flex-col gap-3`}>
      {/* Decorative glow */}
      <div className={`absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-8 blur-2xl ${accent}`} />

      <div className="flex items-start justify-between">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-white ${accent} shadow-sm`}>
          {icon}
        </div>
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${
          growthPositive ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-600"
        }`}>
          {growthPositive ? <IconTrendUp /> : <IconTrendDown />}
          {growth > 0 ? "+" : ""}{growth}%
        </span>
      </div>

      <div>
        <p className="text-2xl font-bold text-gray-900 tracking-tight">{value}</p>
        <p className="text-sm text-gray-500 mt-0.5">{label}</p>
        {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

// ─── Bar Chart ─────────────────────────────────────────────────────────────────
function PropertyBarChart({ data }) {
  const max = Math.max(...data.map(d => d.views));
  const [hovered, setHovered] = useState(null);

  return (
    <div className="flex items-end gap-2 h-48 w-full pt-4">
      {data.map((item) => {
        const pct = Math.round((item.views / max) * 100);
        const isHov = hovered === item.id;
        return (
          <div
            key={item.id}
            className="flex-1 flex flex-col items-center gap-1 group cursor-pointer"
            onMouseEnter={() => setHovered(item.id)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Tooltip */}
            <div className={`mb-1 px-2 py-1 rounded-lg bg-gray-900 text-white text-xs text-center whitespace-nowrap transition-all duration-200 pointer-events-none ${isHov ? "opacity-100 -translate-y-0" : "opacity-0 translate-y-1"}`}>
              <p className="font-semibold">{item.views.toLocaleString()} vues</p>
              <p className="text-gray-300">{item.leads} leads</p>
            </div>

            {/* Bar */}
            <div className="w-full relative flex flex-col justify-end" style={{ height: "160px" }}>
              <div
                className={`w-full rounded-t-lg bg-gradient-to-t ${item.gradient} transition-all duration-500 ease-out ${isHov ? "opacity-100 shadow-lg" : "opacity-80"}`}
                style={{ height: `${pct}%` }}
              />
            </div>

            {/* Label */}
            <p className={`text-center text-xs leading-tight transition-colors duration-200 ${isHov ? "text-indigo-600 font-semibold" : "text-gray-500"}`}>
              {item.name.split(" ")[0]}
            </p>
          </div>
        );
      })}
    </div>
  );
}

// ─── Weekly Sparkline Bar ──────────────────────────────────────────────────────
function WeeklyBar({ data }) {
  const max = Math.max(...data.map(d => d.views));
  const [hovered, setHovered] = useState(null);
  return (
    <div className="flex items-end gap-1.5 h-24 w-full">
      {data.map((d) => {
        const pct = Math.round((d.views / max) * 100);
        const isHov = hovered === d.day;
        return (
          <div
            key={d.day}
            className="flex-1 flex flex-col items-center gap-1 cursor-pointer"
            onMouseEnter={() => setHovered(d.day)}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="w-full relative flex flex-col justify-end" style={{ height: "80px" }}>
              <div
                className={`w-full rounded-t-md transition-all duration-300 ${isHov ? "bg-indigo-500" : "bg-indigo-200"}`}
                style={{ height: `${pct}%` }}
              />
            </div>
            <p className="text-xs text-gray-400">{d.day}</p>
          </div>
        );
      })}
    </div>
  );
}

// ─── Main Analytics Page ───────────────────────────────────────────────────────
function Analytics() {
  const [period, setPeriod] = useState("Ce mois");
  const [periodOpen, setPeriodOpen] = useState(false);
  const [leadsFilter, setLeadsFilter] = useState("Tous");
  const kpi = KPI_DATA[period];

  const filteredLeads = useMemo(() => {
    if (leadsFilter === "Tous") return LEADS_DATA;
    return LEADS_DATA.filter(l => l.status === leadsFilter);
  }, [leadsFilter]);

  const today = new Date().toLocaleDateString("fr-MA", { day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="min-h-screen bg-gray-50/60">

      {/* ── Header ── */}
      <div className="px-6 pt-6 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-gray-400 font-medium">Données en direct · {today}</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Tableau de Bord Analytics</h1>
          <p className="text-gray-500 text-sm mt-0.5">Vue d'ensemble des performances de votre portefeuille immobilier.</p>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Period selector */}
          <div className="relative">
            <button
              onClick={() => setPeriodOpen(o => !o)}
              className="flex items-center gap-2 h-10 px-4 rounded-xl bg-white border border-gray-200 text-sm font-medium text-gray-700 hover:border-indigo-300 hover:text-indigo-600 transition-all duration-200 shadow-sm"
            >
              <IconCalendar />
              {period}
              <IconChevronDown />
            </button>
            {periodOpen && (
              <div className="absolute right-0 top-12 z-20 bg-white rounded-xl border border-gray-100 shadow-xl py-1 min-w-max">
                {PERIODS.map(p => (
                  <button
                    key={p}
                    onClick={() => { setPeriod(p); setPeriodOpen(false); }}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors duration-150 ${
                      p === period ? "text-indigo-600 bg-indigo-50 font-semibold" : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className="flex items-center gap-2 h-10 px-4 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors duration-200 shadow-sm shadow-indigo-200">
            <IconDownload />
            Exporter
          </button>
        </div>
      </div>

      {/* ── KPIs ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-6 mb-6">
        <KpiCard
          icon={<IconEye />}
          label="Vues totales"
          value={kpi.views.toLocaleString("fr-MA")}
          growth={kpi.vGrowth}
          growthPositive
          accent="bg-indigo-500"
          sub={`vs période précédente`}
        />
        <KpiCard
          icon={<IconUsers />}
          label="Demandes de visite"
          value={kpi.leads.toLocaleString("fr-MA")}
          growth={kpi.lGrowth}
          growthPositive
          accent="bg-violet-500"
          sub="Leads qualifiés"
        />
        <KpiCard
          icon={<IconBuilding />}
          label="Biens en ligne"
          value={kpi.properties}
          growth={2}
          growthPositive
          accent="bg-emerald-500"
          sub="Annonces actives"
        />
        <KpiCard
          icon={<IconCoins />}
          label="Valorisation totale"
          value={`${kpi.valuation}M DH`}
          growth={6}
          growthPositive
          accent="bg-amber-500"
          sub="Portefeuille estimé"
        />
      </div>

      {/* ── Main Charts Row ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 px-6 mb-6">

        {/* Bar Chart — Vues par propriété */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                <IconBarChart />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900 text-sm">Vues par Propriété</h2>
                <p className="text-xs text-gray-400">Performance de chaque annonce</p>
              </div>
            </div>
            <span className="text-xs text-gray-400 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100">{period}</span>
          </div>

          <PropertyBarChart data={PROPERTIES_VIEWS} />

          {/* Legend */}
          <div className="mt-4 flex flex-wrap gap-3">
            {PROPERTIES_VIEWS.map(item => (
              <div key={item.id} className="flex items-center gap-1.5 text-xs text-gray-500">
                <div className={`w-2.5 h-2.5 rounded-sm bg-gradient-to-br ${item.gradient}`} />
                {item.name}
              </div>
            ))}
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center text-violet-600">
              <IconActivity />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900 text-sm">Sources de Trafic</h2>
              <p className="text-xs text-gray-400">Origine des visiteurs</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 flex-1 justify-center">
            {TRAFFIC_SOURCES.map(src => (
              <div key={src.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm text-gray-700 font-medium">{src.label}</span>
                  <span className="text-sm font-bold text-gray-900">{src.pct}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${src.color} transition-all duration-700`}
                    style={{ width: `${src.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Weekly sparkline */}
          <div className="border-t border-gray-100 pt-4">
            <p className="text-xs font-medium text-gray-500 mb-3">Vues cette semaine</p>
            <WeeklyBar data={WEEKLY_VIEWS} />
          </div>
        </div>
      </div>

      {/* ── Property Performance Table ── */}
      <div className="px-6 mb-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-gray-900 text-sm">Performance des Propriétés</h2>
              <p className="text-xs text-gray-400 mt-0.5">Taux de conversion et engagement par bien</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-50">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Propriété</th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Vues</th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Leads</th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden md:table-cell">Conv. Rate</th>
                  <th className="px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden lg:table-cell">Score</th>
                </tr>
              </thead>
              <tbody>
                {PROPERTIES_VIEWS.map((item, idx) => (
                  <tr key={item.id} className={`border-b border-gray-50 hover:bg-gray-50/70 transition-colors duration-150 ${idx === PROPERTIES_VIEWS.length - 1 ? "border-b-0" : ""}`}>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${item.gradient} flex-shrink-0 flex items-center justify-center text-white text-xs font-bold`}>
                          {item.name[0]}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{item.name}</p>
                          <p className="text-xs text-gray-400 flex items-center gap-1"><IconPin />{item.city} · {item.type}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-right font-semibold text-gray-800">{item.views.toLocaleString()}</td>
                    <td className="px-5 py-3.5 text-right">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-indigo-50 text-indigo-600 font-bold text-xs">{item.leads}</span>
                    </td>
                    <td className="px-5 py-3.5 text-right hidden md:table-cell">
                      <span className="text-emerald-600 font-semibold">{(item.convRate * 100).toFixed(0)}%</span>
                    </td>
                    <td className="px-5 py-3.5 hidden lg:table-cell">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r ${item.gradient}`}
                            style={{ width: `${Math.round((item.views / 3840) * 100)}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-400 w-8 text-right">{Math.round((item.views / 3840) * 100)}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── Recent Leads ── */}
      <div className="px-6 pb-10">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="font-semibold text-gray-900 text-sm">Leads Récents</h2>
              <p className="text-xs text-gray-400 mt-0.5">Journal en temps réel des demandes clients</p>
            </div>
            {/* Filter pills */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs text-gray-400 flex items-center gap-1 mr-1"><IconFilter />Filtrer :</span>
              {["Tous", "En attente", "Visite planifiée", "Contacté", "Refusé"].map(f => (
                <button
                  key={f}
                  onClick={() => setLeadsFilter(f)}
                  className={`h-7 px-2.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                    leadsFilter === f
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {filteredLeads.length === 0 ? (
            <div className="py-16 text-center text-gray-400">
              <p className="text-sm">Aucun lead pour ce filtre.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {filteredLeads.map((lead) => (
                <div key={lead.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50/60 transition-colors duration-150">
                  {/* Avatar */}
                  <div className={`w-9 h-9 rounded-full ${lead.color} text-white text-xs font-bold flex items-center justify-center flex-shrink-0`}>
                    {lead.avatar}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm truncate">{lead.name}</p>
                    <p className="text-xs text-gray-400 flex items-center gap-1 truncate">
                      <IconPin />
                      {lead.property} · {lead.city}
                    </p>
                  </div>

                  {/* Date */}
                  <p className="text-xs text-gray-400 hidden sm:block flex-shrink-0">{lead.date}</p>

                  {/* Status */}
                  <StatusBadge status={lead.status} />
                </div>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between">
            <p className="text-xs text-gray-400">{filteredLeads.length} lead{filteredLeads.length !== 1 ? "s" : ""} affichés</p>
            <button className="text-xs text-indigo-600 font-semibold hover:underline">Voir tous les leads →</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;