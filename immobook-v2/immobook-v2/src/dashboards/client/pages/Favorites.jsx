import { useState } from "react";
import { Link } from "react-router-dom";

// ─── Icons ─────────────────────────────────────────────────────────────────────
const IconHeartFilled = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);
const IconHeartBroken = () => (
  <svg className="w-16 h-16" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    <path d="M12 5.67 10 10l2.5 1.5L10 17" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconPin = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
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
    <line x1="2" x2="22" y1="12" y2="12" />
  </svg>
);
const IconArea = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <rect width="18" height="18" x="3" y="3" rx="2" /><path d="M3 9h18M9 21V9" />
  </svg>
);
const IconAgent = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
const IconArrowRight = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);
const IconStar = () => (
  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
const IconCube = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.29 7 12 12 20.71 7" /><line x1="12" x2="12" y1="22" y2="12" />
  </svg>
);
const IconBookmark = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);
const IconCompass = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </svg>
);

// ─── Mock Favorites Data ───────────────────────────────────────────────────────
const INITIAL_FAVORITES = [
  {
    id: 1,
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
    agent: "Karim Benali",
    agentAvatar: "KB",
    agentColor: "bg-blue-500",
    has3D: true,
    savedAt: "Il y a 2 jours",
  },
  {
    id: 2,
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
    agent: "Salma Idrissi",
    agentAvatar: "SI",
    agentColor: "bg-rose-500",
    has3D: true,
    savedAt: "Il y a 5 jours",
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
    agent: "Omar Tahir",
    agentAvatar: "OT",
    agentColor: "bg-purple-500",
    has3D: false,
    savedAt: "Il y a 1 semaine",
  },
  {
    id: 4,
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
    agent: "Nadia Chaoui",
    agentAvatar: "NC",
    agentColor: "bg-violet-500",
    has3D: true,
    savedAt: "Il y a 2 semaines",
  },
];

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

