
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BlogPost } from '../types';
import { 
  Save, ArrowLeft, Settings, Monitor, RotateCcw, Activity, 
  Upload, Type as TypeIcon, Pen, CheckCircle2, Link as LinkIcon,
  Hash, Image as ImageIcon, FileText, Info, Sparkles
} from 'lucide-react';

interface EditorProps {
  onSave: (post: BlogPost) => void;
  posts?: BlogPost[];
}

const Editor: React.FC<EditorProps> = ({ onSave, posts = [] }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [coverImage, setCoverImage] = useState('https://images.unsplash.com/photo-1542332213-31f87348057f?q=80&w=1200&h=600&fit=crop');
  const [tags, setTags] = useState<string[]>(['Synthetic Myth']);
  const [showExport, setShowExport] = useState(false);
  const [isSavedLocally, setIsSavedLocally] = useState(false);

  useEffect(() => {
    if (id) {
      const existing = posts.find(p => p.id === id);
      if (existing) {
        setTitle(existing.title);
        setContent(existing.content || '');
        setExcerpt(existing.excerpt);
        setCoverImage(existing.coverImage);
        setTags(existing.tags);
      }
    }
  }, [id, posts]);

  const stats = useMemo(() => {
    const trimmed = content.trim();
    const words = trimmed ? trimmed.split(/\s+/).length : 0;
    const chars = content.length;
    return { words, chars };
  }, [content]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setCoverImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!title || !content) return alert('Story requires a title and narrative.');
    const postId = id || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const finalTags = tags.includes('preview') ? tags : [...tags, 'preview'];

    const post: BlogPost = {
      id: postId,
      title: title.toUpperCase(),
      content,
      excerpt: excerpt || (content.length > 160 ? content.substring(0, 160) + '...' : content),
      date: new Date().toISOString().split('T')[0],
      author: 'Storyteller',
      coverImage,
      tags: finalTags,
    };

    onSave(post);
    setIsSavedLocally(true);
    setShowExport(true);
    setTags(finalTags);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const downloadFile = (filename: string, text: string) => {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const jsonStr = JSON.stringify({
    id: id || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    title: title.toUpperCase(),
    excerpt: excerpt || (content.length > 160 ? content.substring(0, 160) + '...' : content),
    date: new Date().toISOString().split('T')[0],
    author: 'Storyteller',
    coverImage,
    tags: tags.includes('preview') ? tags : [...tags, 'preview'],
  }, null, 2);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
        
        {/* Editor Main Section */}
        <div className="flex-grow w-full order-2 lg:order-1">
          <div className="mb-6 md:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <button onClick={() => navigate(-1)} className="font-black uppercase text-[9px] md:text-[10px] tracking-widest flex items-center gap-2 hover:text-pink-500 transition-all text-[var(--text-main)]">
              <ArrowLeft size={16} /> Exit Scriptorium
            </button>
            <button 
              onClick={handleSave}
              className="bg-[var(--border-main)] text-[var(--bg-color)] px-6 md:px-10 py-3 md:py-4 rounded-xl md:rounded-2xl font-black uppercase text-[10px] md:text-xs tracking-widest hover:bg-pink-500 transition-all shadow-[4px_4px_0px_0px_rgba(244,114,182,1)] active:translate-y-0.5 active:shadow-none flex items-center justify-center gap-2"
            >
              {/* Fixed md:size error by using className for responsive sizing */}
              <Save size={16} className="md:w-[18px] md:h-[18px]" /> {id ? 'Compile Update' : 'Compile Story'}
            </button>
          </div>

          {showExport && (
            <div className="mb-8 md:mb-12 bg-[var(--card-bg)] border-2 border-[var(--border-main)] rounded-[1.5rem] md:rounded-[2.5rem] p-5 md:p-8 shadow-[6px_6px_0px_0px_var(--shadow-color)] animate-in slide-in-from-top-4">
              <div className="flex items-center justify-between mb-6 md:mb-8">
                <h2 className="text-lg md:text-xl font-black uppercase flex items-center gap-2 text-[var(--text-main)]">
                  <Activity size={18} className="text-pink-500" /> Compiled_Assets
                </h2>
                <button onClick={() => setShowExport(false)} className="text-[9px] md:text-[10px] font-black uppercase text-[var(--text-muted)] hover:text-[var(--text-main)]">Dismiss</button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between font-black uppercase text-[9px] md:text-[10px] text-[var(--text-muted)]">
                    <span>Registry (JSON)</span>
                    <button onClick={() => downloadFile('post.json', jsonStr)} className="text-pink-500 underline">Get</button>
                  </div>
                  <pre className="bg-[var(--input-bg)] p-4 md:p-6 rounded-xl md:rounded-2xl border-2 border-[var(--border-main)] text-[9px] md:text-[10px] mono overflow-x-auto max-h-40 md:max-h-48 text-[var(--text-main)]">{jsonStr}</pre>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between font-black uppercase text-[9px] md:text-[10px] text-[var(--text-muted)]">
                    <span>Markdown (MD)</span>
                    <button onClick={() => downloadFile('story.md', content)} className="text-blue-500 underline">Get</button>
                  </div>
                  <pre className="bg-[var(--input-bg)] p-4 md:p-6 rounded-xl md:rounded-2xl border-2 border-[var(--border-main)] text-[9px] md:text-[10px] mono overflow-x-auto max-h-40 md:max-h-48 text-[var(--text-main)]">{content}</pre>
                </div>
              </div>
            </div>
          )}

          <div className="bg-[var(--card-bg)] border-2 border-[var(--border-main)] rounded-[2rem] md:rounded-[3rem] shadow-[8px_8px_0px_0px_var(--shadow-color)] md:shadow-[15px_15px_0px_0px_var(--shadow-color)] relative transition-all duration-500 overflow-hidden">
            <div className="bg-[var(--input-bg)] px-5 md:px-8 py-3 border-b-2 border-[var(--border-main)] flex flex-wrap justify-between items-center gap-2">
              <div className="mono text-[8px] md:text-[9px] font-black uppercase tracking-widest text-pink-500 flex items-center gap-1.5 md:gap-2">
                {/* Fixed md:size error by using className for responsive sizing */}
                <Monitor size={10} className="animate-pulse md:w-3 md:h-3" /> Scriptorium_Active
              </div>
              <div className="flex gap-3 md:gap-4 mono text-[8px] md:text-[9px] font-black uppercase text-[var(--text-muted)]">
                <span className="flex items-center gap-1"><FileText size={10} /> {stats.words} W</span>
                <span className="flex items-center gap-1"><Pen size={10} /> {stats.chars} C</span>
              </div>
            </div>
            
            <div className="p-6 md:p-16 space-y-8 md:space-y-10">
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Story Title..."
                className="w-full text-3xl md:text-5xl lg:text-7xl retro-title border-none focus:ring-0 placeholder:text-[var(--text-muted)] opacity-30 md:opacity-20 focus:opacity-100 transition-opacity py-2 md:py-4 bg-transparent uppercase text-[var(--text-main)]"
              />

              <div className="flex flex-wrap gap-4 md:gap-8 border-y border-[var(--input-bg)] py-4 md:py-6">
                 {/* Fixed md:size error by using className for responsive sizing */}
                 <div className="flex items-center gap-1.5 md:gap-2 text-[9px] md:text-[10px] font-black uppercase text-[var(--text-muted)]"><Pen size={12} className="md:w-3.5 md:h-3.5" /> Drafting</div>
                 <div className="flex items-center gap-1.5 md:gap-2 text-[9px] md:text-[10px] font-black uppercase text-[var(--text-muted)]"><TypeIcon size={12} className="md:w-3.5 md:h-3.5" /> Serif</div>
                 {isSavedLocally && <div className="ml-auto text-green-500 text-[9px] md:text-[10px] font-black uppercase flex items-center gap-1"><CheckCircle2 size={12} /> Sync</div>}
              </div>

              <textarea 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Once upon a time in the city..."
                className="w-full min-h-[40vh] md:min-h-[50vh] text-lg md:text-2xl lg:text-3xl story-body border-none focus:ring-0 placeholder:text-[var(--text-muted)] opacity-40 md:opacity-30 focus:opacity-100 transition-opacity resize-none bg-transparent leading-relaxed text-[var(--text-main)] antialiased"
              />
            </div>

            <div className="bg-[var(--input-bg)] px-5 md:px-8 py-2 md:py-3 border-t-2 border-[var(--border-main)] flex justify-center">
               <div className="mono text-[7px] md:text-[8px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-[var(--text-muted)] animate-pulse">
                 Autosave Frequency Locked // Channel 95
               </div>
            </div>
          </div>
        </div>

        {/* Sidebar Panel */}
        <aside className="lg:w-96 w-full space-y-6 md:space-y-8 lg:sticky lg:top-[7.5rem] order-1 lg:order-2">
          <div className="bg-[var(--card-bg)] border-2 border-[var(--border-main)] rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(244,114,182,1)] space-y-6 md:space-y-8 relative overflow-hidden">
            {/* Visual Decoration: Tape */}
            <div className="absolute top-4 -left-6 w-20 md:w-24 h-5 md:h-6 bg-[var(--input-bg)] border-y border-[var(--border-main)] rotate-[-45deg] opacity-30"></div>
            
            <h3 className="font-black uppercase text-xs md:text-sm tracking-widest flex items-center gap-2 border-b-2 border-[var(--input-bg)] pb-3 md:pb-4 text-[var(--text-main)]">
              {/* Fixed md:size error by using className for responsive sizing */}
              <Settings size={16} className="text-pink-500 md:w-[18px] md:h-[18px]" /> Transmission Props
            </h3>
            
            <div className="space-y-3 md:space-y-4">
               {/* Fixed md:size error by using className for responsive sizing */}
               <div className="flex items-center gap-2 text-[8px] md:text-[9px] font-black uppercase text-[var(--text-muted)]">
                 <Info size={10} className="md:w-3 md:h-3" /> Narrative_Teaser
               </div>
               <textarea 
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className="w-full p-3 md:p-4 bg-[var(--input-bg)] border-2 border-[var(--border-main)] rounded-xl md:rounded-2xl text-[10px] md:text-xs h-20 md:h-28 font-bold mono resize-none text-[var(--text-main)] focus:ring-2 focus:ring-pink-400 outline-none transition-all"
                placeholder="Summarize the mystery..."
               />
               <p className="text-[7px] md:text-[8px] mono text-[var(--text-muted)] uppercase text-right">Visible in Archive Grid</p>
            </div>

            <div className="space-y-3 md:space-y-4">
               {/* Fixed md:size error by using className for responsive sizing */}
               <div className="flex items-center gap-2 text-[8px] md:text-[9px] font-black uppercase text-[var(--text-muted)]">
                 <Hash size={10} className="md:w-3 md:h-3" /> Signal_Tags
               </div>
               <div className="relative">
                 <input 
                  type="text" 
                  value={tags.join(', ')}
                  onChange={(e) => setTags(e.target.value.split(',').map(t => t.trim()).filter(t => t !== ''))}
                  className="w-full px-3 md:px-4 py-2 md:py-3 bg-[var(--input-bg)] border-2 border-[var(--border-main)] rounded-lg md:rounded-xl text-[10px] md:text-xs font-bold mono text-[var(--text-main)] focus:ring-2 focus:ring-pink-400 outline-none"
                  placeholder="Cyber, Noir, Urban..."
                 />
                 {/* Fixed md:size error by using className for responsive sizing */}
                 <Sparkles className="absolute right-3 top-1/2 -translate-y-1/2 text-pink-500 opacity-20 md:w-3.5 md:h-3.5" size={12} />
               </div>
               <div className="flex flex-wrap gap-1.5 mt-2">
                  {tags.map(tag => (
                    <span key={tag} className="text-[7px] md:text-[8px] bg-[var(--border-main)] text-[var(--bg-color)] px-1.5 md:px-2 py-0.5 md:py-1 rounded-md font-bold uppercase border border-[var(--bg-color)]">{tag}</span>
                  ))}
               </div>
            </div>

            <div className="pt-4 md:pt-6 border-t-2 border-[var(--input-bg)] space-y-3 md:space-y-4">
                <div className="flex items-center justify-between">
                  {/* Fixed md:size error by using className for responsive sizing */}
                  <div className="flex items-center gap-2 text-[8px] md:text-[9px] font-black uppercase text-[var(--text-muted)]">
                    <ImageIcon size={10} className="md:w-3 md:h-3" /> Broadcast_Art
                  </div>
                  {/* Fixed md:size error by using className for responsive sizing */}
                  <button onClick={() => setCoverImage(`https://picsum.photos/seed/${Date.now()}/800/600`)} className="p-1 md:p-1.5 bg-[var(--input-bg)] border border-[var(--border-main)] rounded-md md:rounded-lg text-[var(--text-main)] hover:bg-pink-500 hover:text-white transition-all shadow-[2px_2px_0px_0px_var(--shadow-color)]" title="Randomize Art"><RotateCcw size={10} className="md:w-3 md:h-3" /></button>
                </div>
                
                <div className="aspect-[16/10] lg:aspect-[4/3] border-2 border-[var(--border-main)] rounded-xl md:rounded-2xl bg-[var(--input-bg)] relative overflow-hidden group shadow-[3px_3px_0px_0px_var(--shadow-color)] md:shadow-[4px_4px_0px_0px_var(--shadow-color)]">
                    <img src={coverImage} className="w-full h-full object-cover grayscale-[0.2] transition-all duration-1000" alt="Preview" />
                    <div className="absolute inset-0 bg-black/40 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity flex items-center justify-center">
                       {/* Fixed md:size error by using className for responsive sizing */}
                       <button onClick={() => fileInputRef.current?.click()} className="bg-white text-black p-2 md:p-3 rounded-full shadow-xl hover:scale-110 transition-transform"><Upload size={16} className="md:w-5 md:h-5" /></button>
                    </div>
                </div>

                <div className="flex gap-2">
                  <div className="relative flex-grow">
                    {/* Fixed md:size error by using className for responsive sizing */}
                    <LinkIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] md:w-3.5 md:h-3.5" size={12} />
                    <input 
                      type="text" 
                      value={coverImage.startsWith('data:') ? '[Local_File]' : coverImage}
                      onChange={(e) => setCoverImage(e.target.value)}
                      placeholder="Art URL..."
                      className="w-full pl-8 md:pl-9 pr-2 md:pr-3 py-2 md:py-2.5 bg-[var(--input-bg)] border border-[var(--border-main)] rounded-lg md:rounded-xl text-[8px] md:text-[10px] mono text-[var(--text-main)] truncate"
                    />
                  </div>
                  <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />
                </div>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
};

export default Editor;
