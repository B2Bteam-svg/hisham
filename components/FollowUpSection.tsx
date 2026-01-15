
import React, { useState } from 'react';
import { GenerationResult } from '../types';
import { FOLLOWUP_SCENARIOS } from '../constants';

interface Props {
  onGenerate: (result: GenerationResult) => void;
}

const FollowUpSection: React.FC<Props> = ({ onGenerate }) => {
  const [checkinDate, setCheckinDate] = useState('');
  const [scenario, setScenario] = useState('');

  const handleGenerate = () => {
    if (!scenario) {
      alert("يرجى اختيار نوع المتابعة");
      return;
    }
    
    let reply = ""; 
    let fu = "";

    const standardClosing = "\n\nShould you have any further inquiries, please do not hesitate to contact us.\n\nThanks\nB2B Team";

    switch (scenario) {
      case 'same_day_before':
        reply = `Dear Partner,\n\nThank you for reaching out to us \n\nYour booking is confirmed under the guest name. Once the HCN is received, it will be shared with you before the check-in time.${standardClosing}`;
        fu = "كل 1 ساعة";
        break;
      case 'same_day_after':
        reply = `Dear Partner,\n\nThank you for reaching out to us \n\nWe are currently following up on your request and will update you within 30 minutes of the check-in. ${standardClosing}`;
        fu = "كل 30 دقيقة";
        break;
      case 'makkah':
        reply = `Dear Partner,\n\nThank you for reaching out to us \n\nKindly note that we are working on your request, and the reply will be shared within 24 hours.${standardClosing}`;
        fu = "كل 48 ساعة";
        break;
      case 'future_15':
        reply = `Dear Partner,\n\nThank you for reaching out to us\n\nKindly note that we are working on your request,\nand the reply will be within within 48 to 72 hours${standardClosing}`;
        fu = "كل 48 ساعة";
        break;
      case 'waiving':
        reply = `Dear Partner,\n\nThank you for reaching out to us\n\nKindly note that we are working on your request,\nand the reply will be within 7–14 working days${standardClosing}`;
        fu = "بعد 12 يوم";
        break;
      default:
        reply = `Dear Partner,\n\nThank you for reaching out to us \n\nKindly note that we are working on your request, and the reply will be shared within 48 hours.${standardClosing}`;
        fu = "كل 48 ساعة";
        break;
    }

    onGenerate({ reply, followUp: fu, mode: 'text' });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <label className="text-almosafer-blue font-bold text-lg">تاريخ الدخول (Check-in Date):</label>
        <input 
          type="date" 
          value={checkinDate}
          onChange={(e) => setCheckinDate(e.target.value)}
          className="w-full p-4 border-2 border-slate-200 rounded-xl outline-none focus:border-almosafer-green transition-all"
        />
      </div>

      <div className="flex flex-col space-y-4">
        <label className="text-almosafer-blue font-bold text-lg">اختر نوع المتابعة:</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3" dir="ltr">
          {FOLLOWUP_SCENARIOS.map((s) => (
            <label 
              key={s.id}
              className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md
                ${scenario === s.id ? 'border-almosafer-green bg-almosafer-accent' : 'border-slate-100 bg-white'}`}
            >
              <input 
                type="radio" 
                name="fuScenario" 
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
        Generate Follow-up
      </button>
    </div>
  );
};

export default FollowUpSection;
