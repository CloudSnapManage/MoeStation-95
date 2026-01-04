
import React from 'react';
import { Link } from 'react-router-dom';
import { Music, Radio, Disc, Volume2, Waves, Sparkles, Heart, Info, ExternalLink, Activity, Zap, Instagram, Award, UserCheck } from 'lucide-react';

interface Contributor {
  name: string;
  instagram?: string;
  isAuthor?: boolean;
}

interface Station {
  id: string;
  name: string;
  description: string;
  color: string;
  url: string;
  contributor?: Contributor;
}

const STATIONS: Station[] = [
  { 
    id: 'jfKfPfyJRdk', 
    name: 'Lofi Girl Radio', 
    description: 'Beats to relax/study to.', 
    color: 'bg-pink-400', 
    url: 'https://www.youtube.com/watch?v=jfKfPfyJRdk',
    contributor: { name: 'MoeStation_Staff', isAuthor: true }
  },
  { 
    id: 'zXHS92Nirfo', 
    name: 'Japanese City Pop', 
    description: '80s nostalgic groove.', 
    color: 'bg-blue-400', 
    url: 'https://www.youtube.com/watch?v=zXHS92Nirfo',
    contributor: { name: 'Srijan', instagram: 'https://instagram.com/', isAuthor: false }
  },
  { 
    id: '5yx6BWlEVcY', 
    name: 'Chillhop Raccoon', 
    description: 'Groovy jazz hop beats.', 
    color: 'bg-yellow-400', 
    url: 'https://www.youtube.com/watch?v=5yx6BWlEVcY',
    contributor: { name: 'Jazz_Ghost', isAuthor: false }
  },
  { 
    id: 'B_Anx8cd9iU', 
    name: 'Midnight Synthwave', 
    description: 'Drive through the neon night.', 
    color: 'bg-purple-400', 
    url: 'https://www.youtube.com/watch?v=B_Anx8cd9iU',
    contributor: { name: 'Neo_Runner', instagram: 'https://instagram.com/', isAuthor: false }
  },
  { 
    id: 'eKO9BGdQ7Wk', 
    name: 'Rainy Night Lofi', 
    description: 'Soft piano and rainfall.', 
    color: 'bg-gray-400', 
    url: 'https://www.youtube.com/watch?v=eKO9BGdQ7Wk',
    contributor: { name: 'Sato_San', isAuthor: true }
  },
  { 
    id: 'TPWYQ94Ief4', 
    name: 'Space Lofi', 
    description: 'Ambient signals from orbit.', 
    color: 'bg-indigo-400', 
    url: 'https://www.youtube.com/watch?v=TPWYQ94Ief4',
    contributor: { name: 'Orbit_95', isAuthor: false }
  },
];

const SoundWave = () => (
  <div className="flex items-end gap-[2px] h-8 px-2">
    {[...Array(10)].map((_, i) => (
      <div 
        key={i}
        className="w-[3px] bg-pink-500 rounded-full animate-wave-bar"
        style={{ 
          animationDelay: `${i * 0.08}s`,
          height: `${20 + Math.random() * 80}%`
        }}
      />
    ))}
  </div>
);

