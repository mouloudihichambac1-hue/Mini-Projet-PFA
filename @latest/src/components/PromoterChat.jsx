import React, { useState, useEffect, useRef } from 'react';
//import { io } from 'socket.io-client';
import { useAuth } from '../context/AuthContext';

const PromoterChat = ({ targetConversationId }) => {
  const { user, token } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  // 1. Connexion à Socket.IO et chargement de l'historique
  useEffect(() => {
    const host = window.location.hostname;
    
    // Initialisation du serveur Socket.IO (Port 4000 de ton backend)
    socketRef.current = io(`http://${host}:4000`, {
      auth: { token }
    });

    // Rejoindre la salle de la conversation (Room)
    if (targetConversationId) {
      socketRef.current.emit('join_conversation', targetConversationId);
      
      // Fetch de l'historique des messages depuis l'API
      fetch(`http://${host}:4000/api/v1/messages/${targetConversationId}`)
        .autoJson()
        .then(data => setMessages(data))
        .catch(err => console.error("Erreur historique chat:", err));
    }

    // Écouter l'arrivée de nouveaux messages (Étape 7 du diagramme de séquence)
    socketRef.current.on('receive_message', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [targetConversationId, token]);

  // Scroll automatique vers le bas à chaque nouveau message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 2. Envoi manuel d'un message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const messageData = {
      conversationId: targetConversationId,
      content: newMessage,
      senderId: user.id,
      senderModel: 'Promoter' // Classe Promoter du diagramme
    };

    // Émettre via Socket.IO pour le temps réel
    socketRef.current.emit('send_message', messageData);
    setNewMessage('');
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm h-[500px] flex flex-col overflow-hidden animate-in fade-in duration-300">
      {/* Header du Chat */}
      <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center gap-3">
        <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
        <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Discussion Client en Direct</h3>
      </div>

      {/* Zone des Messages */}
      <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50/50">
        {messages.map((msg, index) => {
          const isMe = msg.senderId === user.id;
          return (
            <div key={index} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-md px-4 py-2.5 rounded-2xl text-sm font-medium shadow-sm ${
                isMe ? 'bg-[#3100b3] text-white rounded-tr-none' : 'bg-white text-slate-800 rounded-tl-none border'
              }`}>
                <p>{msg.content}</p>
                <span className={`block text-[10px] mt-1 text-right ${isMe ? 'text-indigo-200' : 'text-slate-400'}`}>
                  {new Date(msg.sentAt || Date.now()).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </span>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Formulaire d'envoi */}
      <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-slate-100 flex gap-3">
        <input 
          type="text" 
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Rédiger votre message..." 
          className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-[#3100b3] text-sm font-medium"
        />
        <button type="submit" className="px-5 py-2.5 bg-[#3100b3] text-white font-bold rounded-xl text-sm hover:bg-indigo-800 transition">
          Envoyer
        </button>
      </form>
    </div>
  );
};

export default PromoterChat;