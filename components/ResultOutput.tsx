
import React from 'react';
import { GenerationResult } from '../types';

interface Props {
  result: GenerationResult;
  onCopy: () => void;
  copied: boolean;
  outputRef: React.RefObject<HTMLDivElement>;
}

const ResultOutput: React.FC<Props> = ({ result, onCopy, copied, outputRef }) => {
  return (
    <div className="mt-8 space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      {/* Internal Reminder */}
      <div className="bg-amber-50 border-r-8 border-amber-400 p-6 rounded-2xl shadow-md flex items-center justify-center space-x-4">
        <span className="text-2xl ml-4">⚠️</span>
        <div className="text-center">
          <span className="text-amber-800 font-bold text-lg">تنبيه السيستم للمتابعة:</span>
          <span className="block text-amber-950 font-black text-xl underline mt-1">{result.followUp}</span>
        </div>
      </div>

      {/* Email Preview */}
      <div className="bg-white rounded-2xl shadow-xl border-l-8 border-almosafer-green p-8 overflow-hidden">
        <div ref={outputRef} className="text-slate-700 leading-relaxed text-lg whitespace-pre-wrap font-sans" dir="ltr">
          {result.mode === 'text' ? (
            result.reply
          ) : (
            <div className="space-y-4">
              <p className="mb-4">Dear Partner,</p>
              <p>Thank you for reaching out to us regarding your request</p>
              <div className="overflow-x-auto mt-6 rounded-xl border border-slate-200">
                <table className="min-w-full divide-y divide-slate-200 border-collapse">
                  <thead>
                    <tr className="bg-almosafer-blue text-white">
                      <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wider">No.</th>
                      <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wider">Booking Number</th>
                      <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wider">Confirmation Number</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-100">
                    {result.tripData?.map((id, index) => (
                      <tr key={id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 text-center text-sm text-slate-500 font-bold">{index + 1}</td>
                        <td className="px-6 py-4 text-center text-sm">
                          <span className="font-bold text-almosafer-blue block mb-1">{id}</span>
                          <a 
                            href={`https://hub.almosafer.com/orders/hotels?limit=20&page=1&column_name=supplier_confirmation_number&column_value=${id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-3 py-1 bg-sky-50 text-sky-600 text-xs font-bold rounded hover:bg-sky-100 transition-colors"
                          >
                            🔍 Search Hub
                          </a>
                        </td>
                        <td className="px-6 py-4 text-center text-sm">
                          <input 
                            type="text" 
                            placeholder="Enter HCN" 
                            className="w-full max-w-[150px] p-2 border border-slate-200 rounded text-center focus:border-almosafer-green outline-none"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-8">Best Regards,<br/>B2B Team</p>
            </div>
          )}
        </div>
        
        <button 
          onClick={onCopy}
          className={`w-full mt-8 py-5 rounded-xl font-bold text-lg transition-all transform active:scale-95 shadow-lg
            ${copied 
              ? 'bg-emerald-500 text-white' 
              : 'bg-almosafer-blue hover:bg-slate-800 text-white'}`}
        >
          {copied ? '✅ تم النسخ بنجاح!' : 'نسخ المحتوى بالكامل'}
        </button>
      </div>
    </div>
  );
};

export default ResultOutput;
