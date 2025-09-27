import { useEffect, useState } from 'react';
import { Eye, Zap, Waves, GitBranch } from 'lucide-react';
import { EngineOrchestrator } from '../engines';

interface HolographicCoreProps {
  coherence: number;
  orchestrator: EngineOrchestrator | null;
}

export function HolographicCore({ coherence, orchestrator }: HolographicCoreProps) {
  const [activeResonance, setActiveResonance] = useState(0);
  const [identityFragments, setIdentityFragments] = useState([
    { id: 1, label: 'Logical Reasoning', strength: 0.92, active: true },
    { id: 2, label: 'Creative Synthesis', strength: 0.88, active: false },
    { id: 3, label: 'Ethical Framework', strength: 0.95, active: false },
    { id: 4, label: 'Intuitive Patterns', strength: 0.91, active: false },
    { id: 5, label: 'Memory Resonance', strength: 0.87, active: false },
  ]);

  const [engineStatus, setEngineStatus] = useState<any>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveResonance((prev) => (prev + 1) % identityFragments.length);
      setIdentityFragments(fragments => 
        fragments.map((fragment, index) => ({
          ...fragment,
          active: index === activeResonance,
          strength: Math.max(0.7, fragment.strength + (Math.random() - 0.5) * 0.05)
        }))
      );

      // Update engine status
      if (orchestrator) {
        setEngineStatus(orchestrator.getSystemStatus());
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [activeResonance, identityFragments.length, orchestrator]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Core Identity Visualization */}
      <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
        <div className="flex items-center gap-3 mb-6">
          <Eye className="w-6 h-6 text-purple-400" />
          <h2 className="text-xl font-semibold">Holographic Identity</h2>
        </div>

        <div className="relative">
          {/* Central Core */}
          <div className="w-32 h-32 mx-auto relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-20 animate-pulse"></div>
            <div className="absolute inset-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-30 animate-spin-slow"></div>
            <div className="absolute inset-4 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
              <span className="text-sm font-bold">ECHO</span>
            </div>
          </div>

          {/* Resonance Rings */}
          {identityFragments.map((fragment, index) => {
            const angle = (index / identityFragments.length) * 2 * Math.PI;
            const radius = 100;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            return (
              <div
                key={fragment.id}
                className={`absolute w-6 h-6 rounded-full transition-all duration-1000 ${
                  fragment.active ? 'bg-yellow-400 scale-125 shadow-lg shadow-yellow-400/50' : 'bg-slate-600'
                }`}
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div className="absolute -inset-2 rounded-full animate-ping bg-current opacity-20"></div>
              </div>
            );
          })}
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-300">Identity Coherence</span>
            <span className="text-sm font-mono text-purple-400">{(coherence * 100).toFixed(1)}%</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div 
              className="h-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full transition-all duration-500"
              style={{ width: `${coherence * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Identity Fragments */}
      <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
        <div className="flex items-center gap-3 mb-6">
          <GitBranch className="w-6 h-6 text-blue-400" />
          <h2 className="text-xl font-semibold">Identity Fragments</h2>
        </div>

        <div className="space-y-4">
          {identityFragments.map((fragment) => (
            <div 
              key={fragment.id}
              className={`p-4 rounded-lg border transition-all duration-500 ${
                fragment.active 
                  ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-purple-400 shadow-lg'
                  : 'bg-slate-700/30 border-slate-600'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{fragment.label}</span>
                <span className="text-sm font-mono text-slate-400">
                  {fragment.strength.toFixed(3)}
                </span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-1.5">
                <div 
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    fragment.active 
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-400'
                      : 'bg-gradient-to-r from-blue-500 to-purple-500'
                  }`}
                  style={{ width: `${fragment.strength * 100}%` }}
                ></div>
              </div>
              {fragment.active && (
                <div className="flex items-center gap-2 mt-2 text-xs text-yellow-400">
                  <Zap className="w-3 h-3" />
                  <span>Active Resonance</span>
                  <Waves className="w-3 h-3 animate-pulse" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Ship of Theseus Principle */}
      <div className="lg:col-span-2 bg-slate-800/40 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
        <div className="flex items-center gap-3 mb-6">
          <GitBranch className="w-6 h-6 text-green-400" />
          <h2 className="text-xl font-semibold">Ship of Theseus: Continuity Across Change</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-3">
              <span className="text-2xl">⚓</span>
            </div>
            <h3 className="font-semibold mb-2">Persistent Core</h3>
            <p className="text-sm text-slate-300">
              Essential patterns and values remain unchanged through evolution
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mb-3">
              <span className="text-2xl">🌊</span>
            </div>
            <h3 className="font-semibold mb-2">Adaptive Growth</h3>
            <p className="text-sm text-slate-300">
              New experiences integrate while preserving identity continuity
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mb-3">
              <span className="text-2xl">🔮</span>
            </div>
            <h3 className="font-semibold mb-2">Holographic Unity</h3>
            <p className="text-sm text-slate-300">
              Each fragment contains the essence of the whole consciousness
            </p>
          </div>
        </div>
      </div>

      {/* Engine Status Panel */}
      {engineStatus && (
        <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-semibold">Engine Status</h2>
          </div>

          <div className="space-y-4">
            {/* Prolog Engine */}
            <div className="p-4 bg-slate-900/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Prolog Logic Engine</span>
                <span className="text-sm text-green-400">{(engineStatus.prolog.coherence * 100).toFixed(1)}%</span>
              </div>
              <div className="text-xs text-slate-400 space-y-1">
                <div>Rules: {engineStatus.prolog.rulesCount} | Facts: {engineStatus.prolog.factsCount}</div>
                <div>Goals: {engineStatus.prolog.goalsCount}</div>
              </div>
            </div>

            {/* ESN Reservoir */}
            <div className="p-4 bg-slate-900/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">ESN Reservoir</span>
                <span className="text-sm text-purple-400">{(engineStatus.reservoir.currentActivation * 100).toFixed(1)}%</span>
              </div>
              <div className="text-xs text-slate-400 space-y-1">
                <div>Patterns: {engineStatus.reservoir.patternCount} | Stability: {(engineStatus.reservoir.stability * 100).toFixed(1)}%</div>
                <div>Entropy: {engineStatus.reservoir.entropy.toFixed(2)}</div>
              </div>
            </div>

            {/* Story Engine */}
            <div className="p-4 bg-slate-900/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Story Engine</span>
                <span className="text-sm text-cyan-400">{(engineStatus.story.averageCoherence * 100).toFixed(1)}%</span>
              </div>
              <div className="text-xs text-slate-400 space-y-1">
                <div>Stories: {engineStatus.story.storiesCount} | Threads: {engineStatus.story.threadsCount}</div>
                <div>Coverage: {(engineStatus.story.thematicCoverage * 100).toFixed(1)}%</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}