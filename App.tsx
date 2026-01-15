
import React, { useState, useCallback, useRef } from 'react';
import { TabType, GenerationResult } from './types';
import { APP_CLOSING } from './constants';
import HCNNotSection from './components/HCNNotSection';
import FollowUpSection from './components/FollowUpSection';
import HCNConfirmedSection from './components/HCNConfirmedSection';
import TripBookingSection from './components/TripBookingSection';
import ResultOutput from './components/ResultOutput';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>(TabType.HCN_NOT);
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [copied, setCopied] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setResult(null);
    setCopied(false);
  };

  const handleGenerate = (newResult: GenerationResult) => {
    setResult(newResult);
    setCopied(false);
    // Smooth scroll to result
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 100);
  };

  const handleCopy = useCallback(() => {
    if (!resultRef.current) return;

    const selection = window.getSelection();
    const range = document.createRange();
    
    // For tables, we need to handle inputs by replacing them with text before copying
    if (result?.mode === 'table') {
      const cloned = resultRef.current.cloneNode(true) as HTMLElement;
      const inputs = cloned.querySelectorAll('input');
      inputs.forEach(input => {
        const span = document.createElement('span');
        span.textContent = input.value || "[HCN]";
        input.parentNode?.replaceChild(span, input);
      });
      const links = cloned.querySelectorAll('a');
      links.forEach(l => l.remove());
      
      const hiddenDiv = document.createElement('div');
      hiddenDiv.style.position = 'absolute';
      hiddenDiv.style.left = '-9999px';
      hiddenDiv.appendChild(cloned);
      document.body.appendChild(hiddenDiv);
      
      range.selectNode(hiddenDiv);
      selection?.removeAllRanges();
      selection?.addRange(range);
      document.execCommand('copy');
      document.body.removeChild(hiddenDiv);
    } else {
      range.selectNode(resultRef.current);
      selection?.removeAllRanges();
      selection?.addRange(range);
      document.execCommand('copy');
    }
    
    selection?.removeAllRanges();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [result]);

  return (
    <div className="min-h-screen flex flex-col items-center pb-12">
      {/* Header */}
      <header className="w-full bg-gradient-to-br from-almosafer-blue to-almosafer-blueLight py-8 px-4 text-center shadow-lg mb-8">
        <img 
          src="https://i.ibb.co/SXqncGWn/images.png" 
          alt="Almosafer Logo" 
          className="w-48 mx-auto mb-4 drop-shadow-md"
        />
        <h1 className="text-white text-2xl md:text-3xl font-bold tracking-tight">B2B Support Smart System</h1>
      </header>

      <main className="w-full max-w-5xl px-4 md:px-0">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-slate-200 bg-slate-50 overflow-x-auto scrollbar-hide">
            {[
              { id: TabType.HCN_NOT, label: 'HCN Not Reflected' },
              { id: TabType.FOLLOW_UP, label: 'Follow up Scenario' },
              { id: TabType.HCN_CONFIRMED, label: 'HCN Confirmed' },
              { id: TabType.TRIP_BOOKING, label: 'HCNs for Trip booking' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex-1 min-w-[150px] py-4 px-6 text-sm font-bold transition-all duration-300 border-b-4 
                  ${activeTab === tab.id 
                    ? 'text-almosafer-blue border-almosafer-green bg-almosafer-accent' 
                    : 'text-slate-400 border-transparent hover:text-almosafer-green hover:bg-slate-100'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Form Content */}
          <div className="p-6 md:p-10">
            {activeTab === TabType.HCN_NOT && <HCNNotSection onGenerate={handleGenerate} />}
            {activeTab === TabType.FOLLOW_UP && <FollowUpSection onGenerate={handleGenerate} />}
            {activeTab === TabType.HCN_CONFIRMED && <HCNConfirmedSection onGenerate={handleGenerate} />}
            {activeTab === TabType.TRIP_BOOKING && <TripBookingSection onGenerate={handleGenerate} />}
          </div>
        </div>

        {/* Results */}
        {result && (
          <ResultOutput 
            result={result} 
            onCopy={handleCopy} 
            copied={copied} 
            outputRef={resultRef}
          />
        )}
      </main>

      <footer className="mt-12 text-center text-slate-400 text-sm">
        جميع الحقوق محفوظة لـ <strong className="text-almosafer-blue">Hisham Mohammed Design</strong>
      </footer>
    </div>
  );
};

export default App;
