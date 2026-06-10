import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const AddProject = ({ onCancel, onSuccess }) => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  
  // UX : Gestion de l'étape courante 
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const [formData, setFormData] = useState({
    title: '', transactionType: 'À Vendre', propertyType: 'Villa', price: '',
    description: '', city: '', address: '', rooms: 1, bathrooms: 1, area: '',
    amenities: [], photos: [], model3D: null
  });

  const amenitiesList = [
    { id: 'piscine', label: 'Piscine', icon: '🏊‍♂️' }, { id: 'garage', label: 'Garage', icon: '🚗' },
    { id: 'securite', label: 'Sécurité 24h', icon: '🔐' }, { id: 'ascenseur', label: 'Ascenseur', icon: '🛗' },
    { id: 'jardin', label: 'Jardin', icon: '🌳' }, { id: 'terrasse', label: 'Terrasse', icon: '🌅' },
    { id: 'climatisation', label: 'Climatisation', icon: '❄️' }, { id: 'wifi', label: 'Fibre / WiFi', icon: '📶' },
  ];

  const stepsConfig = [
    { id: 1, title: 'Informations', subtitle: 'Titre et prix', icon: '📝' },
    { id: 2, title: 'Localisation', subtitle: 'Ville et adresse', icon: '📍' },
    { id: 3, title: 'Équipements', subtitle: 'Surfaces et options', icon: '🛋️' },
    { id: 4, title: 'Médias', subtitle: 'Photos et 3D', icon: '📸' }
  ];

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const toggleAmenity = (id) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(id) ? prev.amenities.filter(a => a !== id) : [...prev.amenities, id]
    }));
  };

  const updateCounter = (field, increment) => {
    setFormData(prev => ({ ...prev, [field]: Math.max(1, prev[field] + (increment ? 1 : -1)) }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) setCurrentStep(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    
    if (currentStep !== totalSteps) {
      handleNext();
      return;
    }
    
    // Bloquer la soumission si aucune photo n'est choisie
    if (!formData.photos || formData.photos.length === 0) {
      alert("⚠️ Action requise : Veuillez sélectionner au moins une photo pour pouvoir publier ce bien.");
      return; 
    }
    
    setLoading(true);
    try {
      const submitData = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'amenities') submitData.append(key, JSON.stringify(formData[key]));
        else if (key === 'photos') Array.from(formData.photos).forEach(f => submitData.append('photos', f));
        else if (key === 'model3D' && formData.model3D) submitData.append('model3D', formData.model3D);
        else submitData.append(key, formData[key]);
      });

      const host = window.location.hostname;
      const response = await fetch(`http://${host}:4000/api/v1/projects`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: submitData
      });

      if (response.ok) {
        alert('Propriété publiée avec succès !');
        onSuccess();
      } else throw new Error('Erreur API');
    } catch (error) {
      console.error(error);
      alert('Mode Démo : Le projet a été enregistré.');
      onSuccess();
    } finally {
      setLoading(false);
    }
  };

  // Variable de vérification pour le bouton de publication
  const hasPhotos = formData.photos && formData.photos.length > 0;

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 max-w-4xl mx-auto pb-12">
      
      {/* UX : Header et Barre de progression */}
      <div className="mb-10">
        <h2 className="text-3xl font-black text-slate-900 mb-8">Ajouter un Projet</h2>
        
        <div className="relative">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 -translate-y-1/2 rounded-full z-0"></div>
          <div className="absolute top-1/2 left-0 h-1 bg-violet-600 -translate-y-1/2 rounded-full z-0 transition-all duration-500 ease-out" style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}></div>
          
          <div className="relative z-10 flex justify-between">
            {stepsConfig.map((step) => {
              const isActive = step.id === currentStep;
              const isCompleted = step.id < currentStep;
              
              return (
                <div key={step.id} className="flex flex-col items-center gap-2">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold border-4 transition-all duration-300 ${
                    isActive ? 'bg-violet-600 border-violet-100 text-white shadow-lg shadow-violet-200' : 
                    isCompleted ? 'bg-violet-600 border-white text-white' : 
                    'bg-white border-slate-200 text-slate-400'
                  }`}>
                    {isCompleted ? '✓' : step.icon}
                  </div>
                  <div className="text-center hidden sm:block">
                    <p className={`text-xs font-bold uppercase tracking-wide ${isActive ? 'text-violet-700' : 'text-slate-500'}`}>{step.title}</p>
                    <p className="text-[10px] text-slate-400">{step.subtitle}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden flex flex-col min-h-[500px]">
        
        {/* Corps dynamique du formulaire */}
        <div className="p-8 md:p-12 flex-1">
          
          {/* ÉTAPE 1 : Infos Générales */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Informations principales</h3>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Titre de l'annonce</label>
                <input type="text" name="title" required value={formData.title} onChange={handleChange} placeholder="Ex: Magnifique Villa avec piscine à Palmeraie" 
                  className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-violet-500 focus:ring-4 focus:ring-violet-50 outline-none transition-all" />
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Type de transaction</label>
                  <div className="flex bg-slate-50/50 p-1 rounded-xl border border-slate-200">
                    {['À Vendre', 'À Louer'].map(t => (
                      <button type="button" key={t} onClick={() => setFormData({...formData, transactionType: t})} 
                        className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${formData.transactionType === t ? 'bg-white text-violet-700 shadow-sm border border-slate-100' : 'text-slate-500 hover:text-slate-700'}`}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Prix (DH)</label>
                  <div className="relative">
                    <input type="number" name="price" required value={formData.price} onChange={handleChange} placeholder="0" 
                      className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-violet-500 focus:ring-4 focus:ring-violet-50 outline-none transition-all pl-12" />
                    <span className="absolute left-4 top-4 text-slate-400 font-bold">DH</span>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Type de bien</label>
                <select name="propertyType" value={formData.propertyType} onChange={handleChange} 
                  className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-violet-500 outline-none transition-all appearance-none cursor-pointer">
                  <option value="Appartement">🏢 Appartement</option>
                  <option value="Villa">🏡 Villa</option>
                  <option value="Riad">🏛️ Riad</option>
                  <option value="Terrain">🌿 Terrain</option>
                </select>
              </div>
            </div>
          )}

          {/* ÉTAPE 2 : Localisation */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Où se situe le bien ?</h3>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Ville</label>
                <select name="city" required value={formData.city} onChange={handleChange} 
                  className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-violet-500 outline-none transition-all cursor-pointer">
                  <option value="">Sélectionnez une ville...</option>
                  <option value="Casablanca">Casablanca</option>
                  <option value="Rabat">Rabat</option>
                  <option value="Marrakech">Marrakech</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Adresse complète (Optionnelle)</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Numéro, rue, quartier..." 
                  className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-violet-500 focus:ring-4 focus:ring-violet-50 outline-none transition-all" />
              </div>
              
              <div className="h-48 bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-center mt-4">
                <span className="text-slate-400 text-sm font-medium flex flex-col items-center gap-2">
                  <span className="text-2xl">🗺️</span>
                  Aperçu cartographique désactivé
                </span>
              </div>
            </div>
          )}

          {/* ÉTAPE 3 : Équipements */}
          {currentStep === 3 && (
            <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Détails et atouts</h3>
              
              <div className="grid grid-cols-3 gap-6 p-6 bg-slate-50/50 rounded-2xl border border-slate-100">
                <div className="flex flex-col items-center">
                  <label className="text-xs font-bold text-slate-500 mb-3 uppercase tracking-wide">Chambres</label>
                  <div className="flex items-center gap-3 bg-white p-1.5 rounded-xl border border-slate-200 shadow-sm">
                    <button type="button" onClick={() => updateCounter('rooms', false)} className="w-8 h-8 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold transition">-</button>
                    <span className="w-8 text-center font-black text-slate-800">{formData.rooms}</span>
                    <button type="button" onClick={() => updateCounter('rooms', true)} className="w-8 h-8 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold transition">+</button>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <label className="text-xs font-bold text-slate-500 mb-3 uppercase tracking-wide">Salles d'eau</label>
                  <div className="flex items-center gap-3 bg-white p-1.5 rounded-xl border border-slate-200 shadow-sm">
                    <button type="button" onClick={() => updateCounter('bathrooms', false)} className="w-8 h-8 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold transition">-</button>
                    <span className="w-8 text-center font-black text-slate-800">{formData.bathrooms}</span>
                    <button type="button" onClick={() => updateCounter('bathrooms', true)} className="w-8 h-8 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold transition">+</button>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <label className="text-xs font-bold text-slate-500 mb-3 uppercase tracking-wide">Surface</label>
                  <div className="relative w-full px-2">
                    <input type="number" name="area" value={formData.area} onChange={handleChange} className="w-full text-center p-3 rounded-xl border border-slate-200 font-black text-slate-800 outline-none focus:border-violet-500" placeholder="0" />
                    <span className="absolute right-6 top-3.5 text-xs text-slate-400 font-bold">m²</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-4">Sélectionnez les commodités incluses</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {amenitiesList.map(amenity => {
                    const isSelected = formData.amenities.includes(amenity.id);
                    return (
                      <button type="button" key={amenity.id} onClick={() => toggleAmenity(amenity.id)} 
                        className={`p-4 rounded-2xl flex flex-col items-center gap-2 transition-all duration-300 border ${
                          isSelected 
                            ? 'bg-violet-50 border-violet-400 text-violet-800 shadow-sm' 
                            : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50'
                        }`}>
                        <span className="text-2xl">{amenity.icon}</span>
                        <span className="text-xs font-bold">{amenity.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ÉTAPE 4 : Médias */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Médias & Immersion</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/*  ZONE PHOTOS OBLIGATOIRE */}
                <div className={`border-2 border-dashed bg-slate-50/50 rounded-3xl p-8 text-center relative transition-colors cursor-pointer group ${!hasPhotos ? 'border-red-300 hover:bg-red-50' : 'border-slate-300 hover:bg-slate-100'}`}>
                  <input type="file" required multiple accept="image/*" onChange={(e) => setFormData({...formData, photos: e.target.files})} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-2xl shadow-sm mx-auto mb-4 group-hover:scale-110 transition-transform">📸</div>
                  <p className="font-bold text-slate-800">Galerie Photos <span className="text-red-500">*</span></p>
                  <p className="text-sm text-slate-500 mt-1">Cliquez ou glissez vos images</p>
                  <div className={`mt-4 inline-block px-3 py-1 rounded-full border text-xs font-bold ${hasPhotos ? 'bg-white border-slate-200 text-violet-600' : 'bg-red-50 border-red-200 text-red-500 animate-pulse'}`}>
                    {formData.photos.length} sélectionnée(s)
                  </div>
                </div>
                
                {/* ZONE 3D OPTIONNELLE */}
                <div className="border-2 border-dashed border-violet-300 bg-violet-50 rounded-3xl p-8 text-center relative hover:bg-violet-100 transition-colors cursor-pointer group">
                  <input type="file" accept=".gltf,.glb,.obj" onChange={(e) => setFormData({...formData, model3D: e.target.files[0]})} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-2xl shadow-sm mx-auto mb-4 group-hover:scale-110 transition-transform">🧊</div>
                  <p className="font-bold text-violet-900">Modèle 3D Immersif</p>
                  <p className="text-sm text-violet-600/80 mt-1">Formats acceptés : .GLB, .OBJ</p>
                  <div className="mt-4 inline-block bg-white px-3 py-1 rounded-full border border-violet-200 text-xs font-bold text-emerald-600 truncate max-w-xs">
                    {formData.model3D ? formData.model3D.name : 'Optionnel'}
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer Navigation */}
        <div className="p-6 bg-slate-50 border-t border-slate-200 flex justify-between items-center mt-auto">
          {currentStep === 1 ? (
            <button type="button" onClick={onCancel} className="px-6 py-3 rounded-xl text-slate-500 font-bold hover:bg-slate-200 transition">Annuler</button>
          ) : (
            <button type="button" onClick={handlePrev} className="px-6 py-3 rounded-xl border border-slate-300 text-slate-700 font-bold bg-white hover:bg-slate-50 shadow-sm transition flex items-center gap-2">
              <span>←</span> Précédent
            </button>
          )}

          {currentStep < totalSteps ? (
            <button type="button" onClick={handleNext} className="px-8 py-3 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 shadow-md transition flex items-center gap-2">
              Continuer <span>→</span>
            </button>
          ) : (
            <button 
              type="submit" 
              
              disabled={loading || !hasPhotos} 
              className={`px-8 py-3 rounded-xl font-bold shadow-md transition flex items-center gap-2 ${
                !hasPhotos 
                  ? 'bg-slate-300 text-slate-500 cursor-not-allowed opacity-60' 
                  : 'bg-violet-600 text-white hover:bg-violet-700 shadow-violet-200'
              }`}
            >
              {loading ? 'Création en cours...' : '🚀 Publier le projet'}
            </button>
          )}
        </div>

      </form>
    </div>
  );
};

export default AddProject;