// ─── Confirm Modal ─────────────────────────────────────────────────────────────
function ConfirmModal({ property, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 flex flex-col items-center gap-4 animate-[fadeInUp_0.2s_ease]">
        <div className="w-14 h-14 rounded-2xl bg-rose-100 flex items-center justify-center text-rose-500">
          <IconHeartFilled />
        </div>
        <div className="text-center">
          <h3 className="font-bold text-gray-900 text-lg">Retirer des favoris ?</h3>
          <p className="text-gray-500 text-sm mt-1">
            <span className="font-medium text-gray-700">"{property.title}"</span> sera retiré de votre liste de favoris.
          </p>
        </div>
        <div className="flex gap-3 w-full mt-1">
          <button
            onClick={onCancel}
            className="flex-1 h-10 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors duration-200"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 h-10 rounded-xl bg-rose-500 text-white text-sm font-semibold hover:bg-rose-600 transition-colors duration-200 shadow-sm shadow-rose-200"
          >
            Retirer
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Favorite Card ─────────────────────────────────────────────────────────────
function FavoriteCard({ property, onRemove }) {
  const [imgErr, setImgErr] = useState(false);
  const [contactSent, setContactSent] = useState(false);

  const handleContact = () => {
    setContactSent(true);
    setTimeout(() => setContactSent(false), 3000);
  };

  return (
    <div className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {/* Image */}
      <div className="relative h-52 overflow-hidden flex-shrink-0">
        {!imgErr ? (
          <img
            src={property.image}
            alt={property.title}
            onError={() => setImgErr(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${property.gradient} flex items-center justify-center`}>
            <span className="text-white/40 text-5xl font-bold">{property.type[0]}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

        {/* Status */}
        <span className={`absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusColors[property.status]}`}>
          {property.status}
        </span>

        {/* 3D badge */}
        {property.has3D && (
          <span className="absolute bottom-3 left-3 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/55 backdrop-blur-sm text-white text-xs font-medium">
            <IconCube />Visite 3D
          </span>
        )}

        {/* Saved time */}
        <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-sm text-white/80 text-xs">
          {property.savedAt}
        </span>

        {/* Remove button */}
        <button
          onClick={() => onRemove(property)}
          title="Retirer des favoris"
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-lg shadow-rose-300 hover:bg-rose-600 hover:scale-110 active:scale-95 transition-all duration-200"
        >
          <IconHeartFilled />
        </button>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Type */}
        <span className="inline-flex self-start px-2 py-0.5 rounded-md bg-gray-100 text-gray-600 text-xs font-medium">
          {property.type}
        </span>

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
        <div className="flex items-center gap-3 text-gray-500 text-xs pt-1 border-t border-gray-100">
          {property.beds !== null && (
            <span className="flex items-center gap-1"><IconBed />{property.beds} Ch.</span>
          )}
          {property.baths !== null && (
            <span className="flex items-center gap-1"><IconBath />{property.baths} SDB</span>
          )}
          <span className="flex items-center gap-1"><IconArea />{property.area} m²</span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1.5 text-xs">
          <span className="flex items-center gap-0.5 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < Math.round(property.rating) ? "text-amber-400" : "text-gray-200"}>
                <IconStar />
              </span>
            ))}
          </span>
          <span className="font-semibold text-gray-800">{property.rating}</span>
          <span className="text-gray-400">({property.reviews} avis)</span>
        </div>

        {/* Agent row */}
        <div className="flex items-center gap-2.5 bg-gray-50 rounded-xl px-3 py-2.5 mt-auto">
          <div className={`w-8 h-8 rounded-full ${property.agentColor} text-white text-xs font-bold flex items-center justify-center flex-shrink-0`}>
            {property.agentAvatar}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-gray-800 truncate">{property.agent}</p>
            <p className="text-xs text-gray-400">Agent immobilier</p>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={handleContact}
          className={`w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 ${
            contactSent
              ? "bg-emerald-500 text-white shadow-lg shadow-emerald-200"
              : "bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-lg hover:shadow-indigo-200"
          }`}
        >
          {contactSent ? (
            <>✓ Demande envoyée !</>
          ) : (
            <><IconAgent />Contacter l'agent / Visiter</>
          )}
        </button>
      </div>
    </div>
  );
}

// ─── Empty State ───────────────────────────────────────────────────────────────
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
      {/* Animated heart */}
      <div className="relative mb-6">
        <div className="w-28 h-28 rounded-full bg-rose-50 flex items-center justify-center text-rose-300 animate-pulse">
          <IconHeartBroken />
        </div>
        <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-rose-100 flex items-center justify-center text-rose-400 text-base">
          ✕
        </div>
      </div>

      <h2 className="text-xl font-bold text-gray-900 mb-2">Aucun bien dans vos favoris</h2>
      <p className="text-gray-500 text-sm max-w-xs leading-relaxed mb-8">
        Vous n'avez pas encore sauvegardé de biens. Explorez notre catalogue et cliquez sur le cœur pour sauvegarder vos coups de cœur.
      </p>

      <Link
        to="/dashboard/client"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200 transition-all duration-200 active:scale-95"
      >
        <IconCompass />
        Explorer les biens
        <IconArrowRight />
      </Link>
    </div>
  );
}

// ─── Main Favorites Page ───────────────────────────────────────────────────────
function Favorites() {
  const [favorites, setFavorites] = useState(INITIAL_FAVORITES);
  const [pendingRemove, setPendingRemove] = useState(null);
  const [removedId, setRemovedId] = useState(null);

  const handleRemoveRequest = (property) => {
    setPendingRemove(property);
  };

  const handleConfirmRemove = () => {
    setRemovedId(pendingRemove.id);
    setPendingRemove(null);
    setTimeout(() => {
      setFavorites(prev => prev.filter(p => p.id !== removedId || p.id !== pendingRemove?.id));
      setFavorites(prev => prev.filter(p => p.id !== (pendingRemove?.id ?? removedId)));
      setRemovedId(null);
    }, 350);
  };

  // simpler direct remove with animation class
  const confirmRemove = (property) => {
    setPendingRemove(null);
    setRemovedId(property.id);
    setTimeout(() => {
      setFavorites(prev => prev.filter(p => p.id !== property.id));
      setRemovedId(null);
    }, 350);
  };

  return (
    <div className="min-h-screen bg-gray-50/60">
      {/* ── Page Header ── */}
      <div className="px-6 pt-6 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-rose-100 flex items-center justify-center text-rose-500 flex-shrink-0">
              <IconBookmark />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Mes Favoris</h1>
                {favorites.length > 0 && (
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-600 text-sm font-semibold border border-rose-200">
                    {favorites.length} bien{favorites.length > 1 ? "s" : ""} sauvegardé{favorites.length > 1 ? "s" : ""}
                  </span>
                )}
              </div>
              <p className="text-gray-500 text-sm mt-0.5">
                Retrouvez ici tous les biens immobiliers que vous avez sauvegardés.
              </p>
            </div>
          </div>

          {favorites.length > 0 && (
            <Link
              to="/dashboard/client"
              className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-indigo-200 text-indigo-600 text-sm font-medium hover:bg-indigo-50 transition-colors duration-200"
            >
              <IconCompass />
              Explorer d'autres biens
            </Link>
          )}
        </div>
      </div>

      {/* ── Stats Strip ── */}
      {favorites.length > 0 && (
        <div className="px-6 mb-6">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-gray-100 shadow-sm text-sm text-gray-600">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
              {favorites.filter(f => f.status === "À Vendre").length} à vendre
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-gray-100 shadow-sm text-sm text-gray-600">
              <span className="w-2 h-2 rounded-full bg-blue-400 inline-block" />
              {favorites.filter(f => f.status === "À Louer").length} à louer
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-gray-100 shadow-sm text-sm text-gray-600">
              <span className="w-2 h-2 rounded-full bg-violet-400 inline-block" />
              {favorites.filter(f => f.has3D).length} avec visite 3D
            </div>
          </div>
        </div>
      )}

      {/* ── Content ── */}
      <div className="px-6 pb-10">
        {favorites.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {favorites.map(property => (
              <div
                key={property.id}
                className={`transition-all duration-350 ${
                  removedId === property.id
                    ? "opacity-0 scale-95 pointer-events-none"
                    : "opacity-100 scale-100"
                }`}
              >
                <FavoriteCard
                  property={property}
                  onRemove={handleRemoveRequest}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Confirm Modal ── */}
      {pendingRemove && (
        <ConfirmModal
          property={pendingRemove}
          onConfirm={() => confirmRemove(pendingRemove)}
          onCancel={() => setPendingRemove(null)}
        />
      )}

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
      `}</style>
    </div>
  );
}

export default Favorites;