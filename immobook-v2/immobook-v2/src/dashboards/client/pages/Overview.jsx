import { useState, useMemo } from "react";

// ─── Icons (inline SVG components) ────────────────────────────────────────────
const IconSearch = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
  </svg>
);
const IconHeart = ({ filled }) => (
  <svg className="w-4 h-4" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);
const IconBed = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v6H2" /><path d="M6 8v4" />
  </svg>
);
const IconBath = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" />
    <line x1="10" x2="8" y1="5" y2="7" /><line x1="2" x2="22" y1="12" y2="12" />
  </svg>
);
const IconArea = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <rect width="18" height="18" x="3" y="3" rx="2" /><path d="M3 9h18M9 21V9" />
  </svg>
);
const IconPin = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
  </svg>
);
const IconCube = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.29 7 12 12 20.71 7" /><line x1="12" x2="12" y1="22" y2="12" />
  </svg>
);
const IconGrid = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <rect width="7" height="7" x="3" y="3" rx="1" /><rect width="7" height="7" x="14" y="3" rx="1" />
    <rect width="7" height="7" x="14" y="14" rx="1" /><rect width="7" height="7" x="3" y="14" rx="1" />
  </svg>
);
const IconList = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <line x1="8" x2="21" y1="6" y2="6" /><line x1="8" x2="21" y1="12" y2="12" />
    <line x1="8" x2="21" y1="18" y2="18" /><line x1="3" x2="3.01" y1="6" y2="6" />
    <line x1="3" x2="3.01" y1="12" y2="12" /><line x1="3" x2="3.01" y1="18" y2="18" />
  </svg>
);
const IconStar = () => (
  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
const IconChevronDown = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);
const IconSparkle = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zm-1-11v2H9v2h2v2h2v-2h2v-2h-2V8h-2z"/>
  </svg>
);
const IconBuilding = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path d="M3 21h18M3 7l9-4 9 4M4 21V7M20 21V7M9 21v-4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4" />
  </svg>
);
const IconTrendUp = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" />
  </svg>
);
const IconEye = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
  </svg>
);
const IconBookmark = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);

// ─── Mock Data ─────────────────────────────────────────────────────────────────
const PROPERTIES = [
  {
    id: 1,
    title: "Villa Moderne avec Piscine",
    type: "Villa",
    status: "À Vendre",
    price: 4850000,
    city: "Marrakech",
    neighborhood: "Palmeraie",
    beds: 5, baths: 4, area: 420,
    rating: 4.9, reviews: 38,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80",
    gradient: "from-amber-400 via-orange-400 to-rose-500",
    badge: "Premium",
    has3D: true,
    new: false,
  },
  {
    id: 2,
    title: "Appartement Vue Océan",
    type: "Appartement",
    status: "À Louer",
    price: 12500,
    city: "Casablanca",
    neighborhood: "Ain Diab",
    beds: 3, baths: 2, area: 145,
    rating: 4.7, reviews: 22,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80",
    gradient: "from-sky-400 via-blue-500 to-indigo-600",
    badge: "Coup de Cœur",
    has3D: true,
    new: true,
  },
  {
    id: 3,
    title: "Riad Traditionnel Rénové",
    type: "Riad",
    status: "À Vendre",
    price: 2200000,
    city: "Marrakech",
    neighborhood: "Médina",
    beds: 4, baths: 3, area: 280,
    rating: 5.0, reviews: 17,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80",
    gradient: "from-rose-400 via-pink-500 to-purple-600",
    badge: "Exclusif",
    has3D: false,
    new: true,
  },
  {
    id: 4,
    title: "Appartement Standing Centre-Ville",
    type: "Appartement",
    status: "À Vendre",
    price: 1850000,
    city: "Rabat",
    neighborhood: "Agdal",
    beds: 3, baths: 2, area: 120,
    rating: 4.6, reviews: 31,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80",
    gradient: "from-emerald-400 via-teal-500 to-cyan-600",
    badge: null,
    has3D: true,
    new: false,
  },
  {
    id: 5,
    title: "Terrain Constructible avec Vue",
    type: "Terrain",
    status: "À Vendre",
    price: 980000,
    city: "Tanger",
    neighborhood: "Malabata",
    beds: null, baths: null, area: 600,
    rating: 4.3, reviews: 9,
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=80",
    gradient: "from-lime-400 via-green-500 to-emerald-600",
    badge: "Opportunité",
    has3D: false,
    new: true,
  },
  {
    id: 6,
    title: "Penthouse Panoramique Luxe",
    type: "Appartement",
    status: "À Louer",
    price: 28000,
    city: "Casablanca",
    neighborhood: "Maarif",
    beds: 4, baths: 3, area: 220,
    rating: 4.8, reviews: 14,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80",
    gradient: "from-violet-400 via-purple-500 to-indigo-600",
    badge: "Top Luxe",
    has3D: true,
    new: false,
  },
];

