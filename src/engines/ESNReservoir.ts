/**
 * Echo State Network (ESN) Reservoir - Captures temporal dynamics
 * Handles pattern recognition and temporal memory processing
 */

export interface ReservoirState {
  id: string;
  values: number[];
  timestamp: number;
  activation: number;
}

export interface TemporalPattern {
  id: string;
  pattern: number[];
  frequency: number;
  significance: number;
  lastSeen: number;
}

export class ESNReservoir {
  private size: number;
  private spectralRadius: number;
  private connectivity: number;
  private weights: number[][];
  private states: ReservoirState[] = [];
  private patterns: Map<string, TemporalPattern> = new Map();
  private currentState: number[];

  constructor(size: number = 100, spectralRadius: number = 0.95, connectivity: number = 0.1) {
    this.size = size;
    this.spectralRadius = spectralRadius;
    this.connectivity = connectivity;
    this.weights = this.initializeWeights();
    this.currentState = new Array(size).fill(0);
  }

  private initializeWeights(): number[][] {
    const weights: number[][] = [];
    for (let i = 0; i < this.size; i++) {
      weights[i] = new Array(this.size).fill(0);
      for (let j = 0; j < this.size; j++) {
        if (Math.random() < this.connectivity) {
          weights[i][j] = (Math.random() - 0.5) * 2;
        }
      }
    }
    
    // Scale weights to achieve desired spectral radius
    const eigenvalues = this.approximateSpectralRadius(weights);
    const scale = this.spectralRadius / eigenvalues;
    
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        weights[i][j] *= scale;
      }
    }
    
    return weights;
  }

  private approximateSpectralRadius(weights: number[][]): number {
    // Simple power iteration approximation
    let vector = new Array(this.size).fill(1);
    
    for (let iter = 0; iter < 50; iter++) {
      const newVector = new Array(this.size).fill(0);
      
      for (let i = 0; i < this.size; i++) {
        for (let j = 0; j < this.size; j++) {
          newVector[i] += weights[i][j] * vector[j];
        }
      }
      
      const norm = Math.sqrt(newVector.reduce((sum, val) => sum + val * val, 0));
      vector = newVector.map(val => val / norm);
    }
    
    return Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0));
  }

  update(input: number[]): ReservoirState {
    const newState = new Array(this.size).fill(0);
    
    // Update reservoir state: new_state = tanh(W * old_state + W_in * input)
    for (let i = 0; i < this.size; i++) {
      let sum = 0;
      
      // Reservoir connections
      for (let j = 0; j < this.size; j++) {
        sum += this.weights[i][j] * this.currentState[j];
      }
      
      // Input connections (simplified)
      if (input && i < input.length) {
        sum += input[i] * 0.1; // Small input scaling
      }
      
      newState[i] = Math.tanh(sum);
    }
    
    this.currentState = newState;
    
    const state: ReservoirState = {
      id: `state-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      values: [...newState],
      timestamp: Date.now(),
      activation: this.calculateActivation(newState)
    };
    
    this.states.push(state);
    this.detectPatterns(state);
    
    // Keep only recent states
    if (this.states.length > 1000) {
      this.states = this.states.slice(-1000);
    }
    
    return state;
  }

  private calculateActivation(state: number[]): number {
    return state.reduce((sum, val) => sum + Math.abs(val), 0) / state.length;
  }

  private detectPatterns(_newState: ReservoirState): void {
    // Simple pattern detection based on activation patterns
    const recentStates = this.states.slice(-10);
    if (recentStates.length < 5) return;
    
    const pattern = recentStates.map(s => s.activation);
    const patternKey = this.hashPattern(pattern);
    
    if (this.patterns.has(patternKey)) {
      const existing = this.patterns.get(patternKey)!;
      existing.frequency++;
      existing.lastSeen = Date.now();
      existing.significance = Math.min(1.0, existing.frequency / 100);
    } else {
      this.patterns.set(patternKey, {
        id: patternKey,
        pattern,
        frequency: 1,
        significance: 0.01,
        lastSeen: Date.now()
      });
    }
  }

  private hashPattern(pattern: number[]): string {
    return pattern.map(p => Math.round(p * 100)).join(',');
  }

  getCurrentState(): number[] {
    return [...this.currentState];
  }

  getRecentStates(count: number = 10): ReservoirState[] {
    return this.states.slice(-count);
  }

  getPatterns(): TemporalPattern[] {
    return Array.from(this.patterns.values())
      .sort((a, b) => b.significance - a.significance);
  }

  getTemporalDynamics(): {
    entropy: number;
    stability: number;
    complexity: number;
  } {
    const recentStates = this.getRecentStates(50);
    if (recentStates.length === 0) {
      return { entropy: 0, stability: 0, complexity: 0 };
    }

    // Calculate entropy
    const activations = recentStates.map(s => s.activation);
    const entropy = this.calculateEntropy(activations);

    // Calculate stability (variance in activation)
    const meanActivation = activations.reduce((sum, a) => sum + a, 0) / activations.length;
    const variance = activations.reduce((sum, a) => sum + (a - meanActivation) ** 2, 0) / activations.length;
    const stability = 1 / (1 + variance);

    // Calculate complexity (number of significant patterns)
    const complexity = this.patterns.size / 100; // Normalized

    return { entropy, stability, complexity };
  }

  private calculateEntropy(values: number[]): number {
    const bins = 10;
    const counts = new Array(bins).fill(0);
    const max = Math.max(...values);
    const min = Math.min(...values);
    const range = max - min || 1;

    for (const value of values) {
      const bin = Math.min(bins - 1, Math.floor(((value - min) / range) * bins));
      counts[bin]++;
    }

    let entropy = 0;
    const total = values.length;
    for (const count of counts) {
      if (count > 0) {
        const p = count / total;
        entropy -= p * Math.log2(p);
      }
    }

    return entropy;
  }
}