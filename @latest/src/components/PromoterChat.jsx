import { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../config/api';

const PromoterChat = () => {
  const { user, token } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [partnerEmail, setPartnerEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const parseJSONResponse = async (response) => {
    const text = await response.text();
    try {
      return text ? JSON.parse(text) : {};
    } catch {
      return { message: text || `HTTP ${response.status}` };
    }
  };

  const fetchConversations = useCallback(async () => {
    if (!token) return;

    try {
      const response = await fetch(`${API_BASE_URL}/messages/conversations`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await parseJSONResponse(response);

      if (!response.ok) {
        throw new Error(data.message || 'Impossible de charger les conversations.');
      }

      setConversations(data.conversations || []);
      setActiveConversationId((prev) => prev || data.conversations?.[0]?.id || null);
    } catch (err) {
      setError(err.message);
    }
  }, [token]);

  const fetchMessages = useCallback(async (conversationId) => {
    if (!token || !conversationId) return;

    try {
      const response = await fetch(`${API_BASE_URL}/messages/conversations/${conversationId}/messages`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await parseJSONResponse(response);

      if (!response.ok) {
        throw new Error(data.message || 'Impossible de charger les messages.');
      }

      setMessages(data.messages || []);
    } catch (err) {
      setError(err.message);
    }
  }, [token]);

  const handleCreateConversation = async () => {
    if (!partnerEmail.trim()) return;
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/messages/conversations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ partnerEmail: partnerEmail.trim() }),
      });
      const data = await parseJSONResponse(response);

      if (!response.ok) {
        throw new Error(data.message || 'Impossible de démarrer la conversation.');
      }

      await fetchConversations();
      setActiveConversationId(data.conversationId);
      setPartnerEmail('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeConversationId) return;

    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/messages/conversations/${activeConversationId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: newMessage.trim() }),
      });
      const data = await parseJSONResponse(response);

      if (!response.ok) {
        throw new Error(data.message || "Impossible d'envoyer le message.");
      }

      setMessages((prev) => [...prev, data]);
      setNewMessage('');
    } catch (err) {
      setError(err.message);
    }
  };

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (token) {
      void fetchConversations();
    }
  }, [token, fetchConversations]);
  /* eslint-enable react-hooks/set-state-in-effect */

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (activeConversationId) {
      void fetchMessages(activeConversationId);
    } else {
      setMessages([]);
    }
  }, [activeConversationId, fetchMessages]);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const activeConversation = conversations.find((conv) => conv.id === activeConversationId);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-5 border-b border-slate-200 bg-slate-50">
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-bold text-slate-900">Messagerie client</h3>
          <p className="text-sm text-slate-500">Discutez avec vos clients et suivez vos conversations.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-4 p-5">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">Démarrer une conversation</label>
            <div className="flex gap-2">
              <input
                value={partnerEmail}
                onChange={(e) => setPartnerEmail(e.target.value)}
                type="email"
                placeholder="Email du client"
                className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-500"
              />
              <button
                type="button"
                disabled={loading || !partnerEmail.trim()}
                onClick={handleCreateConversation}
                className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:bg-slate-300 disabled:text-slate-500"
              >
                {loading ? 'Chargement...' : 'Créer'}
              </button>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-200 text-sm font-semibold text-slate-800">Conversations</div>
            <div className="max-h-[420px] overflow-y-auto">
              {conversations.length === 0 ? (
                <div className="p-4 text-sm text-slate-500">Aucune conversation disponible actuellement.</div>
              ) : (
                conversations.map((conversation) => {
                  const isActive = conversation.id === activeConversationId;
                  return (
                    <button
                      key={conversation.id}
                      type="button"
                      onClick={() => setActiveConversationId(conversation.id)}
                      className={`w-full text-left px-4 py-3 transition ${isActive ? 'bg-white text-slate-900' : 'text-slate-600 hover:bg-slate-100'}`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="block text-sm font-medium truncate">{conversation.partner?.nom || conversation.partner?.email || 'Client'}</span>
                        <span className="text-[10px] text-slate-400">{new Date(conversation.updatedAt).toLocaleDateString()}</span>
                      </div>
                      <p className="text-xs text-slate-500 truncate">{conversation.lastMessage || 'Aucun message encore.'}</p>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white flex flex-col min-h-[520px]">
          <div className="px-5 py-4 border-b border-slate-200">
            <div className="text-sm font-semibold text-slate-900">{activeConversation?.partner?.nom || 'Aucune conversation sélectionnée'}</div>
            <div className="text-xs text-slate-500">{activeConversation?.partner?.email || 'Sélectionnez une conversation dans la colonne de gauche.'}</div>
          </div>

          <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-slate-50">
            {error && <div className="rounded-2xl bg-red-50 border border-red-200 p-3 text-sm text-red-700">{error}</div>}

            {!activeConversationId ? (
              <div className="text-sm text-slate-500">Choisissez une conversation pour voir les messages.</div>
            ) : messages.length === 0 ? (
              <div className="text-sm text-slate-500">Aucun message pour le moment. Envoyez le premier message.</div>
            ) : (
              messages.map((message) => {
                const isMe = message.sender?.id === user?.id;
                return (
                  <div key={message.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[75%] rounded-3xl px-4 py-3 text-sm shadow-sm ${isMe ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white text-slate-800 rounded-bl-none border border-slate-200'}`}>
                      <p>{message.text}</p>
                      <div className="mt-2 text-[10px] text-slate-400 text-right">{new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="px-5 py-4 border-t border-slate-200 bg-white flex gap-3">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              disabled={!activeConversationId}
              placeholder={activeConversationId ? 'Écrivez votre message...' : "Sélectionnez une conversation d'abord."}
              className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none focus:border-blue-500 disabled:cursor-not-allowed"
            />
            <button
              type="submit"
              disabled={!newMessage.trim() || !activeConversationId}
              className="rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:bg-slate-300 disabled:text-slate-500"
            >
              Envoyer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PromoterChat;
