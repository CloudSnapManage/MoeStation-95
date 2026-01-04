
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Music, Youtube, Heart, Info } from 'lucide-react';

const MUSIC_CREDITS = [
  {
    name: 'Lofi Girl',
    station: 'lofi hip hop radio 📚 beats to relax/study to',
    url: 'https://www.youtube.com/watch?v=jfKfPfyJRdk',
    description: 'The iconic lofi hip hop station for focus and chill vibes.'
  },
  {
    name: 'Night Tempo / Various Artists',
    station: 'Japanese City Pop (80s Nostalgic Groove)',
    url: 'https://www.youtube.com/watch?v=Rh7u_cbAiZc',
    description: 'Nostalgic rhythms from the golden age of Japanese synth-pop.'
  },
  {
    name: 'Chillhop Music',
    station: 'Chillhop Raccoon (Groovy Jazz Hop Beats)',
    url: 'https://www.youtube.com/watch?v=5yx6BWlEVcY',
    description: 'Relaxing jazz-infused hip hop beats featuring the chillhop raccoon.'
  },
  {
    name: 'Electronic Gems / Various Artists',
    station: 'Midnight Synthwave (Drive through the neon night)',
    url: 'https://www.youtube.com/watch?v=B_Anx8cd9iU',
    description: 'Retrowave and synthwave tracks for atmospheric late-night drives.'
  },
  {
    name: 'The Soul of Wind',
    station: 'Rainy Night Lofi (Soft piano and rainfall)',
    url: 'https://www.youtube.com/watch?v=eKO9BGdQ7Wk',
    description: 'Peaceful piano melodies combined with the soothing sound of rain.'
  },
  {
    name: 'Space Lofi',
    station: 'Space Lofi (Ambient signals from orbit)',
    url: 'https://www.youtube.com/watch?v=TPWYQ94Ief4',
    description: 'Intergalactic ambient beats and space-themed lo-fi frequencies.'
  }
];

const Credits: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 animate-in fade-in slide-in-from-top-4">
      <Link to="/radio" className="inline-flex items-center gap-2 mb-12 font-black uppercase text-sm hover:text-pink-500 transition-all hover:-translate-x-1">
        <ArrowLeft size={18} /> Back to Radio
      </Link>

      <div className="bg-white border-4 border-black p-8 md:p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 border-l-2 border-b-2 border-black bg-pink-100 text-[10px] font-black uppercase mono tracking-tighter">
          REGISTRY ID: 95-CREDITS
        </div>

        <h1 className="text-4xl md:text-6xl retro-title uppercase mb-8">Credits & <br /> <span className="text-blue-500">Acknowledgements</span></h1>
        
        <p className="text-gray-600 font-medium leading-relaxed mb-12 italic border-l-4 border-pink-400 pl-4">
          MoeStation 95 is a community-driven storytelling platform. We believe in honoring the creators who provide the atmosphere for our tales. All music is streamed via YouTube to ensure artists receive their rightful views and support.
        </p>

        <section className="space-y-12">
          <div>
            <h2 className="text-2xl font-black uppercase tracking-tight mb-6 flex items-center gap-3">
              <Music className="text-pink-500" /> Music Used
            </h2>
            <div className="grid gap-6">
              {MUSIC_CREDITS.map((credit, i) => (
                <div key={i} className="group border-2 border-black p-4 bg-gray-50 hover:bg-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold uppercase text-lg group-hover:text-pink-500 transition-colors">{credit.name}</h3>
                    <a 
                      href={credit.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="p-2 bg-black text-white hover:bg-blue-500 transition-colors"
                      title="Open on YouTube"
                    >
                      <Youtube size={16} />
                    </a>
                  </div>
                  <p className="text-xs font-black text-blue-500 uppercase tracking-widest mb-2">{credit.station}</p>
                  <p className="text-sm text-gray-500 font-medium mb-4">{credit.description}</p>
                  <a 
                    href={credit.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-1 text-[10px] font-black uppercase underline hover:text-pink-500"
                  >
                    Original Link <ExternalLink size={10} />
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-12 border-t-2 border-dashed border-gray-200">
             <h2 className="text-2xl font-black uppercase tracking-tight mb-6 flex items-center gap-3">
                <Heart className="text-red-500" /> Platform Assets
             </h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm font-medium">
                <div className="space-y-2">
                   <p className="font-bold uppercase text-[10px] text-gray-400 tracking-widest">Iconography</p>
                   <p>Lucide React — Beautifully crafted, flexible icons for the retro-web.</p>
                </div>
                <div className="space-y-2">
                   <p className="font-bold uppercase text-[10px] text-gray-400 tracking-widest">Typography</p>
                   <p>Google Fonts: Dela Gothic One, Outfit, Space Mono, and Cormorant Garamond.</p>
                </div>
                <div className="space-y-2">
                   <p className="font-bold uppercase text-[10px] text-gray-400 tracking-widest">Photography</p>
                   <p>Unsplash — High-quality atmospheric imagery for story covers.</p>
                </div>
                <div className="space-y-2">
                   <p className="font-bold uppercase text-[10px] text-gray-400 tracking-widest">Inspiration</p>
                   <p>Lo-fi culture, 90s anime aesthetics, and the golden age of the personal web.</p>
                </div>
             </div>
          </div>
        </section>

        <div className="mt-16 text-center">
           <Link to="/" className="retro-btn bg-black text-white px-8 py-3 font-black uppercase tracking-widest hover:bg-pink-500 inline-block">
              Return to Archives
           </Link>
        </div>
      </div>
    </div>
  );
};

export default Credits;
