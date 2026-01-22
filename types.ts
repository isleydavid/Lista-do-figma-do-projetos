
import React from 'react';

export interface FigmaLink {
  title: string;
  url: string;
  description?: string;
}

export interface LinkCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  links: FigmaLink[];
  color: string;
}

export interface SectionContent {
  title: string;
  items: string[];
}
