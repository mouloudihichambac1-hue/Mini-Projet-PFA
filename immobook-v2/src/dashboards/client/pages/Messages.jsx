import { useState } from "react";

// ─── Inline SVG Icons (Propres et minimalistes) ──────────────────────────────
const IconSearch = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>;
const IconSend = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>;
const IconPaperclip = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" /></svg>;
const IconPhone = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>;
const IconMore = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" /></svg>;
const IconCheckDouble = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><polyline points="18 6 7 17 2 12" /><polyline points="22 10 11 21 7 17" /></svg>;

// ─── Mock Data ─────────────────────────────────────────────────────────────────
const CONTACTS = [
  { id: 1, name: "Salma Idrissi", role: "Agent Immobilier", avatar: "SI", online: true, unread: 0, time: "14:30", preview: "Oui, le propriétaire sera présent." },
  { id: 2, name: "Karim Benali", role: "Agent Immobilier", avatar: "KB", online: false, unread: 2, time: "Hier", preview: "Pouvez-vous m'envoyer les documents ?" },
  { id: 3, name: "Support ImmoBook", role: "Assistance", avatar: "SI", online: true, unread: 0, time: "Lun.", preview: "Votre compte a été vérifié avec succès." },
];

const INITIAL_MESSAGES = [
  { id: 1, senderId: 1, text: "Bonjour Youssef, la visite de la villa est confirmée pour ce vendredi à 14h30.", time: "10:15", self: false },
  { id: 2, senderId: "me", text: "Bonjour Salma, parfait merci. Est-ce que le propriétaire sera présent lors de la visite ?", time: "10:42", self: true },
  { id: 3, senderId: 1, text: "Oui, il sera là pour répondre à vos questions techniques concernant la piscine et le jardin.", time: "14:28", self: false },
  { id: 4, senderId: 1, text: "Je vous envoie l'itinéraire exact sur WhatsApp d'ici demain.", time: "14:30", self: false },
];

function Messages() {
  const [activeContactId, setActiveContactId] = useState(1);
  const [typedText, setTypedText] = useState("");
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [searchQuery, setSearchQuery] = useState("");

  const activeContact = CONTACTS.find(c => c.id === activeContactId);

  const handleSend = (e) => {
    e.preventDefault();
    if (!typedText.trim()) return;
    
    const now = new Date();
    const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    setMessages(prev => [...prev, { 
      id: Date.now(), 
      senderId: "me", 
      text: typedText, 
      time: timeString, 
      self: true 
    }]);
    setTypedText("");
  };

  return (
    <div className="max-w-7xl mx-auto h-[calc(100vh-120px)] min-h-[600px] bg-white rounded-xl border border-slate-200 shadow-sm flex overflow-hidden text-slate-800">
      
      {/* ── Sidebar: Liste des Conversations ── */}
      <div className="w-80 flex-shrink-0 border-r border-slate-200 flex flex-col bg-slate-50/50">
        
        {/* En-tête Sidebar */}
        <div className="p-5 border-b border-slate-200 bg-white">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-4">Messagerie</h2>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><IconSearch /></span>
            <input 
              type="text" 
              placeholder="Rechercher un message..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-9 pl-9 pr-3 bg-slate-100 border-none rounded-lg text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Liste des Contacts */}
        <div className="flex-1 overflow-y-auto">
          {CONTACTS.map(contact => {
            const isActive = activeContactId === contact.id;
            return (
              <button 
                key={contact.id}
                onClick={() => setActiveContactId(contact.id)}
                className={`w-full text-left p-4 flex items-start gap-3 transition-colors border-b border-slate-100 ${
                  isActive ? "bg-white border-l-2 border-l-blue-600" : "hover:bg-slate-100/50 border-l-2 border-l-transparent"
                }`}
              >
                <div className="relative flex-shrink-0">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${isActive ? 'bg-blue-100 text-blue-700' : 'bg-slate-200 text-slate-600'}`}>
                    {contact.avatar}
                  </div>
                  {contact.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h4 className="text-sm font-bold text-slate-900 truncate">{contact.name}</h4>
                    <span className="text-[10px] font-medium text-slate-400 flex-shrink-0">{contact.time}</span>
                  </div>
                  <p className={`text-xs truncate ${contact.unread > 0 ? 'text-slate-900 font-semibold' : 'text-slate-500'}`}>
                    {contact.preview}
                  </p>
                </div>

                {contact.unread > 0 && (
                  <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                    <span className="text-[10px] font-bold text-white">{contact.unread}</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Zone de Chat Principale ── */}
      <div className="flex-1 flex flex-col bg-white">
        
        {/* En-tête du Chat */}
        <div className="h-16 px-6 border-b border-slate-200 flex items-center justify-between bg-white flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-sm font-bold text-slate-600">
                {activeContact.avatar}
              </div>
              {activeContact.online && <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>}
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">{activeContact.name}</h3>
              <p className="text-xs text-slate-500 font-medium">
                {activeContact.role} • {activeContact.online ? <span className="text-emerald-600">En ligne</span> : "Hors ligne"}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-colors" title="Appeler">
              <IconPhone />
            </button>
            <button className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-colors" title="Plus d'options">
              <IconMore />
            </button>
          </div>
        </div>

        {/* Fil des messages (Feed) */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50 space-y-4">
          <div className="text-center mb-6">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
              Aujourd'hui
            </span>
          </div>

          {messages.map((m, index) => {
            const isLast = index === messages.length - 1;
            return (
              <div key={m.id} className={`flex flex-col ${m.self ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[70%] px-4 py-2.5 text-sm ${
                  m.self 
                    ? 'bg-blue-600 text-white rounded-2xl rounded-tr-sm shadow-sm' 
                    : 'bg-white text-slate-800 rounded-2xl rounded-tl-sm border border-slate-200 shadow-sm'
                }`}>
                  <p className="leading-relaxed">{m.text}</p>
                </div>
                <div className={`flex items-center gap-1 mt-1 text-[10px] font-medium text-slate-400 ${m.self ? 'mr-1' : 'ml-1'}`}>
                  {m.time}
                  {m.self && isLast && <span className="text-blue-500 ml-0.5"><IconCheckDouble /></span>}
                  {m.self && !isLast && <span className="text-slate-400 ml-0.5"><IconCheckDouble /></span>}
                </div>
              </div>
            );
          })}
        </div>

        {/* Zone de saisie (Input) */}
        <div className="p-4 bg-white border-t border-slate-200">
          <form onSubmit={handleSend} className="flex items-end gap-2 bg-slate-50 p-1.5 rounded-xl border border-slate-200 focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-400 transition-all">
            <button type="button" className="p-2.5 text-slate-400 hover:text-slate-600 transition-colors flex-shrink-0" title="Joindre un fichier">
              <IconPaperclip />
            </button>
            
            <textarea 
              value={typedText} 
              onChange={e => setTypedText(e.target.value)} 
              placeholder="Écrivez votre message ici..." 
              className="flex-1 max-h-32 min-h-[40px] bg-transparent border-none text-sm text-slate-800 placeholder-slate-400 focus:outline-none resize-none py-2.5 px-2 leading-relaxed"
              rows={1}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend(e);
                }
              }}
            />
            
            <button 
              type="submit" 
              disabled={!typedText.trim()}
              className={`p-2.5 rounded-lg flex-shrink-0 transition-colors ${
                typedText.trim() ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
              title="Envoyer"
            >
              <IconSend />
            </button>
          </form>
          <div className="text-center mt-2">
            <span className="text-[10px] text-slate-400">Appuyez sur <kbd className="font-sans font-bold">Entrée</kbd> pour envoyer</span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Messages;