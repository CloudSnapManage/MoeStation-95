
import React, { useState, useEffect, useRef, memo } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { BlogPost } from './types';
import Home from './components/Home';
import PostView from './components/PostView';
import Editor from './components/Editor';
import RadioRoom from './components/RadioRoom';
import Broadcast from './components/Broadcast';
import Gallery from './components/Gallery';
import { 
  PenLine, Github, Instagram, Menu, X, Book, Music, Info, 
  Play, Pause, Volume2, ChevronLeft, ChevronRight, Monitor, 
  Palette, Sun, Moon, Terminal, Sparkles, Image as ImageIcon,
  ArrowRight, Minus, Heart
} from 'lucide-react';

type Theme = 'classic' | 'midnight' | 'terminal' | 'vapor';

const HeartDriveLogo = () => (
  <div className="relative w-10 h-10 group cursor-pointer transition-transform hover:scale-105 active:scale-95">
    {/* The Floppy Disk Body */}
    <div className="absolute inset-0 bg-pink-400 border-2 border-[var(--border-main)] rounded-sm shadow-[2px_2px_0px_0px_var(--shadow-color)] overflow-hidden">
      {/* Notched Corner */}
      <div className="absolute top-0 right-0 w-2 h-2 bg-[var(--bg-color)] border-l-2 border-b-2 border-[var(--border-main)] -translate-x-[-1px] -translate-y-[1px]"></div>
      
      {/* Metal Shutter Area */}
      <div className="absolute top-1 left-2 right-4 h-3 bg-gradient-to-r from-cyan-200 via-white to-purple-200 border border-[var(--border-main)] rounded-sm group-hover:translate-x-1 transition-transform">
        <div className="absolute left-1 top-1/2 -translate-y-1/2 w-4 h-[1px] bg-black/20"></div>
      </div>

      {/* Label Area */}
      <div className="absolute bottom-1 left-1 right-1 h-4 bg-white border border-[var(--border-main)] rounded-[1px] flex items-center justify-center px-0.5">
        <span className="handwritten text-[7px] leading-none text-blue-600 font-bold tracking-tighter truncate">MOE_95</span>
      </div>

      {/* Busy LED */}
      <div className="absolute bottom-1 right-1 w-1 h-1 bg-green-500 rounded-full animate-pulse border-[0.5px] border-black"></div>
    </div>
    {/* Floating Pixel Sparkle */}
    <Sparkles className="absolute -top-1 -right-1 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" size={12} />
  </div>
);

const VideoEmbed = memo(({ trackId, isMuted, mode }: { trackId: string, isMuted: boolean, mode: 'preview' | 'theater' }) => {
  const mutedParam = isMuted ? 1 : 0;
  const controlsParam = mode === 'theater' ? 1 : 0;
  const src = `https://www.youtube-nocookie.com/embed/${trackId}?autoplay=1&mute=${mutedParam}&controls=${controlsParam}&modestbranding=1&enablejsapi=1&origin=${window.location.origin}`;
  
  return (
    <iframe 
      width="100%" 
      height="100%" 
      src={src}
      title="Signal Transmitter" 
      frameBorder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
      className={`w-full h-full transition-all duration-700 ${mode === 'preview' ? 'grayscale-[0.2] contrast-125 pointer-events-none' : ''}`}
    ></iframe>
  );
});

