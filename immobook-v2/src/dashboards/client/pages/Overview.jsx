import { useState, useMemo } from "react";
import MapSimulation from "./MapSimulation";

// ─── Icônes Professionnelles (Minimalistes) ───────────────────────────────
const IconSearch = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>;
const IconHeart = ({ filled }) => <svg className="w-5 h-5" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>;
const IconBed = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v6H2" /><path d="M6 8v4" /></svg>;
const IconBath = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" /><line x1="2" x2="22" y1="12" y2="12" /></svg>;
const IconArea = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M3 9h18M9 21V9" /></svg>;
const IconPin = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>;
const IconFilter = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>;

// ─── Données Réalistes (Mock Data) ───────────────────────────────────────
const PROPERTIES = [
  { id: 1, title: "Villa Contemporaine - Front de Golf", type: "Villa", status: "À Vendre", price: 8500000, city: "Casablanca", neighborhood: "Bouskoura", beds: 4, baths: 4, area: 550, rating: 4.9, reviews: 12, image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80", agency: "Prestige Immo", has3D: true, isNew: true },
  { id: 2, title: "Appartement S+3 Haut Standing", type: "Appartement", status: "À Vendre", price: 2350000, city: "Rabat", neighborhood: "Hay Riad", beds: 3, baths: 2, area: 135, rating: 4.8, reviews: 45, image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80", agency: "Capitale Foncier", has3D: true, isNew: false },
  { id: 3, title: "Plateau Bureau Aménagé Premium", type: "Bureau", status: "À Louer", price: 18000, city: "Casablanca", neighborhood: "Casanearshore", beds: null, baths: 2, area: 120, rating: 4.5, reviews: 8, image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80", agency: "Pro Immo Maroc", has3D: false, isNew: true },
  { id: 4, title: "Riad Rénové - Exploitation Maison d'Hôtes", type: "Riad", status: "À Vendre", price: 3200000, city: "Marrakech", neighborhood: "Mouassine", beds: 6, baths: 6, area: 310, rating: 5.0, reviews: 89, image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80", agency: "Atlas Real Estate", has3D: true, isNew: false },
  { id: 5, title: "Studio Meublé pour Expatriés", type: "Appartement", status: "À Louer", price: 6500, city: "Tanger", neighborhood: "Malabata", beds: 1, baths: 1, area: 55, rating: 4.2, reviews: 14, image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", agency: "Nord Invest", has3D: false, isNew: false },
];

const TYPES = ["Tous", "Appartement", "Villa", "Bureau", "Riad"];
const CITIES = ["Toutes les villes", "Casablanca", "Rabat", "Marrakech", "Tanger"];

export default function Overview() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("Tous");
  const [cityFilter, setCityFilter] = useState("Toutes les villes");
  const [favorites, setFavorites] = useState(new Set([2]));
  const [viewMode, setViewMode] = useState("grid"); 

  const toggleFav = (id) => {
    setFavorites(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const filtered = useMemo(() => {
    return PROPERTIES.filter(p => {
      const matchesSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.neighborhood.toLowerCase().includes(search.toLowerCase());
      const matchesType = typeFilter === "Tous" || p.type === typeFilter;
      const matchesCity = cityFilter === "Toutes les villes" || p.city === cityFilter;
      return matchesSearch && matchesType && matchesCity;
    });
  }, [search, typeFilter, cityFilter]);

  const formatPrice = (price, status) => {
    const formatted = new Intl.NumberFormat('fr-MA').format(price);
    return status === "À Louer" ? `${formatted} MAD / mois` : `${formatted} MAD`;
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* ── Header Clean & Corporate ── */}
      <div className="bg-slate-900 rounded-2xl p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        {/* Motif discret en background */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        
        <div className="relative z-10 w-full md:w-1/2">
          <p className="text-slate-400 text-sm font-medium tracking-wide uppercase mb-1">Plateforme Immobilière</p>
          <h1 className="text-3xl font-semibold text-white tracking-tight">
            Bienvenue, Othman.
          </h1>
          <p className="text-slate-300 mt-2 text-sm leading-relaxed max-w-md">
            Découvrez une sélection rigoureuse de biens immobiliers correspondant à vos critères d'investissement.
          </p>
        </div>

        {/* Barre de recherche intégrée */}
        <div className="relative z-10 w-full md:w-5/12">
          <div className="flex bg-white rounded-lg p-1 shadow-md">
            <span className="flex items-center pl-3 text-slate-400">
              <IconSearch />
            </span>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Rechercher par quartier ou mot-clé..."
              className="w-full py-2.5 px-3 text-sm text-slate-700 bg-transparent focus:outline-none"
            />
            <button className="bg-slate-800 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-slate-700 transition">
              Chercher
            </button>
          </div>
        </div>
      </div>

      {/* ── Filtres Professionnels ── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
          {TYPES.map(t => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-4 py-2 rounded-md text-sm transition-colors whitespace-nowrap ${
                typeFilter === t 
                  ? "bg-slate-800 text-white font-medium" 
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <select 
            value={cityFilter} 
            onChange={e => setCityFilter(e.target.value)} 
            className="w-full md:w-auto px-4 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm text-slate-700 focus:outline-none focus:border-slate-400"
          >
            {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-md text-sm text-slate-600 hover:bg-slate-50 transition">
            <IconFilter /> Filtres
          </button>
        </div>
      </div>

      {/* ── Header de la liste ── */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Biens disponibles</h2>
          <p className="text-sm text-slate-500 mt-1">{filtered.length} résultats correspondent à vos critères</p>
        </div>
      </div>

      {/* ── Grille de Propriétés (Design Réaliste) ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(property => (
          <div key={property.id} className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col">
            
            {/* Image Container */}
            <div className="relative h-56 overflow-hidden bg-slate-100">
              <img src={property.image} alt={property.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              
              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-2">
                <span className="bg-white/90 backdrop-blur-sm text-slate-800 px-2.5 py-1 rounded-sm text-[11px] font-semibold tracking-wide uppercase border border-slate-200/50 shadow-sm">
                  {property.status}
                </span>
                {property.isNew && (
                  <span className="bg-emerald-600/90 backdrop-blur-sm text-white px-2.5 py-1 rounded-sm text-[11px] font-semibold tracking-wide uppercase shadow-sm">
                    Nouveau
                  </span>
                )}
              </div>

              {/* Favoris */}
              <button 
                onClick={() => toggleFav(property.id)} 
                className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition shadow-sm"
              >
                <span className={favorites.has(property.id) ? "text-rose-600" : "text-slate-400"}>
                  <IconHeart filled={favorites.has(property.id)} />
                </span>
              </button>

              {/* 3D Indicator */}
              {property.has3D && (
                <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-sm text-white px-2.5 py-1 rounded-sm text-[11px] font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Visite Virtuelle
                </div>
              )}
            </div>

            {/* Contenu de la carte */}
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{property.type}</p>
                <p className="text-xs text-slate-400">Réf: {property.id}A{new Date().getFullYear()}</p>
              </div>
              
              <h3 className="font-semibold text-slate-900 text-base leading-snug mb-1 line-clamp-2">
                {property.title}
              </h3>
              
              <div className="flex items-center gap-1 text-slate-500 text-sm mb-4">
                <IconPin />
                <span>{property.neighborhood}, {property.city}</span>
              </div>

              {/* Caractéristiques */}
              <div className="flex items-center gap-4 text-slate-600 text-sm py-3 border-y border-slate-100 mt-auto">
                {property.beds && (
                  <div className="flex items-center gap-1.5" title="Chambres">
                    <IconBed /> <span>{property.beds}</span>
                  </div>
                )}
                {property.baths && (
                  <div className="flex items-center gap-1.5" title="Salles de bain">
                    <IconBath /> <span>{property.baths}</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5" title="Superficie">
                  <IconArea /> <span>{property.area} m²</span>
                </div>
              </div>

              {/* Prix et Agence */}
              <div className="flex justify-between items-center mt-4">
                <div>
                  <p className="text-xs text-slate-500 mb-0.5">Proposé par {property.agency}</p>
                  <p className="text-lg font-bold text-slate-900">
                    {formatPrice(property.price, property.status)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}