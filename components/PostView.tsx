
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { BlogPost } from '../types';
import { ChevronLeft, Share2, Heart, Coffee, Info, Loader2, BookOpen, Link as LinkIcon, Check } from 'lucide-react';

interface PostViewProps {
  posts: BlogPost[];
}

const PostView: React.FC<PostViewProps> = ({ posts }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const post = posts.find(p => p.id === id);
  const [content, setContent] = useState<string | null>(post?.content || null);
  const [isLoadingContent, setIsLoadingContent] = useState(!!id && !post?.content);
  const [error, setError] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (id && !content) {
      const fetchContent = async () => {
        try {
          setIsLoadingContent(true);
          const response = await fetch(`./content/${id}.md`);
          if (!response.ok) throw new Error(`Narrative file [${id}.md] missing.`);
          const text = await response.text();
          setContent(text);
          setError(null);
        } catch (err: any) {
          setError(err.message || 'FAILED TO RETRIEVE TALE');
        } finally {
          setIsLoadingContent(false);
        }
      };
      fetchContent();
    }
  }, [id, content]);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-32 text-center animate-in fade-in">
        <h2 className="text-3xl md:text-4xl retro-title mb-8 uppercase text-[var(--text-main)]">Signal Discontinued</h2>
        <button onClick={() => navigate('/')} className="bg-[var(--border-main)] text-[var(--bg-color)] px-8 md:px-10 py-4 rounded-xl font-black uppercase text-xs shadow-[6px_6px_0px_0px_rgba(244,114,182,1)]">Return to Station</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-16 md:pb-32">
      {/* Reading Progress Bar */}
      <div className="fixed top-[4rem] md:top-[5.5rem] left-0 w-full h-1 z-50 pointer-events-none">
        <div className="h-full bg-pink-500 transition-all duration-300" style={{ width: '0%' }}></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 pt-8 md:pt-12">
        <div className="flex justify-between items-center mb-10 md:mb-16">
          <Link to="/" className="inline-flex items-center gap-2 font-black uppercase tracking-widest text-[9px] md:text-[10px] hover:text-pink-500 transition-all group text-[var(--text-main)]">
            <div className="w-8 h-8 border-2 border-[var(--border-main)] rounded-lg flex items-center justify-center bg-[var(--card-bg)] shadow-[2px_2px_0px_0px_var(--shadow-color)] group-hover:opacity-80 transition-colors">
              <ChevronLeft size={16} />
            </div>
            <span className="hidden xs:inline">Exit Archive</span>
          </Link>
          <div className="flex gap-2">
            <button onClick={copyLink} className="flex items-center gap-2 bg-[var(--card-bg)] border-2 border-[var(--border-main)] px-3 md:px-4 py-1.5 md:py-2 rounded-xl text-[9px] md:text-[10px] font-black uppercase shadow-[3px_3px_0px_0px_var(--shadow-color)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all text-[var(--text-main)]">
              {isCopied ? <Check size={14} className="text-green-500" /> : <LinkIcon size={14} />}
              <span>{isCopied ? 'Linked' : 'Copy'}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
          {/* Metadata Panel - Reordered for mobile to be above or below */}
          <div className="lg:col-span-4 space-y-6 md:space-y-8 animate-in slide-in-from-left-4 duration-500 lg:sticky lg:top-32 order-1 lg:order-1">
             <div className="border-2 border-[var(--border-main)] rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden bg-[var(--card-bg)] shadow-[4px_4px_0px_0px_var(--shadow-color)] md:shadow-[8px_8px_0px_0px_var(--shadow-color)] group relative">
                <img src={post.coverImage} className="w-full aspect-[16/9] lg:aspect-[3/4] object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000" />
                <div className="absolute inset-0 bg-pink-500/5 pointer-events-none"></div>
             </div>
             
             <div className="bg-[var(--card-bg)] border-2 border-[var(--border-main)] p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] shadow-[6px_6px_0px_0px_rgba(244,114,182,1)] lg:rotate-[-1deg] transition-colors duration-500">
                <div className="flex items-center gap-2 mb-4 md:mb-6 border-b border-[var(--input-bg)] pb-2">
                  <Info size={14} className="text-pink-500" />
                  <span className="mono text-[9px] md:text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">Log_Entry</span>
                </div>
                <div className="space-y-4 md:space-y-5 font-bold">
                   <div className="flex flex-col">
                      <span className="uppercase text-[8px] text-[var(--text-muted)] tracking-tighter mb-1">Author / Narrator</span>
                      <span className="text-sm bg-[var(--input-bg)] px-3 py-1.5 border border-[var(--border-main)] rounded-lg text-[var(--text-main)] truncate">{post.author}</span>
                   </div>
                   <div className="flex flex-col">
                      <span className="uppercase text-[8px] text-[var(--text-muted)] tracking-tighter mb-1">Log Date</span>
                      <span className="mono text-sm text-[var(--text-main)]">{post.date}</span>
                   </div>
                   <div className="flex items-center gap-3 pt-4 border-t border-[var(--input-bg)]">
                      <button className="flex-grow bg-pink-400 text-white py-2.5 md:py-3 rounded-xl flex items-center justify-center gap-2 font-black text-[10px] md:text-xs uppercase shadow-[2px_2px_0px_0px_var(--shadow-color)] active:shadow-none active:translate-y-0.5 transition-all">
                        <Heart size={14} fill="white" /> Love Story
                      </button>
                      <button className="p-2.5 md:p-3 bg-[var(--card-bg)] border-2 border-[var(--border-main)] rounded-xl hover:opacity-80 shadow-[2px_2px_0px_0px_var(--shadow-color)] text-[var(--text-main)]">
                        {/* Fixed md:size error by using className for responsive sizing */}
                        <Share2 size={16} className="md:w-[18px] md:h-[18px]" />
                      </button>
                   </div>
                </div>
             </div>
          </div>

          {/* Reading Area */}
          <div className="lg:col-span-8 animate-in slide-in-from-bottom-4 duration-700 order-2 lg:order-2">
             <div className="bg-[var(--card-bg)] border-2 border-[var(--border-main)] p-6 md:p-16 lg:p-20 rounded-[2rem] md:rounded-[3rem] shadow-[8px_8px_0px_0px_var(--shadow-color)] md:shadow-[12px_12px_0px_0px_var(--shadow-color)] relative transition-colors duration-500 overflow-hidden">
                <div className="flex flex-wrap gap-2 mb-8 md:mb-10">
                  {post.tags.map(tag => (
                    <span key={tag} className="text-[8px] md:text-[10px] font-black uppercase tracking-widest border-2 border-[var(--border-main)] px-3 md:px-4 py-1 md:py-1.5 bg-blue-400 text-white rounded-full shadow-[2px_2px_0px_0px_var(--shadow-color)] whitespace-nowrap">
                      {tag}
                    </span>
                  ))}
                </div>

                <h1 className="text-3xl md:text-5xl lg:text-7xl retro-title uppercase mb-8 md:mb-16 leading-[1.1] tracking-tighter text-[var(--text-main)]">
                  {post.title}
                </h1>

                <div className="story-body text-lg md:text-xl lg:text-2xl text-[var(--text-main)] leading-[1.7] md:leading-[1.8] space-y-8 md:space-y-10 antialiased">
                   {isLoadingContent ? (
                      <div className="flex flex-col items-center justify-center py-16 md:py-24 opacity-30">
                        {/* Fixed md:size error by using className for responsive sizing */}
                        <Loader2 className="animate-spin mb-4 md:mb-6 text-[var(--text-main)] md:w-12 md:h-12" size={40} />
                        <p className="retro-title text-xs md:text-sm uppercase text-[var(--text-main)]">Accessing Memory...</p>
                      </div>
                   ) : error ? (
                      <div className="bg-red-50 border-2 border-[var(--border-main)] rounded-2xl md:rounded-3xl p-8 md:p-12 text-center shadow-[4px_4px_0px_0px_rgba(239,68,68,1)]">
                        <p className="retro-title text-red-500 text-lg md:text-xl mb-4">Registry Error</p>
                        <p className="mono text-[9px] md:text-[10px] uppercase text-[var(--text-muted)] mb-6 md:mb-8">{error}</p>
                        <Link to="/editor" className="bg-[var(--border-main)] text-[var(--bg-color)] px-6 py-2.5 rounded-lg uppercase text-[10px] font-bold">Compose Tale</Link>
                      </div>
                   ) : (
                      content?.split('\n').filter(p => p.trim() !== '').map((para, i) => (
                        <p 
                           key={i} 
                           className={`relative ${i === 0 ? 'drop-cap italic font-semibold' : ''} animate-in fade-in slide-in-from-bottom-2`}
                           style={{ animationDelay: `${i * 100}ms` }}
                        >
                          {para}
                        </p>
                      ))
                   )}
                </div>

                {!isLoadingContent && !error && (
                  <div className="mt-16 md:mt-24 pt-12 md:pt-16 border-t-2 border-[var(--border-main)] border-dashed flex flex-col items-center gap-4 md:gap-6 group">
                      <div className="flex items-center gap-4 text-pink-500 opacity-20 group-hover:opacity-100 transition-opacity duration-1000">
                         <div className="h-px w-10 md:w-16 bg-current"></div>
                         {/* Fixed md:size error by using className for responsive sizing */}
                         <BookOpen size={20} className="md:w-6 md:h-6" />
                         <div className="h-px w-10 md:w-16 bg-current"></div>
                      </div>
                      <p className="text-[8px] md:text-[10px] font-black uppercase text-[var(--text-muted)] tracking-[0.4em] md:tracking-[0.5em]">End_Of_Transmission</p>
                  </div>
                )}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostView;
