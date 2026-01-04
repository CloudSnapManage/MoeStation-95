
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ArrowLeft, ExternalLink, Music, Youtube, Heart, Info, Send, 
  FileText, UserCheck, ShieldAlert, Sparkles, Bug, Github, 
  Terminal, Code2, Lock, AlertOctagon, Scale, Globe, PlusCircle, Radio, Headset,
  Instagram, UserPlus, Award
} from 'lucide-react';

const MUSIC_CREDITS = [
  { name: 'Lofi Girl', station: 'lofi hip hop radio 📚', url: 'https://www.youtube.com/watch?v=jfKfPfyJRdk' },
  { name: 'Night Tempo', station: 'Japanese City Pop 80s', url: 'https://www.youtube.com/watch?v=Rh7u_cbAiZc' },
  { name: 'Chillhop Music', station: 'Chillhop Raccoon', url: 'https://www.youtube.com/watch?v=5yx6BWlEVcY' },
];

const Broadcast: React.FC = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash === '#join') {
      const element = document.getElementById('join');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hash]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 animate-in fade-in slide-in-from-top-4">
      <Link to="/" className="inline-flex items-center gap-2 mb-12 font-black uppercase text-sm hover:text-pink-500 transition-all hover:-translate-x-1 text-[var(--text-main)]">
        <ArrowLeft size={18} /> Back to Library
      </Link>

      <div className="bg-[var(--card-bg)] border-4 border-[var(--border-main)] p-8 md:p-12 shadow-[12px_12px_0px_0px_var(--shadow-color)] relative overflow-hidden transition-colors duration-500">
        <div className="absolute top-0 right-0 p-4 border-l-2 border-b-2 border-[var(--border-main)] bg-yellow-100 text-black text-[10px] font-black uppercase mono tracking-tighter">
          FREQUENCY ID: 95-BROADCAST
        </div>

        <h1 className="text-4xl md:text-7xl retro-title uppercase mb-8 leading-none text-[var(--text-main)]">THE BROADCAST</h1>
        
        <div className="prose max-w-none space-y-16">
          <section>
            <h2 className="text-2xl font-black uppercase tracking-tight mb-4 flex items-center gap-2 text-[var(--text-main)]">
              <Sparkles className="text-pink-500" /> Digital Anthology
            </h2>
            <p className="text-[var(--text-muted)] font-medium leading-relaxed italic border-l-4 border-pink-400 pl-4 text-lg">
              Welcome to the archives. Short stories from the edge of the city, synthetic myths, and tiny heartbreaks. 📼
            </p>
            <p className="text-[var(--text-muted)] font-medium leading-relaxed mt-4">
              MOE TALES is a community-driven storytelling sanctuary. While we preserve the aesthetic of 1995, we operate on a modern pulse—gathering fragmented narratives and visual artifacts from creators across the signal.
            </p>
          </section>

          {/* Music Transmission Request Section */}
          <section className="bg-purple-50 border-2 border-[var(--border-main)] p-8 shadow-[6px_6px_0px_0px_rgba(168,85,247,1)]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-2 text-purple-900">
                  <Radio className="text-purple-600" /> Music Transmission Request
                </h2>
                <p className="text-[10px] font-black uppercase text-purple-700 mt-1 tracking-widest">Expand the Radio Room Frequency</p>
              </div>
              <div className="bg-purple-900 text-white px-4 py-2 rounded-lg font-bold text-[10px] uppercase flex items-center gap-2">
                <PlusCircle size={14} /> Suggest Track
              </div>
            </div>

            <p className="text-sm font-medium text-purple-900 mb-8 leading-relaxed">
              Our Radio Room runs on collective nostalgia. If you have a track that fits our lo-fi, synthwave, or city-pop aesthetic, send us a recommendation. To be compatible, the music <strong>must be hostable via a YouTube Iframe.</strong>
            </p>

            <div className="bg-white/80 border border-purple-200 p-6 rounded-2xl shadow-sm mb-8">
              <p className="text-[10px] font-black uppercase text-purple-500 mb-4 tracking-[0.2em]">Required Metadata for Submission:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase text-purple-900 flex items-center gap-1"><Youtube size={10} /> Basic Link</p>
                  <p className="text-[9px] text-purple-600 font-bold">YouTube URL & Official Track Title.</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase text-purple-900 flex items-center gap-1"><UserPlus size={10} /> Contributor Credit</p>
                  <p className="text-[9px] text-purple-600 font-bold">Your Name/Handle & Instagram URL.</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase text-purple-900 flex items-center gap-1"><Award size={10} /> Identity Status</p>
                  <p className="text-[9px] text-purple-600 font-bold">Are you the Official Author or a Recommender?</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase text-purple-900 flex items-center gap-1"><FileText size={10} /> Atmosphere</p>
                  <p className="text-[9px] text-purple-600 font-bold">One line on why it fits the MoeStation vibe.</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="p-4 bg-white border border-purple-200 rounded-xl">
                <p className="text-[10px] font-black uppercase text-purple-900 mb-2 flex items-center gap-2"><Award size={14} className="text-blue-500" /> For Official Authors</p>
                <p className="text-[9px] text-purple-700 leading-relaxed font-bold">
                  If you are the original artist, singer, or producer, you can request a <strong>Special Archive Page</strong> dedicated to your work. Mention "AUTHOR_PAGE_REQ" in your email.
                </p>
              </div>
              <div className="p-4 bg-white border border-purple-200 rounded-xl">
                <p className="text-[10px] font-black uppercase text-purple-900 mb-2 flex items-center gap-2"><Instagram size={14} className="text-pink-500" /> For Signal Recommenders</p>
                <p className="text-[9px] text-purple-700 leading-relaxed font-bold">
                  Your handle will be featured on the track card with an Instagram link icon, allowing other listeners to follow your social feed.
                </p>
              </div>
            </div>

            <div className="bg-white border-2 border-purple-900 border-dashed p-6 text-center">
              <p className="font-black uppercase text-xs mb-2 text-purple-900">Send Music Recommendations To:</p>
              <p className="text-purple-700 font-bold underline mb-2 text-lg">story.moetales@gmail.com</p>
              <p className="text-[9px] text-purple-400 font-medium uppercase italic">Include "RADIO_REQ" in the subject line. Contributors will be credited in the Radio Room.</p>
            </div>
          </section>

          {/* Bug Bounty & Patch Submission */}
          <section className="bg-emerald-50 border-2 border-[var(--border-main)] p-8 shadow-[6px_6px_0px_0px_rgba(16,185,129,1)]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-2 text-emerald-900">
                  <Bug className="text-emerald-600" /> Bug Bounty // Fix Submission
                </h2>
                <p className="text-[10px] font-black uppercase text-emerald-700 mt-1 tracking-widest">Signal Interference Detection & Patching</p>
              </div>
              <div className="bg-emerald-900 text-white px-4 py-2 rounded-lg font-bold text-[10px] uppercase flex items-center gap-2">
                <Github size={14} /> Contributor Rewards
              </div>
            </div>

            <p className="text-sm font-medium text-emerald-900 mb-8 leading-relaxed">
              Help us maintain the purity of the MoeStation stream. We encourage users to not only report glitches but to provide <strong>Fix Transmissions</strong> (Code Patches). Verified bug hunters and patch contributors will be permanently listed as <strong>Contributors</strong> in the official repository.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {[
                { label: 'UI/UX Patches', desc: 'Fix visual misalignments or CSS overflows.', icon: Sparkles },
                { label: 'Logic Fixes', desc: 'Repair broken navigation, buttons, or state.', icon: Code2 },
                { label: 'Asset Corruption', desc: 'Report or fix missing metadata and images.', icon: FileText },
                { label: 'Optimization', desc: 'Performance patches for smoother playback.', icon: Terminal }
              ].map((cat, idx) => (
                <div key={idx} className="bg-white/80 border border-emerald-200 p-4 rounded-xl flex items-start gap-3 shadow-sm">
                  <div className="mt-1 p-1 bg-emerald-100 rounded text-emerald-700"><cat.icon size={14} /></div>
                  <div>
                    <p className="font-black uppercase text-[10px] text-emerald-900 mb-0.5">{cat.label}</p>
                    <p className="text-[10px] text-emerald-700 leading-tight">{cat.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white border-2 border-emerald-900 border-dashed p-6 text-center">
              <p className="font-black uppercase text-xs mb-2 text-emerald-900">Send Fixes & Reports To:</p>
              <p className="text-emerald-700 font-bold underline mb-4 text-lg">story.moetales@gmail.com</p>
              <p className="text-[9px] text-emerald-500 font-medium uppercase italic">Include "BUG_FIX" in the subject line for priority review.</p>
            </div>
          </section>

          {/* License & Legal Section */}
          <section className="bg-red-50 border-2 border-[var(--border-main)] p-8 shadow-[6px_6px_0px_0px_rgba(239,68,68,1)]">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-red-100 text-red-600 rounded-2xl"><Scale size={24} /></div>
              <div>
                <h2 className="text-2xl font-black uppercase tracking-tight text-red-900">Proprietary Signal License</h2>
                <p className="text-[10px] font-black uppercase text-red-700 tracking-widest">© 2025-2026 Srijan // All Rights Reserved</p>
              </div>
            </div>

            <div className="space-y-6 text-red-900">
              <div className="border-l-4 border-red-500 pl-4">
                <p className="text-sm font-bold uppercase mb-2 flex items-center gap-2"><UserCheck size={14} /> Limited Personal License</p>
                <p className="text-xs leading-relaxed opacity-80">
                  Users are granted a non-exclusive, non-transferable license to use this software solely for <strong>personal, non-commercial purposes</strong> within their own private environment.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <p className="text-[10px] font-black uppercase tracking-widest text-red-500 flex items-center gap-2"><Globe size={12} /> Permissions</p>
                  <ul className="text-[11px] space-y-1.5 font-bold list-disc pl-4 opacity-80">
                    <li>Clone and run on your personal local machine.</li>
                    <li>Use for private study or portfolio viewing.</li>
                    <li>Host on a private, local network (not public-facing).</li>
                    <li>Study the source for inspiration to build unique, non-similar projects.</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <p className="text-[10px] font-black uppercase tracking-widest text-red-500 flex items-center gap-2"><AlertOctagon size={12} /> Restrictions</p>
                  <ul className="text-[11px] space-y-1.5 font-bold list-disc pl-4 opacity-80">
                    <li className="text-red-600">STRICTLY NO PUBLIC DEPLOYMENT (GitHub Pages, Vercel, Netlify, etc).</li>
                    <li>NO COMMERCIAL USE or revenue generation.</li>
                    <li>NO REDISTRIBUTION of source code or modified versions.</li>
                    <li>NO PUBLIC HOSTING accessible to the general public.</li>
                  </ul>
                </div>
              </div>

              <div className="bg-red-900 text-white p-5 rounded-xl flex items-start gap-4">
                <ShieldAlert className="flex-shrink-0 mt-1" size={20} />
                <div className="space-y-2">
                  <p className="font-black uppercase text-[10px] tracking-widest">Notice of Enforcement</p>
                  <p className="text-[10px] leading-relaxed opacity-90">
                    Unauthorized public hosting or commercial use is strictly prohibited. Violations will result in immediate <strong>DMCA filings</strong> and legal notices. If you wish to redistribute or use these files for other purposes, you <strong>must</strong> request explicit written permission.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section id="join" className="bg-gray-50 border-2 border-[var(--border-main)] p-8 shadow-[6px_6px_0px_0px_var(--shadow-color)] scroll-mt-24">
            <h2 className="text-2xl font-black uppercase tracking-tight mb-6 flex items-center gap-2 text-[var(--text-main)]">
              <Send className="text-blue-500" /> Join the Broadcast
            </h2>
            <p className="text-xs font-black uppercase mb-8 opacity-60">Submissions Process // Cycle_95</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-black text-white flex-shrink-0 flex items-center justify-center font-black">1</div>
                <div>
                  <p className="font-black uppercase text-[10px] mb-1">Write / Compile</p>
                  <p className="text-[10px] text-gray-500 font-bold uppercase">Draft stories in the editor or prepare bug patches.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-black text-white flex-shrink-0 flex items-center justify-center font-black">2</div>
                <div>
                  <p className="font-black uppercase text-[10px] mb-1">Tune / Suggest</p>
                  <p className="text-[10px] text-gray-500 font-bold uppercase">Gather music URLs or bug reproduction steps.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-black text-white flex-shrink-0 flex items-center justify-center font-black">3</div>
                <div>
                  <p className="font-black uppercase text-[10px] mb-1">Package</p>
                  <p className="text-[10px] text-gray-500 font-bold uppercase">Ensure all metadata and descriptions are clear.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-black text-white flex-shrink-0 flex items-center justify-center font-black">4</div>
                <div>
                  <p className="font-black uppercase text-[10px] mb-1">Dispatch</p>
                  <p className="text-[10px] text-gray-500 font-bold uppercase underline">Email: story.moetales@gmail.com</p>
                </div>
              </div>
            </div>
          </section>

          <section className="pt-12 border-t-4 border-double border-[var(--border-main)]">
            <h2 className="text-2xl font-black uppercase tracking-tight mb-6 flex items-center gap-2 text-[var(--text-main)]">
              <Music className="text-purple-500" /> Atmosphere Credits
            </h2>
            <div className="space-y-4">
              {MUSIC_CREDITS.map(m => (
                <div key={m.name} className="flex justify-between items-center text-sm font-bold border-b border-[var(--border-main)] pb-2 group">
                  <span className="group-hover:text-purple-500 transition-colors text-[var(--text-main)]">{m.name} // {m.station}</span>
                  <a href={m.url} target="_blank" className="hover:scale-110 transition-transform text-[var(--text-main)]"><Youtube size={16} /></a>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-20 text-center flex flex-col items-center gap-4">
           <Link to="/" className="bg-[var(--border-main)] text-[var(--bg-color)] px-12 py-4 font-black uppercase tracking-widest hover:bg-pink-500 inline-block shadow-[6px_6px_0px_0px_var(--shadow-color)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
              RE-ENTER ARCHIVES
           </Link>
           <p className="text-[9px] font-black uppercase text-[var(--text-muted)] tracking-widest">Signal Authorized for Private Use Only</p>
        </div>
      </div>
    </div>
  );
};

export default Broadcast;
