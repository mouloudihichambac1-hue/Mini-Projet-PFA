import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom"; // 🚀 Ajout du Link pour la redirection
import MapSimulation from "./MapSimulation"; 
import { API_BASE_URL } from '../../../../config/api';
import { useAuth } from '../../../../context/AuthContext';

// ─── Icônes Professionnelles ───────────────────────────────
const IconSearch = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>;
const IconHeart = ({ filled }) => <svg className="w-5 h-5" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>;
const IconBed = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v6H2" /><path d="M6 8v4" /></svg>;
const IconBath = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" /><line x1="2" x2="22" y1="12" y2="12" /></svg>;
const IconArea = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M3 9h18M9 21V9" /></svg>;
const IconPin = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>;
const IconFilter = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>;
const IconInbox = () => <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path d="M22 12h-6l-2 3h-4l-2-3H2" /><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" /></svg>;
const IconSend = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>;

const TYPES = ["Tous", "Appartement", "Villa", "Bureau", "Local"];
const CITIES = ["Toutes les villes", "Casablanca", "Rabat", "Marrakech", "Tanger"];

export default function Overview() {
  const { token } = useAuth();
  
  // ─── États ──────────────────────────────────────────────────────────────
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [reservingId, setReservingId] = useState(null); 
  const [toastMessage, setToastMessage] = useState(null); // Gère les notifications avec lien
  
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("Tous");
  const [cityFilter, setCityFilter] = useState("Toutes les villes");
  const [favorites, setFavorites] = useState(new Set());

  // ─── Récupération des projets ──────────────────────────────────────────
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/projects`);
        if (!res.ok) throw new Error("Erreur lors de la récupération des projets");
        const data = await res.json();
        
        const formattedProjects = data.projets.map(p => {
          const formattedType = p.type.charAt(0).toUpperCase() + p.type.slice(1);
          let formattedStatus = "À Vendre";
          if (p.statut === 'vendu') formattedStatus = "Vendu";
          if (p.statut === 'livre') formattedStatus = "Livré";

          return {
            id: p._id,
            title: p.titre,
            type: formattedType,
            status: formattedStatus,
            price: p.prix,
            city: p.ville,
            neighborhood: p.adresse || p.ville,
            beds: p.nbChambres,
            baths: p.nbSallesDeBain,
            area: p.surface,
            rating: p.noteMoyenne || 0,
            reviews: p.nbAvis || 0,
            image: p.imageUrl || "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80", 
            promoteurId: p.promoteurId?._id,
            agency: p.promoteurId?.nom || "Promoteur",
            has3D: false, 
            isNew: true 
          };
        });

        setProjects(formattedProjects);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // ─── LOGIQUE DE RÉSERVATION + MESSAGERIE EN BACKGROUND ────────────────
  const handleReservation = async (project) => {
    if (!token) {
      setToastMessage({ type: 'error', text: "Veuillez vous connecter pour réserver un bien." });
      setTimeout(() => setToastMessage(null), 4000);
      return;
    }

    setReservingId(project.id);
    
    try {
      // 1️⃣ Création de la Réservation (POST /reservations)
      const resaRes = await fetch(`${API_BASE_URL}/reservations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ projetId: project.id, acompte: 0 })
      });
      const resaData = await resaRes.json();
      if (!resaRes.ok) throw new Error(resaData.message || "Erreur lors de la réservation.");

      // 2️⃣ Création ou Récupération de la conversation avec le promoteur (POST /messages/conversations)
      const convRes = await fetch(`${API_BASE_URL}/messages/conversations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ partnerId: project.promoteurId })
      });
      const convData = await convRes.json();
      if (!convRes.ok) throw new Error(convData.message || "Erreur lors de l'ouverture de la messagerie.");

      // 3️⃣ Envoi du message automatique dans la conversation
      const messageText = `Bonjour, je suis très intéressé(e) et je viens de soumettre une demande de réservation pour votre bien : "${project.title}". Pouvons-nous échanger à ce sujet ?`;
      
      const msgRes = await fetch(`${API_BASE_URL}/messages/conversations/${convData.conversationId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ text: messageText })
      });
      if (!msgRes.ok) throw new Error("La réservation est passée, mais le message n'a pas pu être envoyé.");

      // ✅ Succès Total ! On affiche la notification avec un lien vers la messagerie.
      setToastMessage({ 
        type: 'success', 
        text: "Réservation envoyée !",
        actionLabel: "Ouvrir la messagerie",
        actionLink: "/client-dashboard/messages" // 🔗 Modifie ce lien selon la route de ton tableau de bord client
      });

    } catch (error) {
      setToastMessage({ type: 'error', text: error.message });
      setTimeout(() => setToastMessage(null), 5000);
    } finally {
      setReservingId(null);
      // On retire le timeout de disparition automatique pour le succès, pour laisser le temps à l'utilisateur de cliquer sur le lien
      if(toastMessage?.type === 'error') {
        setTimeout(() => setToastMessage(null), 5000);
      }
    }
  };

  // ─── Filtrage ────────────────────────────────────────────────────────
  const toggleFav = (id) => {
    setFavorites(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const filtered = useMemo(() => {
    return projects.filter(p => {
      const matchesSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.neighborhood.toLowerCase().includes(search.toLowerCase());
      const matchesType = typeFilter === "Tous" || p.type === typeFilter;
      const matchesCity = cityFilter === "Toutes les villes" || p.city === cityFilter;
      return matchesSearch && matchesType && matchesCity;
    });
  }, [search, typeFilter, cityFilter, projects]);

  const formatPrice = (price, type) => {
    const formatted = new Intl.NumberFormat('fr-MA').format(price);
    return type === "Bureau" ? `${formatted} MAD / mois` : `${formatted} MAD`;
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto relative">
      
      {/* 🚀 TOAST DE NOTIFICATION (AVEC LE LIEN VERS MESSAGES.JSX) */}
      {toastMessage && (
        <div className={`fixed top-6 right-6 z-50 px-6 py-4 rounded-xl shadow-xl flex items-center gap-4 animate-in slide-in-from-top-5 text-white ${toastMessage.type === 'error' ? 'bg-rose-600' : 'bg-emerald-600'}`}>
          <span className="font-semibold text-sm">{toastMessage.text}</span>
          
          {toastMessage.actionLink && (
            <Link 
              to={toastMessage.actionLink}
              className="px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-bold transition-colors"
            >
              {toastMessage.actionLabel}
            </Link>
          )}

          <button onClick={() => setToastMessage(null)} className="text-white/60 hover:text-white ml-2 text-xl leading-none">&times;</button>
        </div>
      )}

      {/* HEADER */}
      <div className="bg-slate-900 rounded-2xl p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="relative z-10 w-full md:w-1/2">
          <p className="text-slate-400 text-sm font-medium tracking-wide uppercase mb-1">Plateforme Immobilière</p>
          <h1 className="text-3xl font-semibold text-white tracking-tight">Bienvenue, Client.</h1>
          <p className="text-slate-300 mt-2 text-sm leading-relaxed max-w-md">Découvrez une sélection rigoureuse de biens immobiliers correspondant à vos critères d'investissement.</p>
        </div>

        <div className="relative z-10 w-full md:w-5/12">
          <div className="flex bg-white rounded-lg p-1 shadow-md">
            <span className="flex items-center pl-3 text-slate-400"><IconSearch /></span>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Rechercher par quartier ou mot-clé..."
              className="w-full py-2.5 px-3 text-sm text-slate-700 bg-transparent focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* FILTRES */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-hide">
          {TYPES.map(t => (
            <button key={t} onClick={() => setTypeFilter(t)} className={`px-4 py-2 rounded-md text-sm transition-colors whitespace-nowrap ${typeFilter === t ? "bg-slate-800 text-white font-medium shadow-sm" : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"}`}>{t}</button>
          ))}
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <select value={cityFilter} onChange={e => setCityFilter(e.target.value)} className="w-full md:w-auto px-4 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm text-slate-700 focus:outline-none focus:border-slate-400">
            {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* CONTENU */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-16 bg-white rounded-2xl border border-slate-200 border-dashed animate-in fade-in duration-500">
          <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mb-4 border border-slate-100 shadow-sm"><IconInbox /></div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Pas d'offre pour le moment</h3>
          <button onClick={() => { setSearch(""); setTypeFilter("Tous"); setCityFilter("Toutes les villes"); }} className="mt-6 px-5 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-lg hover:bg-slate-800 transition">Réinitialiser les filtres</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
          {filtered.map(property => (
            <div key={property.id} className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col">
              
              <div className="relative h-56 overflow-hidden bg-slate-100">
                <img src={property.image} alt={property.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  <span className={`px-2.5 py-1 rounded-sm text-[11px] font-semibold tracking-wide uppercase border shadow-sm backdrop-blur-sm ${property.status === 'Vendu' ? 'bg-rose-50/90 text-rose-700 border-rose-200' : 'bg-white/90 text-slate-800 border-slate-200/50'}`}>
                    {property.status}
                  </span>
                </div>
                <button onClick={() => toggleFav(property.id)} className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition shadow-sm">
                  <span className={favorites.has(property.id) ? "text-rose-600" : "text-slate-400"}><IconHeart filled={favorites.has(property.id)} /></span>
                </button>
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{property.type}</p>
                  <p className="text-xs text-slate-400">Réf: {property.id.slice(-6).toUpperCase()}</p>
                </div>
                
                <h3 className="font-semibold text-slate-900 text-base leading-snug mb-1 line-clamp-2">{property.title}</h3>
                
                <div className="flex items-center gap-1 text-slate-500 text-sm mb-4">
                  <IconPin /><span className="truncate">{property.neighborhood}, {property.city}</span>
                </div>

                <div className="flex items-center gap-4 text-slate-600 text-sm py-3 border-y border-slate-100 mt-auto">
                  {property.beds && <div className="flex items-center gap-1.5"><IconBed /> <span>{property.beds}</span></div>}
                  {property.baths && <div className="flex items-center gap-1.5"><IconBath /> <span>{property.baths}</span></div>}
                  {property.area && <div className="flex items-center gap-1.5"><IconArea /> <span>{property.area} m²</span></div>}
                </div>

                <div className="flex justify-between items-end mt-4 pt-2">
                  <div>
                    <p className="text-xs text-slate-500 mb-0.5">Par {property.agency}</p>
                    <p className="text-lg font-bold text-slate-900">{formatPrice(property.price, property.type)}</p>
                  </div>
                  
                  <button 
                    onClick={() => handleReservation(property)}
                    disabled={reservingId === property.id || property.status === 'Vendu'}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all shadow-sm ${
                      property.status === 'Vendu' 
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                        : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md hover:-translate-y-0.5'
                    }`}
                  >
                    {reservingId === property.id ? (
                      <span className="flex items-center gap-2">Traitement <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div></span>
                    ) : (
                      <>
                        <IconSend /> Réserver & Contacter
                      </>
                    )}
                  </button>

                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}