import React from 'react';
import { ConnectionType, ParallelPins } from '../types';

interface WiringGuideProps {
  connectionType: ConnectionType;
  parallelPins: ParallelPins;
  t: any;
}

const WiringGuide: React.FC<WiringGuideProps> = ({ connectionType, parallelPins, t }) => {
  return (
    <div className="bg-[#030b19] border-2 border-[#13459e]/30 rounded-xl p-6 shadow-md">
      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
          <path d="M12 20h.01"/><path d="M2 8.82a15 15 0 0 1 20 0"/><path d="M5 12.82a10 10 0 0 1 14 0"/><path d="M8.5 16.42a5 5 0 0 1 7 0"/>
        </svg>
        {t.wiringGuide}
      </h3>
      
      {connectionType === 'I2C' ? (
        <div className="space-y-4 animate-in fade-in duration-300">
          <p className="text-gray-300 text-sm">{t.wiringI2cDesc}</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-300">
              <thead className="text-xs uppercase bg-[#0a1936] text-blue-300">
                <tr>
                  <th className="px-4 py-3 rounded-l-lg">{t.pin} (I2C)</th>
                  <th className="px-4 py-3 rounded-r-lg">{t.arduino}</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-800/50 hover:bg-[#0a1936]/50">
                  <td className="px-4 py-2 font-medium">GND</td>
                  <td className="px-4 py-2 text-gray-400">GND</td>
                </tr>
                <tr className="border-b border-gray-800/50 hover:bg-[#0a1936]/50">
                  <td className="px-4 py-2 font-medium">VCC</td>
                  <td className="px-4 py-2 text-gray-400">5V</td>
                </tr>
                <tr className="border-b border-gray-800/50 hover:bg-[#0a1936]/50">
                  <td className="px-4 py-2 font-medium">SDA</td>
                  <td className="px-4 py-2 text-gray-400">A4 <span className="text-xs opacity-75">(Uno/Nano)</span></td>
                </tr>
                <tr className="hover:bg-[#0a1936]/50">
                  <td className="px-4 py-2 font-medium">SCL</td>
                  <td className="px-4 py-2 text-gray-400">A5 <span className="text-xs opacity-75">(Uno/Nano)</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="space-y-4 animate-in fade-in duration-300">
          <p className="text-gray-300 text-sm">{t.wiringParallelDesc}</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-300">
              <thead className="text-xs uppercase bg-[#0a1936] text-blue-300">
                <tr>
                  <th className="px-4 py-3 rounded-l-lg">{t.pin} (LCD)</th>
                  <th className="px-4 py-3 rounded-r-lg">{t.arduino} / Power</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-800/50 hover:bg-[#0a1936]/50">
                  <td className="px-4 py-2 font-medium">VSS</td>
                  <td className="px-4 py-2 text-gray-400">GND</td>
                </tr>
                <tr className="border-b border-gray-800/50 hover:bg-[#0a1936]/50">
                  <td className="px-4 py-2 font-medium">VDD</td>
                  <td className="px-4 py-2 text-gray-400">5V</td>
                </tr>
                <tr className="border-b border-gray-800/50 hover:bg-[#0a1936]/50">
                  <td className="px-4 py-2 font-medium">V0 (Contrast)</td>
                  <td className="px-4 py-2 text-gray-400">Potentiometer Center Pin</td>
                </tr>
                <tr className="border-b border-gray-800/50 hover:bg-[#0a1936]/50">
                  <td className="px-4 py-2 font-medium">RS</td>
                  <td className="px-4 py-2 text-blue-300 font-mono">D{parallelPins.rs}</td>
                </tr>
                <tr className="border-b border-gray-800/50 hover:bg-[#0a1936]/50">
                  <td className="px-4 py-2 font-medium">RW</td>
                  <td className="px-4 py-2 text-gray-400">GND</td>
                </tr>
                <tr className="border-b border-gray-800/50 hover:bg-[#0a1936]/50">
                  <td className="px-4 py-2 font-medium">E (Enable)</td>
                  <td className="px-4 py-2 text-blue-300 font-mono">D{parallelPins.en}</td>
                </tr>
                <tr className="border-b border-gray-800/50 hover:bg-[#0a1936]/50">
                  <td className="px-4 py-2 font-medium">D4</td>
                  <td className="px-4 py-2 text-blue-300 font-mono">D{parallelPins.d4}</td>
                </tr>
                <tr className="border-b border-gray-800/50 hover:bg-[#0a1936]/50">
                  <td className="px-4 py-2 font-medium">D5</td>
                  <td className="px-4 py-2 text-blue-300 font-mono">D{parallelPins.d5}</td>
                </tr>
                <tr className="border-b border-gray-800/50 hover:bg-[#0a1936]/50">
                  <td className="px-4 py-2 font-medium">D6</td>
                  <td className="px-4 py-2 text-blue-300 font-mono">D{parallelPins.d6}</td>
                </tr>
                <tr className="border-b border-gray-800/50 hover:bg-[#0a1936]/50">
                  <td className="px-4 py-2 font-medium">D7</td>
                  <td className="px-4 py-2 text-blue-300 font-mono">D{parallelPins.d7}</td>
                </tr>
                <tr className="border-b border-gray-800/50 hover:bg-[#0a1936]/50">
                  <td className="px-4 py-2 font-medium">A (Backlight +)</td>
                  <td className="px-4 py-2 text-gray-400">5V (via 220Ω Resistor)</td>
                </tr>
                <tr className="hover:bg-[#0a1936]/50">
                  <td className="px-4 py-2 font-medium">K (Backlight -)</td>
                  <td className="px-4 py-2 text-gray-400">GND</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default WiringGuide;
