import React from 'react';
import { useNavigate } from 'react-router-dom';
import heroImage from '../../assets/hero-bg.jpg';
const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* --- NAVBAR --- */}
      <nav className="flex items-center justify-between px-4 md:px-8 py-4 bg-[#0f1f3d] shadow-lg sticky top-0 z-50">
        <div className="flex items-center space-x-8">
          <div className="text-2xl font-bold text-white flex items-center gap-2 cursor-pointer">
            <svg className="w-8 h-8 text-sky-300" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3zm0 2.5l5.5 5.5H16v7h-2v-6h-4v6H8v-7H6.5L12 5.5z"/></svg>
            <span>immobook</span>
          </div>
          <div className="hidden md:flex space-x-6 text-sm font-medium text-slate-200">
            <a href="#" className="hover:text-white">Accueil</a>
            <a href="#" className="hover:text-white">Projets</a>
            <a href="#" className="hover:text-white">Nouveautés</a>
            <a href="#" className="hover:text-white">Contact</a>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button onClick={() => navigate('/login')} 
            className="px-5 py-2.5 bg-white text-[#0f1f3d] text-sm font-semibold rounded shadow-sm hover:bg-slate-100 transition">
            Se connecter
          </button>
          <button onClick={() => navigate('/register')} className="px-5 py-2.5 bg-sky-600 text-white text-sm font-medium rounded shadow-sm hover:bg-sky-500 transition">
            + S'inscrire
          </button>
        </div>
      </nav>

      {/* --- HERO SECTION (Image + Search Bar) --- */}
    
     <header 
        className="relative w-full h-[500px] bg-cover bg-center flex flex-col items-center justify-center text-white"
        style={{ backgroundImage: `url(${heroImage})` }} 
      >
        {/* Filtre sombre pour la lisibilité */}
        <div className="absolute inset-0 bg-black/50"></div>
        
        <div className="relative z-10 flex flex-col items-center text-center px-4">
          <div className="mb-6 px-4 py-1.5 bg-white text-gray-900 text-sm font-semibold rounded-full flex items-center gap-2">
            <span className="text-blue-600">★</span> Propulsé par l'innovation INPT
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Trouvez votre projet immobilier idéal au Maroc</h1>
          <p className="text-lg md:text-xl text-gray-200 mb-12">Découvrez une sélection de projets et suivez l'avancement en temps réel</p>
        </div>

        {/* Barre de recherche flottante */}
        <div className="absolute -bottom-8 w-11/12 max-w-4xl bg-white rounded-full shadow-xl flex items-center p-2 z-20 border border-gray-200 animate-bounce">
          <select className="px-4 py-3 bg-transparent text-gray-700 outline-none border-r border-gray-300 rounded-l-full cursor-pointer hidden md:block">
            <option>Acheter</option>
            <option>Louer</option>
          </select>
          <div className="flex-1 flex items-center px-4">
            <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            <input type="text" placeholder="Rechercher une ville ou un quartier..." className="w-full bg-transparent outline-none text-gray-700" />
          </div>
          <select className="px-4 py-3 bg-transparent text-gray-700 outline-none border-l border-gray-300 hidden md:block cursor-pointer">
            <option>Type de bien</option>
            <option>Appartement</option>
            <option>Villa</option>
          </select>
          <button className="bg-blue-700 text-white p-3 rounded-full hover:bg-blue-800 transition ml-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </button>
        </div>
      </header>

      {/* --- BANNER --- */}
      <div className="w-full bg-[#0f1f3d] py-3 mt-8">
        <p className="text-center text-white text-sm font-medium tracking-wide">Une plateforme ImmoBook</p>
      </div>

      <section className="px-4 py-14 max-w-6xl mx-auto">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-[#0f1f3d]/10 bg-white p-7 shadow-sm">
            <p className="text-3xl font-bold text-[#0f1f3d]">+120</p>
            <p className="mt-3 text-sm text-slate-600">Projets immobiliers suivis avec transparence et efficacité.</p>
          </div>
          <div className="rounded-3xl border border-[#0f1f3d]/10 bg-white p-7 shadow-sm">
            <p className="text-3xl font-bold text-[#0f1f3d]">98%</p>
            <p className="mt-3 text-sm text-slate-600">Taux de satisfaction des utilisateurs grâce à une expérience claire et fluide.</p>
          </div>
          <div className="rounded-3xl border border-[#0f1f3d]/10 bg-white p-7 shadow-sm">
            <p className="text-3xl font-bold text-[#0f1f3d]">24/7</p>
            <p className="mt-3 text-sm text-slate-600">Support et suivi de projet disponibles à chaque étape de votre investissement.</p>
          </div>
        </div>
      </section>

      {/* --- REJOIGNEZ LA PLATEFORME (Inspiré des cartes Agences/Développeurs) --- */}
      <section className="px-4 py-20 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Rejoignez la plateforme immobilière de référence</h2>
          <p className="text-gray-500 mt-2">Que vous soyez un client ou un promoteur, accédez à des outils dédiés.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Carte Client */}
          <div className="bg-white border border-[#0f1f3d]/10 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition">
            <div className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-[#0f1f3d] text-white rounded-lg">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path></svg>
                </div>
                <h3 className="text-2xl font-bold">Pour les clients</h3>
              </div>
              <p className="text-gray-500 mb-6 text-sm">Des outils dédiés pour suivre votre investissement</p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-sm text-gray-700">
                  <span className="text-green-500 mr-3">✔</span> Suivi de l'avancement des travaux en direct
                </li>
                <li className="flex items-center text-sm text-gray-700">
                  <span className="text-green-500 mr-3">✔</span> Accès centralisé à tous vos documents légaux
                </li>
                <li className="flex items-center text-sm text-gray-700">
                  <span className="text-green-500 mr-3">✔</span> Communication directe et rapide avec le promoteur
                </li>
              </ul>
              <button onClick={() => navigate('/login?role=client')} className="w-full py-3 bg-blue-700 text-white rounded-md font-medium hover:bg-blue-800 transition">
                En savoir plus sur l'espace client →
              </button>
            </div>
          </div>

          {/* Carte Promoteur */}
          <div className="bg-white border border-[#0f1f3d]/10 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition">
            <div className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-[#0f1f3d] text-white rounded-lg">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd"></path></svg>
                </div>
                <h3 className="text-2xl font-bold">Pour les promoteurs</h3>
              </div>
              <p className="text-gray-500 mb-6 text-sm">Gérez vos projets immobiliers et vos acquéreurs</p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-sm text-gray-700">
                  <span className="text-green-500 mr-3">✔</span> Mise en valeur de vos projets immobiliers
                </li>
                <li className="flex items-center text-sm text-gray-700">
                  <span className="text-green-500 mr-3">✔</span> Gestion centralisée des demandes et contacts
                </li>
                <li className="flex items-center text-sm text-gray-700">
                  <span className="text-green-500 mr-3">✔</span> Rapports détaillés sur l'avancement des chantiers
                </li>
              </ul>
              <button onClick={() => navigate('/login?role=promoteur')} className="w-full py-3 bg-blue-700 text-white rounded-md font-medium hover:bg-blue-800 transition">
                Découvrir les solutions promoteurs →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="text-2xl font-bold text-blue-800 flex items-center gap-2 mb-4">
               <svg className="w-6 h-6 text-blue-700" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3zm0 2.5l5.5 5.5H16v7h-2v-6h-4v6H8v-7H6.5L12 5.5z"/></svg>
               immobook
            </div>
            <p className="text-gray-500 text-sm max-w-sm mb-6">
              La plateforme ImmoBook, votre partenaire au Maroc. Retrouvez le projet idéal sur la plateforme la plus fiable du pays.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-4 text-sm">LIENS RAPIDES</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-blue-700">Projets immobiliers</a></li>
              <li><a href="#" className="hover:text-blue-700">Actualités & Conseils</a></li>
              <li><a href="#" className="hover:text-blue-700">À propos</a></li>
              <li><a href="#" className="hover:text-blue-700">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-4 text-sm">SOLUTIONS PROS</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-blue-700">Pour les agences</a></li>
              <li><a href="#" className="hover:text-blue-700">Pour les promoteurs</a></li>
              <li><a href="#" className="hover:text-blue-700">Centre d'aide</a></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
          <p>© {new Date().getFullYear()} ImmoBook. Tous droits réservés.</p>
          <div className="space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-gray-600">Politique de confidentialité</a>
            <a href="#" className="hover:text-gray-600">Conditions d'utilisation</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;