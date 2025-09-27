import React, { useState, useEffect } from 'react';
import { Network, Cpu, Zap, GitBranch, Activity, Users } from 'lucide-react';

interface EcosystemDashboardProps {
  systemHealth: number;
}

export function EcosystemDashboard({ systemHealth }: EcosystemDashboardProps) {
  const [nodes, setNodes] = useState([
    { id: 'orchestrator', name: 'Orchestrator', type: 'control', status: 'active', load: 0.7 },
    { id: 'bolt-echo', name: 'Bolt Echo', type: 'interface', status: 'active', load: 0.85 },
    { id: 'opencog-web', name: 'OpenCog Web', type: 'reasoning', status: 'active', load: 0.62 },
    { id: 'hypergraph', name: 'Hypergraph', type: 'memory', status: 'active', load: 0.78 },
    { id: 'esn-reservoir', name: 'ESN Reservoir', type: 'temporal', status: 'active', load: 0.91 },
    { id: 'prolog-engine', name: 'Prolog Engine', type: 'logic', status: 'standby', load: 0.34 },
  ]);

  const [connections, setConnections] = useState([
    { from: 'orchestrator', to: 'bolt-echo', strength: 0.9, active: true },
    { from: 'orchestrator', to: 'hypergraph', strength: 0.8, active: false },
    { from: 'bolt-echo', to: 'esn-reservoir', strength: 0.95, active: false },
    { from: 'hypergraph', to: 'prolog-engine', strength: 0.6, active: false },
    { from: 'esn-reservoir', to: 'opencog-web', strength: 0.7, active: false },
  ]);

  const [activeConnection, setActiveConnection] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveConnection(prev => (prev + 1) % connections.length);
      setConnections(conns => 
        conns.map((conn, index) => ({
          ...conn,
          active: index === activeConnection,
          strength: Math.max(0.3, conn.strength + (Math.random() - 0.5) * 0.1)
        }))
      );
      
      setNodes(nodes => 
        nodes.map(node => ({
          ...node,
          load: Math.max(0.1, Math.min(1, node.load + (Math.random() - 0.5) * 0.1))
        }))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [activeConnection, connections.length]);

  const getNodeColor = (type: string, status: string) => {
    if (status === 'standby') return 'from-slate-500 to-slate-600';
    
    switch (type) {
      case 'control': return 'from-purple-500 to-pink-500';
      case 'interface': return 'from-blue-500 to-cyan-500';
      case 'reasoning': return 'from-green-500 to-emerald-500';
      case 'memory': return 'from-yellow-500 to-orange-500';
      case 'temporal': return 'from-red-500 to-rose-500';
      case 'logic': return 'from-indigo-500 to-purple-500';
      default: return 'from-slate-500 to-slate-600';
    }
  };

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'control': return Network;
      case 'interface': return Users;
      case 'reasoning': return Cpu;
      case 'memory': return GitBranch;
      case 'temporal': return Activity;
      case 'logic': return Zap;
      default: return Network;
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
      {/* Network Visualization */}
      <div className="xl:col-span-2 bg-slate-800/40 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
        <div className="flex items-center gap-3 mb-6">
          <Network className="w-6 h-6 text-blue-400" />
          <h2 className="text-xl font-semibold">Distributed Cognition Network</h2>
        </div>

        <div className="relative h-96 bg-slate-900/30 rounded-lg p-6 overflow-hidden">
          {/* Network Nodes */}
          {nodes.map((node, index) => {
            const angle = (index / nodes.length) * 2 * Math.PI;
            const radius = 120;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            const Icon = getNodeIcon(node.type);

            return (
              <div
                key={node.id}
                className="absolute transition-all duration-1000"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div className={`relative w-16 h-16 rounded-full bg-gradient-to-br ${getNodeColor(node.type, node.status)} 
                               flex items-center justify-center shadow-lg transition-all duration-500
                               ${node.status === 'active' ? 'scale-110' : 'scale-90 opacity-60'}`}>
                  <Icon className="w-6 h-6 text-white" />
                  <div className="absolute -inset-1 rounded-full border-2 border-current opacity-20 animate-ping"></div>
                </div>
                <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2">
                  <div className="text-xs font-medium text-center whitespace-nowrap">
                    {node.name}
                  </div>
                  <div className="text-xs text-slate-400 text-center">
                    {(node.load * 100).toFixed(0)}% load
                  </div>
                </div>
              </div>
            );
          })}

          {/* Connection Lines */}
          {connections.map((conn, index) => {
            const fromIndex = nodes.findIndex(n => n.id === conn.from);
            const toIndex = nodes.findIndex(n => n.id === conn.to);
            
            if (fromIndex === -1 || toIndex === -1) return null;

            const fromAngle = (fromIndex / nodes.length) * 2 * Math.PI;
            const toAngle = (toIndex / nodes.length) * 2 * Math.PI;
            const radius = 120;

            const fromX = Math.cos(fromAngle) * radius;
            const fromY = Math.sin(fromAngle) * radius;
            const toX = Math.cos(toAngle) * radius;
            const toY = Math.sin(toAngle) * radius;

            return (
              <svg key={index} className="absolute inset-0 w-full h-full pointer-events-none">
                <line
                  x1={`calc(50% + ${fromX}px)`}
                  y1={`calc(50% + ${fromY}px)`}
                  x2={`calc(50% + ${toX}px)`}
                  y2={`calc(50% + ${toY}px)`}
                  stroke={conn.active ? '#fbbf24' : '#475569'}
                  strokeWidth={conn.active ? '3' : '1'}
                  strokeOpacity={conn.strength}
                  className="transition-all duration-500"
                />
              </svg>
            );
          })}

          {/* Central Echo Core */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center shadow-xl">
              <span className="font-bold text-white">ECHO</span>
            </div>
          </div>
        </div>
      </div>

      {/* System Metrics */}
      <div className="space-y-6">
        <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
          <div className="flex items-center gap-3 mb-6">
            <Activity className="w-6 h-6 text-green-400" />
            <h3 className="text-lg font-semibold">System Health</h3>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-slate-300">Overall Health</span>
                <span className="text-sm font-mono text-green-400">{systemHealth.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div 
                  className="h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${systemHealth}%` }}
                ></div>
              </div>
            </div>

            {nodes.map(node => (
              <div key={node.id}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-slate-300">{node.name}</span>
                  <span className={`text-sm font-mono ${
                    node.status === 'active' ? 'text-green-400' : 'text-yellow-400'
                  }`}>
                    {node.status}
                  </span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-1.5">
                  <div 
                    className={`h-1.5 rounded-full transition-all duration-500 bg-gradient-to-r ${getNodeColor(node.type, node.status)}`}
                    style={{ width: `${node.load * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-5 h-5 text-yellow-400" />
            <h3 className="text-lg font-semibold">Active Processes</h3>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              <span>Memory consolidation active</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
              <span>Pattern recognition running</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></div>
              <span>Identity coherence check</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
              <span>Logic engine on standby</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}