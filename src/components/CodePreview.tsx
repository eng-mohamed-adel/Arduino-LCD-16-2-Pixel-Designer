import React, { useState } from 'react';
import { Copy, Download, Check } from 'lucide-react';

interface CodePreviewProps {
  code: string;
  projectName: string;
  t: any;
}

const CodePreview: React.FC<CodePreviewProps> = ({ code, projectName, t }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    
    // Create a safe filename
    const safeName = projectName.replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'lcd_project';
    link.download = `${safeName}.ino`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-[#030b19] rounded-xl border border-[#13459e]/30 shadow-md overflow-hidden flex flex-col h-full">
      <div className="bg-[#0a1936] px-5 py-4 flex items-center justify-between border-b border-[#13459e]/30">
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#13459e]/80"></div>
            <div className="w-3 h-3 rounded-full bg-[#13459e]/80"></div>
            <div className="w-3 h-3 rounded-full bg-[#13459e]/80"></div>
          </div>
          <span className="ml-2 text-sm font-semibold text-white tracking-wide">{t.codeGenerated}</span>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 bg-transparent hover:bg-[#13459e]/20 text-blue-200 rounded-md text-xs font-medium transition-colors border border-[#13459e]/30"
          >
            {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
            {copied ? t.copied : t.copy}
          </button>
          <button 
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 bg-[#13459e] hover:bg-blue-600 text-white rounded-md text-xs font-medium transition-colors shadow-sm border border-blue-500/30"
          >
            <Download size={16} />
            {t.download}
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto p-5 custom-scrollbar bg-[#020617] min-h-[400px]">
        <pre className="text-sm font-mono text-gray-300 whitespace-pre-wrap break-all md:break-normal md:whitespace-pre">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};

export default CodePreview;
