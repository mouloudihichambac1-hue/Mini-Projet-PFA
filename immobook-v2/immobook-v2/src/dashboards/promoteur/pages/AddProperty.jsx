import { useState, useRef } from "react";

// ─── Icons ─────────────────────────────────────────────────────────────────────
const IconHome = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
    <path d="M9 21V12h6v9" />
  </svg>
);
const IconPin = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
  </svg>
);
const IconSliders = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <line x1="4" x2="4" y1="21" y2="14" /><line x1="4" x2="4" y1="6" y2="3" />
    <line x1="12" x2="12" y1="21" y2="12" /><line x1="12" x2="12" y1="4" y2="3" />
    <line x1="20" x2="20" y1="21" y2="16" /><line x1="20" x2="20" y1="8" y2="3" />
    <line x1="1" x2="7" y1="14" y2="14" /><line x1="9" x2="15" y1="12" y2="12" />
    <line x1="17" x2="23" y1="16" y2="16" />
  </svg>
);
const IconImage = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
    <circle cx="9" cy="9" r="2" />
    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
  </svg>
);
const IconCube = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.29 7 12 12 20.71 7" /><line x1="12" x2="12" y1="22" y2="12" />
  </svg>
);
const IconUpload = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" /><line x1="12" x2="12" y1="3" y2="15" />
  </svg>
);
const IconCheck = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const IconCheckCircle = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);
const IconBed = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v6H2" /><path d="M6 8v4" />
  </svg>
);
const IconBath = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" />
    <line x1="2" x2="22" y1="12" y2="12" />
  </svg>
);
const IconArea = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <rect width="18" height="18" x="3" y="3" rx="2" /><path d="M3 9h18M9 21V9" />
  </svg>
);
const IconX = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
    <line x1="18" x2="6" y1="6" y2="18" /><line x1="6" x2="18" y1="6" y2="18" />
  </svg>
);
const IconSparkle = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
  </svg>
);
const IconSend = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <line x1="22" x2="11" y1="2" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

// ─── Constants ─────────────────────────────────────────────────────────────────
const PROPERTY_TYPES = [
  { value: "Appartement", label: "Appartement", icon: "🏢" },
  { value: "Villa",       label: "Villa",       icon: "🏡" },
  { value: "Riad",        label: "Riad",        icon: "🏛️" },
  { value: "Terrain",     label: "Terrain",     icon: "🌿" },
  { value: "Bureau",      label: "Bureau",      icon: "🏗️" },
  { value: "Commerce",    label: "Commerce",    icon: "🏪" },
];

const TRANSACTION_TYPES = [
  { value: "vente",    label: "À Vendre" },
  { value: "location", label: "À Louer"  },
];

const CITIES = [
  "Casablanca", "Rabat", "Marrakech", "Tanger", "Fès",
  "Agadir", "Meknès", "Oujda", "Kenitra", "Tétouan",
];

const AMENITIES = [
  { key: "piscine",    label: "Piscine",      icon: "🏊" },
  { key: "garage",     label: "Garage",       icon: "🚗" },
  { key: "securite",   label: "Sécurité 24h", icon: "🔒" },
  { key: "ascenseur",  label: "Ascenseur",    icon: "🛗" },
  { key: "jardin",     label: "Jardin",       icon: "🌳" },
  { key: "terrasse",   label: "Terrasse",     icon: "🌅" },
  { key: "climatisation", label: "Climatisation", icon: "❄️" },
  { key: "wifi",       label: "Fibre / WiFi", icon: "📶" },
  { key: "concierge",  label: "Concierge",    icon: "🧑‍💼" },
  { key: "parking",    label: "Parking ext.", icon: "🅿️" },
  { key: "cave",       label: "Cave / Stock", icon: "📦" },
  { key: "vue_mer",    label: "Vue Mer",      icon: "🌊" },
];

const INITIAL_FORM = {
  title: "",
  description: "",
  propertyType: "",
  transactionType: "vente",
  price: "",
  city: "",
  address: "",
  beds: "",
  baths: "",
  area: "",
  amenities: {},
  images: [],
  model3d: null,
};

