
import React from 'react';
import { LinkCategory } from './types';

export const CATEGORIES: LinkCategory[] = [
  {
    id: 'web',
    title: 'Produtos Web View',
    color: 'blue',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    links: [
      { title: 'Portal do Servidor', url: 'https://www.figma.com/design/zDnYEKUxT1CXUGZvsqCsqI/Portal-do-Servidor?node-id=0-1&t=ZW3r0nyTGQWbWigG-1' },
      { title: 'Processo Eletrônico', url: 'https://www.figma.com/design/a8xwGBJB91bsraAMeHdEhT/Processo-Eletrônico?node-id=0-1&t=d7y8j5dnL6HWSjNx-1' },
      { title: 'Portal do Cidadão', url: 'https://www.figma.com/design/9MGkbCGBBOsbNDkAdbITHD/Portal-do-Cidadão?node-id=0-1&t=7HlwK7yU89w5kEOg-1' },
      { title: 'Dashboard do Prefeito', url: 'https://www.figma.com/design/aa59WciyfNwxNY7Kt0B4iZ/Dashboard---Prefeito?node-id=0-1&t=LBIex6I8n92n9vMe-1' },
      { title: 'Servidesk', url: 'https://www.figma.com/design/yau8DWyknG9nb8wpvAJXDV/Servidesk?node-id=0-1&t=67s9N94f7JdEj4Eu-1' },
      { title: 'Configurações', url: 'https://www.figma.com/design/EFjTYuFNjDONonPBalKWit/Configurações?node-id=0-1&t=F16eK56d5blG6KBR-1' },
      { title: 'Landing Page - Cidade Conectada', url: 'https://www.figma.com/design/qAi2es65czRjz0jlet11kc/Landing-Page---Cidade-Conectada?node-id=303-1590&t=teDe6XlBsJwqgPmR-1' },
    ]
  },
  {
    id: 'apps',
    title: 'Aplicativos Mobile',
    color: 'purple',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    links: [
      { title: 'Aplicativo do cidadão', url: 'https://www.figma.com/design/rMK9W3UQjBhkdmP59KLu6Y/Cidade-Conectada--Aplicativo?node-id=0-1&t=QLjfEQCOT5uB7TeT-1' },
      { title: 'Aplicativo do servidor', url: 'https://www.figma.com/design/eHE9eXqsZU4KnO4DAZEnum/Servidesk---Aplicativo?node-id=0-1&t=5KEtyAYxqDIC1OTH-1' },
    ]
  },
  {
    id: 'ds',
    title: 'Design Systems',
    color: 'orange',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
    links: [
      { title: 'Guia de estilo - Web Products', url: 'https://www.figma.com/design/uFHQRVL8psadhnw6nq8LOn/Guia-de-estilo---Produtos-WEB?node-id=2001-1368&t=krMs7GkObIwvITTK-1' },
      { title: 'Guia de estilo - App Servidor', url: 'https://www.figma.com/design/zn8kHCkdpgB1p8Q7nMuzrI/Servidesk---Design-System?node-id=1-2&t=PcUtyKE2deGMNid5-1' },
    ]
  },
  {
    id: 'archived',
    title: 'Arquivados / Legado',
    color: 'gray',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
      </svg>
    ),
    links: [
      { title: 'Cidade Conectada | Produtos Web View', url: 'https://www.figma.com/design/lMkSVWansGFpu8TP5woNY3/Cidade-Conectada-%7C-Produtos-Webview?node-id=7001-7807&t=mYoei31KF0PqDhSF-1' },
    ]
  }
];

export const CONTEXT_TEXT = {
  tldr: "Reorganizei o Figma para torná-lo mais leve, escalável e fácil de manter. Separei os projetos por produto e avancei na criação de um Design System unificado, pensado para garantir consistência, agilizar o trabalho do time e melhorar a comunicação entre design e desenvolvimento.",
  context: "Até então, utilizávamos a versão gratuita do Figma, que limita o número de projetos. Para contornar isso, acabamos concentrando vários produtos em poucos arquivos. Com o crescimento da plataforma, esses arquivos tornaram-se lentos e difíceis de navegar.",
  path: "A solução foi separar o Figma por projetos, refletindo a estrutura real da plataforma, apoiada por uma biblioteca central de componentes (Design System).",
  dsProcess: [
    "Definição dos foundations (cores, tipografia, espaçamentos e grids)",
    "Criação de um roadmap para priorização",
    "Auditoria das telas e fluxos existentes",
    "Identificação de inconsistências e mapeamento de duplicatas"
  ],
  benefits: {
    organization: [
      "Arquivos mais leves e organizados",
      "Navegação mais clara e intuitiva",
      "Menor dependência de conhecimento individual",
      "Estrutura preparada para crescimento"
    ],
    designSystem: [
      "Consistência visual e de usabilidade",
      "Economia de tempo na criação de telas",
      "Redução de retrabalho",
      "Melhor alinhamento design vs desenvolvimento"
    ]
  }
};
