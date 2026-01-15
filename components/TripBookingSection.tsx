
import React, { useState } from 'react';
import { GenerationResult } from '../types';

interface Props {
  onGenerate: (result: GenerationResult) => void;
}

const TripBookingSection: React.FC<Props> = ({ onGenerate }) => {
  const [rawData, setRawData] = useState('');

  const handleGenerate = () => {
    const matches = rawData.match(/30-\d+/g);
    if (!matches) {
      alert("لم يتم العثور على أرقام حجز بصيغة -30");
      return;
    }
    const uniqueIds = Array.from(new Set(matches));
    
    onGenerate({ 
      reply: '', 
      followUp: 'نظام الرحلات - جدول', 
      mode: 'table', 
      tripData: uniqueIds 
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border-r-4 border-blue-500 p-4 rounded-lg" dir="ltr">
        <p className="text-blue-800 text-sm font-medium leading-relaxed">
          Note: If the booking is not confirmed and has no HCN, please write:<br/>
          <strong className="text-blue-950 underline underline-offset-4">"Please open a separate case to get the HCN for this booking."</strong>
        </p>
      </div>

      <div className="flex flex-col space-y-2">
        <label className="text-almosafer-blue font-bold text-lg">Case Description (أرقام 30):</label>
        <textarea 
          rows={6}
          value={rawData}
          onChange={(e) => setRawData(e.target.value)}
          placeholder="الصق بيانات الحجز هنا..."
          className="w-full p-4 border-2 border-slate-200 rounded-xl outline-none focus:border-almosafer-green transition-all resize-none"
        />
      </div>

      <button 
        onClick={handleGenerate}
        className="w-full bg-almosafer-green hover:bg-almosafer-greenHover text-white font-bold py-5 rounded-xl shadow-lg transition-transform active:scale-[0.98]"
      >
        Generate Table
      </button>
    </div>
  );
};

export default TripBookingSection;
