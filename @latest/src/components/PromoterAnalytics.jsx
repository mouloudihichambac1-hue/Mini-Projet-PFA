import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

// Données
const data = [
  { name: 'Jan', Ventes: 4.2, Reservations: 12 },
  { name: 'Fév', Ventes: 5.8, Reservations: 18 },
  { name: 'Mar', Ventes: 7.1, Reservations: 15 },
  { name: 'Avr', Ventes: 8.5, Reservations: 22 },
  { name: 'Mai', Ventes: 10.2, Reservations: 26 },
  { name: 'Juin', Ventes: 12.8, Reservations: 24 },
];

const PromoterAnalytics = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
      
      {/* Graphique principal : Évolution des Ventes  */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm lg:col-span-2 flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Évolution du Chiffre d'Affaires</h3>
          <p className="text-xs text-slate-400 mb-6">Volume des ventes cumulées en Millions de DH (MDH)</p>
        </div>
        
        {/* Conteneur responsive pour adapter le graphique à toutes les résolutions */}
        <div className="h-64 w-full text-xs font-semibold text-slate-400">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                {/* Dégradé fluide pour l'effet premium sous la courbe */}
                <linearGradient id="colorVentes" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3100b3" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#3100b3" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} unit="M" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                labelStyle={{ fontWeight: 'bold', color: '#1e293b' }}
              />
              <Area type="monotone" dataKey="Ventes" stroke="#3100b3" strokeWidth={3} fillOpacity={1} fill="url(#colorVentes)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Graphique secondaire : Volume des Réservations Client */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Demandes de Réservation</h3>
          <p className="text-xs text-slate-400 mb-6">Nombre de signatures d'intentions de réservation</p>
        </div>

        <div className="h-64 w-full text-xs font-semibold text-slate-400">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0' }}
                cursor={{ fill: '#f8fafc' }}
              />
              <Bar dataKey="Reservations" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};

export default PromoterAnalytics;