const STATS = [
  { label: "Biens Disponibles", value: "247", delta: "+12", icon: <IconBuilding />, color: "from-blue-500 to-indigo-600", light: "bg-blue-50 text-blue-600" },
  { label: "Nouveautés / Semaine", value: "18", delta: "+5", icon: <IconSparkle />, color: "from-emerald-500 to-teal-600", light: "bg-emerald-50 text-emerald-600" },
  { label: "Visites Planifiées", value: "3", delta: "+1", icon: <IconEye />, color: "from-amber-500 to-orange-600", light: "bg-amber-50 text-amber-600" },
  { label: "Favoris Sauvegardés", value: "9", delta: "+2", icon: <IconBookmark />, color: "from-rose-500 to-pink-600", light: "bg-rose-50 text-rose-600" },
];

const TYPES = ["Tous", "Appartement", "Villa", "Riad", "Terrain"];
const CITIES = ["Toutes les villes", "Casablanca", "Marrakech", "Rabat", "Tanger"];
const BUDGETS = ["Tous les budgets", "< 500K MAD", "500K – 1M MAD", "1M – 3M MAD", "> 3M MAD"];

// ─── Helpers ───────────────────────────────────────────────────────────────────
const formatPrice = (price, status) => {
  if (status === "À Louer") return `${price.toLocaleString("fr-MA")} MAD/mois`;
  if (price >= 1000000) return `${(price / 1000000).toFixed(2)} M MAD`;
  return `${price.toLocaleString("fr-MA")} MAD`;
};

const statusColors = {
  "À Vendre": "bg-emerald-500 text-white",
  "À Louer": "bg-blue-500 text-white",
};
const badgeColors = {
  "Premium": "bg-amber-100 text-amber-700 border border-amber-200",
  "Coup de Cœur": "bg-rose-100 text-rose-700 border border-rose-200",
  "Exclusif": "bg-purple-100 text-purple-700 border border-purple-200",
  "Opportunité": "bg-teal-100 text-teal-700 border border-teal-200",
  "Top Luxe": "bg-indigo-100 text-indigo-700 border border-indigo-200",
};