const Navigation: React.FC<{ 
  isMenuOpen: boolean; 
  setIsMenuOpen: (o: boolean) => void;
  isPlaying: boolean;
  toggleRadio: () => void;
  currentTrackName: string;
  theme: Theme;
  setTheme: (t: Theme) => void;
}> = ({ isMenuOpen, setIsMenuOpen, isPlaying, toggleRadio, currentTrackName, theme, setTheme }) => {
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const { pathname } = useLocation();

  const themes: { id: Theme; icon: any; label: string; color: string }[] = [
    { id: 'classic', icon: Sun, label: 'Moe Pink', color: 'bg-pink-400' },
    { id: 'midnight', icon: Moon, label: 'Midnight', color: 'bg-cyan-400' },
    { id: 'terminal', icon: Terminal, label: 'Terminal', color: 'bg-green-500' },
    { id: 'vapor', icon: Sparkles, label: 'Vaporwave', color: 'bg-purple-500' },
  ];

  const NavLink = ({ to, children, icon: Icon }: any) => {
    const active = pathname === to;
    return (
      <Link 
        to={to} 
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all font-bold uppercase tracking-wider text-[10px] md:text-xs ${
          active 
          ? 'bg-[var(--border-main)] text-[var(--bg-color)] shadow-[4px_4px_0px_0px_rgba(244,114,182,1)]' 
          : 'hover:bg-[var(--input-bg)]'
        }`}
      >
        {Icon && <Icon size={14} />}
        {children}
      </Link>
    );
  };

  return (
    <nav className="bg-[var(--card-bg)] border-b-2 border-[var(--border-main)] sticky top-0 z-50 transition-colors duration-500">
      <div className="marquee-container h-8">
        <div className="marquee-content py-1">
          +++ {isPlaying ? `NOW TUNED TO: ${currentTrackName.toUpperCase()}` : 'STATION STANDBY... TUNE IN FOR ATMOSPHERE'} +++ SYNTHETIC MYTHS +++ TINY HEARTBREAKS +++ MOESTATION 95 +++
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 md:h-20 items-center">
          <div className="flex items-center gap-4 md:gap-6">
            <Link to="/" className="flex items-center gap-2 md:gap-3 group">
              <HeartDriveLogo />
              <div className="flex flex-col leading-none">
                <span className="text-lg md:text-xl font-black tracking-tighter retro-title text-[var(--text-main)] group-hover:text-pink-500 transition-colors">MOESTATION</span>
                <span className="hidden sm:inline text-[9px] mono font-bold text-pink-500 tracking-widest uppercase">Narrative_Archives</span>
              </div>
            </Link>
            
            <div className="hidden lg:flex items-center gap-2 ml-4">
              <NavLink to="/">Library</NavLink>
              <NavLink to="/gallery" icon={ImageIcon}>Gallery</NavLink>
              <NavLink to="/radio" icon={Music}>Radio</NavLink>
              <NavLink to="/broadcast" icon={Info}>Info</NavLink>
            </div>
          </div>
          
          <div className="flex items-center gap-2 md:gap-3">
            <div className="relative">
              <button 
                onClick={() => setShowThemeMenu(!showThemeMenu)}
                className="w-9 h-9 md:w-10 md:h-10 border-2 border-[var(--border-main)] rounded-lg hover:opacity-80 transition-all flex items-center justify-center bg-[var(--card-bg)] shadow-[2px_2px_0px_0px_var(--shadow-color)] text-[var(--text-main)]"
              >
                <Palette size={18} />
              </button>
              {showThemeMenu && (
                <div className="absolute top-full right-0 mt-3 w-40 md:w-48 bg-[var(--card-bg)] border-2 border-[var(--border-main)] shadow-[6px_6px_0px_0px_var(--shadow-color)] p-1.5 animate-in slide-in-from-top-2">
                  {themes.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => { setTheme(t.id); setShowThemeMenu(false); }}
                      className={`w-full flex items-center gap-3 px-3 py-2 text-left font-bold uppercase text-[10px] hover:bg-[var(--input-bg)] transition-colors text-[var(--text-main)] ${theme === t.id ? 'bg-[var(--input-bg)]' : ''}`}
                    >
                      <div className={`w-3 h-3 border border-[var(--border-main)] rounded-sm ${t.color}`}></div>
                      {t.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button 
              onClick={toggleRadio}
              className={`flex items-center justify-center gap-2 h-9 md:h-10 px-3 md:px-4 border-2 border-[var(--border-main)] rounded-lg font-black uppercase text-[10px] transition-all ${
                isPlaying 
                ? 'bg-pink-400 text-white shadow-[2px_2px_0px_0px_var(--shadow-color)]' 
                : 'bg-[var(--input-bg)] text-[var(--text-muted)] hover:text-[var(--text-main)]'
              }`}
            >
              {isPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
              <span className="hidden sm:inline">{isPlaying ? 'Live' : 'Signal'}</span>
            </button>

            <Link 
              to="/editor" 
              className="hidden sm:flex items-center gap-2 bg-[var(--border-main)] text-[var(--bg-color)] h-9 md:h-10 px-4 md:px-5 rounded-lg font-bold text-xs uppercase shadow-[3px_3px_0px_0px_rgba(244,114,182,1)] hover:translate-y-[-1px] transition-all active:translate-y-[1px]"
            >
              <PenLine size={16} />
              <span className="hidden md:inline">Tell Tale</span>
            </Link>
            
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-[var(--text-main)]"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="lg:hidden bg-[var(--card-bg)] border-b-2 border-[var(--border-main)] px-4 py-4 space-y-2 animate-in slide-in-from-top-2">
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="block p-3 font-bold uppercase hover:bg-[var(--input-bg)] rounded-lg text-[var(--text-main)]">/ Library</Link>
          <Link to="/gallery" onClick={() => setIsMenuOpen(false)} className="block p-3 font-bold uppercase hover:bg-[var(--input-bg)] rounded-lg text-[var(--text-main)]">/ Gallery</Link>
          <Link to="/radio" onClick={() => setIsMenuOpen(false)} className="block p-3 font-bold uppercase hover:bg-[var(--input-bg)] rounded-lg text-[var(--text-main)]">/ Radio</Link>
          <Link to="/broadcast" onClick={() => setIsMenuOpen(false)} className="block p-3 font-bold uppercase hover:bg-[var(--input-bg)] rounded-lg text-[var(--text-main)]">/ Info</Link>
          <Link to="/editor" onClick={() => setIsMenuOpen(false)} className="block p-3 font-bold uppercase bg-pink-50 text-pink-500 rounded-lg sm:hidden">/ Tell a Tale</Link>
        </div>
      )}
    </nav>
  );
};

const App: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>((localStorage.getItem('moestation_theme') as Theme) || 'classic');
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [needsSync, setNeedsSync] = useState(false);
  const [isDocked, setIsDocked] = useState(window.innerWidth < 768);
  const [dockSide, setDockSide] = useState<'left' | 'right'>('right');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTrack, setCurrentTrack] = useState({ id: 'jfKfPfyJRdk', name: 'Lofi Girl' });
  
  const [position, setPosition] = useState({ 
    x: window.innerWidth - 270, 
    y: window.innerHeight - 240 
  });
  
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const monitorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const body = document.querySelector('body');
    if (body) {
      body.classList.remove('theme-midnight', 'theme-terminal', 'theme-vapor');
      if (theme !== 'classic') {
        body.classList.add(`theme-${theme}`);
      }
    }
    localStorage.setItem('moestation_theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsDocked(true);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('./posts.json');
        if (!response.ok) throw new Error('Failed to load tales registry');
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        const savedPosts = localStorage.getItem('moestation_posts');
        if (savedPosts) {
          setPosts(JSON.parse(savedPosts));
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleDeletePost = (id: string) => {
    const newPosts = posts.filter(p => p.id !== id);
    setPosts(newPosts);
    localStorage.setItem('moestation_posts', JSON.stringify(newPosts));
  };

  const handleSavePost = (post: BlogPost) => {
    const existingIdx = posts.findIndex(p => p.id === post.id);
    let newPosts;
    if (existingIdx > -1) {
      newPosts = [...posts];
      newPosts[existingIdx] = post;
    } else {
      newPosts = [post, ...posts];
    }
    setPosts(newPosts);
    localStorage.setItem('moestation_posts', JSON.stringify(newPosts));
  };

  const toggleRadio = () => {
    const nextState = !isPlaying;
    if (nextState) setNeedsSync(true);
    setIsPlaying(nextState);
  };

  const closeEverything = () => {
    setIsPlaying(false);
    setIsFullscreen(false);
    setIsDocked(false);
    setNeedsSync(false);
  };

  const handleDock = () => {
    const side = position.x + 120 < window.innerWidth / 2 ? 'left' : 'right';
    setDockSide(side);
    setIsDocked(true);
  };

  const changeTrack = (id: string, name: string) => {
    setCurrentTrack({ id, name });
    setIsPlaying(true);
    setNeedsSync(true);
  };

  const getMonitorWrapperStyle = (): React.CSSProperties => {
    if (isFullscreen) return { position: 'fixed', inset: 0, zIndex: 200, display: isPlaying ? 'flex' : 'none' };
    const baseStyle: React.CSSProperties = {
      position: 'fixed', zIndex: 100, top: isDocked ? '50%' : `${position.y}px`,
      transition: isDragging ? 'none' : 'all 0.4s cubic-bezier(0.19, 1, 0.22, 1)',
      display: isPlaying ? 'block' : 'none',
    };
    
    const monitorWidth = window.innerWidth < 640 ? 180 : 240;

    if (isDocked) {
      const offset = window.innerWidth < 640 ? -160 : -215;
      return { 
        ...baseStyle, 
        left: dockSide === 'left' ? `${offset}px` : 'auto', 
        right: dockSide === 'right' ? `${offset}px` : 'auto', 
        transform: 'translateY(-50%)',
        width: `${monitorWidth}px`
      };
    }
    return { ...baseStyle, left: `${position.x}px`, right: 'auto', transform: 'none', width: `${monitorWidth}px` };
  };

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col">
        <Navigation 
          isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} isPlaying={isPlaying}
          toggleRadio={toggleRadio} currentTrackName={currentTrack.name}
          theme={theme} setTheme={setTheme}
        />

        <div 
          ref={monitorRef}
          className={`monitor-root transition-opacity duration-500 ${!isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          style={getMonitorWrapperStyle()}
          onPointerDown={(e) => {
            if (isDocked || isFullscreen) return;
            const target = e.target as HTMLElement;
            if (!target.closest('.drag-handle') || target.closest('button')) return;
            setIsDragging(true);
            setDragOffset({ x: e.clientX - position.x, y: e.clientY - position.y });
            // @ts-ignore
            monitorRef.current?.setPointerCapture(e.pointerId);
          }}
          onPointerMove={(e) => {
            if (!isDragging) return;
            const monitorWidth = window.innerWidth < 640 ? 180 : 240;
            setPosition({ 
              x: Math.max(10, Math.min(e.clientX - dragOffset.x, window.innerWidth - monitorWidth - 10)), 
              y: Math.max(10, Math.min(e.clientY - dragOffset.y, window.innerHeight - 200)) 
            });
          }}
          onPointerUp={() => setIsDragging(false)}
        >
          {!isFullscreen && isDocked && (
            <button 
              onClick={() => setIsDocked(false)}
              className={`absolute top-1/2 -translate-y-1/2 w-7 h-24 md:w-8 md:h-32 bg-pink-400 border-2 border-[var(--border-main)] flex items-center justify-center z-[120] rounded-lg shadow-[3px_3px_0px_0px_var(--shadow-color)] ${dockSide === 'left' ? 'right-[-18px] md:right-[-20px]' : 'left-[-18px] md:left-[-20px]'}`}
            >
               {dockSide === 'left' ? <ChevronRight size={20} className="text-white" /> : <ChevronLeft size={20} className="text-white" />}
            </button>
          )}

          {!isFullscreen && (
            <div className="bg-[var(--card-bg)] border-2 border-[var(--border-main)] shadow-[6px_6px_0px_0px_var(--shadow-color)] w-full overflow-hidden rounded-xl">
              <div className="drag-handle bg-[var(--input-bg)] px-2 py-1.5 flex justify-between items-center border-b-2 border-[var(--border-main)] cursor-grab active:cursor-grabbing select-none">
                <div className="flex items-center gap-1.5">
                  <div className={`w-2 h-2 rounded-full ${needsSync ? 'bg-yellow-400' : 'bg-green-500 animate-pulse'}`}></div>
                  <span className="mono text-[8px] font-black uppercase text-[var(--text-main)] truncate max-w-[60px] md:max-w-none">{needsSync ? 'Sync' : 'Live'}</span>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => setNeedsSync(false)} className="w-5 h-5 flex items-center justify-center bg-yellow-400 border border-[var(--border-main)] rounded-sm"><Volume2 size={10} /></button>
                  <button onClick={handleDock} className="w-5 h-5 flex items-center justify-center bg-[var(--card-bg)] border border-[var(--border-main)] rounded-sm text-[var(--text-main)]"><Minus size={12} /></button>
                  <button onClick={closeEverything} className="w-5 h-5 flex items-center justify-center bg-[var(--card-bg)] border border-[var(--border-main)] rounded-sm text-[var(--text-main)]"><X size={12} /></button>
                </div>
              </div>
              <div className="aspect-video bg-black">
                <VideoEmbed trackId={currentTrack.id} isMuted={needsSync} mode="preview" />
              </div>
              <div className="p-2 bg-pink-50 border-t border-[var(--border-main)] truncate font-bold text-[8px] md:text-[9px] uppercase text-black">{currentTrack.name}</div>
            </div>
          )}

          {isFullscreen && (
            <div className="fixed inset-0 bg-black/95 z-[201] flex flex-col items-center justify-center p-4">
               <div className="w-full max-w-5xl aspect-video bg-black border-4 border-white/10 relative shadow-2xl">
                  <VideoEmbed trackId={currentTrack.id} isMuted={needsSync} mode="theater" />
                  <button onClick={() => setIsFullscreen(false)} className="absolute top-2 right-2 md:top-4 md:right-4 bg-white/20 hover:bg-white/40 p-2 rounded-full text-white backdrop-blur-md transition-all"><X size={20} className="md:w-6 md:h-6" /></button>
               </div>
            </div>
          )}
        </div>

        <main className="flex-grow">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 border-4 border-pink-400 border-t-transparent rounded-full animate-spin"></div>
              <div className="retro-title text-lg md:text-xl uppercase tracking-widest text-pink-500 animate-pulse">Syncing Archives...</div>
            </div>
          ) : (
            <Routes>
              <Route path="/" element={<Home posts={posts} onDelete={handleDeletePost} />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/post/:id" element={<PostView posts={posts} />} />
              <Route path="/editor" element={<Editor onSave={handleSavePost} posts={posts} />} />
              <Route path="/editor/:id" element={<Editor onSave={handleSavePost} posts={posts} />} />
              <Route path="/radio" element={<RadioRoom onSelectTrack={changeTrack} currentTrackId={currentTrack.id} isPlaying={isPlaying} />} />
              <Route path="/broadcast" element={<Broadcast />} />
            </Routes>
          )}
        </main>

        <footer className="bg-[var(--card-bg)] border-t-2 border-[var(--border-main)] py-8 md:py-12 transition-colors duration-500">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center md:items-start gap-2">
              <div className="flex items-center gap-2 font-black text-xl retro-title text-[var(--text-main)]">
                MOESTATION <span className="text-pink-500">95</span>
              </div>
              <p className="text-[10px] mono text-[var(--text-muted)] uppercase tracking-widest">Synthetic Myths & Heartbreaks</p>
            </div>
            
            <div className="flex gap-4 md:gap-6">
              <a href="#" className="p-3 bg-[var(--input-bg)] border-2 border-[var(--border-main)] rounded-xl hover:opacity-80 transition-all shadow-[3px_3px_0px_0px_var(--shadow-color)] text-[var(--text-main)]"><Instagram size={18} className="md:w-5 md:h-5" /></a>
              <a href="https://github.com/CloudSnapManage" target="_blank" rel="noopener noreferrer" className="p-3 bg-[var(--input-bg)] border-2 border-[var(--border-main)] rounded-xl hover:opacity-80 transition-all shadow-[3px_3px_0px_0px_var(--shadow-color)] text-[var(--text-main)]"><Github size={18} className="md:w-5 md:h-5" /></a>
              <Link to="/broadcast" className="p-3 bg-[var(--input-bg)] border-2 border-[var(--border-main)] rounded-xl hover:opacity-80 transition-all shadow-[3px_3px_0px_0px_var(--shadow-color)] text-[var(--text-main)]"><Info size={18} className="md:w-5 md:h-5" /></Link>
            </div>

            <div className="text-[10px] font-bold text-[var(--text-muted)] uppercase text-center md:text-right">
              &copy; 2025 - 2026 Shrijan<br/>
              <Link to="/broadcast" className="underline hover:text-pink-500">TERMS & SUBMISSIONS</Link>
            </div>
          </div>
        </footer>
      </div>
    </HashRouter>
  );
};

export default App;
