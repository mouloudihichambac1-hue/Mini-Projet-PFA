import React, { useState, useEffect } from 'react';
import { Building2, Globe, MapPin, Settings, Mail, Phone, Upload, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../config/api';

const PromoterSettings = () => {
  // On récupère l'utilisateur et le token depuis le contexte
  const { user, token } = useAuth();
  
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  
  // Fichier physique de l'image pour l'upload
  const [logoFile, setLogoFile] = useState(null);

  // 1. Initialisation dynamique des données depuis l'objet "user"
  const [profileData, setProfileData] = useState({
    companyName: '',
    email: '',
    phone: '',
    website: '',
    address: '',
    logoUrl: null
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Remplissage du formulaire dès que les données de l'utilisateur sont disponibles
  useEffect(() => {
    if (user) {
      setProfileData({
        // Mapping Mongoose -> React
        companyName: user.nomEntreprise || user.nom || '',
        email: user.email || '',
        phone: user.telephone || '', // À ajouter dans ton schéma User.js si absent
        website: user.siteWeb || '', // À ajouter dans ton schéma User.js si absent
        address: user.adresse || '', // À ajouter dans ton schéma User.js si absent
        logoUrl: user.logoUrl || null
      });
    }
  }, [user]);

  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  // Prévisualisation et stockage du fichier image
  const handleLogoUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLogoFile(file);
      setProfileData({ ...profileData, logoUrl: URL.createObjectURL(file) });
    }
  };

  // ─── REQUÊTE API : MISE À JOUR DU PROFIL ─────────────────────────────────
  const handleSubmitProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Utilisation de FormData pour supporter le texte + le fichier image
      const formData = new FormData();
      formData.append('nomEntreprise', profileData.companyName);
      formData.append('email', profileData.email);
      formData.append('telephone', profileData.phone);
      formData.append('siteWeb', profileData.website);
      formData.append('adresse', profileData.address);

      // Si le promoteur a choisi un nouveau logo
      if (logoFile) {
        formData.append('logo', logoFile);
      }

      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
          // ⚠️ Important : Ne pas mettre 'Content-Type': 'application/json'
          // Le navigateur gère automatiquement le boundary pour le FormData
        },
        body: formData
      });

      if (!response.ok) throw new Error('Erreur lors de la mise à jour du profil');

      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
      
    } catch (error) {
      console.error(error);
      alert('Impossible de mettre à jour le profil.');
    } finally {
      setLoading(false);
    }
  };

  // ─── REQUÊTE API : CHANGEMENT DE MOT DE PASSE ───────────────────────────
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return alert('Les nouveaux mots de passe ne correspondent pas.');
    }

    setPasswordLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          motDePasseActuel: passwordData.currentPassword,
          nouveauMotDePasse: passwordData.newPassword
        })
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Erreur lors du changement de mot de passe');

      alert('Mot de passe mis à jour avec succès !');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });

    } catch (error) {
      alert(error.message);
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12">
      
      {/* Toast de succès */}
      {isSaved && (
        <div className="fixed bottom-5 right-5 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-slate-800 animate-in slide-in-from-bottom-5 z-50">
          <CheckCircle className="w-5 h-5 text-emerald-500" />
          <span className="text-xs font-bold">Modifications enregistrées avec succès !</span>
        </div>
      )}

      <div>
        <h2 className="text-2xl font-black text-slate-900">Paramètres du Compte</h2>
        <p className="text-slate-400 text-xs font-medium mt-1">Gérez la vitrine de votre entreprise et la sécurité de vos accès.</p>
      </div>

      {/* FORMULAIRE 1 : INFORMATIONS DE L'ENTREPRISE */}
      <form onSubmit={handleSubmitProfile} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
          <Building2 className="w-5 h-5 text-slate-700" />
          <h3 className="font-bold text-slate-800 text-sm">Profil de l'Entreprise</h3>
        </div>

        <div className="p-6 md:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-center gap-6 pb-4 border-b border-slate-100">
            <div className="w-20 h-20 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center font-black text-slate-400 text-2xl overflow-hidden shadow-inner shrink-0 relative group">
              {profileData.logoUrl ? (
                <img src={profileData.logoUrl} alt="Logo" className="w-full h-full object-cover" />
              ) : (
                profileData.companyName?.charAt(0) || 'P'
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
      <form onSubmit={handlePasswordSubmit} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
          <Settings className="w-5 h-5 text-slate-700" />
          <h3 className="font-bold text-slate-800 text-sm">Sécurité & Authentification</h3>
        </div>

        <div className="p-6 md:p-8 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Mot de passe actuel</label>
              <input type="password" name="currentPassword" required value={passwordData.currentPassword} onChange={handlePasswordChange} className="w-full px-4 py-3 text-xs font-semibold rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-slate-900 outline-none transition-all" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Nouveau mot de passe</label>
              <input type="password" name="newPassword" required minLength="6" value={passwordData.newPassword} onChange={handlePasswordChange} className="w-full px-4 py-3 text-xs font-semibold rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-slate-900 outline-none transition-all" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Confirmer le mot de passe</label>
              <input type="password" name="confirmPassword" required minLength="6" value={passwordData.confirmPassword} onChange={handlePasswordChange} className="w-full px-4 py-3 text-xs font-semibold rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-slate-900 outline-none transition-all" />
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button type="submit" disabled={passwordLoading} className="px-6 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold text-xs rounded-xl shadow-sm hover:bg-slate-50 transition disabled:opacity-50">
            {passwordLoading ? 'Mise à jour...' : 'Mettre à jour les accès'}
          </button>
        </div>
      </form>

    </div>
  );
};

export default PromoterSettings;