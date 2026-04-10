
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import LinkCard from './components/LinkCard';
import { CATEGORIES as INITIAL_CATEGORIES, CONTEXT_TEXT } from './constants';
import { FigmaLink, LinkCategory } from './types';

const S3_URL = 'https://cubo-bot.s3.sa-east-1.amazonaws.com/data.json';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState('projects');
  const [categories, setCategories] = useState<LinkCategory[]>(INITIAL_CATEGORIES);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddingLink, setIsAddingLink] = useState(false);
  const [newLink, setNewLink] = useState({ title: '', url: '', description: '', categoryId: 'web' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Limpeza de dados antigos que causavam erro de renderização
      if (localStorage.getItem('figma_hub_data')) {
        localStorage.removeItem('figma_hub_data');
      }

      // Tenta carregar do localStorage primeiro (apenas os links para evitar erro de objeto React)
      const localData = localStorage.getItem('figma_hub_links');
      if (localData) {
        const savedLinksByCat = JSON.parse(localData);
        const mergedWithLocal = INITIAL_CATEGORIES.map(cat => ({
          ...cat,
          links: savedLinksByCat[cat.id] || cat.links
        }));
        setCategories(mergedWithLocal);
      }

      const response = await fetch(S3_URL);
      if (response.ok) {
        const data = await response.json();
        const mergedWithS3 = INITIAL_CATEGORIES.map(cat => {
          const fetchedCat = data.find((d: any) => d.id === cat.id);
          return {
            ...cat,
            links: fetchedCat ? fetchedCat.links : cat.links
          };
        });
        
        setCategories(mergedWithS3);
        
        // Salva apenas os links no localStorage
        const linksToStore = mergedWithS3.reduce((acc, cat) => {
          acc[cat.id] = cat.links;
          return acc;
        }, {} as Record<string, FigmaLink[]>);
        localStorage.setItem('figma_hub_links', JSON.stringify(linksToStore));
      }
    } catch (error) {
      console.error('Error fetching data from S3:', error);
    }
  };

  const saveToS3 = async (updatedCategories: LinkCategory[]) => {
    setIsLoading(true);
    
    // Salva apenas os links no localStorage para evitar erros de renderização
    const linksToStore = updatedCategories.reduce((acc, cat) => {
      acc[cat.id] = cat.links;
      return acc;
    }, {} as Record<string, FigmaLink[]>);
    localStorage.setItem('figma_hub_links', JSON.stringify(linksToStore));

    try {
      const dataToSave = updatedCategories.map(cat => ({
        id: cat.id,
        links: cat.links
      }));

      const response = await fetch(S3_URL, {
        method: 'PUT',
        mode: 'cors',
        body: JSON.stringify(dataToSave),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to save to S3');
      }
    } catch (error) {
      console.error('Error saving to S3 (CORS issue?):', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLink.title || !newLink.url) return;

    const link: FigmaLink = {
      id: `${newLink.categoryId}-${Date.now()}`,
      title: newLink.title,
      url: newLink.url,
      description: newLink.description
    };

    const updatedCategories = categories.map(cat => {
      if (cat.id === newLink.categoryId) {
        return { ...cat, links: [link, ...cat.links] };
      }
      return cat;
    });

    setCategories(updatedCategories);
    setIsAddingLink(false);
    setNewLink({ title: '', url: '', description: '', categoryId: 'web' });
    await saveToS3(updatedCategories);
  };

  const handleDeleteLink = async (linkId: string) => {
    const updatedCategories = categories.map(cat => ({
      ...cat,
      links: cat.links.filter(l => l.id !== linkId)
    }));

    setCategories(updatedCategories);
    await saveToS3(updatedCategories);
  };

  const renderProjects = () => (
    <div className="space-y-16 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="max-w-3xl">
          <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-4">Artefatos de Projeto</h2>
          <p className="text-lg text-slate-500 leading-relaxed font-medium">
            Centralização de designs para evitar links soltos e criar uma fonte única da verdade visual para o ecossistema Cidade Conectada.
          </p>
        </div>
        <button 
          onClick={() => setIsAddingLink(true)}
          className="flex-shrink-0 px-8 py-4 bg-indigo-600 text-white font-bold text-sm uppercase tracking-widest rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center h-fit"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
          Novo Card
        </button>
      </header>

      {isAddingLink && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-lg p-10 shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-black text-slate-900">Adicionar Novo Link</h3>
              <button onClick={() => setIsAddingLink(false)} className="text-slate-400 hover:text-slate-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleAddLink} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Título do Projeto</label>
                <input 
                  type="text" 
                  required
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none font-medium"
                  placeholder="Ex: Dashboard de Vendas"
                  value={newLink.title}
                  onChange={e => setNewLink({...newLink, title: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Link do Figma</label>
                <input 
                  type="url" 
                  required
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none font-medium"
                  placeholder="https://figma.com/design/..."
                  value={newLink.url}
                  onChange={e => setNewLink({...newLink, url: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Descrição (Opcional)</label>
                <textarea 
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none font-medium h-24 resize-none"
                  placeholder="Breve descrição do que se trata este design..."
                  value={newLink.description}
                  onChange={e => setNewLink({...newLink, description: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Categoria</label>
                <select 
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none font-bold"
                  value={newLink.categoryId}
                  onChange={e => setNewLink({...newLink, categoryId: e.target.value})}
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.title}</option>
                  ))}
                </select>
              </div>

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-slate-900 text-white font-black text-sm uppercase tracking-[0.2em] rounded-2xl hover:bg-indigo-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl"
              >
                {isLoading ? 'Salvando...' : 'Criar Card Agora'}
              </button>
            </form>
          </div>
        </div>
      )}

      {categories.map((category) => (
        <section key={category.id} className="space-y-8">
          <div className="flex items-center justify-between border-b border-slate-200/60 pb-5">
            <div className="flex items-center space-x-4">
              <div className={`p-2.5 rounded-xl bg-${category.color}-50 text-${category.color}-600 border border-${category.color}-100 shadow-sm`}>
                {category.icon}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{category.title}</h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                  {category.links.length} {category.links.length === 1 ? 'Módulo Encontrado' : 'Módulos Organizados'}
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {category.links.map((link) => (
              <LinkCard 
                key={link.id} 
                link={link} 
                categoryColor={category.color} 
                categoryId={category.id} 
                onDelete={handleDeleteLink}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );

  const renderOverview = () => (
    <div className="max-w-4xl mx-auto animate-in slide-in-from-bottom-6 duration-700">
      <header className="mb-16">
        <div className="inline-flex items-center px-4 py-1.5 mb-6 bg-indigo-50 text-indigo-700 text-[10px] font-black rounded-full uppercase tracking-[0.2em] border border-indigo-100 shadow-sm">
          Documentação & Processo
        </div>
        <h2 className="text-5xl font-black text-slate-900 tracking-tight mb-8">Reorganização Estrutural</h2>
        <p className="text-2xl text-slate-500 leading-relaxed font-medium italic border-l-8 border-indigo-500/10 pl-10 py-2">
          "{CONTEXT_TEXT.tldr}"
        </p>
      </header>

      <div className="grid grid-cols-1 gap-12">
        <section className="bg-white p-10 md:p-12 rounded-[2.5rem] border border-slate-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.02)]">
          <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
            <span className="mr-4 text-3xl">🎯</span> Contexto e Desafios
          </h3>
          <p className="text-lg text-slate-600 leading-relaxed mb-10">
            {CONTEXT_TEXT.context}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-slate-50/50 p-8 rounded-3xl border border-slate-100">
            {["Lentidão e travamentos", "Dificuldade em achar fluxos", "Falta de clareza entre produtos", "Dependência de orientação"].map((item, i) => (
              <div key={i} className="flex items-center text-sm font-bold text-slate-700">
                <span className="w-2.5 h-2.5 bg-red-400 rounded-full mr-4 shadow-sm shadow-red-200"></span>
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white p-10 md:p-12 rounded-[2.5rem] border border-slate-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.02)]">
          <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center">
            <span className="mr-4 text-3xl">🚀</span> Benefícios Alcançados
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-6 border-b border-indigo-100 pb-2">Organização Figma</h4>
              <ul className="space-y-4">
                {CONTEXT_TEXT.benefits.organization.map((b, i) => (
                  <li key={i} className="text-base text-slate-600 flex items-start font-medium">
                    <span className="text-indigo-500 mr-3 text-lg leading-none">✓</span> {b}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] mb-6 border-b border-emerald-100 pb-2">Eficiência do Time</h4>
              <ul className="space-y-4">
                {CONTEXT_TEXT.benefits.designSystem.map((b, i) => (
                  <li key={i} className="text-base text-slate-600 flex items-start font-medium">
                    <span className="text-emerald-500 mr-3 text-lg leading-none">✓</span> {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );

  const renderDSDetail = () => (
    <div className="max-w-4xl mx-auto animate-in slide-in-from-bottom-6 duration-700">
      <header className="mb-16">
        <h2 className="text-5xl font-black text-slate-900 tracking-tight mb-6">Design System Hub</h2>
        <p className="text-xl text-slate-500 font-medium leading-relaxed">Padronização de foundations e tokens para garantir consistência e agilidade no handover.</p>
      </header>

      <div className="space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Core', desc: 'Componentes e estilos base universais (Foundations).', color: 'blue' },
            { title: 'Product Library', desc: 'Componentes específicos padronizados por produto.', color: 'purple' },
            { title: 'Not in DS', desc: 'Itens pontuais experimentais fora do core.', color: 'slate' },
          ].map((part, i) => (
            <div key={i} className={`bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm transition-transform hover:-translate-y-1`}>
              <div className={`w-8 h-1.5 rounded-full mb-4 bg-${part.color}-500`}></div>
              <h3 className="font-bold text-slate-900 text-lg mb-3">{part.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">{part.desc}</p>
            </div>
          ))}
        </div>

        <section className="bg-slate-900 text-white p-12 md:p-16 rounded-[3rem] shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-indigo-500/20 transition-all"></div>
          
          <h3 className="text-3xl font-black mb-12 flex items-center relative z-10">
            <span className="mr-4">⚒️</span> Roadmap de Construção
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 relative z-10">
            {CONTEXT_TEXT.dsProcess.map((step, i) => (
              <div key={i} className="flex space-x-6 items-start">
                <span className="text-5xl font-black text-slate-800 leading-none select-none tracking-tighter">{String(i + 1).padStart(2, '0')}</span>
                <p className="text-slate-300 font-bold pt-2 text-lg leading-snug">{step}</p>
              </div>
            ))}
          </div>
          <div className="mt-16 p-8 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm relative z-10">
            <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-3">Tokens & Handover</h4>
            <p className="text-slate-400 leading-relaxed font-medium">
              O sistema foi totalmente tokenizado para garantir que as decisões de design sejam traduzidas com precisão no código, reduzindo o gap entre design e desenvolvimento.
            </p>
          </div>
        </section>
      </div>
    </div>
  );

  return (
    <Layout currentView={currentView} onViewChange={setCurrentView}>
      {currentView === 'projects' && renderProjects()}
      {currentView === 'overview' && renderOverview()}
      {currentView === 'ds_detail' && renderDSDetail()}
      
      <footer className="mt-24 border-t border-slate-200/60 pt-12 pb-12 flex flex-col md:flex-row items-center justify-between text-slate-400">
        <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Cidade Conectada</p>
          <p className="text-[10px] mt-1 font-medium">© 2024 Design Project Hub • Todos os direitos reservados</p>
        </div>
        <div className="flex space-x-10 text-[10px] font-black uppercase tracking-[0.2em]">
          <button onClick={() => setCurrentView('overview')} className="hover:text-indigo-600 transition-colors">Onboarding</button>
          <a href="#" className="hover:text-indigo-600 transition-colors">Styleguide</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">Feedback</a>
        </div>
      </footer>
    </Layout>
  );
};

export default App;
