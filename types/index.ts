// Experience Types
export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
}

// Skill Types
export interface Skill {
  name: string;
  level: number;
  category: string;
}

// Particle Types
export interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
}

// Animation Types
export type AnimationType = 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale' | 'rotate';

