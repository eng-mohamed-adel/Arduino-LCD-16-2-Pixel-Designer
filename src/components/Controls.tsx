import React from 'react';
import { Undo, Redo, Trash2, PaintBucket, Contrast } from 'lucide-react';

interface ControlsProps {
  charIndex: number;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onClearCharacter: (index: number) => void;
  onFillCharacter: (index: number) => void;
  onInvertCharacter: (index: number) => void;
  onClearScreen: () => void;
  t: any;
}

const Controls: React.FC<ControlsProps> = ({
  charIndex,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onClearCharacter,
  onFillCharacter,
  onInvertCharacter,
  onClearScreen,
  t
}) => {
  return (
    <div className="flex flex-col gap-4 bg-[#030b19] p-6 rounded-xl border border-[#13459e]/30 shadow-md">
      <div className="flex flex-wrap gap-3 justify-center items-center">
        <button 
          onClick={onUndo} 
          disabled={!canUndo}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#0a1936] text-gray-200 rounded-lg hover:bg-[#13459e]/40 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium border border-transparent hover:border-[#13459e]/50"
        >
          <Undo size={16} /> {t.undo}
        </button>
        <button 
          onClick={onRedo} 
          disabled={!canRedo}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#0a1936] text-gray-200 rounded-lg hover:bg-[#13459e]/40 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium border border-transparent hover:border-[#13459e]/50"
        >
          <Redo size={16} /> {t.redo}
        </button>
      </div>

      <div className="h-px w-full bg-[#13459e]/20"></div>

      <div className="flex flex-wrap gap-3 justify-center items-center">
        <button 
          onClick={() => onClearCharacter(charIndex)} 
          className="flex items-center gap-2 px-4 py-2.5 bg-red-900/20 text-red-300 rounded-lg hover:bg-red-900/40 transition-colors text-sm font-medium border border-red-900/30"
        >
          <Trash2 size={16} /> {t.clearChar}
        </button>
        <button 
          onClick={() => onFillCharacter(charIndex)} 
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-900/20 text-blue-300 rounded-lg hover:bg-blue-900/40 transition-colors text-sm font-medium border border-blue-900/30"
        >
          <PaintBucket size={16} /> {t.fillChar}
        </button>
        <button 
          onClick={() => onInvertCharacter(charIndex)} 
          className="flex items-center gap-2 px-4 py-2.5 bg-purple-900/20 text-purple-300 rounded-lg hover:bg-purple-900/40 transition-colors text-sm font-medium border border-purple-900/30"
        >
          <Contrast size={16} /> {t.invertChar}
        </button>
      </div>

      <div className="h-px w-full bg-[#13459e]/20"></div>
      
      <div className="flex justify-center">
        <button 
          onClick={onClearScreen} 
          className="w-full flex justify-center items-center gap-2 px-4 py-3 bg-red-600/90 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-bold shadow-md border border-red-500"
        >
          <Trash2 size={16} /> {t.clearScreen}
        </button>
      </div>
    </div>
  );
};

export default Controls;
