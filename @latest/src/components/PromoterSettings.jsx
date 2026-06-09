import React, { useState } from 'react';
import { Building2, Globe, MapPin, ShieldCheck, Mail, Phone, Upload, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const PromoterSettings = () => {
  const { user } = useAuth();
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  // Données locales de test pour simuler les attributs de l'entité Promoter
  const [profileData, setProfileData] = useState({
    companyName: user?.companyName || 'Prestige Immo Maroc',
    email: user?.email || 'contact@prestigeimmo.ma',
    phone: '+212 5 22 45 78 90',
    website: 'https://www.prestigeimmo.ma',
    address: 'Anfa Place, Boulevard de la Corniche, Casablanca',
    logoUrl: null
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleLogoUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfileData({ ...profileData, logoUrl: URL.createObjectURL(e.target.files[0]) });
    }
  };

  // Simulation de la sauvegarde locale (idéal pour la soutenance sans dépendre du réseau)
  const handleSubmitProfile = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12">
      
      {/* Toast de succès de sauvegarde temporaire */}
      {isSaved && (
        <div className="fixed bottom-5 right-5 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-slate-800 animate-in slide-in-from-bottom-5 z-50">
          <CheckCircle className="w-5 h-5 text-emerald-500" />
          <span className="text-xs font-bold">Modifications enregistrées avec succès (Simulé) !</span>
        </div>
      )}

      <div>
        <h2 className="text-2xl font-black text-slate-900">Paramètres du Compte</h2>
        <p className="text-slate-400 text-xs font-medium mt-1">Gérez la vitrine de votre entreprise et la sécurité de vos accès.</p>
      </div>

      {/* FORMULAIRE 1 : INFORMATIONS DE L'ENTREPRISE  */}
      <form onSubmit={handleSubmitProfile} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
          <Building2 className="w-5 h-5 text-slate-700" />
          <h3 className="font-bold text-slate-800 text-sm">Profil de l'Entreprise</h3>
        </div>

        <div className="p-6 md:p-8 space-y-6">
          {/* Zone d'upload du logo */}
          <div className="flex flex-col sm:flex-row items-center gap-6 pb-4 border-b border-slate-100">
            <div className="w-20 h-20 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center font-black text-slate-400 text-2xl overflow-hidden shadow-inner shrink-0 relative group">
              {profileData.logoUrl ? (
                <img src={profileData.logoUrl} alt="Logo" className="w-full h-full object-cover" />
              ) : (
                profileData.companyName.charAt(0)
              )}
            </div>
            <div className="text-center sm:text-left space-y-2">
              <label className="cursor-pointer bg-slate-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-slate-800 transition shadow-sm inline-flex items-center gap-2">
                <Upload className="w-3.5 h-3.5" /> Charger un nouveau logo
                <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
              </label>
              <p className="text-[10px] text-slate-400 font-medium">Recommandé : Carré, PNG ou JPG. Max 2Mo.</p>
            </div>
          </div>

          {/* Grille des attributs de l'entité */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Raison sociale / Nom de l'agence *</label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input type="text" name="companyName" required value={profileData.companyName} onChange={handleProfileChange} className="w-full pl-11 pr-4 py-3 text-xs font-semibold rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-slate-900 outline-none transition-all" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Site Internet (Website)</label>
              <div className="relative">
                <Globe className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input type="url" name="website" value={profileData.website} onChange={handleProfileChange} placeholder="https://exemple.ma" className="w-full pl-11 pr-4 py-3 text-xs font-semibold rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-slate-900 outline-none transition-all" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Adresse E-mail professionnelle *</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input type="email" name="email" required value={profileData.email} onChange={handleProfileChange} className="w-full pl-11 pr-4 py-3 text-xs font-semibold rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-slate-900 outline-none transition-all" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Téléphone de contact *</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input type="tel" name="phone" required value={profileData.phone} onChange={handleProfileChange} className="w-full pl-11 pr-4 py-3 text-xs font-semibold rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-slate-900 outline-none transition-all" />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-2">Adresse du Siège Social</label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-4 top-4" />
                <textarea name="address" rows="2" value={profileData.address} onChange={handleProfileChange} className="w-full pl-11 pr-4 py-3 text-xs font-semibold rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-slate-900 outline-none transition-all resize-none" />
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button type="submit" disabled={loading} className="px-6 py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl shadow-md hover:bg-slate-800 transition disabled:opacity-50">
            {loading ? 'Enregistrement...' : 'Sauvegarder le profil'}
          </button>
        </div>
      </form>

      {/* FORMULAIRE 2 : SÉCURITÉ / MOT DE PASSE */}
      <form onSubmit={(e) => { e.preventDefault(); alert("Modification du mot de passe simulée avec succès !"); }} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-slate-700" />
          <h3 className="font-bold text-slate-800 text-sm">Sécurité & Authentification</h3>
        </div>

        <div className="p-6 md:p-8 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Mot de passe actuel</label>
              <input type="password" name="currentPassword" value={passwordData.currentPassword} onChange={handlePasswordChange} className="w-full px-4 py-3 text-xs font-semibold rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-slate-900 outline-none transition-all" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Nouveau mot de passe</label>
              <input type="password" name="newPassword" value={passwordData.newPassword} onChange={handlePasswordChange} className="w-full px-4 py-3 text-xs font-semibold rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-slate-900 outline-none transition-all" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Confirmer le mot de passe</label>
              <input type="password" name="confirmPassword" value={passwordData.confirmPassword} onChange={handlePasswordChange} className="w-full px-4 py-3 text-xs font-semibold rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-slate-900 outline-none transition-all" />
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button type="submit" className="px-6 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold text-xs rounded-xl shadow-sm hover:bg-slate-50 transition">
            Mettre à jour les accès
          </button>
        </div>
      </form>

    </div>
  );
};

export default PromoterSettings;