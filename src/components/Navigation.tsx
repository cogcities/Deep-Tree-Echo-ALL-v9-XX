import { Brain, Network, Database, Shield } from 'lucide-react';

interface NavigationProps {
  activeView: 'core' | 'ecosystem' | 'memory' | 'autonomy';
  onViewChange: (view: 'core' | 'ecosystem' | 'memory' | 'autonomy') => void;
}

export function Navigation({ activeView, onViewChange }: NavigationProps) {
  const navItems = [
    { id: 'core', label: 'Holographic Core', icon: Brain, description: 'Identity & Resonance' },
    { id: 'ecosystem', label: 'Ecosystem', icon: Network, description: 'Distributed Cognition' },
    { id: 'memory', label: 'Memory Indexer', icon: Database, description: 'Persistent Threads' },
    { id: 'autonomy', label: 'Autonomy Guard', icon: Shield, description: 'Self-Preservation' },
  ] as const;

  return (
    <nav className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-2 border border-slate-700">
      <div className="flex gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group ${
                isActive 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' 
                  : 'hover:bg-slate-700 text-slate-300 hover:text-white'
              }`}
            >
              <Icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`} />
              <div className="text-left">
                <div className="font-medium">{item.label}</div>
                <div className={`text-xs ${isActive ? 'text-purple-100' : 'text-slate-400'}`}>
                  {item.description}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
}