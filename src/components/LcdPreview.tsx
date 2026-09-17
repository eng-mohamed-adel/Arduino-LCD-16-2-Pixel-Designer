import React, { useState, useEffect } from 'react';
import { LcdData, AnimationType } from '../types';

interface LcdPreviewProps {
  data: LcdData;
  selectedIndex: number;
  onSelectChar: (index: number) => void;
  animationType?: AnimationType;
  animationDelay?: number;
  isPlaying?: boolean;
  t: any;
}

const LcdPreview: React.FC<LcdPreviewProps> = ({ 
  data, 
  selectedIndex, 
  onSelectChar, 
  animationType = 'none',
  animationDelay = 500,
  isPlaying = false,
  t 
}) => {
  const [displayData, setDisplayData] = useState<LcdData>(data);
  const [blinkState, setBlinkState] = useState(true);
  
  useEffect(() => {
    if (!isPlaying) {
      setDisplayData(data);
      setBlinkState(true);
      return;
    }

    let intervalId: NodeJS.Timeout;
    let step = 0;

    const blankChar = Array(8).fill(Array(5).fill(false));

    intervalId = setInterval(() => {
      if (animationType === 'blink') {
        setBlinkState(prev => !prev);
      } 
      else if (animationType === 'scrollLeft') {
        step = (step + 1) % 16;
        const newData = [...data];
        // Shift row 0
        const row0 = newData.slice(0, 16);
        const shiftedRow0 = [...row0.slice(step), ...row0.slice(0, step)];
        // Shift row 1
        const row1 = newData.slice(16, 32);
        const shiftedRow1 = [...row1.slice(step), ...row1.slice(0, step)];
        
        setDisplayData([...shiftedRow0, ...shiftedRow1]);
      }
      else if (animationType === 'scrollRight') {
        step = (step + 1) % 16;
        const newData = [...data];
        // Shift row 0 right
        const row0 = newData.slice(0, 16);
        const shiftedRow0 = [...row0.slice(16 - step), ...row0.slice(0, 16 - step)];
        // Shift row 1 right
        const row1 = newData.slice(16, 32);
        const shiftedRow1 = [...row1.slice(16 - step), ...row1.slice(0, 16 - step)];
        
        setDisplayData([...shiftedRow0, ...shiftedRow1]);
      }
      else if (animationType === 'progressive') {
        step = (step + 1) % 33; // 0 to 32
        if (step === 0) step = 1; // skip fully blank so it feels like drawing
        const newData = data.map((char, i) => i < step ? char : blankChar);
        setDisplayData(newData);
      }
    }, animationDelay);

    return () => clearInterval(intervalId);
  }, [isPlaying, data, animationType, animationDelay]);

  // Update display immediately if not playing and data changes
  useEffect(() => {
    if (!isPlaying) {
      setDisplayData(data);
    }
  }, [data, isPlaying]);

  return (
    <div className="w-full flex justify-center py-4 overflow-x-auto custom-scrollbar">
      <div className="min-w-fit max-w-full bg-[#1a2f1a] p-3 md:p-6 rounded-xl border-4 border-gray-800 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative inline-block">
        {/* Hardware details */}
        <div className="absolute top-3 left-3 w-3 h-3 rounded-full bg-gray-900 border border-gray-700 shadow-inner"></div>
        <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-gray-900 border border-gray-700 shadow-inner"></div>
        <div className="absolute bottom-3 left-3 w-3 h-3 rounded-full bg-gray-900 border border-gray-700 shadow-inner"></div>
        <div className="absolute bottom-3 right-3 w-3 h-3 rounded-full bg-gray-900 border border-gray-700 shadow-inner"></div>
        
        <div className="bg-[#415a25] p-3 md:p-4 rounded border-2 border-[#2c3d19] shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] relative mt-2 md:mt-0">
          {/* Subtle grid lines/background to look like LCD glass */}
          <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyIiBoZWlnaHQ9IjIiPgo8cmVjdCB3aWR0aD0iMiIgaGVpZ2h0PSIyIiBmaWxsPSIjZmZmIi8+Cjwvc3ZnPg==')] mix-blend-overlay pointer-events-none"></div>

          <div className={`flex flex-col gap-1.5 md:gap-2 ${animationType === 'blink' && isPlaying && !blinkState ? 'opacity-0' : 'opacity-100'} transition-opacity duration-75`}>
            {/* Row 0 */}
            <div className="flex gap-1.5 md:gap-2">
              {displayData.slice(0, 16).map((char, i) => (
                <CharacterCell 
                  key={`char-0-${i}`} 
                  charData={char} 
                  isSelected={selectedIndex === i}
                  onClick={() => onSelectChar(i)}
                  index={i}
                  t={t}
                />
              ))}
            </div>
            {/* Row 1 */}
            <div className="flex gap-1.5 md:gap-2">
              {displayData.slice(16, 32).map((char, i) => (
                <CharacterCell 
                  key={`char-1-${i}`} 
                  charData={char} 
                  isSelected={selectedIndex === i + 16}
                  onClick={() => onSelectChar(i + 16)}
                  index={i + 16}
                  t={t}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Decorative Pins */}
        <div className="flex justify-start mt-4 gap-1.5 px-6">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={`pin-${i}`} className="w-2 h-4 bg-[#b89947] border border-[#8a7235] rounded-b-sm shadow-sm"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface CharacterCellProps {
  charData: boolean[][];
  isSelected: boolean;
  onClick: () => void;
  index: number;
  t: any;
}

const CharacterCell: React.FC<CharacterCellProps> = ({ charData, isSelected, onClick, index, t }) => {
  return (
    <div 
      className={`flex flex-col gap-[1px] md:gap-[2px] p-[1px] md:p-[2px] cursor-pointer transition-colors relative
        ${isSelected ? 'bg-[#5c7a36] ring-2 ring-yellow-400 z-10 shadow-[0_0_10px_rgba(250,204,21,0.3)] rounded-sm' : 'hover:bg-[#4d6b2c] rounded-sm'}`}
      onClick={onClick}
      title={`${t.char} ${index + 1}`}
    >
      {charData.map((row, rIdx) => (
        <div key={`r-${rIdx}`} className="flex gap-[1px] md:gap-[2px]">
          {row.map((pixel, cIdx) => (
            <div 
              key={`c-${cIdx}`} 
              className={`w-[2.5px] h-[2.5px] min-[400px]:w-[3px] min-[400px]:h-[3px] sm:w-1 sm:h-1 md:w-1.5 md:h-1.5 lg:w-2 lg:h-2 xl:w-[10px] xl:h-[10px] rounded-[1px] 
                ${pixel ? 'bg-[#121c0b] shadow-[0_0_2px_rgba(0,0,0,0.8)]' : 'bg-[#4b692d] opacity-30'}`}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default LcdPreview;
