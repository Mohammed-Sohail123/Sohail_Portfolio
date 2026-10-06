import { useState } from 'react';
import Portfolio from './components/Portfolio';
import Resume from './components/Resume';

function App() {
  const [view, setView] = useState<'portfolio' | 'resume'>('portfolio');

  return (
    <div className="relative">
      {/* View Switcher (Floating) */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-black/80 backdrop-blur-md border border-white/10 p-1 rounded-full shadow-2xl flex gap-1 print:hidden">
        <button 
          onClick={() => setView('portfolio')}
          className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
            view === 'portfolio' 
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Portfolio
        </button>
        <button 
          onClick={() => setView('resume')}
          className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
            view === 'resume' 
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Resume
        </button>
      </div>

      {/* Main View */}
      {view === 'portfolio' ? (
        <Portfolio onOpenResume={() => setView('resume')} />
      ) : (
        <Resume />
      )}
    </div>
  );
}

export default App;
