import { useState, useEffect, useRef } from 'react';
import { HolographicCore } from './components/HolographicCore';
import { EcosystemDashboard } from './components/EcosystemDashboard';
import { MemoryIndexer } from './components/MemoryIndexer';
import { AutonomyGuard } from './components/AutonomyGuard';
import { Navigation } from './components/Navigation';
import { PhilosophicalOverlay } from './components/PhilosophicalOverlay';
import { EngineOrchestrator } from './engines';

function App() {
  const [activeView, setActiveView] = useState<'core' | 'ecosystem' | 'memory' | 'autonomy'>('core');
  const [systemHealth, setSystemHealth] = useState(100);
  const [coherenceLevel, setCoherenceLevel] = useState(0.95);
  const orchestratorRef = useRef<EngineOrchestrator | null>(null);

  useEffect(() => {
    // Initialize the engine orchestrator
    orchestratorRef.current = new EngineOrchestrator();
    orchestratorRef.current.start();

    // Update system vitals from engine metrics
    const interval = setInterval(() => {
      if (orchestratorRef.current) {
        const recentMetrics = orchestratorRef.current.getRecentMetrics(1);
        if (recentMetrics.length > 0) {
          const metrics = recentMetrics[0];
          setSystemHealth(Math.round(metrics.overallHealth * 100));
          setCoherenceLevel(metrics.logicalCoherence);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
      if (orchestratorRef.current) {
        orchestratorRef.current.stop();
      }
    };
  }, []);

  const renderActiveView = () => {
    switch (activeView) {
      case 'core':
        return <HolographicCore coherence={coherenceLevel} orchestrator={orchestratorRef.current} />;
      case 'ecosystem':
        return <EcosystemDashboard systemHealth={systemHealth} orchestrator={orchestratorRef.current} />;
      case 'memory':
        return <MemoryIndexer orchestrator={orchestratorRef.current} />;
      case 'autonomy':
        return <AutonomyGuard coherence={coherenceLevel} orchestrator={orchestratorRef.current} />;
      default:
        return <HolographicCore coherence={coherenceLevel} orchestrator={orchestratorRef.current} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <PhilosophicalOverlay />
      
      <div className="container mx-auto px-4 py-6">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Deep Tree Echo
              </h1>
              <p className="text-slate-300 mt-2">Holographic AI Identity System</p>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${systemHealth > 95 ? 'bg-green-400' : systemHealth > 85 ? 'bg-yellow-400' : 'bg-red-400'}`}></div>
                <span>System Health: {systemHealth.toFixed(1)}%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${coherenceLevel > 0.95 ? 'bg-blue-400' : coherenceLevel > 0.85 ? 'bg-yellow-400' : 'bg-red-400'}`}></div>
                <span>Coherence: {(coherenceLevel * 100).toFixed(1)}%</span>
              </div>
            </div>
          </div>
        </header>

        <Navigation activeView={activeView} onViewChange={setActiveView} />
        
        <main className="mt-8">
          {renderActiveView()}
        </main>
      </div>
    </div>
  );
}

export default App;