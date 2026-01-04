
import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../types';
import { 
  Trash2, Edit, Heart, Search, ArrowUpRight, 
  SortAsc, SortDesc, Database, Radio, ChevronUp, ChevronDown, Shuffle,
  Activity, Tag, Clock
} from 'lucide-react';

interface HomeProps {
  posts: BlogPost[];
  onDelete: (id: string) => void;
}

const Home: React.FC<HomeProps> = ({ posts, onDelete }) => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'alphabetical'>('newest');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isTagsExpanded, setIsTagsExpanded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('moestation_favorites');
    if (saved) setFavorites(JSON.parse(saved));
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleFavorite = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    const newFavs = favorites.includes(id) ? favorites.filter(f => f !== id) : [...favorites, id];
    setFavorites(newFavs);
    localStorage.setItem('moestation_favorites', JSON.stringify(newFavs));
  };

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    posts.forEach(post => post.tags.forEach(tag => tags.add(tag)));
    return Array.from(tags).sort();
  }, [posts]);

  const filteredAndSortedPosts = useMemo(() => {
    let result = posts.filter(post => {
      const matchesTag = !selectedTag || post.tags.includes(selectedTag);
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTag && matchesSearch;
    });
    switch (sortBy) {
      case 'newest': result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); break;
      case 'oldest': result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()); break;
      case 'alphabetical': result.sort((a, b) => a.title.localeCompare(b.title)); break;
    }
    return result;
  }, [posts, selectedTag, searchQuery, sortBy]);

  // Pinned post logic: Priority for 'the-star-sticker-promise'
  const featuredPost = useMemo(() => {
    const pinned = posts.find(p => p.id === 'the-star-sticker-promise');
    return pinned || posts[0];
  }, [posts]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
      
      {/* Header Section */}
      <header className="mb-10 md:mb-20 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 md:gap-8 animate-in fade-in slide-in-from-left-4">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-600 px-3 py-1 rounded-full mb-4 md:mb-6 font-black text-[9px] md:text-[10px] uppercase tracking-widest">
            <Database size={12} /> Narrative_Archive v95.0
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-8xl retro-title leading-[1] md:leading-[0.9] uppercase mb-4 md:mb-6 text-[var(--text-main)]">Archive<br/>Hub</h1>
          <p className="text-lg md:text-2xl font-bold italic text-[var(--text-muted)] leading-tight">
            Synthetic Myths. Tiny Heartbreaks.<br/>
            <span className="text-pink-500">Pocket-Sized Fiction for the Edge of the City.</span>
          </p>
        </div>
        
        <div className="flex gap-3 md:gap-4 w-full lg:w-auto">
          <div className="flex-grow lg:flex-none bg-[var(--card-bg)] border-2 border-[var(--border-main)] p-3 md:p-4 rounded-2xl shadow-[4px_4px_0px_0px_var(--shadow-color)] flex flex-col transition-colors duration-500">
             <span className="mono text-[8px] md:text-[9px] font-black uppercase text-[var(--text-muted)] mb-1">Registered</span>
             <span className="text-xl md:text-2xl font-black leading-none text-[var(--text-main)]">{posts.length}</span>
          </div>
          <div className="flex-grow lg:flex-none bg-pink-400 border-2 border-[var(--border-main)] p-3 md:p-4 rounded-2xl shadow-[4px_4px_0px_0px_var(--shadow-color)] flex flex-col text-white transition-colors duration-500">
             <span className="mono text-[8px] md:text-[9px] font-black uppercase opacity-70 mb-1">Loved</span>
             <span className="text-xl md:text-2xl font-black leading-none">{favorites.length}</span>
          </div>
        </div>
      </header>

      {/* Featured Transmission */}
      {!selectedTag && !searchQuery && featuredPost && (
        <section className="mb-16 md:mb-24 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="bg-[var(--card-bg)] border-2 border-[var(--border-main)] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden flex flex-col lg:flex-row shadow-[8px_8px_0px_0px_rgba(244,114,182,1)] md:shadow-[12px_12px_0px_0px_rgba(244,114,182,1)] transition-colors duration-500">
            <div className="lg:w-3/5 h-[240px] md:h-[300px] lg:h-[500px] relative group overflow-hidden">
              <img src={featuredPost.coverImage} className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
              <div className="absolute top-4 left-4 md:top-6 md:left-6 bg-black text-white px-3 md:px-4 py-1.5 md:py-2 rounded-lg mono text-[9px] md:text-[10px] font-black flex items-center gap-2 border border-white/20">
                <Activity size={12} className="animate-pulse text-pink-400 md:w-3.5 md:h-3.5" /> BROADCAST_LATEST
              </div>
            </div>
            <div className="lg:w-2/5 p-6 md:p-8 lg:p-16 flex flex-col justify-center bg-[var(--card-bg)] border-t-2 lg:border-t-0 lg:border-l-2 border-[var(--border-main)]">
              <div className="text-[9px] md:text-[10px] mono font-black text-pink-500 mb-4 md:mb-6 tracking-[0.4em] uppercase">Frequency_Locked: 95.8mhz</div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl retro-title mb-4 md:mb-6 uppercase leading-tight text-[var(--text-main)]">{featuredPost.title}</h2>
              <p className="text-[var(--text-muted)] italic mb-6 md:mb-10 text-base md:text-lg leading-relaxed line-clamp-3 md:line-clamp-none">"{featuredPost.excerpt}"</p>
              <Link to={`/post/${featuredPost.id}`} className="bg-[var(--border-main)] text-[var(--bg-color)] px-6 md:px-10 py-4 md:py-5 rounded-xl md:rounded-2xl font-black uppercase tracking-widest hover:bg-pink-500 transition-all text-center flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5">
                Open Transmission <ArrowUpRight size={18} className="md:w-5 md:h-5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Dashboard Toolbar */}
      <div className="sticky top-[4.5rem] md:top-[5.5rem] z-40 mb-10 md:mb-16 bg-[var(--card-bg)] border-2 border-[var(--border-main)] p-3 md:p-4 rounded-2xl md:rounded-3xl shadow-[4px_4px_0px_0px_var(--shadow-color)] flex flex-col md:flex-row gap-3 md:gap-4 transition-colors duration-500">
        <div className="relative flex-grow group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] group-focus-within:text-pink-500 transition-colors md:w-5 md:h-5" size={18} />
          <input 
            type="text" 
            placeholder="SCAN ARCHIVES..." 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
            className="w-full bg-[var(--input-bg)] border-2 border-transparent focus:border-[var(--border-main)] rounded-xl md:rounded-2xl py-3 md:py-3.5 pl-11 md:pl-12 pr-4 outline-none font-bold uppercase text-[10px] md:text-xs transition-all text-[var(--text-main)]" 
          />
        </div>
        <div className="flex gap-2">
           <button 
            onClick={() => {
              const random = posts[Math.floor(Math.random() * posts.length)];
              if (random) window.location.hash = `#/post/${random.id}`;
            }} 
            className="w-12 md:w-14 h-11 md:h-auto bg-[var(--card-bg)] border-2 border-[var(--border-main)] rounded-xl md:rounded-2xl flex items-center justify-center hover:bg-[var(--input-bg)] transition-colors shadow-[2px_2px_0px_0px_var(--shadow-color)] text-[var(--text-main)]"
            title="Random Selection"
           >
             <Shuffle size={18} className="md:w-5 md:h-5" />
           </button>
           <div className="flex bg-[var(--input-bg)] p-1 rounded-xl md:rounded-2xl border-2 border-[var(--border-main)]">
              {[{ id: 'newest', icon: SortDesc, label: 'New' }, { id: 'alphabetical', icon: SortAsc, label: 'A-Z' }].map(opt => (
                <button 
                  key={opt.id} 
                  onClick={() => setSortBy(opt.id as any)} 
                  className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl flex items-center gap-1.5 md:gap-2 font-black uppercase text-[9px] md:text-[10px] transition-all ${sortBy === opt.id ? 'bg-[var(--border-main)] text-[var(--bg-color)]' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'}`}
                >
                  <opt.icon size={12} className="md:w-3.5 md:h-3.5" /> {opt.label}
                </button>
              ))}
           </div>
        </div>
      </div>

      {/* Tag Filtering with "More" Toggle */}
      <div className="mb-10 md:mb-16">
        <div 
          className={`flex flex-wrap gap-2 transition-all duration-500 ease-in-out overflow-hidden ${
            isTagsExpanded ? 'max-h-[1000px]' : 'max-h-[82px] md:max-h-[102px]'
          }`}
        >
          <button 
            onClick={() => setSelectedTag(null)} 
            className={`px-4 md:px-5 py-2 md:py-2.5 rounded-full border-2 border-[var(--border-main)] font-black uppercase text-[9px] md:text-[10px] transition-all whitespace-nowrap h-fit ${!selectedTag ? 'bg-pink-400 text-white shadow-[3px_3px_0px_0px_var(--shadow-color)]' : 'bg-[var(--card-bg)] text-[var(--text-muted)] hover:border-pink-400 text-[var(--text-main)]'}`}
          >
            All_Registry
          </button>
          {allTags.map(tag => (
            <button 
              key={tag} 
              onClick={() => setSelectedTag(tag)} 
              className={`px-4 md:px-5 py-2 md:py-2.5 rounded-full border-2 border-[var(--border-main)] font-black uppercase text-[9px] md:text-[10px] transition-all whitespace-nowrap h-fit ${selectedTag === tag ? 'bg-[var(--border-main)] text-[var(--bg-color)] shadow-[3px_3px_0px_0px_var(--shadow-color)]' : 'bg-[var(--card-bg)] text-[var(--text-muted)] hover:border-[var(--border-main)] hover:text-[var(--text-main)]'}`}
            >
              #{tag}
            </button>
          ))}
        </div>
        
        {allTags.length > 5 && (
          <div className="flex justify-center mt-4">
            <button 
              onClick={() => setIsTagsExpanded(!isTagsExpanded)}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-[var(--input-bg)] border-2 border-[var(--border-main)] rounded-full font-black uppercase text-[8px] md:text-[9px] text-pink-500 hover:text-[var(--text-main)] transition-all shadow-[2px_2px_0px_0px_var(--shadow-color)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
            >
              {isTagsExpanded ? (
                <>Less Archives <ChevronUp size={12} /></>
              ) : (
                <>More Archives <ChevronDown size={12} /></>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
        {filteredAndSortedPosts.map((post, index) => {
          const isFavorite = favorites.includes(post.id);
          return (
            <article 
              key={post.id} 
              className="group animate-in fade-in zoom-in duration-500 h-full" 
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="bg-[var(--card-bg)] border-2 border-[var(--border-main)] rounded-[1.5rem] md:rounded-[2.5rem] h-full flex flex-col relative overflow-hidden shadow-[4px_4px_0px_0px_var(--shadow-color)] hover:shadow-[8px_8px_0px_0px_rgba(244,114,182,1)] md:group-hover:-translate-y-1 transition-all duration-300">
                <Link to={`/post/${post.id}`} className="block relative aspect-[16/10] sm:aspect-[4/3] overflow-hidden bg-black border-b-2 border-[var(--border-main)]">
                  <img src={post.coverImage} className="w-full h-full object-cover grayscale-[0.4] group-hover:grayscale-0 group-hover:scale-110 opacity-80 transition-all duration-700" />
                  <div className="absolute top-3 left-3 bg-[var(--card-bg)] border border-[var(--border-main)] rounded-md px-1.5 py-0.5 font-bold text-[7px] md:text-[8px] uppercase tracking-tighter shadow-[2px_2px_0px_0px_var(--shadow-color)] text-[var(--text-main)]">ID_95_{index+1}</div>
                </Link>
                <div className="p-5 md:p-8 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-4 md:mb-6">
                    <div className="flex items-center gap-1.5 text-[8px] md:text-[9px] font-black uppercase text-pink-500 truncate max-w-[70%]">
                      <Tag size={10} className="md:w-3 md:h-3" /> {post.tags[0]}
                    </div>
                    <button 
                      onClick={(e) => toggleFavorite(e, post.id)} 
                      className={`w-8 h-8 md:w-10 md:h-10 border-2 border-[var(--border-main)] rounded-full flex items-center justify-center transition-all ${isFavorite ? 'bg-pink-400 text-white shadow-[2px_2px_0px_0px_var(--shadow-color)]' : 'bg-[var(--input-bg)] text-[var(--text-muted)] hover:text-pink-300'}`}
                    >
                      <Heart size={14} className="md:w-4 md:h-4" fill={isFavorite ? "currentColor" : "none"} />
                    </button>
                  </div>
                  <Link to={`/post/${post.id}`} className="block mb-2 md:mb-4">
                    <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight leading-tight group-hover:text-pink-500 transition-colors text-[var(--text-main)] line-clamp-2">{post.title}</h3>
                  </Link>
                  <p className="text-xs md:text-sm text-[var(--text-muted)] italic mb-6 md:mb-8 line-clamp-2 leading-relaxed">"{post.excerpt}"</p>
                  
                  <div className="mt-auto pt-4 md:pt-6 border-t border-[var(--input-bg)] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-[var(--input-bg)] border border-[var(--border-main)] flex items-center justify-center"><Clock size={10} className="text-[var(--text-muted)] md:w-3 md:h-3" /></div>
                      <span className="mono text-[8px] md:text-[10px] font-black uppercase text-[var(--text-muted)]">{post.date.replace(/-/g, '.')}</span>
                    </div>
                    <div className="flex gap-1.5 md:gap-2 opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity">
                      <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg border border-[var(--border-main)] flex items-center justify-center text-[var(--text-main)]"><Edit size={12} className="md:w-3.5 md:h-3.5" /></div>
                      <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg border border-[var(--border-main)] flex items-center justify-center text-[var(--text-main)]"><Trash2 size={12} className="md:w-3.5 md:h-3.5" /></div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {filteredAndSortedPosts.length === 0 && (
        <div className="text-center py-24 md:py-32 animate-in zoom-in">
           <div className="w-16 h-16 md:w-20 md:h-20 bg-[var(--input-bg)] border-2 border-[var(--border-main)] rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8">
             <Radio size={28} className="text-[var(--text-muted)] md:w-8 md:h-8" />
           </div>
           <h3 className="retro-title text-2xl md:text-3xl uppercase mb-3 md:mb-4 text-[var(--text-main)]">No Signal Found</h3>
           <p className="font-bold text-[var(--text-muted)] uppercase text-[10px] md:text-xs mb-6 md:mb-8 tracking-widest">Recalibrate filters to discover more myths.</p>
           <button onClick={() => { setSelectedTag(null); setSearchQuery(''); }} className="bg-[var(--border-main)] text-[var(--bg-color)] px-6 md:px-8 py-2.5 md:py-3 rounded-lg md:rounded-xl font-black uppercase text-[10px] md:text-xs">Reset All Filters</button>
        </div>
      )}

      {showScrollTop && (
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 w-12 h-12 md:w-14 md:h-14 bg-[var(--border-main)] text-[var(--bg-color)] border-2 border-[var(--border-main)] rounded-xl md:rounded-2xl shadow-[4px_4px_0px_0px_rgba(244,114,182,1)] flex items-center justify-center hover:-translate-y-1 transition-all z-50 animate-in fade-in slide-in-from-bottom-4"
        >
          <ChevronUp size={20} className="md:w-6 md:h-6" strokeWidth={3} />
        </button>
      )}
    </div>
  );
};

export default Home;
