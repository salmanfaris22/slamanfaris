import { useRef, useState, useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ArrowLeft, ArrowRight, X, Plus } from 'lucide-react';
import { projects, type Category, type Project } from '../data/portfolio';

export default function ProjectGallery() {
  const [category, setCategory] = useState<Category>('All work');
  const [selected, setSelected] = useState<Project | null>(null);
  const [closing, setClosing] = useState(false);
  const navigateToContact = useRef(false);
  const rail = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();
  const visible = projects.filter(p => category === 'All work' || p.category === category);
  const close = () => setClosing(true);
  useEffect(() => {
    if (!selected) return;
    const el = dialog.current;
    if (!el) return;
    lastFocus.current = document.activeElement as HTMLElement;
    el.showModal();
    document.documentElement.classList.add('modal-open');
    window.dispatchEvent(new CustomEvent('portfolio:modal', { detail: true }));
    return () => {
      el.close();
      document.documentElement.classList.remove('modal-open');
      window.dispatchEvent(new CustomEvent('portfolio:modal', { detail: false }));
      if (navigateToContact.current) {
        navigateToContact.current = false;
        window.location.hash = 'contact';
        const heading = document.querySelector<HTMLElement>('#contact-title');
        heading?.setAttribute('tabindex', '-1');
        heading?.focus({ preventScroll: true });
      } else lastFocus.current?.focus({ preventScroll: true });
    };
  }, [selected]);
  const move = (direction: number) => rail.current?.scrollBy({left: direction * (rail.current.clientWidth * .7), behavior: reduce ? 'instant' : 'smooth'});
  return <>
    <div className="work-toolbar">
      <div className="work-filters" role="group" aria-label="Filter projects">
        {(['All work', 'Film & motion', 'Development', 'Experiments'] as Category[]).map(c => <button key={c} aria-pressed={category === c} onClick={() => { setCategory(c); rail.current?.scrollTo({left:0}); }} className={category === c ? 'active' : ''}>{c}{c === 'All work' && <sup>05</sup>}</button>)}
      </div>
      <div className="gallery-controls"><button onClick={() => move(-1)} aria-label="Previous projects"><ArrowLeft size={18}/></button><button onClick={() => move(1)} aria-label="Next projects"><ArrowRight size={18}/></button></div>
    </div>
    <p className="sr-only" role="status">{visible.length} projects in {category}</p>
    <div className="work-rail" ref={rail} aria-label="Selected projects">
      <AnimatePresence mode="popLayout">
        {visible.map((p, i) => <motion.article className="project-card" key={p.id} layout={!reduce} initial={{opacity:0, y:reduce ? 0 : 20}} animate={{opacity:1,y:0}} exit={{opacity:0,scale:.96}} transition={{duration:reduce ? 0 : .35,delay:i*.04}}>
          <button className="project-open" onClick={() => setSelected(p)} aria-label={`Explore ${p.title}`} data-cursor="VIEW">
            <div className="project-image"><img src={p.image} width="1200" height="850" alt={`${p.title} — illustrative concept artwork`} loading="lazy" decoding="async"/><span className="project-concept mono">CONCEPT PROJECT</span><span className="project-plus"><Plus size={22}/></span></div>
            <div className="project-meta mono"><span>{p.discipline}</span><span>0{projects.indexOf(p)+1}</span></div>
            <div className="project-title"><h3>{p.title}</h3><ArrowUpRight size={25}/></div>
          </button>
        </motion.article>)}
      </AnimatePresence>
    </div>
    <div className="work-bottom mono"><span>EXPLORATIONS ACROSS DISCIPLINES</span><span>SCROLL TO EXPLORE <ArrowRight size={14}/></span></div>
    <AnimatePresence>
      {selected && <motion.dialog ref={dialog} className="project-dialog" onCancel={e=>{e.preventDefault();close();}} onClick={e=>{if(e.target===e.currentTarget)close();}} aria-labelledby="project-dialog-title" initial={{opacity:0,y:reduce?0:24}} animate={{opacity:closing?0:1,y:closing&&!reduce?24:0}} onAnimationComplete={()=>{if(closing){setSelected(null);setClosing(false);}}} transition={{duration:reduce?0:.25}} data-lenis-prevent>
        <button className="dialog-close" onClick={close} aria-label="Close project"><X size={22}/></button>
        <img className="dialog-cover" src={selected.image} alt={`${selected.title} concept artwork`} width="1200" height="850"/>
        <div className="dialog-content"><p className="eyebrow">{selected.year} / {selected.category}</p><h2 id="project-dialog-title">{selected.title}</h2><p className="dialog-description">{selected.description}</p><div className="tool-tags">{selected.tools.map(t=><span key={t}>{t}</span>)}</div><div className="dialog-columns"><div><h3>The idea</h3><p>{selected.challenge}</p></div><div><h3>The approach</h3><p>{selected.approach}</p></div></div><p className="concept-note">Concept showcase · Placeholder media · No client affiliation</p><a href="#contact" className="text-link" onClick={event=>{event.preventDefault();navigateToContact.current=true;close();}}>Let’s create something like this <ArrowUpRight size={18}/></a></div>
      </motion.dialog>}
    </AnimatePresence>
  </>;
}