// ─── Sub-components ────────────────────────────────────────────────────────────
function SectionCard({ step, title, subtitle, icon, children }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Étape {step}</span>
          </div>
          <h2 className="font-semibold text-gray-900 text-sm leading-tight">{title}</h2>
          {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
        </div>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

function Label({ children, required }) {
  return (
    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
      {children}
      {required && <span className="text-rose-400 ml-0.5">*</span>}
    </label>
  );
}

function Input({ value, onChange, placeholder, type = "text", className = "" }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full h-11 px-3.5 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 hover:border-gray-300 transition-all duration-200 ${className}`}
    />
  );
}

function NumberStepper({ value, onChange, min = 0, max = 99 }) {
  const num = parseInt(value) || 0;
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => onChange(String(Math.max(min, num - 1)))}
        className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:border-gray-300 transition-all duration-150 text-lg font-light select-none"
      >−</button>
      <input
        type="number"
        value={value}
        onChange={e => onChange(e.target.value)}
        min={min} max={max}
        className="w-16 h-9 text-center rounded-xl border border-gray-200 text-sm font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all duration-200"
      />
      <button
        type="button"
        onClick={() => onChange(String(Math.min(max, num + 1)))}
        className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:border-gray-300 transition-all duration-150 text-lg font-light select-none"
      >+</button>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
function AddProperty() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [imgDragOver, setImgDragOver] = useState(false);
  const [modelDragOver, setModelDragOver] = useState(false);
  const imgInputRef = useRef(null);
  const modelInputRef = useRef(null);
  const topRef = useRef(null);

  const set = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  const toggleAmenity = (key) => {
    setForm(prev => ({
      ...prev,
      amenities: { ...prev.amenities, [key]: !prev.amenities[key] },
    }));
  };

  const handleImageFiles = (files) => {
    const valid = Array.from(files).filter(f => f.type.startsWith("image/"));
    const previews = valid.map(f => ({ name: f.name, url: URL.createObjectURL(f) }));
    setForm(prev => ({ ...prev, images: [...prev.images, ...previews].slice(0, 8) }));
  };

  const removeImage = (idx) => {
    setForm(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== idx) }));
  };

  const handleModelFile = (files) => {
    const file = Array.from(files).find(f =>
      f.name.endsWith(".glb") || f.name.endsWith(".gltf") || f.name.endsWith(".obj")
    );
    if (file) set("model3d", { name: file.name, size: (file.size / 1024 / 1024).toFixed(2) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1400));
    setSubmitting(false);
    setSubmitted(true);
    setForm(INITIAL_FORM);
    topRef.current?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => setSubmitted(false), 6000);
  };

  const amenityCount = Object.values(form.amenities).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gray-50/60 pb-14" ref={topRef}>

      {/* ── Success Alert ── */}
      {submitted && (
        <div className="mx-6 mt-6 flex items-start gap-3 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 shadow-sm animate-[fadeInDown_0.4s_ease]">
          <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center flex-shrink-0">
            <IconCheckCircle />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-emerald-800 text-sm">Propriété publiée avec succès !</p>
            <p className="text-emerald-600 text-xs mt-0.5">Votre bien est maintenant visible par les clients sur ImmoBook v2. Vous pouvez le gérer depuis "Mes Propriétés".</p>
          </div>
          <button onClick={() => setSubmitted(false)} className="text-emerald-400 hover:text-emerald-600 transition-colors mt-0.5">
            <IconX />
          </button>
        </div>
      )}

      {/* ── Page Header ── */}
      <div className="px-6 pt-6 pb-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-600 text-xs font-semibold">
                <IconSparkle />Publication instantanée
              </span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Ajouter une Nouvelle Propriété</h1>
            <p className="text-gray-500 text-sm mt-1">
              Remplissez les informations ci-dessous. Votre bien sera publié et visible par les clients dès validation.
            </p>
          </div>

          {/* Progress indicator */}
          <div className="flex items-center gap-1.5 self-start sm:self-auto">
            {[1,2,3,4].map(n => (
              <div key={n} className={`h-1.5 rounded-full transition-all duration-300 ${n === 1 ? "w-8 bg-indigo-600" : "w-4 bg-gray-200"}`} />
            ))}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="px-6 flex flex-col gap-5">

        {/* ── Section 1: Informations Générales ── */}
        <SectionCard step={1} title="Informations Générales" subtitle="Titre, type, prix et description du bien" icon={<IconHome />}>
          <div className="flex flex-col gap-5">

            {/* Title */}
            <div>
              <Label required>Titre de l'annonce</Label>
              <Input
                value={form.title}
                onChange={e => set("title", e.target.value)}
                placeholder="Ex: Villa moderne avec piscine — Palmeraie, Marrakech"
              />
            </div>

            {/* Transaction type */}
            <div>
              <Label required>Type de transaction</Label>
              <div className="flex gap-2">
                {TRANSACTION_TYPES.map(t => (
                  <button
                    key={t.value}
                    type="button"
                    onClick={() => set("transactionType", t.value)}
                    className={`flex-1 h-11 rounded-xl border text-sm font-semibold transition-all duration-200 ${
                      form.transactionType === t.value
                        ? "bg-indigo-600 border-indigo-600 text-white shadow-sm shadow-indigo-200"
                        : "border-gray-200 text-gray-600 hover:border-indigo-300 hover:text-indigo-600 bg-white"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Property type */}
            <div>
              <Label required>Type de propriété</Label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {PROPERTY_TYPES.map(t => (
                  <button
                    key={t.value}
                    type="button"
                    onClick={() => set("propertyType", t.value)}
                    className={`flex flex-col items-center justify-center gap-1.5 py-3 px-2 rounded-xl border text-xs font-semibold transition-all duration-200 ${
                      form.propertyType === t.value
                        ? "bg-indigo-50 border-indigo-400 text-indigo-700 shadow-sm"
                        : "border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50 bg-white"
                    }`}
                  >
                    <span className="text-xl">{t.icon}</span>
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div>
              <Label required>Prix</Label>
              <div className="relative">
                <Input
                  value={form.price}
                  onChange={e => set("price", e.target.value.replace(/\D/g, ""))}
                  placeholder="Ex: 2 500 000"
                  className="pr-16"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-400 pointer-events-none">
                  {form.transactionType === "location" ? "DH/mois" : "DH"}
                </span>
              </div>
              {form.price && (
                <p className="text-xs text-indigo-500 mt-1.5 font-medium">
                  ≈ {Number(form.price).toLocaleString("fr-MA")} {form.transactionType === "location" ? "DH / mois" : "DH"}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <Label>Description</Label>
              <textarea
                value={form.description}
                onChange={e => set("description", e.target.value)}
                rows={4}
                placeholder="Décrivez votre bien : environnement, matériaux, standing, accès, points forts…"
                className="w-full px-3.5 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 hover:border-gray-300 transition-all duration-200 resize-none"
              />
              <p className="text-xs text-gray-400 mt-1 text-right">{form.description.length} / 800 caractères</p>
            </div>
          </div>
        </SectionCard>

        {/* ── Section 2: Localisation ── */}
        <SectionCard step={2} title="Localisation" subtitle="Ville et adresse précise du bien" icon={<IconPin />}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label required>Ville</Label>
              <div className="relative">
                <select
                  value={form.city}
                  onChange={e => set("city", e.target.value)}
                  className="w-full h-11 pl-3.5 pr-9 rounded-xl border border-gray-200 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 hover:border-gray-300 transition-all duration-200 appearance-none cursor-pointer"
                >
                  <option value="">Sélectionner une ville…</option>
                  {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
              </div>
            </div>

            <div>
              <Label>Quartier / Zone</Label>
              <Input
                value={form.neighborhood || ""}
                onChange={e => set("neighborhood", e.target.value)}
                placeholder="Ex: Palmeraie, Agdal, Ain Diab…"
              />
            </div>

            <div className="sm:col-span-2">
              <Label>Adresse complète</Label>
              <Input
                value={form.address}
                onChange={e => set("address", e.target.value)}
                placeholder="Ex: Lot 24, Résidence Al Nakhil, Route de Fès, Marrakech 40000"
              />
            </div>
          </div>
        </SectionCard>

        {/* ── Section 3: Caractéristiques ── */}
        <SectionCard step={3} title="Caractéristiques & Équipements" subtitle="Surfaces, pièces et commodités incluses" icon={<IconSliders />}>
          <div className="flex flex-col gap-6">

            {/* Numeric features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <Label>Chambres</Label>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center flex-shrink-0">
                    <IconBed />
                  </div>
                  <NumberStepper value={form.beds} onChange={v => set("beds", v)} min={0} max={20} />
                </div>
              </div>

              <div>
                <Label>Salles de bain</Label>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-violet-50 text-violet-500 flex items-center justify-center flex-shrink-0">
                    <IconBath />
                  </div>
                  <NumberStepper value={form.baths} onChange={v => set("baths", v)} min={0} max={10} />
                </div>
              </div>

              <div>
                <Label>Superficie (m²)</Label>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center flex-shrink-0">
                    <IconArea />
                  </div>
                  <div className="relative flex-1">
                    <input
                      type="number"
                      value={form.area}
                      onChange={e => set("area", e.target.value)}
                      min={0}
                      placeholder="0"
                      className="w-full h-9 pl-3 pr-10 rounded-xl border border-gray-200 text-sm font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all duration-200"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 pointer-events-none">m²</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <Label>Équipements & Commodités</Label>
                {amenityCount > 0 && (
                  <span className="text-xs text-indigo-600 font-semibold bg-indigo-50 px-2.5 py-0.5 rounded-full">
                    {amenityCount} sélectionné{amenityCount > 1 ? "s" : ""}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                {AMENITIES.map(a => {
                  const active = !!form.amenities[a.key];
                  return (
                    <button
                      key={a.key}
                      type="button"
                      onClick={() => toggleAmenity(a.key)}
                      className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 text-left ${
                        active
                          ? "bg-indigo-50 border-indigo-400 text-indigo-700 shadow-sm"
                          : "bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <span className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                        active ? "bg-indigo-600 text-white" : "bg-gray-100 text-transparent"
                      }`}>
                        <IconCheck />
                      </span>
                      <span className="text-base leading-none">{a.icon}</span>
                      <span className="text-xs">{a.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </SectionCard>

        {/* ── Section 4: Médias & 3D ── */}
        <SectionCard step={4} title="Médias & Modèles 3D" subtitle="Photos de haute qualité et visite immersive 3D" icon={<IconImage />}>
          <div className="flex flex-col gap-5">

            {/* Images upload */}
            <div>
              <Label>Photos de la propriété</Label>
              <div
                onDragOver={e => { e.preventDefault(); setImgDragOver(true); }}
                onDragLeave={() => setImgDragOver(false)}
                onDrop={e => { e.preventDefault(); setImgDragOver(false); handleImageFiles(e.dataTransfer.files); }}
                onClick={() => imgInputRef.current?.click()}
                className={`relative flex flex-col items-center justify-center gap-3 py-10 rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-200 ${
                  imgDragOver
                    ? "border-indigo-400 bg-indigo-50 scale-[1.01]"
                    : "border-gray-200 bg-gray-50/50 hover:border-indigo-300 hover:bg-indigo-50/30"
                }`}
              >
                <input
                  ref={imgInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={e => handleImageFiles(e.target.files)}
                />
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-200 ${imgDragOver ? "bg-indigo-100 text-indigo-500" : "bg-white border border-gray-200 text-gray-400"}`}>
                  <IconImage />
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-gray-700">
                    {imgDragOver ? "Relâchez pour ajouter" : "Glissez vos photos ici"}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">ou <span className="text-indigo-600 font-medium">cliquez pour parcourir</span> · JPG, PNG, WEBP · max 8 photos</p>
                </div>
              </div>

              {/* Image previews */}
              {form.images.length > 0 && (
                <div className="mt-3 grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {form.images.map((img, idx) => (
                    <div key={idx} className="relative group aspect-square rounded-xl overflow-hidden border border-gray-200">
                      <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); removeImage(idx); }}
                          className="w-7 h-7 rounded-full bg-white text-gray-700 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-colors duration-200"
                        >
                          <IconX />
                        </button>
                      </div>
                      {idx === 0 && (
                        <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded-md bg-indigo-600 text-white text-xs font-bold leading-none">
                          Couv.
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 3D Model upload */}
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Label>Modèle 3D Interactif</Label>
                <span className="px-2 py-0.5 rounded-full bg-violet-100 text-violet-700 text-xs font-semibold border border-violet-200">
                  ImmoBook 3D
                </span>
              </div>

              <div
                onDragOver={e => { e.preventDefault(); setModelDragOver(true); }}
                onDragLeave={() => setModelDragOver(false)}
                onDrop={e => { e.preventDefault(); setModelDragOver(false); handleModelFile(e.dataTransfer.files); }}
                onClick={() => modelInputRef.current?.click()}
                className={`relative flex flex-col items-center justify-center gap-3 py-10 rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-200 overflow-hidden ${
                  form.model3d
                    ? "border-violet-400 bg-violet-50"
                    : modelDragOver
                    ? "border-violet-400 bg-violet-50 scale-[1.01]"
                    : "border-violet-200 bg-gradient-to-br from-violet-50/60 to-indigo-50/60 hover:border-violet-300 hover:from-violet-50 hover:to-indigo-50"
                }`}
              >
                {/* Decorative background shapes */}
                <div className="absolute -bottom-8 -right-8 w-36 h-36 rounded-full bg-violet-100 opacity-40 pointer-events-none" />
                <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-indigo-100 opacity-30 pointer-events-none" />

                <input
                  ref={modelInputRef}
                  type="file"
                  accept=".glb,.gltf,.obj"
                  className="hidden"
                  onChange={e => handleModelFile(e.target.files)}
                />

                {form.model3d ? (
                  <>
                    <div className="w-14 h-14 rounded-2xl bg-violet-500 text-white flex items-center justify-center shadow-lg shadow-violet-200">
                      <IconCube />
                    </div>
                    <div className="text-center relative z-10">
                      <p className="text-sm font-bold text-violet-700">{form.model3d.name}</p>
                      <p className="text-xs text-violet-500 mt-0.5">{form.model3d.size} MB · Prêt pour la visite 3D</p>
                      <button
                        type="button"
                        onClick={e => { e.stopPropagation(); set("model3d", null); }}
                        className="mt-2 text-xs text-rose-500 hover:text-rose-600 font-medium underline"
                      >
                        Supprimer
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-200 ${
                      modelDragOver ? "bg-violet-500 text-white shadow-lg shadow-violet-200" : "bg-white border border-violet-200 text-violet-400"
                    }`}>
                      <IconCube />
                    </div>
                    <div className="text-center relative z-10">
                      <p className="text-sm font-semibold text-gray-700">
                        {modelDragOver ? "Relâchez pour importer le modèle" : "Importer un modèle 3D"}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        ou <span className="text-violet-600 font-medium">cliquez pour parcourir</span>
                      </p>
                      <p className="text-xs text-violet-400 mt-1.5 font-medium">Formats supportés : GLTF · GLB · OBJ</p>
                    </div>
                    <div className="flex items-center gap-4 mt-1 relative z-10">
                      {["Visite immersive", "Three.js ready", "WebGL optimisé"].map(tag => (
                        <span key={tag} className="flex items-center gap-1 text-xs text-violet-600 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 inline-block" />{tag}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Le modèle 3D sera intégré dans le viewer interactif immersif d'ImmoBook v2, permettant aux clients de visiter virtuellement votre bien depuis leur navigateur.
              </p>
            </div>
          </div>
        </SectionCard>

        {/* ── Submit Bar ── */}
        <div className="sticky bottom-0 -mx-0 bg-white/90 backdrop-blur-md border-t border-gray-100 rounded-t-2xl shadow-lg px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-sm text-gray-500">
            <span className="font-medium text-gray-800">Prêt à publier ?</span> Votre bien sera visible instantanément sur l'app client.
          </div>
          <div className="flex items-center gap-2.5 self-stretch sm:self-auto">
            <button
              type="button"
              onClick={() => setForm(INITIAL_FORM)}
              className="flex-1 sm:flex-none h-11 px-5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-all duration-200"
            >
              Réinitialiser
            </button>
            <button
              type="submit"
              disabled={submitting}
              className={`flex-1 sm:flex-none h-11 px-6 rounded-xl text-white text-sm font-bold flex items-center justify-center gap-2 transition-all duration-200 shadow-sm ${
                submitting
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200 active:scale-95"
              }`}
            >
              {submitting ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Publication en cours…
                </>
              ) : (
                <>
                  <IconSend />
                  Publier la Propriété
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default AddProperty;