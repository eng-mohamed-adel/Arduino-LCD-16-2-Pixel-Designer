import { useState, useCallback, useEffect } from 'react';
import { AppState, LcdData, PixelGrid, ConnectionType, ParallelPins, AnimationType } from '../types';

const INITIAL_CHAR: PixelGrid = Array(8).fill(Array(5).fill(false));

const createInitialLcdData = (): LcdData => {
  return Array(32).fill(null).map(() => 
    Array(8).fill(null).map(() => Array(5).fill(false))
  );
};

export const useLcdState = () => {
  const [lcdData, setLcdData] = useState<LcdData>(createInitialLcdData());
  const [history, setHistory] = useState<LcdData[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [selectedCharIndex, setSelectedCharIndex] = useState(0);
  const [connectionType, setConnectionType] = useState<ConnectionType>('I2C');
  const [i2cAddress, setI2cAddress] = useState('0x27');
  const [parallelPins, setParallelPins] = useState<ParallelPins>({
    rs: 12, en: 11, d4: 5, d5: 4, d6: 3, d7: 2
  });
  const [projectName, setProjectName] = useState('My LCD Project');
  const [animationType, setAnimationType] = useState<AnimationType>('none');
  const [animationDelay, setAnimationDelay] = useState<number>(500);

  useEffect(() => {
    const saved = localStorage.getItem('embedded_eg_lcd_state');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.lcdData) setLcdData(parsed.lcdData);
        if (parsed.connectionType) setConnectionType(parsed.connectionType);
        if (parsed.i2cAddress) setI2cAddress(parsed.i2cAddress);
        if (parsed.parallelPins) setParallelPins(parsed.parallelPins);
        if (parsed.projectName) setProjectName(parsed.projectName);
        if (parsed.animationType) setAnimationType(parsed.animationType);
        if (parsed.animationDelay) setAnimationDelay(parsed.animationDelay);
      } catch (e) {
        console.error('Failed to load saved state', e);
      }
    }
  }, []);

  const saveState = useCallback(() => {
    const stateToSave = {
      lcdData,
      connectionType,
      i2cAddress,
      parallelPins,
      projectName,
      animationType,
      animationDelay
    };
    localStorage.setItem('embedded_eg_lcd_state', JSON.stringify(stateToSave));
    alert('Design saved locally!');
  }, [lcdData, connectionType, i2cAddress, parallelPins, projectName, animationType, animationDelay]);

  const loadState = useCallback(() => {
    const saved = localStorage.getItem('embedded_eg_lcd_state');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.lcdData) setLcdData(parsed.lcdData);
        if (parsed.connectionType) setConnectionType(parsed.connectionType);
        if (parsed.i2cAddress) setI2cAddress(parsed.i2cAddress);
        if (parsed.parallelPins) setParallelPins(parsed.parallelPins);
        if (parsed.projectName) setProjectName(parsed.projectName);
        if (parsed.animationType) setAnimationType(parsed.animationType);
        if (parsed.animationDelay) setAnimationDelay(parsed.animationDelay);
        setHistory([]);
        setHistoryIndex(-1);
      } catch (e) {
        alert('Failed to load saved state.');
      }
    } else {
      alert('No saved design found.');
    }
  }, []);

  const pushHistory = useCallback((newData: LcdData) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newData);
    // Limit history to 50 steps
    if (newHistory.length > 50) {
      newHistory.shift();
    } else {
      setHistoryIndex(prev => prev + 1);
    }
    setHistory(newHistory);
  }, [history, historyIndex]);

  const updateCharacter = useCallback((charIndex: number, newCharData: PixelGrid) => {
    const newData = lcdData.map((char, i) => i === charIndex ? newCharData : char);
    setLcdData(newData);
    pushHistory(newData);
  }, [lcdData, pushHistory]);

  const updatePixel = useCallback((charIndex: number, row: number, col: number, value: boolean) => {
    const newData = lcdData.map((char, i) => {
      if (i !== charIndex) return char;
      return char.map((r, ri) => r.map((c, ci) => (ri === row && ci === col ? value : c)));
    });
    setLcdData(newData);
    // Debounce history push or just push for every pixel?
    // We'll not push history for single pixel drags if possible, but let's just push it for simplicity.
    // In a real drawing app, drag should be a single transaction.
  }, [lcdData]);

  const commitDrawing = useCallback(() => {
    pushHistory(lcdData);
  }, [lcdData, pushHistory]);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setLcdData(history[newIndex]);
    } else if (historyIndex === 0) {
      setHistoryIndex(-1);
      setLcdData(createInitialLcdData());
    }
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setLcdData(history[newIndex]);
    }
  }, [history, historyIndex]);

  const clearCharacter = useCallback((charIndex: number) => {
    updateCharacter(charIndex, Array(8).fill(null).map(() => Array(5).fill(false)));
  }, [updateCharacter]);

  const fillCharacter = useCallback((charIndex: number) => {
    updateCharacter(charIndex, Array(8).fill(null).map(() => Array(5).fill(true)));
  }, [updateCharacter]);

  const invertCharacter = useCallback((charIndex: number) => {
    const char = lcdData[charIndex];
    const newChar = char.map(r => r.map(c => !c));
    updateCharacter(charIndex, newChar);
  }, [lcdData, updateCharacter]);

  const clearScreen = useCallback(() => {
    if (window.confirm('Are you sure you want to clear the entire screen?')) {
      const newData = createInitialLcdData();
      setLcdData(newData);
      pushHistory(newData);
    }
  }, [pushHistory]);

  const setLcdDataBulk = useCallback((newData: LcdData) => {
    setLcdData(newData);
    pushHistory(newData);
  }, [pushHistory]);

  return {
    lcdData,
    selectedCharIndex,
    setSelectedCharIndex,
    connectionType,
    setConnectionType,
    i2cAddress,
    setI2cAddress,
    parallelPins,
    setParallelPins,
    projectName,
    setProjectName,
    animationType,
    setAnimationType,
    animationDelay,
    setAnimationDelay,
    updatePixel,
    commitDrawing,
    undo,
    redo,
    clearCharacter,
    fillCharacter,
    invertCharacter,
    clearScreen,
    setLcdDataBulk,
    canUndo: historyIndex >= 0,
    canRedo: historyIndex < history.length - 1,
    saveState,
    loadState
  };
};
