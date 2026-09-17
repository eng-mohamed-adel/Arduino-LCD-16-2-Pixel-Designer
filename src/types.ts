export type PixelGrid = boolean[][];

export type LcdData = PixelGrid[];

export type ConnectionType = 'I2C' | 'Parallel';

export interface ParallelPins {
  rs: number;
  en: number;
  d4: number;
  d5: number;
  d6: number;
  d7: number;
}

export type AnimationType = 'none' | 'blink' | 'scrollLeft' | 'scrollRight' | 'progressive';

export interface AppState {
  lcdData: LcdData;
  selectedCharIndex: number;
  connectionType: ConnectionType;
  i2cAddress: string;
  parallelPins: ParallelPins;
  projectName: string;
  animationType: AnimationType;
  animationDelay: number;
}
