export interface Firefly {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  alpha: number;
  pulseSpeed: number;
  angle: number;
  orbitRadius: number;
  baseX: number;
  baseY: number;
}

export interface FloatingHeart {
  id: number;
  x: number;
  y: number;
  size: number;
  speedY: number;
  alpha: number;
  fadeSpeed: number;
  wiggleSpeed: number;
  wiggleAmount: number;
  wiggleOffset: number;
}

export interface LoveMemory {
  id: number;
  emoji: string;
  title: string;
  description: string;
  tag?: string;
}

export interface LoveReason {
  id: number;
  title: string;
  text: string;
}