const RadioRoom: React.FC<{ onSelectTrack: (id: string, name: string) => void, currentTrackId: string, isPlaying: boolean }> = ({ onSelectTrack, currentTrackId, isPlaying }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 animate-in fade-in slide-in-from-bottom-8">
      <div className="text-center mb-16">
        <span className="text-xs font-black uppercase tracking-[0.4em] text-pink-500 mb-4 block flex items-center justify-center gap-2">
           <Waves size={16} className="animate-pulse" /> Signal Receiver Active
        </span>
        <h1 className="text-5xl md:text-7xl retro-title mb-6">RADIO ROOM</h1>
        <p className="max-w-xl mx-auto font-medium text-gray-600 mb-8 transition-colors duration-500 theme-text-muted">
          Tune your frequency. Enhance your reading experience with the sounds of the synth-era. 
          Pick a station below to begin the transmission.
        </p>
        <Link to="/broadcast#join" className="inline-flex items-center gap-2 text-[10px] font-black uppercase underline hover:text-pink-500 transition-colors theme-text">
          <Info size={12} /> Submit a track & get credited
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {STATIONS.map((station) => {
          const isActive = currentTrackId === station.id && isPlaying;
          return (
            <div key={station.id} className="relative group">
              <button
                onClick={() => onSelectTrack(station.id, station.name)}
                className={`w-full p-6 flex items-center gap-6 text-left transition-all relative overflow-hidden border-2 border-[var(--border-main)] rounded-xl ${
                  isActive 
                  ? 'bg-pink-50 scale-[1.04] border-pink-500 shadow-[0_0_30px_rgba(244,114,182,0.4),8px_8px_0px_0px_rgba(244,114,182,1)] ring-2 ring-pink-500 ring-offset-4 animate-neon-pulse' 
                  : 'bg-[var(--card-bg)] hover:bg-[var(--input-bg)] shadow-[6px_6px_0px_0px_var(--shadow-color)]'
                }`}
              >
                {isActive && (
                  <>
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 animate-gradient-x z-20"></div>
                    <div className="absolute inset-0 pointer-events-none bg-scan-line opacity-10 z-10 animate-scan"></div>
                  </>
                )}
                
                <div className={`w-16 h-16 flex-shrink-0 border-2 border-black rounded-full flex items-center justify-center ${station.color} shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden transition-transform duration-500 ${isActive ? 'scale-110 rotate-12' : ''}`}>
                   {isActive ? (
                     <Disc className="text-white animate-spin-slow" size={32} />
                   ) : (
                     <Radio className="text-white" size={32} />
                   )}
                   <div className="absolute inset-0 bg-white/10"></div>
                   {isActive && (
                     <div className="absolute inset-0 border-4 border-white/30 rounded-full animate-ping-slow"></div>
                   )}
                </div>
                
                <div className="flex-grow z-10">
                   <div className="flex items-center justify-between mb-1">
                     <div className="flex flex-col">
                      <h3 className={`font-black uppercase tracking-tight text-lg transition-colors ${isActive ? 'text-pink-600' : 'text-[var(--text-main)]'}`}>
                        {station.name}
                      </h3>
                      {isActive && (
                        <span className="flex items-center gap-1 mono text-[9px] font-black text-pink-500 animate-pulse uppercase tracking-widest">
                          <Activity size={10} /> SIGNAL LOCKED
                        </span>
                      )}
                     </div>
                     {isActive && <SoundWave />}
                   </div>
                   <p className={`text-xs font-medium italic mt-1 transition-colors ${isActive ? 'text-pink-400' : 'text-[var(--text-muted)]'}`}>
                     {station.description}
                   </p>

                   {/* Contributor Credit Tag */}
                   {station.contributor && (
                     <div className="mt-4 pt-3 border-t border-[var(--border-main)]/10 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                           <span className="text-[8px] font-black uppercase text-[var(--text-muted)] tracking-tighter">
                             {station.contributor.isAuthor ? 'Authored By:' : 'Tuned By:'}
                           </span>
                           <span className={`text-[9px] font-bold uppercase ${station.contributor.isAuthor ? 'text-blue-500' : 'text-[var(--text-main)]'}`}>
                             {station.contributor.name}
                           </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                           {station.contributor.isAuthor ? (
                             <span title="Verified Original Author">
                               <Award size={14} className="text-blue-500" />
                             </span>
                           ) : (
                             station.contributor.instagram && (
                               <a 
                                 href={station.contributor.instagram} 
                                 target="_blank" 
                                 rel="noopener noreferrer"
                                 onClick={(e) => e.stopPropagation()}
                                 className="text-pink-400 hover:text-pink-600 transition-colors"
                                 title="Visit Contributor Instagram"
                               >
                                 <Instagram size={14} />
                               </a>
                             )
                           )}
                        </div>
                     </div>
                   )}
                </div>
                
                {isActive && (
                  <div className="absolute -bottom-2 -right-2 opacity-20 transform rotate-12">
                     <Zap size={64} className="text-pink-500 fill-pink-500" />
                  </div>
                )}
              </button>

              <a 
                href={station.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="absolute top-2 right-2 p-1 opacity-0 group-hover:opacity-100 hover:text-blue-500 transition-all z-20 bg-[var(--card-bg)]/80 rounded"
                title="Open Channel"
              >
                <ExternalLink size={14} className="theme-text" />
              </a>
            </div>
          );
        })}
      </div>

      <div className="mt-20 p-8 border-4 border-dashed border-[var(--border-main)] rounded-2xl bg-[var(--input-bg)] text-center shadow-[8px_8px_0px_0px_rgba(244,114,182,0.2)]">
        <h3 className="retro-title text-2xl uppercase mb-4 flex items-center justify-center gap-3">
          <UserCheck size={28} className="text-blue-500" /> Contributor Rewards
        </h3>
        <p className="max-w-xl mx-auto text-sm font-medium theme-text-muted mb-8 leading-relaxed">
          Help us shape the soundscape of MoeStation 95. <br/>
          <strong>Recommenders</strong> receive a custom tag and social link. <br/>
          <strong>Official Authors</strong> gain a <span className="text-blue-500 font-black">Verified Archive Page</span> and special recognition.
        </p>
        <Link to="/broadcast#join" className="bg-[var(--border-main)] text-[var(--bg-color)] px-10 py-4 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-pink-500 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
          Submit Transmission Data
        </Link>
      </div>

      <style>{`
        @keyframes wave-bar {
          0%, 100% { height: 20%; }
          50% { height: 100%; }
        }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes neon-pulse {
          0%, 100% { box-shadow: 0 0 30px rgba(244,114,182,0.4), 8px 8px 0px 0px rgba(244,114,182,1); }
          50% { box-shadow: 0 0 50px rgba(244,114,182,0.7), 8px 8px 0px 0px rgba(244,114,182,1); }
        }
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .animate-wave-bar {
          animation: wave-bar 0.6s ease-in-out infinite;
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        .animate-ping-slow {
          animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
        .animate-neon-pulse {
          animation: neon-pulse 2s infinite ease-in-out;
        }
        .animate-scan {
          animation: scan 4s linear infinite;
        }
        .bg-scan-line {
          background: linear-gradient(to bottom, transparent 0%, rgba(244,114,182,0.5) 50%, transparent 100%);
          height: 50%;
          width: 100%;
          position: absolute;
        }
      `}</style>
    </div>
  );
};

export default RadioRoom;
