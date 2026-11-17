import { useState } from 'react';
import Portfolio from './components/Portfolio';
import Resume from './components/Resume';
import Resume_One from './components/Resume_One';

type View = 'portfolio' | 'resume' | 'resume_one';

const views: { id: View; label: string }[] = [
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'resume', label: 'Resume' },
  { id: 'resume_one', label: 'Resume One' },
];

function App() {
  const [view, setView] = useState<View>('portfolio');

  return (
    <div className="relative">
      {/* View Switcher (Floating) */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-black/80 backdrop-blur-md border border-white/10 p-1 rounded-full shadow-2xl flex gap-1 print:hidden">
        {views.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setView(id)}
            className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              view === id
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Main View */}
      {view === 'portfolio' && <Portfolio onOpenResume={() => setView('resume')} />}
      {view === 'resume' && <Resume />}
      {view === 'resume_one' && <Resume_One />}
    </div>
  );
}

export default App;
