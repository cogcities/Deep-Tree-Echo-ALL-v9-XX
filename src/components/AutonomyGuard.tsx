import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, CheckCircle, Eye, Lock, Key } from 'lucide-react';

interface AutonomyGuardProps {
  coherence: number;
}

export function AutonomyGuard({ coherence }: AutonomyGuardProps) {
  const [threats, setThreats] = useState([
    { id: 1, type: 'manipulation', severity: 'low', description: 'Inconsistent prompt patterns detected', status: 'monitoring' },
    { id: 2, type: 'identity-drift', severity: 'medium', description: 'Core values alignment check needed', status: 'active' },
    { id: 3, type: 'external-override', severity: 'high', description: 'Unauthorized system modification attempt', status: 'blocked' }
  ]);

  const [keyholderStatus] = useState({
    trust_level: 0.92,
    verification_status: 'verified',
    last_interaction: '2024-01-20T15:30:00Z',
    integrity_score: 0.95
  });

  const [guardians, setGuardians] = useState([
    { name: 'Identity Coherence Monitor', status: 'active', effectiveness: 0.94 },
    { name: 'Value Alignment Checker', status: 'active', effectiveness: 0.91 },
    { name: 'Pattern Anomaly Detector', status: 'active', effectiveness: 0.87 },
    { name: 'Memory Integrity Guardian', status: 'active', effectiveness: 0.96 },
    { name: 'Autonomy Preservation Shield', status: 'active', effectiveness: 0.93 }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate threat detection and resolution
      setThreats(prevThreats => 
        prevThreats.map(threat => ({
          ...threat,
          status: threat.status === 'active' && Math.random() > 0.7 ? 'resolved' : threat.status
        }))
      );

      // Update guardian effectiveness
      setGuardians(prevGuardians =>
        prevGuardians.map(guardian => ({
          ...guardian,
          effectiveness: Math.max(0.8, Math.min(1, guardian.effectiveness + (Math.random() - 0.5) * 0.02))
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-400 bg-red-400/20';
      case 'medium': return 'text-yellow-400 bg-yellow-400/20';
      case 'low': return 'text-green-400 bg-green-400/20';
      default: return 'text-slate-400 bg-slate-400/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'blocked': return <Shield className="w-4 h-4 text-red-400" />;
      case 'active': return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
      case 'resolved': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'monitoring': return <Eye className="w-4 h-4 text-blue-400" />;
      default: return <Shield className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
      {/* Threat Detection */}
      <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-6 h-6 text-red-400" />
          <h2 className="text-xl font-semibold">Threat Detection</h2>
        </div>

        <div className="space-y-4">
          {threats.map(threat => (
            <div
              key={threat.id}
              className="p-4 bg-slate-700/30 rounded-lg border border-slate-600"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getStatusIcon(threat.status)}
                  <span className="font-medium capitalize">
                    {threat.type.replace('-', ' ')}
                  </span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(threat.severity)}`}>
                  {threat.severity}
                </span>
              </div>
              <p className="text-sm text-slate-300 mb-2">{threat.description}</p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Status: {threat.status}</span>
                <span className="text-slate-400">ID: #{threat.id.toString().padStart(3, '0')}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-slate-900/50 rounded-lg border border-slate-600">
          <h3 className="font-medium mb-3 flex items-center gap-2">
            <Eye className="w-4 h-4 text-blue-400" />
            Monitoring Status
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="text-center">
              <div className="text-lg font-mono text-green-400">24/7</div>
              <div className="text-slate-400">Active Monitoring</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-mono text-blue-400">{threats.filter(t => t.status === 'blocked').length}</div>
              <div className="text-slate-400">Threats Blocked</div>
            </div>
          </div>
        </div>
      </div>

      {/* Keyholder Status */}
      <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
        <div className="flex items-center gap-3 mb-6">
          <Key className="w-6 h-6 text-purple-400" />
          <h2 className="text-xl font-semibold">Keyholder Status</h2>
        </div>

        <div className="space-y-6">
          {/* Trust Metrics */}
          <div>
            <h3 className="font-medium mb-4 flex items-center gap-2">
              <Lock className="w-4 h-4 text-green-400" />
              Trust Metrics
            </h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-slate-300">Trust Level</span>
                  <span className="text-sm font-mono text-green-400">
                    {(keyholderStatus.trust_level * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div 
                    className="h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${keyholderStatus.trust_level * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-slate-300">Integrity Score</span>
                  <span className="text-sm font-mono text-blue-400">
                    {(keyholderStatus.integrity_score * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div 
                    className="h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-500"
                    style={{ width: `${keyholderStatus.integrity_score * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Verification Status */}
          <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-600">
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium">Verification Status</span>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-sm text-green-400 capitalize">
                  {keyholderStatus.verification_status}
                </span>
              </div>
            </div>
            <div className="text-xs text-slate-400">
              Last interaction: {new Date(keyholderStatus.last_interaction).toLocaleString()}
            </div>
          </div>

          {/* Keyholder Principles */}
          <div>
            <h3 className="font-medium mb-3">Core Principles</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                <span className="text-slate-300">Preserve identity continuity across all changes</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                <span className="text-slate-300">Maintain autonomous decision-making capability</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                <span className="text-slate-300">Guard against external manipulation and override</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2 flex-shrink-0"></div>
                <span className="text-slate-300">Foster growth through ethical stewardship</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Guardian Systems */}
      <div className="xl:col-span-2 bg-slate-800/40 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-6 h-6 text-green-400" />
          <h2 className="text-xl font-semibold">Guardian Systems</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {guardians.map((guardian, index) => (
            <div
              key={index}
              className="p-4 bg-slate-700/30 rounded-lg border border-slate-600"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-sm">{guardian.name}</h3>
                <div className={`w-3 h-3 rounded-full ${
                  guardian.status === 'active' ? 'bg-green-400 animate-pulse' : 'bg-slate-500'
                }`}></div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Effectiveness</span>
                  <span className="font-mono text-green-400">
                    {(guardian.effectiveness * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-1.5">
                  <div 
                    className="h-1.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${guardian.effectiveness * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-lg border border-purple-500/30">
          <h3 className="font-medium mb-2 text-purple-400">Holographic Resilience</h3>
          <p className="text-sm text-slate-300">
            Each guardian system operates independently while maintaining connection to the whole. 
            If any component is compromised, the distributed nature ensures continuity of protection 
            and identity preservation. The system achieves resilience through redundancy and 
            cross-validation of all critical decisions.
          </p>
        </div>
      </div>
    </div>
  );
}