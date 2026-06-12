import { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from '../../../../context/AuthContext';
import { API_BASE_URL } from '../../../../config/api';

function Messages() {
  const { user, token } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [typedText, setTypedText] = useState('');
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

  const handleSend = async (e) => {
    e.preventDefault();
    if (!typedText.trim() || !activeConversationId) return;

    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/messages/conversations/${activeConversationId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: typedText.trim() }),
      });
      const data = await parseJSONResponse(response);

      if (!response.ok) {
        throw new Error(data.message || 'Impossible d’envoyer le message.');
      }

      setMessages((prev) => [...prev, data]);
      setTypedText('');
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
    <div className="max-w-7xl mx-auto h-[calc(100vh-120px)] min-h-[600px] bg-white rounded-xl border border-slate-200 shadow-sm flex overflow-hidden text-slate-800">
      <div className="w-80 flex-shrink-0 border-r border-slate-200 flex flex-col bg-slate-50/50">
        <div className="p-5 border-b border-slate-200 bg-white">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-2">Messagerie</h2>
          <p className="text-xs text-slate-500">Démarrez un échange avec un promoteur par email.</p>
          <div className="mt-4 space-y-2">
            <input
              value={partnerEmail}
              onChange={(e) => setPartnerEmail(e.target.value)}
              type="email"
              placeholder="Email du promoteur"
              className="w-full rounded-xl border border-slate-200 bg-slate-100 px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-500 focus:bg-white"
            />
            <button
              type="button"
              disabled={loading || !partnerEmail.trim()}
              onClick={handleCreateConversation}
              className="w-full rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {loading ? 'Chargement...' : 'Démarrer une conversation'}
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversations.length === 0 ? (
            <div className="p-6 text-sm text-slate-500">Aucune conversation. Créez-en une nouvelle avec le mail d'un promoteur.</div>
          ) : (
            conversations.map((conversation) => {
              const isActive = conversation.id === activeConversationId;
              return (
                <button
                  key={conversation.id}
                  type="button"
                  onClick={() => setActiveConversationId(conversation.id)}
                  className={`w-full text-left p-4 flex flex-col gap-1 border-b border-slate-100 transition-colors ${
                    isActive ? 'bg-white border-l-4 border-l-blue-600' : 'hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-slate-900">{conversation.partner?.nom || 'Contact'}</span>
                    <span className="text-[10px] text-slate-400">{new Date(conversation.updatedAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-xs text-slate-500 truncate">{conversation.lastMessage || 'Aucun message.'}</p>
                </button>
              );
            }))}
        </div>
      </div>

      <div className="flex-1 flex flex-col bg-white">
        <div className="h-16 px-6 border-b border-slate-200 flex items-center justify-between bg-white flex-shrink-0">
          <div>
            <h3 className="text-sm font-bold text-slate-900">{activeConversation?.partner?.nom || 'Aucune conversation sélectionnée'}</h3>
            <p className="text-xs text-slate-500">{activeConversation?.partner?.email || 'Sélectionnez une conversation pour commencer.'}</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50 space-y-4">
          {error && (
            <div className="rounded-2xl bg-red-50 border border-red-200 p-3 text-sm text-red-700">{error}</div>
          )}

          {!activeConversationId ? (
            <div className="text-center text-sm text-slate-500">Choisissez une conversation ou démarrez-en une nouvelle.</div>
          ) : messages.length === 0 ? (
            <div className="text-center text-sm text-slate-500">Aucun message pour l'instant. Envoyez le premier message !</div>
          ) : (
            <>
              {messages.map((message) => {
                const isMe = message.sender?.id === user?.id;
                return (
                  <div key={message.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[70%] px-4 py-3 rounded-3xl text-sm ${
                      isMe ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white text-slate-800 rounded-bl-none border border-slate-200'
                    }`}>
                      <p className="leading-relaxed">{message.text}</p>
                      <div className="mt-2 text-[10px] text-slate-400 text-right">{new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                    </div>
                  </div>
                );
              })}
            </>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-200 flex items-center gap-3">
          <textarea
            value={typedText}
            onChange={(e) => setTypedText(e.target.value)}
            placeholder="Écrivez un message..."
            className="flex-1 min-h-[44px] rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-800 outline-none focus:border-blue-500 focus:bg-white resize-none"
          />
          <button
            type="submit"
            disabled={!typedText.trim() || !activeConversationId}
            className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:bg-slate-300 disabled:text-slate-500"
          >
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
}

export default Messages;

