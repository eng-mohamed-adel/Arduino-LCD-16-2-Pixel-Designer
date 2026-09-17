import React, { useState, useEffect, useCallback } from 'react';
import { PixelGrid } from '../types';

interface PixelEditorProps {
  charData: PixelGrid;
  charIndex: number;
  updatePixel: (charIndex: number, row: number, col: number, value: boolean) => void;
  commitDrawing: () => void;
}

const PixelEditor: React.FC<PixelEditorProps> = ({ charData, charIndex, updatePixel, commitDrawing }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawMode, setDrawMode] = useState<boolean>(true); // true = turning on, false = turning off

  const handlePointerDown = (r: number, c: number, e: React.PointerEvent) => {
    e.preventDefault();
    (e.target as HTMLElement).releasePointerCapture(e.pointerId); // Allows pointer enter to fire on other elements during drag
    setIsDrawing(true);
    
    // Determine mode based on current pixel state or button used
    const isRightClick = e.button === 2;
    const newMode = isRightClick ? false : !charData[r][c];
    
    setDrawMode(newMode);
    updatePixel(charIndex, r, c, newMode);
  };

  const handlePointerEnter = (r: number, c: number, e: React.PointerEvent) => {
    e.preventDefault();
    if (isDrawing) {
      updatePixel(charIndex, r, c, drawMode);
    }
  };

  const handleGlobalPointerUp = useCallback(() => {
    if (isDrawing) {
      setIsDrawing(false);
      commitDrawing();
    }
  }, [isDrawing, commitDrawing]);

  useEffect(() => {
    window.addEventListener('pointerup', handleGlobalPointerUp);
    return () => {
      window.removeEventListener('pointerup', handleGlobalPointerUp);
    };
  }, [handleGlobalPointerUp]);

  return (
    <div 
      className="bg-[#030b19] p-6 rounded-xl border border-[#13459e]/30 shadow-md inline-block select-none touch-none"
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="flex flex-col gap-1 sm:gap-2">
        {charData.map((row, rIdx) => (
          <div key={`edit-r-${rIdx}`} className="flex gap-1 sm:gap-2">
            {row.map((pixel, cIdx) => (
              <div 
                key={`edit-c-${cIdx}`}
                className={`w-10 h-10 sm:w-12 sm:h-12 border cursor-pointer transition-colors
                  ${pixel 
                    ? 'bg-[#13459e] border-[#3b82f6] shadow-[0_0_10px_rgba(59,130,246,0.5)]' 
                    : 'bg-[#0a1936] border-[#13459e]/50 hover:bg-[#13459e]/20'
                  } rounded-sm`}
                onPointerDown={(e) => handlePointerDown(rIdx, cIdx, e)}
                onPointerEnter={(e) => handlePointerEnter(rIdx, cIdx, e)}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PixelEditor;
