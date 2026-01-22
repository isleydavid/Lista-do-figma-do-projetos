
import React, { useState } from 'react';
import Layout from './components/Layout';
import LinkCard from './components/LinkCard';
import { CATEGORIES, CONTEXT_TEXT } from './constants';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState('projects');

  const renderProjects = () => (
    <div className="space-y-16 animate-in fade-in duration-700">
      <header className="max-w-3xl">
        <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-4">Artefatos de Projeto</h2>
        <p className="text-lg text-slate-500 leading-relaxed font-medium">
          Centralização de designs para evitar links soltos e criar uma fonte única da verdade visual para o ecossistema Cidade Conectada.
        </p>
      </header>

      {CATEGORIES.map((category) => (
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
            {category.links.map((link, idx) => (
              <LinkCard key={idx} link={link} categoryColor={category.color} categoryId={category.id} />
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
