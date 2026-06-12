import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { API_BASE_URL } from '../../config/api';

const VerifyEmailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // userId passé via navigate('/verify-email', { state: { userId, email, remainingResend } })
  const { userId: initialUserId, email: initialEmail, remainingResend: initialRemainingResend } = location.state || {};
  const [userId, setUserId] = useState(initialUserId || null);
  const [email, setEmail] = useState(initialEmail || '');

  useEffect(() => {
    if (initialUserId && initialEmail) {
      sessionStorage.setItem('verifyUserId', initialUserId);
      sessionStorage.setItem('verifyEmail', initialEmail);
      return;
    }

    const savedUserId = sessionStorage.getItem('verifyUserId');
    const savedEmail = sessionStorage.getItem('verifyEmail');
    if (savedUserId) setUserId(savedUserId);
    if (savedEmail) setEmail(savedEmail);
    if (typeof initialRemainingResend === 'number') {
      setResendLeft(initialRemainingResend);
    }
  }, [initialUserId, initialEmail, initialRemainingResend]);

  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [resendLeft, setResendLeft] = useState(3);
  const [resendMessage, setResendMessage] = useState('');
  const inputs = useRef([]);

  // Gestion de la saisie — passe automatiquement au champ suivant
  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return; // chiffres uniquement
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleResendCode = async () => {
    if (!userId || resendLeft <= 0) {
      return;
    }

    setError('');
    setResendMessage('');
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/resend-verification`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });

      const data = await response.json();
      if (response.ok) {
        setResendLeft(typeof data.remaining === 'number' ? data.remaining : resendLeft - 1);
        setResendMessage(data.message || 'Code renvoyé. Vérifiez votre boîte mail.');
      } else {
        setError(data.message || 'Impossible de renvoyer le code.');
        if (typeof data.remaining === 'number') {
          setResendLeft(data.remaining);
        }
      }
    } catch (err) {
      setError('Impossible de joindre le serveur.');
    } finally {
      setLoading(false);
    }
  };

  // Gestion du Backspace
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  // Collage d'un code complet (ex: depuis l'email)
  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newCode = pasted.split('').concat(Array(6).fill('')).slice(0, 6);
    setCode(newCode);
    inputs.current[Math.min(pasted.length, 5)]?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullCode = code.join('');
    if (fullCode.length < 6) {
      setError('Veuillez entrer les 6 chiffres du code.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, code: fullCode }),
      });

      const data = await response.json();

      if (response.ok) {
        sessionStorage.removeItem('verifyUserId');
        sessionStorage.removeItem('verifyEmail');
        setSuccess(true);
        setTimeout(() => navigate('/login'), 2500);
      } else {
        setError(data.message || 'Code incorrect. Veuillez réessayer.');
        setCode(['', '', '', '', '', '']);
        inputs.current[0]?.focus();
      }
    } catch (err) {
      setError('Impossible de joindre le serveur.');
    } finally {
      setLoading(false);
    }
  };

  if (!userId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans">
        <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-md w-full">
          <p className="text-red-600 font-bold mb-4">Accès invalide.</p>
          <button
            onClick={() => {
              sessionStorage.removeItem('verifyUserId');
              sessionStorage.removeItem('verifyEmail');
              navigate('/register');
            }}
            className="text-blue-600 underline"
          >
            Retour à l'inscription
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans p-4">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md border-t-8 border-blue-600">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-3xl font-bold text-blue-900 mb-2 italic cursor-pointer" onClick={() => navigate('/')}>
            immobook
          </div>
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">📧</span>
          </div>
          <h2 className="text-xl font-bold text-gray-800">Vérifiez votre email</h2>
          <p className="text-gray-500 text-sm mt-2">
            Un code à 6 chiffres a été envoyé à<br />
            <span className="font-semibold text-gray-700">{email || 'votre adresse email'}</span>
          </p>
        </div>

        {success ? (
          <div className="text-center py-6">
            <div className="text-5xl mb-4">✅</div>
            <p className="text-green-600 font-bold text-lg">Email vérifié avec succès !</p>
            <p className="text-gray-500 text-sm mt-2">Redirection vers la connexion...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* 6 cases de saisie */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
                Entrez votre code de vérification
              </label>
              <div className="flex justify-center gap-3" onPaste={handlePaste}>
                {code.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className={`w-12 h-14 text-center text-2xl font-bold border-2 rounded-xl outline-none transition-all
                      ${digit ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-300 bg-gray-50'}
                      focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-200`}
                    autoFocus={index === 0}
                  />
                ))}
              </div>
              <p className="text-center text-xs text-gray-400 mt-3">
                💡 Astuce : vous pouvez coller directement le code depuis votre email
              </p>
            </div>

            {/* Message d'erreur */}
            {error && (
              <div className="p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded">
                <span className="font-bold">Erreur :</span> {error}
              </div>
            )}

            {/* Bouton Valider */}
            <button
              type="submit"
              disabled={loading || code.join('').length < 6}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Vérification...' : 'Valider le code'}
            </button>

            {/* Info expiration */}
            <p className="text-center text-xs text-gray-400">
              Le code expire dans <span className="font-semibold text-gray-600">10 minutes</span>
            </p>

            <div className="mt-4 text-center">
              <button
                type="button"
                disabled={loading || resendLeft <= 0}
                onClick={handleResendCode}
                className="text-sm font-medium text-blue-600 hover:text-blue-800 disabled:text-gray-400 disabled:cursor-not-allowed"
              >
                {resendLeft > 0
                  ? `Renvoyer le code (${resendLeft} essai${resendLeft > 1 ? 's' : ''} restants)`
                  : 'Limite de renvoi atteinte'}
              </button>
              {resendMessage && (
                <p className="mt-2 text-sm text-green-600">{resendMessage}</p>
              )}
            </div>
          </form>
        )}

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/register')}
            className="text-gray-400 hover:text-gray-600 text-xs font-medium transition"
          >
            ← Retour à l'inscription
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;