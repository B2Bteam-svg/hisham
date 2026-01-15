
import React, { useState } from 'react';
import { GenerationResult } from '../types';

interface Props {
  onGenerate: (result: GenerationResult) => void;
}

const HCNConfirmedSection: React.FC<Props> = ({ onGenerate }) => {
  const [orderId, setOrderId] = useState('');
  const [hcnCode, setHcnCode] = useState('');

  const handleGenerate = () => {
    const finalOrder = orderId || "[Order #]";
    const finalHCN = hcnCode || "[HCN]";
    const reply = `Dear Partner,\n\nThank you for reaching out to us regarding order #${finalOrder}\n\nThe booking is confirmed and paid under the hotel confirmation number #${finalHCN}\n\nThanks\nB2B Team`;
    
    onGenerate({ reply, followUp: "مكتمل ✅", mode: 'text' });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col space-y-2">
          <label className="text-almosafer-blue font-bold text-lg">رقم الحجز (Order #):</label>
          <input 
            type="text" 
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="مثال: 123456789"
            className="w-full p-4 border-2 border-slate-200 rounded-xl outline-none focus:border-almosafer-green transition-all"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-almosafer-blue font-bold text-lg">رقم التأكيد (HCN #):</label>
          <input 
            type="text" 
            value={hcnCode}
            onChange={(e) => setHcnCode(e.target.value)}
            placeholder="مثال: XYZ123"
            className="w-full p-4 border-2 border-slate-200 rounded-xl outline-none focus:border-almosafer-green transition-all"
          />
        </div>
      </div>

      <button 
        onClick={handleGenerate}
        className="w-full bg-almosafer-green hover:bg-almosafer-greenHover text-white font-bold py-5 rounded-xl shadow-lg transition-transform active:scale-[0.98]"
      >
        Generate Confirmed
      </button>
    </div>
  );
};

export default HCNConfirmedSection;
