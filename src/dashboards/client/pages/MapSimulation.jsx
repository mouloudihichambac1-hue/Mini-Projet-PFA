import { useState } from "react";

function MapSimulation({ properties, onFavToggle, favorites }) {
  const [selectedPin, setSelectedPin] = useState(null);

  return (
    <div className="bg-gray-100 border border-gray-200 h-[500px] rounded-3xl overflow-hidden relative shadow-inner">
      {/* Simulation Grid Map Blueprint Canvas */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] bg-gray-50 flex items-center justify-center">
        <span className="text-[10px] font-black uppercase tracking-widest text-gray-300 pointer-events-none select-none">Simulation Interactive OpenStreetMap/Leaflet Layer</span>
        
        {/* Render Floating Pins based on coordinates proxies */}
        {properties.map((p, index) => {
          // Offsets for mock spatial distribution
          const topOffset = 25 + (index * 12) % 60;
          const leftOffset = 20 + (index * 15) % 70;

          return (
            <button
              key={p.id}
              onClick={() => setSelectedPin(p)}
              style={{ top: `${topOffset}%`, left: `${leftOffset}%` }}
              className={`absolute px-2 py-1 rounded-lg text-[10px] font-black shadow-md transition transform hover:scale-110 active:scale-95 ${
                selectedPin?.id === p.id ? "bg-indigo-600 text-white z-10 scale-105" : "bg-white text-gray-800 border border-gray-200"
              }`}
            >
              📍 {p.status === "À Louer" ? `${p.price} DH/m` : `${(p.price / 1000000).toFixed(1)}M`}
            </button>
          );
        })}
      </div>

      {/* Floating Micro Card Detail Panel if Pin selected */}
      {selectedPin && (
        <div className="absolute bottom-4 left-4 right-4 md:right-auto md:w-72 bg-white rounded-2xl p-3 border border-gray-100 shadow-xl flex gap-3 animate-[fadeInUp_0.2s_ease]">
          <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 relative">
            <img src={selectedPin.image} className="w-full h-full object-cover" alt="" />
          </div>
          <div className="flex-1 min-w-0 flex flex-col justify-between text-xs">
            <div>
              <div className="flex justify-between items-start">
                <span className="text-[9px] font-bold text-gray-400 uppercase">{selectedPin.type}</span>
                <button onClick={() => setSelectedPin(null)} className="text-gray-300 hover:text-gray-600 font-bold text-sm">✕</button>
              </div>
              <h4 className="font-bold text-gray-900 truncate mt-0.5">{selectedPin.title}</h4>
              <p className="text-indigo-600 font-black mt-0.5">{selectedPin.price.toLocaleString()} MAD</p>
            </div>
            <span className="text-[9px] font-medium text-gray-400">★ {selectedPin.rating} · {selectedPin.city}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default MapSimulation;