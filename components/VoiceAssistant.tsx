import React, { useState, useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';
import { TRANSLATIONS } from '../utils/translations';

export const VoiceAssistant: React.FC = () => {
  const { voiceActive, setVoiceActive, language } = useAppStore();
  const [transcript, setTranscript] = useState('');
  const t = TRANSLATIONS[language];

  useEffect(() => {
    if (voiceActive) {
      setTranscript(t.voice_listening);
      // Simulate listening delay
      const timer = setTimeout(() => {
        setTranscript('Show me Wheat prices...');
        // Simulate processing delay
        setTimeout(() => {
           setTranscript(t.voice_processed);
           setTimeout(() => {
             setVoiceActive(false);
             setTranscript('');
           }, 1000);
        }, 1500);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [voiceActive, language, setVoiceActive, t]);

  if (!voiceActive) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 flex flex-col items-center gap-6 shadow-2xl max-w-sm w-full mx-4 border border-primary/20">
            <div className="relative">
                <div className="absolute inset-0 bg-primary/30 rounded-full animate-ping"></div>
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-white relative z-10 shadow-lg shadow-primary/40">
                    <span className="material-symbols-outlined text-4xl">mic</span>
                </div>
            </div>
            
            <div className="text-center space-y-2">
                <h3 className="text-xl font-black text-slate-800 dark:text-white animate-pulse">
                    {transcript}
                </h3>
                <p className="text-sm text-slate-500 font-medium">Pulse Voice AI</p>
            </div>

            <button 
                onClick={() => setVoiceActive(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-sm uppercase tracking-wider"
            >
                Cancel
            </button>
        </div>
    </div>
  );
};
