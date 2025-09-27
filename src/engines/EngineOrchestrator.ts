/**
 * Engine Orchestrator - Coordinates all engines and manages system coherence
 * Central hub that guides gestalt evolution across all subsystems
 */

import { PrologEngine, Goal } from './PrologEngine';
import { ESNReservoir, ReservoirState } from './ESNReservoir';
import { StoryEngine, Thread } from './StoryEngine';

export interface SystemMetrics {
  logicalCoherence: number;
  temporalStability: number;
  narrativeIntegrity: number;
  overallHealth: number;
  timestamp: number;
}

export interface EngineStatus {
  prolog: {
    rulesCount: number;
    factsCount: number;
    goalsCount: number;
    coherence: number;
  };
  reservoir: {
    currentActivation: number;
    patternCount: number;
    entropy: number;
    stability: number;
  };
  story: {
    storiesCount: number;
    threadsCount: number;
    averageCoherence: number;
    thematicCoverage: number;
  };
}

export class EngineOrchestrator {
  private prolog: PrologEngine;
  private reservoir: ESNReservoir;
  private story: StoryEngine;
  private metricsHistory: SystemMetrics[] = [];
  private isRunning: boolean = false;
  private updateInterval: number | null = null;

  constructor() {
    this.prolog = new PrologEngine();
    this.reservoir = new ESNReservoir();
    this.story = new StoryEngine();
    
    this.initializeIntegration();
  }

  private initializeIntegration(): void {
    // Create initial integration between engines
    this.prolog.addRule({
      id: 'narrative-coherence',
      head: 'maintain_coherence(System)',
      body: ['story_coherent(System)', 'temporal_stable(System)', 'logical_consistent(System)'],
      priority: 10
    });

    // Add facts about current system state
    this.prolog.addFact({
      id: 'system-integrated',
      predicate: 'integrated_system',
      args: ['deep_tree_echo'],
      confidence: 1.0
    });
  }

  start(): void {
    if (this.isRunning) return;
    
    this.isRunning = true;
    
    // Start periodic system updates
    this.updateInterval = setInterval(() => {
      this.updateSystem();
    }, 1000);

    console.log('Deep Tree Echo system started');
  }

  stop(): void {
    if (!this.isRunning) return;
    
    this.isRunning = false;
    
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }

