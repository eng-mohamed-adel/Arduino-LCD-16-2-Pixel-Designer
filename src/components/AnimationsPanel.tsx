import React from 'react';
import { Play, Square, Settings } from 'lucide-react';
import { AnimationType } from '../types';

interface AnimationsPanelProps {
  animationType: AnimationType;
  setAnimationType: (type: AnimationType) => void;
  animationDelay: number;
  setAnimationDelay: (delay: number) => void;
  t: any;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

const AnimationsPanel: React.FC<AnimationsPanelProps> = ({
  animationType,
  setAnimationType,
  animationDelay,
  setAnimationDelay,
  t,
  isPlaying,
  onTogglePlay
}) => {

  const animOptions: {value: AnimationType, label: string}[] = [
    { value: 'none', label: t.animNone },
    { value: 'blink', label: t.animBlink },
    { value: 'scrollLeft', label: t.animScrollLeft },
    { value: 'scrollRight', label: t.animScrollRight },
    { value: 'progressive', label: t.animProgressive }
  ];

  return (
    <div className="bg-[#030b19] p-6 rounded-xl border border-[#13459e]/30 shadow-md flex flex-col gap-4">
      <div className="flex items-center gap-2 border-b border-[#13459e]/30 pb-3">
        <Settings size={20} className="text-[#3b82f6]" />
        <h3 className="font-bold text-white uppercase tracking-wide">{t.animations}</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            {animOptions.map(opt => (
              <button
                key={opt.value}
                onClick={() => setAnimationType(opt.value)}
                className={`py-2 px-3 text-xs font-medium rounded-md transition-all border ${
                  animationType === opt.value 
                    ? 'bg-[#13459e] text-white border-blue-500/50 shadow-sm' 
                    : 'bg-[#0a1936] text-blue-200 border-[#13459e]/30 hover:bg-[#13459e]/20'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {animationType !== 'none' && (
            <div className="bg-[#0a1936] p-4 rounded-lg border border-[#13459e]/30 space-y-3 animate-in fade-in">
              <div className="flex justify-between items-center text-xs text-blue-300">
                <span>{t.animDelay}</span>
                <span className="font-mono">{animationDelay} ms</span>
              </div>
              <input 
                type="range" 
                min="50" 
                max="2000" 
                step="50"
                value={animationDelay} 
                onChange={(e) => setAnimationDelay(parseInt(e.target.value, 10))}
                className="w-full accent-blue-500"
              />
            </div>
          )}
        </div>

        <div className="flex items-center justify-center h-full">
           <button 
             onClick={onTogglePlay}
             disabled={animationType === 'none'}
             className={`flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-sm transition-all border w-full max-w-[200px] shadow-lg
               ${animationType === 'none' 
                 ? 'bg-gray-800 text-gray-500 border-gray-700 cursor-not-allowed'
                 : isPlaying 
                   ? 'bg-red-900/40 text-red-300 border-red-500/50 hover:bg-red-900/60'
                   : 'bg-green-900/40 text-green-300 border-green-500/50 hover:bg-green-900/60'
               }
             `}
           >
             {isPlaying ? <Square size={20} /> : <Play size={20} />}
             {isPlaying ? t.stopPreview : t.playPreview}
           </button>
        </div>
      </div>
    </div>
  );
};

export default AnimationsPanel;
