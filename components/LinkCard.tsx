
import React from 'react';
import { FigmaLink } from '../types';

interface LinkCardProps {
  link: FigmaLink;
  categoryColor: string;
  categoryId: string;
  onDelete?: (id: string) => void;
  onEdit?: (link: FigmaLink, categoryId: string) => void;
}

const LinkCard: React.FC<LinkCardProps> = ({ link, categoryColor, categoryId, onDelete, onEdit }) => {
  const getAccentColor = (color: string) => {
    switch (color) {
      case 'blue': return 'text-blue-600 bg-blue-50 border-blue-100';
      case 'purple': return 'text-purple-600 bg-purple-50 border-purple-100';
      case 'orange': return 'text-orange-600 bg-orange-50 border-orange-100';
      case 'gray': return 'text-slate-600 bg-slate-50 border-slate-100';
      default: return 'text-indigo-600 bg-indigo-50 border-indigo-100';
    }
  };

  const getBorderHover = (color: string) => {
    switch (color) {
      case 'blue': return 'hover:border-blue-300';
      case 'purple': return 'hover:border-purple-300';
      case 'orange': return 'hover:border-orange-300';
      default: return 'hover:border-indigo-300';
    }
  };

  const renderIcon = () => {
    switch (categoryId) {
      case 'apps':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        );
      case 'ds':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
          </svg>
        );
      case 'archived':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
    }
  };

  return (
    <div 
      className={`group relative flex flex-col bg-white rounded-2xl border border-slate-200/80 shadow-[0_2px_4px_rgba(0,0,0,0.02)] transition-all duration-300 p-6 ${getBorderHover(categoryColor)} hover:shadow-[0_12px_24px_rgba(0,0,0,0.05)] hover:-translate-y-1`}
    >
      <div className="flex items-center justify-between mb-6">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${getAccentColor(categoryColor)}`}>
          {renderIcon()}
        </div>
        <div className="flex items-center space-x-2">
          {onEdit && (
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onEdit(link, categoryId);
              }}
              className="p-1.5 text-slate-300 hover:text-indigo-500 hover:bg-indigo-50 rounded-lg transition-all duration-200"
              title="Editar card"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
          )}
          {onDelete && (
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (window.confirm('Deseja realmente excluir este card?')) {
                  onDelete(link.id);
                }
              }}
              className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
              title="Excluir card"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="flex-1">
        <h3 className="text-slate-900 font-bold text-lg leading-tight mb-2 group-hover:text-indigo-600 transition-colors">
          {link.title}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
          {link.description || (categoryId === 'ds' ? 'Guia de estilos e componentes fundamentais.' : `Documentação visual e fluxos do módulo ${link.title.toLowerCase()}.`)}
        </p>
      </div>

      <div className="mt-8">
        <a 
          href={link.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-full px-4 py-2.5 bg-slate-50 hover:bg-indigo-600 text-slate-700 hover:text-white font-bold text-xs uppercase tracking-widest rounded-xl border border-slate-200 hover:border-indigo-600 transition-all duration-300 group/btn"
        >
          <span>Abrir no Figma</span>
          <svg className="w-4 h-4 ml-2 transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default LinkCard;