// ─── PropertyCard ──────────────────────────────────────────────────────────────
function PropertyCard({ property, isFav, onFavToggle }) {
  const [imgErr, setImgErr] = useState(false);

  return (
    <div className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        {!imgErr ? (
          <img
            src={property.image}
            alt={property.title}
            onError={() => setImgErr(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${property.gradient} flex items-center justify-center`}>
            <span className="text-white/60 text-5xl font-bold">{property.type[0]}</span>
          </div>
        )}
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

        {/* Status badge */}
        <span className={`absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusColors[property.status]}`}>
          {property.status}
        </span>

        {/* New badge */}
        {property.new && (
          <span className="absolute top-3 left-[90px] px-2 py-0.5 rounded-full text-xs font-semibold bg-yellow-400 text-yellow-900">
            Nouveau
          </span>
        )}

        {/* Fav button */}
        <button
          onClick={() => onFavToggle(property.id)}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-200 ${
            isFav
              ? "bg-rose-500 text-white shadow-lg shadow-rose-200"
              : "bg-white/80 text-gray-400 hover:text-rose-500 hover:bg-white"
          }`}
        >
          <IconHeart filled={isFav} />
        </button>

        {/* 3D badge */}
        {property.has3D && (
          <span className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm text-white text-xs font-medium">
            <IconCube />
            Visite 3D
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Type + badge */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2 py-0.5 rounded-md bg-gray-100 text-gray-600 text-xs font-medium">
            {property.type}
          </span>
          {property.badge && (
            <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${badgeColors[property.badge] ?? "bg-gray-100 text-gray-600"}`}>
              {property.badge}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2 group-hover:text-indigo-600 transition-colors duration-200">
          {property.title}
        </h3>

        {/* Price */}
        <p className="text-lg font-bold text-indigo-600 tracking-tight">
          {formatPrice(property.price, property.status)}
        </p>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-gray-500 text-xs">
          <IconPin />
          <span>{property.neighborhood}, {property.city}</span>
        </div>

        {/* Features */}
        {(property.beds !== null || property.area) && (
          <div className="flex items-center gap-3 pt-1 border-t border-gray-100 text-gray-500 text-xs">
            {property.beds !== null && (
              <span className="flex items-center gap-1"><IconBed />{property.beds} Ch.</span>
            )}
            {property.baths !== null && (
              <span className="flex items-center gap-1"><IconBath />{property.baths} SDB</span>
            )}
            <span className="flex items-center gap-1"><IconArea />{property.area} m²</span>
          </div>
        )}

        {/* Rating */}
        <div className="flex items-center gap-1 text-xs text-amber-500">
          <IconStar />
          <span className="font-semibold text-gray-800">{property.rating}</span>
          <span className="text-gray-400">({property.reviews} avis)</span>
        </div>

        {/* CTA */}
        <button className="mt-auto w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-indigo-200 active:scale-95 flex items-center justify-center gap-2">
          {property.has3D ? (
            <><IconCube />Visite 3D & Détails</>
          ) : (
            <>Voir les Détails</>
          )}
        </button>
      </div>
    </div>
  );
}

// ─── Select Component ──────────────────────────────────────────────────────────
function FilterSelect({ value, onChange, options }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="appearance-none h-10 pl-3 pr-8 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 cursor-pointer transition-all duration-200 hover:border-gray-300"
      >
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400">
        <IconChevronDown />
      </span>
    </div>
  );
}

// ─── Main Overview ─────────────────────────────────────────────────────────────
function Overview() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("Tous");
  const [cityFilter, setCityFilter] = useState("Toutes les villes");
  const [budgetFilter, setBudgetFilter] = useState("Tous les budgets");
  const [favorites, setFavorites] = useState(new Set([2]));
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("default");

  const toggleFav = (id) => {
    setFavorites(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const filtered = useMemo(() => {
    let list = [...PROPERTIES];
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q) ||
        p.neighborhood.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q)
      );
    }
    if (typeFilter !== "Tous") list = list.filter(p => p.type === typeFilter);
    if (cityFilter !== "Toutes les villes") list = list.filter(p => p.city === cityFilter);
    if (budgetFilter !== "Tous les budgets") {
      list = list.filter(p => {
        if (budgetFilter === "< 500K MAD") return p.price < 500000;
        if (budgetFilter === "500K – 1M MAD") return p.price >= 500000 && p.price < 1000000;
        if (budgetFilter === "1M – 3M MAD") return p.price >= 1000000 && p.price < 3000000;
        if (budgetFilter === "> 3M MAD") return p.price >= 3000000;
        return true;
      });
    }
    if (sortBy === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sortBy === "rating") list.sort((a, b) => b.rating - a.rating);
    if (sortBy === "newest") list.sort((a, b) => b.new - a.new);
    return list;
  }, [search, typeFilter, cityFilter, budgetFilter, sortBy]);

  const hasActiveFilters =
    search.trim() ||
    typeFilter !== "Tous" ||
    cityFilter !== "Toutes les villes" ||
    budgetFilter !== "Tous les budgets";

  const resetFilters = () => {
    setSearch("");
    setTypeFilter("Tous");
    setCityFilter("Toutes les villes");
    setBudgetFilter("Tous les budgets");
    setSortBy("default");
  };

  return (
    <div className="min-h-screen bg-gray-50/60">
      {/* ── Welcome Header ── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 rounded-2xl mx-6 mt-6 px-6 py-8 text-white shadow-xl shadow-indigo-200">
        {/* Decorative circles */}
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/5 blur-sm" />
        <div className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full bg-white/5" />
        <div className="absolute top-4 right-32 w-3 h-3 rounded-full bg-yellow-300/60" />
        <div className="absolute bottom-6 right-16 w-2 h-2 rounded-full bg-pink-300/50" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 rounded-full bg-white/15 text-white/90 text-xs font-semibold backdrop-blur-sm border border-white/20">
                ✦ ImmoBook v2
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              Bienvenue, Youssef 👋
            </h1>
            <p className="text-indigo-200 text-sm mt-1 max-w-sm">
              Explorez les meilleures opportunités immobilières au Maroc — filtrées pour vous.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-96">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-indigo-300">
              <IconSearch />
            </span>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Rechercher une ville, quartier, type…"
              className="w-full h-11 pl-10 pr-4 rounded-xl bg-white/15 backdrop-blur-sm border border-white/25 text-white placeholder-indigo-300 text-sm focus:outline-none focus:ring-2 focus:ring-white/40 focus:bg-white/20 transition-all duration-200"
            />
          </div>
        </div>
      </div>

      {/* ── Stats Row ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-6 mt-6">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-4"
          >
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${s.light}`}>
              {s.icon}
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 leading-none">{s.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
              <span className="inline-flex items-center gap-0.5 mt-1 text-emerald-600 text-xs font-medium">
                <IconTrendUp />
                {s.delta} cette semaine
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Filters & Controls ── */}
      <div className="px-6 mt-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-wrap items-center gap-3">
          {/* Type pills */}
          <div className="flex items-center gap-2 flex-wrap">
            {TYPES.map(t => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`h-9 px-3.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  typeFilter === t
                    ? "bg-indigo-600 text-white shadow-sm shadow-indigo-200"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="h-6 w-px bg-gray-200 hidden md:block" />

          {/* Selects */}
          <div className="flex items-center gap-2 flex-wrap">
            <FilterSelect value={cityFilter} onChange={setCityFilter} options={CITIES} />
            <FilterSelect value={budgetFilter} onChange={setBudgetFilter} options={BUDGETS} />
            <FilterSelect
              value={sortBy}
              onChange={setSortBy}
              options={["default", "price-asc", "price-desc", "rating", "newest"].map(v => ({
                "default": "Trier par défaut", "price-asc": "Prix ↑", "price-desc": "Prix ↓",
                "rating": "Mieux notés", "newest": "Nouveautés"
              }[v]))}
            />
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Reset */}
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="h-9 px-3.5 rounded-xl text-sm font-medium bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors duration-200"
            >
              Réinitialiser
            </button>
          )}

          {/* View mode */}
          <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`w-8 h-7 rounded-lg flex items-center justify-center transition-all duration-200 ${
                viewMode === "grid" ? "bg-white shadow-sm text-indigo-600" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <IconGrid />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`w-8 h-7 rounded-lg flex items-center justify-center transition-all duration-200 ${
                viewMode === "list" ? "bg-white shadow-sm text-indigo-600" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <IconList />
            </button>
          </div>
        </div>
      </div>

      {/* ── Results Header ── */}
      <div className="px-6 mt-5 flex items-center justify-between">
        <p className="text-sm text-gray-500">
          <span className="font-semibold text-gray-800">{filtered.length}</span> bien{filtered.length !== 1 ? "s" : ""} trouvé{filtered.length !== 1 ? "s" : ""}
          {hasActiveFilters && <span className="text-indigo-500 ml-1">· filtres actifs</span>}
        </p>
        <p className="text-xs text-gray-400">Mis à jour il y a 2 min</p>
      </div>

      {/* ── Property Grid ── */}
      <div className="px-6 mt-4 pb-10">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4 text-gray-300">
              <IconBuilding />
            </div>
            <h3 className="text-gray-700 font-semibold text-lg">Aucun bien trouvé</h3>
            <p className="text-gray-400 text-sm mt-1 max-w-xs">
              Essayez de modifier vos filtres ou votre recherche pour découvrir plus de biens.
            </p>
            <button
              onClick={resetFilters}
              className="mt-4 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors duration-200"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                : "flex flex-col gap-4"
            }
          >
            {filtered.map((property) =>
              viewMode === "grid" ? (
                <PropertyCard
                  key={property.id}
                  property={property}
                  isFav={favorites.has(property.id)}
                  onFavToggle={toggleFav}
                />
              ) : (
                <ListCard
                  key={property.id}
                  property={property}
                  isFav={favorites.has(property.id)}
                  onFavToggle={toggleFav}
                />
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── List View Card ────────────────────────────────────────────────────────────
function ListCard({ property, isFav, onFavToggle }) {
  const [imgErr, setImgErr] = useState(false);

  return (
    <div className="group flex bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-0.5">
      {/* Image */}
      <div className="relative w-48 flex-shrink-0 overflow-hidden">
        {!imgErr ? (
          <img
            src={property.image}
            alt={property.title}
            onError={() => setImgErr(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${property.gradient} flex items-center justify-center`}>
            <span className="text-white/50 text-4xl font-bold">{property.type[0]}</span>
          </div>
        )}
        <span className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-semibold ${statusColors[property.status]}`}>
          {property.status}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 items-center gap-6 px-5 py-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded-md bg-gray-100 text-gray-600 text-xs font-medium">{property.type}</span>
            {property.new && <span className="px-2 py-0.5 rounded-md bg-yellow-100 text-yellow-700 text-xs font-medium">Nouveau</span>}
          </div>
          <h3 className="font-semibold text-gray-900 truncate group-hover:text-indigo-600 transition-colors">{property.title}</h3>
          <div className="flex items-center gap-1 text-gray-400 text-xs mt-0.5"><IconPin />{property.neighborhood}, {property.city}</div>
          <div className="flex items-center gap-3 mt-2 text-gray-400 text-xs">
            {property.beds !== null && <span className="flex items-center gap-1"><IconBed />{property.beds} Ch.</span>}
            {property.baths !== null && <span className="flex items-center gap-1"><IconBath />{property.baths} SDB</span>}
            <span className="flex items-center gap-1"><IconArea />{property.area} m²</span>
          </div>
        </div>

        <div className="text-right flex-shrink-0">
          <p className="text-lg font-bold text-indigo-600">{formatPrice(property.price, property.status)}</p>
          <div className="flex items-center justify-end gap-1 text-xs text-amber-500 mt-0.5">
            <IconStar /><span className="font-semibold text-gray-700">{property.rating}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => onFavToggle(property.id)}
            className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all duration-200 ${
              isFav ? "bg-rose-500 border-rose-500 text-white" : "border-gray-200 text-gray-400 hover:border-rose-300 hover:text-rose-500"
            }`}
          >
            <IconHeart filled={isFav} />
          </button>
          <button className="h-9 px-4 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors duration-200 whitespace-nowrap">
            {property.has3D ? "Visite 3D" : "Voir Détails"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Overview;