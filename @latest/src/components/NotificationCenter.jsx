import React, { useState, useEffect, useRef } from 'react';
import { Bell, Check, Calendar, MessageSquare, ShieldAlert } from 'lucide-react';

const NotificationCenter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Données de démonstration 
  const [notifications, setNotifications] = useState([
    {
      id: 'n1',
      type: 'reservation',
      title: 'Nouvelle demande de réservation',
      description: 'Hicham Mouloudi a soumis une demande pour la Villa Anfa Moderne.',
      time: 'Il y a 5 min',
      unread: true
    },
    {
      id: 'n2',
      type: 'message',
      title: 'Nouveau message reçu',
      description: 'Mustapha vous a envoyé un message concernant sa visite prévue.',
      time: 'Il y a 1 heure',
      unread: true
    },
    {
      id: 'n3',
      type: 'system',
      title: 'Statut du projet mis à jour',
      description: 'Le projet "Appartements Marina" est désormais verrouillé pour RDV.',
      time: 'Hier',
      unread: false
    }
  ]);

  // Nombre de notifications non lues
  const unreadCount = notifications.filter(n => n.unread).length;

  // Fermer le menu déroulant si on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Marquer toutes les notifications comme lues
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  // Icône en fonction du type de notification
  const getIcon = (type) => {
    switch (type) {
      case 'reservation': return <Calendar className="w-4 h-4 text-emerald-600" />;
      case 'message': return <MessageSquare className="w-4 h-4 text-indigo-600" />;
      default: return <ShieldAlert className="w-4 h-4 text-amber-600" />;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bouton de la Cloche */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition relative focus:outline-none"
      >
        <Bell className="w-5 h-5 stroke-[2px]" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center animate-bounce">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Menu Déroulant (Dropdown) */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-4 duration-200">
          {/* Header */}
          <div className="px-5 py-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
            <span className="font-bold text-slate-900 text-sm">Notifications</span>
            {unreadCount > 0 && (
              <button 
                onClick={markAllAsRead}
                className="text-xs font-bold text-[#3100b3] hover:underline flex items-center gap-1"
              >
                <Check className="w-3 h-3" /> Tout lire
              </button>
            )}
          </div>

          {/* Liste des notifications */}
          <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto">
            {notifications.map((notif) => (
              <div 
                key={notif.id} 
                className={`p-4 flex gap-3 transition-colors ${notif.unread ? 'bg-indigo-50/30' : 'hover:bg-slate-50/50'}`}
              >
                {/* Icône de gauche  */}
                <div className="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center shadow-sm shrink-0">
                  {getIcon(notif.type)}
                </div>

                {/* Contenu textuel Hiérarchie visuelle  */}
                <div className="flex-1 space-y-0.5">
                  <div className="flex justify-between items-baseline gap-2">
                    <p className={`text-xs ${notif.unread ? 'font-extrabold text-slate-900' : 'font-semibold text-slate-700'}`}>
                      {notif.title}
                    </p>
                    {notif.unread && <span className="w-1.5 h-1.5 bg-red-500 rounded-full shrink-0"></span>}
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">{notif.description}</p>
                  <p className="text-[10px] text-slate-400 font-medium pt-1">{notif.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
            <button className="text-xs font-bold text-slate-500 hover:text-slate-900 transition">
              Voir tout l'historique
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;