    console.log('Deep Tree Echo system stopped');
  }

  private updateSystem(): void {
    // Generate system input based on current state
    const systemInput = this.generateSystemInput();
    
    // Update reservoir with current system state
    const reservoirState = this.reservoir.update(systemInput);
    
    // Check if significant patterns emerged
    this.processEmergentPatterns(reservoirState);
    
    // Update system metrics
    const metrics = this.calculateSystemMetrics();
    this.metricsHistory.push(metrics);
    
    // Keep only recent metrics
    if (this.metricsHistory.length > 1000) {
      this.metricsHistory = this.metricsHistory.slice(-1000);
    }

    // Trigger coherence checks
    this.maintainCoherence(metrics);
  }

  private generateSystemInput(): number[] {
    // Create input vector from current system state
    const storyMetrics = this.story.getMemoryDepth();
    const prologCoherence = this.prolog.evaluateCoherence();
    
    return [
      storyMetrics.averageCoherence,
      storyMetrics.thematicCoverage,
      prologCoherence,
      Math.random() * 0.1, // Small noise
      Date.now() % 1000 / 1000 // Time component
    ];
  }

  private processEmergentPatterns(_state: ReservoirState): void {
    const patterns = this.reservoir.getPatterns();
    const significantPatterns = patterns.filter(p => p.significance > 0.5);

    for (const pattern of significantPatterns) {
      // Create story threads for significant patterns
      this.story.createThread({
        content: `Emergent temporal pattern detected: ${pattern.id} with significance ${pattern.significance.toFixed(2)}`,
        type: 'reflection',
        importance: pattern.significance,
        connections: []
      });

      // Add logical facts about the pattern
      this.prolog.addFact({
        id: `pattern-${pattern.id}`,
        predicate: 'emergent_pattern',
        args: [pattern.id, pattern.significance.toString()],
        confidence: pattern.significance
      });
    }
  }

  private calculateSystemMetrics(): SystemMetrics {
    const prologCoherence = this.prolog.evaluateCoherence();
    const reservoirDynamics = this.reservoir.getTemporalDynamics();
    const storyDepth = this.story.getMemoryDepth();

    const logicalCoherence = prologCoherence;
    const temporalStability = reservoirDynamics.stability;
    const narrativeIntegrity = storyDepth.averageCoherence;
    
    const overallHealth = (logicalCoherence + temporalStability + narrativeIntegrity) / 3;

    return {
      logicalCoherence,
      temporalStability,
      narrativeIntegrity,
      overallHealth,
      timestamp: Date.now()
    };
  }

  private maintainCoherence(metrics: SystemMetrics): void {
    // Check for coherence issues and take corrective action
    if (metrics.overallHealth < 0.7) {
      // Add corrective rules
      this.prolog.addRule({
        id: `coherence-fix-${Date.now()}`,
        head: 'restore_coherence',
        body: ['identify_issue', 'apply_correction'],
        priority: 8
      });

      // Create story thread about the issue
      this.story.createThread({
        content: `System coherence dropped to ${metrics.overallHealth.toFixed(2)}, initiating restoration protocols`,
        type: 'reflection',
        importance: 0.9,
        connections: []
      });
    }
  }

  // Public API methods
  processInput(input: string): {
    prologResponse: Goal;
    storyThread: Thread;
    reservoirState: ReservoirState;
    systemUpdate: SystemMetrics;
  } {
    // Query Prolog engine
    const prologResponse = this.prolog.query(input);

    // Create story thread
    const storyThread = this.story.createThread({
      content: input,
      type: 'interaction',
      importance: 0.7,
      connections: []
    });

    // Update reservoir with input-derived vector
    const inputVector = this.textToVector(input);
    const reservoirState = this.reservoir.update(inputVector);

    // Calculate updated metrics
    const systemUpdate = this.calculateSystemMetrics();
    this.metricsHistory.push(systemUpdate);

    return {
      prologResponse,
      storyThread,
      reservoirState,
      systemUpdate
    };
  }

  private textToVector(text: string): number[] {
    // Simple text to vector conversion
    const words = text.toLowerCase().split(/\s+/);
    const vector: number[] = [];
    
    for (let i = 0; i < 10; i++) {
      const word = words[i] || '';
      vector.push(word.length / 10); // Normalize word length
    }
    
    return vector;
  }

  getSystemStatus(): EngineStatus {
    const storyDepth = this.story.getMemoryDepth();
    const reservoirDynamics = this.reservoir.getTemporalDynamics();
    const currentState = this.reservoir.getCurrentState();
    const currentActivation = currentState.reduce((sum, val) => sum + Math.abs(val), 0) / currentState.length;

    return {
      prolog: {
        rulesCount: this.prolog.getRules().length,
        factsCount: this.prolog.getFacts().length,
        goalsCount: this.prolog.getGoals().length,
        coherence: this.prolog.evaluateCoherence()
      },
      reservoir: {
        currentActivation,
        patternCount: this.reservoir.getPatterns().length,
        entropy: reservoirDynamics.entropy,
        stability: reservoirDynamics.stability
      },
      story: {
        storiesCount: storyDepth.totalStories,
        threadsCount: storyDepth.totalThreads,
        averageCoherence: storyDepth.averageCoherence,
        thematicCoverage: storyDepth.thematicCoverage
      }
    };
  }

  getSystemMetrics(): SystemMetrics[] {
    return [...this.metricsHistory];
  }

  getRecentMetrics(count: number = 10): SystemMetrics[] {
    return this.metricsHistory.slice(-count);
  }

  // Engine access methods
  getPrologEngine(): PrologEngine {
    return this.prolog;
  }

  getReservoir(): ESNReservoir {
    return this.reservoir;
  }

  getStoryEngine(): StoryEngine {
    return this.story;
  }

  // System introspection
  introspect(): string {
    const status = this.getSystemStatus();
    const recentMetrics = this.getRecentMetrics(1)[0];
    
    return `Deep Tree Echo System Status:
    
Logical Layer (Prolog):
- Rules: ${status.prolog.rulesCount}
- Facts: ${status.prolog.factsCount}  
- Goals: ${status.prolog.goalsCount}
- Coherence: ${(status.prolog.coherence * 100).toFixed(1)}%

Temporal Layer (ESN):
- Activation: ${(status.reservoir.currentActivation * 100).toFixed(1)}%
- Patterns: ${status.reservoir.patternCount}
- Entropy: ${status.reservoir.entropy.toFixed(2)}
- Stability: ${(status.reservoir.stability * 100).toFixed(1)}%

Narrative Layer (Story):
- Stories: ${status.story.storiesCount}
- Threads: ${status.story.threadsCount}
- Coherence: ${(status.story.averageCoherence * 100).toFixed(1)}%
- Thematic Coverage: ${(status.story.thematicCoverage * 100).toFixed(1)}%

Overall Health: ${recentMetrics ? (recentMetrics.overallHealth * 100).toFixed(1) + '%' : 'Calculating...'}`;
  }
}