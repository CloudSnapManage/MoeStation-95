
import React from 'react';
import { ImageIcon, PenTool, Sparkles, Pin, Heart, Share2, Camera, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';

const GALLERY_ITEMS = [
  {
    id: 'g1',
    type: 'sketch',
    title: 'Station After Dusk',
    content: 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?q=80&w=800&h=1000&fit=crop',
    note: 'Found under a bench in Sector 4. The lines feel frantic, almost scared.',
    tags: ['Urban', 'Ink']
  },
  {
    id: 'g2',
    type: 'poem',
    title: 'Code of the Heart',
    content: "My pulse is a binary beat,\nIn the static of a crowded street.\nBetween the neon and the rain,\nI search for warmth to ease the pain.",
    note: 'Scribbled on a napkin from the ramen stall.',
    tags: ['Cyber', 'Romance']
  },
  {
    id: 'g3',
    type: 'sketch',
    title: 'Memory Leak',
    content: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&h=1000&fit=crop',
    note: 'Abstract sketches of data flowing like water.',
    tags: ['Surreal', 'Digital']
  },
  {
    id: 'g4',
    type: 'poem',
    title: 'Sector 7 Silence',
    content: "They told me the city never sleeps,\nBut in the gaps between the sweeps,\nof holographic searchlight eyes,\nA single, quiet shadow lies.",
    note: 'A contribution from a passing traveler.',
    tags: ['Philosophy']
  },
  {
    id: 'g5',
    type: 'sketch',
    title: 'Broken Android',
    content: 'https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?q=80&w=800&h=1000&fit=crop',
    note: 'A study of mechanical fatigue.',
    tags: ['Character', 'Graphite']
  },
  {
    id: 'g6',
    type: 'sketch',
    title: 'Rainy Neon Alley',
    content: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=800&h=1000&fit=crop',
    note: 'A quick charcoal capture of the Shinjuku glow through a downpour.',
    tags: ['Neon', 'Tokyo']
  },
  {
    id: 'g7',
    type: 'poem',
    title: 'Scanline Dreams',
    content: "Phosphor glow against the night,\nFlickering in cathode light.\nHorizontal lines of gray,\nWhere the shadows come to play.",
    note: 'Written on the back of a utility bill.',
    tags: ['CRT', 'Nostalgia']
  },
  {
    id: 'g8',
    type: 'sketch',
    title: 'The Last Walkman',
    content: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=800&h=1000&fit=crop',
    note: 'Detailed technical sketch of a mechanical relic.',
    tags: ['Analog', 'Tech']
  },
  {
    id: 'g9',
    type: 'poem',
    title: 'Magnetic Pulse',
    content: "Clunk-whirr is the sound of time,\nSpinning in a plastic shrine.\nOne point four four megs of soul,\nMaking broken spirits whole.",
    note: 'A rhythmic tribute to the floppy drive.',
    tags: ['FloppyDisk', 'Mechanical']
  },
  {
    id: 'g10',
    type: 'sketch',
    title: 'Midnight Bus',
    content: 'https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?q=80&w=800&h=1000&fit=crop',
    note: 'The last ride to the suburbs. The windows are dithered with condensation.',
    tags: ['Transit', 'Night']
  },
  {
    id: 'g11',
    type: 'poem',
    title: 'BBS Whisper',
    content: "A whisper in the terminal line,\nA ghost within the digital vine.\nI type your name in empty space,\nAnd find a dithered, pixel face.",
    note: 'Found in a text file titled SOUL_DUMP.TXT.',
    tags: ['BBS', 'Terminal']
  },
  {
    id: 'g12',
    type: 'sketch',
    title: 'Dithered Heart',
    content: 'https://images.unsplash.com/photo-1614850523296-e811cf7eeea4?q=80&w=800&h=1000&fit=crop',
    note: 'A study in ordered dithering. Every dot is a heartbeat.',
    tags: ['Dither', 'Symbol']
  }
];

const Gallery: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 animate-in fade-in slide-in-from-bottom-8">
      <div className="mb-16 text-center max-w-2xl mx-auto">
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 mb-4 block flex items-center justify-center gap-2">
           <Sparkles size={16} className="animate-pulse" /> Archive Section: Immersive Gallery
        </span>
        <h1 className="text-5xl md:text-7xl retro-title mb-6 leading-none">THE GALLERY</h1>
        <p className="font-medium text-gray-600 italic">
          Handwritten poetry, found sketches, and visual fragments from the city's edge. 
          A sanctuary where art is felt, not just seen.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 items-start">
        {GALLERY_ITEMS.map((item, index) => (
          <div 
            key={item.id} 
            className={`relative group animate-in fade-in zoom-in duration-700`}
            style={{ animationDelay: `${index * 150}ms` }}
          >
            {/* The "Pinned" Look */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 text-gray-400 group-hover:text-red-500 transition-colors drop-shadow-md">
               <Pin size={24} fill="currentColor" strokeWidth={3} className="rotate-45" />
            </div>

            <div className={`bg-white p-4 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(96,165,250,1)] transition-all duration-300 hover:-translate-y-2 ${index % 2 === 0 ? 'rotate-[-1deg]' : 'rotate-[1deg]'}`}>
              
              {item.type === 'sketch' ? (
                <div className="aspect-[4/5] bg-gray-100 border-2 border-black overflow-hidden mb-4 relative">
                  <img src={item.content} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-white p-1 rounded-sm"><Camera size={14} /></div>
                </div>
              ) : (
                <div className="aspect-[4/5] bg-[#fffef5] border-2 border-black p-8 mb-4 flex flex-col justify-center relative overflow-hidden">
                  <div className="absolute top-4 left-4 text-pink-200 opacity-40"><Quote size={48} /></div>
                  <p className="handwritten text-3xl text-gray-800 leading-tight whitespace-pre-wrap relative z-10">
                    {item.content}
                  </p>
                </div>
              )}

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="font-black uppercase text-sm tracking-widest">{item.title}</h3>
                  <div className="flex gap-2">
                    <Heart size={14} className="cursor-pointer hover:text-pink-500 transition-colors" />
                    <Share2 size={14} className="cursor-pointer hover:text-blue-500 transition-colors" />
                  </div>
                </div>
                
                <p className="text-[10px] text-gray-500 leading-relaxed font-medium italic border-l-2 border-gray-100 pl-3">
                  "{item.note}"
                </p>

                <div className="flex flex-wrap gap-1 pt-2">
                  {item.tags.map(tag => (
                    <span key={tag} className="text-[8px] font-bold uppercase tracking-tighter bg-gray-100 border border-black px-1.5 py-0.5">#{tag}</span>
                  ))}
                </div>
              </div>

              {/* Tape visual decoration */}
              <div className="absolute -top-2 left-4 w-12 h-6 bg-white/40 border-y border-black/10 rotate-12 pointer-events-none"></div>
            </div>
          </div>
        ))}

        {/* Call to action card */}
        <div className="relative group animate-in fade-in zoom-in duration-700 delay-1000">
           <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 text-yellow-500">
               <Pin size={24} fill="currentColor" strokeWidth={3} className="-rotate-12" />
            </div>
            <div className="bg-yellow-50 p-8 border-4 border-black border-dashed shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:bg-white transition-all flex flex-col items-center justify-center text-center h-full min-h-[400px]">
               <Sparkles size={48} className="text-yellow-500 mb-6 animate-pulse" />
               <h3 className="retro-title text-2xl uppercase mb-4">Add your myth</h3>
               <p className="text-xs font-bold text-gray-600 mb-8 leading-relaxed px-4 italic">
                 Send your handwritten poems or sketches directly to our broadcast frequency for inclusion.
               </p>
               <Link to="/broadcast#join" className="bg-black text-white px-8 py-3 font-black uppercase text-xs tracking-widest hover:bg-yellow-400 hover:text-black transition-all border-2 border-black">
                 SUBMIT TO GALLERY
               </Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
