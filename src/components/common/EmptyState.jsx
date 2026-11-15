import React from 'react';
import { Database, AlertCircle } from 'lucide-react';

export default function EmptyState({ 
  title = 'No Data Available', 
  message = 'The requested climate records are not available for this period.',
  actionText,
  onAction 
}) {
  return (
    <div className="flex flex-col items-center justify-center p-10 bg-slate-900/40 rounded-2xl border border-slate-800 text-center space-y-3">
      <div className="p-3 bg-slate-800/80 rounded-xl text-slate-400">
        <AlertCircle className="w-6 h-6 text-cyan-400" />
      </div>
      <h4 className="text-base font-bold text-white">{title}</h4>
      <p className="text-xs text-slate-400 max-w-sm">{message}</p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="mt-2 px-4 py-2 text-xs font-semibold text-cyan-300 bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-800/60 rounded-lg transition-colors"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}
