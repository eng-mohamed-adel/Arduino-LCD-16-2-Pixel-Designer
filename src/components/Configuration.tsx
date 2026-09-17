import React from 'react';
import { ConnectionType, ParallelPins } from '../types';
import { Save, FolderOpen } from 'lucide-react';

interface ConfigurationProps {
  connectionType: ConnectionType;
  setConnectionType: (t: ConnectionType) => void;
  i2cAddress: string;
  setI2cAddress: (a: string) => void;
  parallelPins: ParallelPins;
  setParallelPins: (p: ParallelPins) => void;
  projectName: string;
  setProjectName: (n: string) => void;
  onSave: () => void;
  onLoad: () => void;
  t: any;
}

const Configuration: React.FC<ConfigurationProps> = ({
  connectionType,
  setConnectionType,
  i2cAddress,
  setI2cAddress,
  parallelPins,
  setParallelPins,
  projectName,
  setProjectName,
  onSave,
  onLoad,
  t
}) => {
  const handlePinChange = (pin: keyof ParallelPins, value: string) => {
    const num = parseInt(value, 10);
    if (!isNaN(num)) {
      setParallelPins({ ...parallelPins, [pin]: num });
    }
  };

  return (
    <div className="bg-[#030b19] p-6 rounded-xl border border-[#13459e]/30 shadow-md text-gray-200 space-y-8">
      <div>
        <h3 className="text-lg font-bold text-white mb-4 border-b border-[#13459e]/30 pb-2">{t.projectName}</h3>
        <div className="space-y-4">
          <div>
            <input 
              type="text" 
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full bg-[#0a1936] border border-[#13459e]/50 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors placeholder-gray-500"
              placeholder={t.projectName}
            />
          </div>
          <div className="flex gap-3">
            <button 
              onClick={onSave}
              className="flex-1 flex items-center justify-center gap-2 bg-[#13459e] hover:bg-blue-600 text-white py-2.5 px-4 rounded-md transition-colors text-sm font-medium shadow-sm border border-blue-500/30"
            >
              <Save size={16} /> {t.save}
            </button>
            <button 
              onClick={onLoad}
              className="flex-1 flex items-center justify-center gap-2 bg-[#0a1936] hover:bg-[#13459e]/50 text-white py-2.5 px-4 rounded-md transition-colors text-sm font-medium shadow-sm border border-[#13459e]/50"
            >
              <FolderOpen size={16} /> {t.load}
            </button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-white mb-4 border-b border-[#13459e]/30 pb-2">{t.connection}</h3>
        
        <div className="flex bg-[#0a1936] rounded-lg p-1 mb-5 border border-[#13459e]/30">
          <button
            className={`flex-1 py-2.5 text-sm font-medium rounded-md transition-all ${
              connectionType === 'I2C' ? 'bg-[#13459e] text-white shadow-sm' : 'text-gray-400 hover:text-gray-200'
            }`}
            onClick={() => setConnectionType('I2C')}
          >
            {t.i2c}
          </button>
          <button
            className={`flex-1 py-2.5 text-sm font-medium rounded-md transition-all ${
              connectionType === 'Parallel' ? 'bg-[#13459e] text-white shadow-sm' : 'text-gray-400 hover:text-gray-200'
            }`}
            onClick={() => setConnectionType('Parallel')}
          >
            {t.parallel}
          </button>
        </div>

        {connectionType === 'I2C' ? (
          <div className="animate-in fade-in duration-300">
            <label className="block text-sm font-medium text-gray-400 mb-2">{t.i2cAddress}</label>
            <input 
              type="text" 
              value={i2cAddress}
              onChange={(e) => setI2cAddress(e.target.value)}
              className="w-full bg-[#0a1936] border border-[#13459e]/50 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 font-mono"
            />
            <p className="text-xs text-gray-500 mt-2">{t.i2cNote}</p>
          </div>
        ) : (
          <div className="animate-in fade-in duration-300">
            <label className="block text-sm font-medium text-gray-400 mb-3">{t.arduinoPins}</label>
            <div className="grid grid-cols-2 gap-4">
              {(Object.keys(parallelPins) as Array<keyof ParallelPins>).map(pin => (
                <div key={pin} className="flex items-center">
                  <span className="w-10 text-sm font-medium text-blue-300 uppercase">{pin}</span>
                  <input 
                    type="number" 
                    value={parallelPins[pin]}
                    onChange={(e) => handlePinChange(pin, e.target.value)}
                    min="0"
                    max="53"
                    className="w-full bg-[#0a1936] border border-[#13459e]/50 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Configuration;
