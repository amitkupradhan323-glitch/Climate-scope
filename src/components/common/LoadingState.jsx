import React from 'react';
import { Loader2 } from 'lucide-react';

export default function LoadingState({ message = 'Loading climate observations...' }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 space-y-3 text-slate-400">
      <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
      <span className="text-xs font-medium">{message}</span>
    </div>
  );
}
