import React from 'react';
import { Info } from 'lucide-react';

interface EducationalInfoProps {
  t: any;
}

const EducationalInfo: React.FC<EducationalInfoProps> = ({ t }) => {
  return (
    <div className="bg-[#0a1936] border border-[#13459e]/50 rounded-xl p-5 text-blue-100 shadow-md">
      <div className="flex items-start gap-4">
        <Info className="text-[#13459e] mt-1 flex-shrink-0" size={24} />
        <div>
          <h4 className="font-bold text-white mb-2 text-base">{t.lcdLimitationTitle}</h4>
          <p className="text-sm text-blue-200/90 leading-relaxed">
            {t.lcdLimitationDesc}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EducationalInfo;
