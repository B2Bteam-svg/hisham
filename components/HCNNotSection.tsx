
import React, { useState } from 'react';
import { GenerationResult } from '../types';
import { HCN_SCENARIOS, APP_CLOSING } from '../constants';

interface Props {
  onGenerate: (result: GenerationResult) => void;
}

const HCNNotSection: React.FC<Props> = ({ onGenerate }) => {
  const [orderId, setOrderId] = useState('');
  const [scenario, setScenario] = useState('');

  const handleGenerate = () => {
    if (!scenario) {
      alert("يرجى اختيار الحالة أولاً");
      return;
    }
    const finalOrder = orderId || "[Order #]";
    let reply = ""; 
    let fu = "";

    switch (scenario) {
      case 'same_day_before':
        reply = `Dear Partner,\n\nThank you for reaching out to us regarding order #${finalOrder}\n\nYour booking is confirmed under the guest name. Once the HCN is received, it will be shared with you before the check-in time.${APP_CLOSING}`;
        fu = "كل 1 ساعة";
        break;
      case 'same_day_after':
        reply = `Dear Partner,\n\nThank you for reaching out to us regarding order #${finalOrder}\n\nYour booking is confirmed under the guest name. Once the HCN is received, it will be shared with you.${APP_CLOSING}`;
        fu = "كل 30 دقيقة";
        break;
      case 'before_24':
        reply = `Dear Partner,\n\nThank you for reaching out to us regarding order #${finalOrder}\n\nYour booking is confirmed under the guest name. Once the HCN is received, it will be shared within today.${APP_CLOSING}`;
        fu = "كل 12 ساعة";
        break;
      case 'more_than_48':
        reply = `Dear Partner,\n\nThank you for reaching out to us regarding order #${finalOrder}\n\nYour booking is confirmed under the guest name. Once the HCN is received, it will be shared with you before 48 hours of the check-in time.${APP_CLOSING}`;
        fu = "كل 48 ساعة";
        break;
      case 'makkah':
        reply = `Dear Partner,\n\nThank you for reaching out to us regarding order #${finalOrder}\n\nYour booking is confirmed under the guest name. Once the HCN is received, it will be shared with you before 24 hours of the check-in time.${APP_CLOSING}`;
        fu = "كل 48 ساعة";
        break;
    }

    onGenerate({ reply, followUp: fu, mode: 'text' });
  };

  return (
    <div className="space-y-6">
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

      <div className="flex flex-col space-y-4">
        <label className="text-almosafer-blue font-bold text-lg">اختر الحالة المناسبة:</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3" dir="ltr">
          {HCN_SCENARIOS.map((s) => (
            <label 
              key={s.id}
              className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md
                ${scenario === s.id ? 'border-almosafer-green bg-almosafer-accent' : 'border-slate-100 bg-white'}`}
            >
              <input 
                type="radio" 
                name="hcnScenario" 
                value={s.id}
                checked={scenario === s.id}
                onChange={() => setScenario(s.id)}
                className="w-5 h-5 accent-almosafer-green mr-3"
              />
              <span className="font-semibold text-slate-700 text-sm">{s.label}</span>
            </label>
          ))}
        </div>
      </div>

      <button 
        onClick={handleGenerate}
        className="w-full bg-almosafer-green hover:bg-almosafer-greenHover text-white font-bold py-5 rounded-xl shadow-lg transition-transform active:scale-[0.98]"
      >
        Generate Email & Follow-up
      </button>
    </div>
  );
};

export default HCNNotSection;
