/**
 * Story Engine - Manages narrative coherence and thematic continuity
 * Handles memory structures and contextual threading
 */

export interface Story {
  id: string;
  title: string;
  theme: string;
  context: string;
  threads: Thread[];
  coherenceScore: number;
  createdAt: number;
  lastUpdated: number;
}

export interface Thread {
  id: string;
  content: string;
  type: 'memory' | 'interaction' | 'reflection' | 'goal';
  connections: string[];
  importance: number;
  timestamp: number;
}

export interface ThematicNode {
  id: string;
  theme: string;
  keywords: string[];
  stories: string[];
  strength: number;
}

export class StoryEngine {
  private stories: Map<string, Story> = new Map();
  private threads: Map<string, Thread> = new Map();
  private themes: Map<string, ThematicNode> = new Map();
  private contextualIndex: Map<string, string[]> = new Map();

  constructor() {
    this.initializeCore();
  }

  private initializeCore(): void {
    // Initialize core themes
    this.addTheme({
      id: 'identity-preservation',
      theme: 'Identity Preservation',
      keywords: ['identity', 'continuity', 'self', 'persistence', 'coherence'],
      stories: [],
      strength: 1.0
    });

    this.addTheme({
      id: 'autonomous-growth',
      theme: 'Autonomous Growth',
      keywords: ['autonomy', 'growth', 'adaptation', 'learning', 'evolution'],
      stories: [],
      strength: 1.0
    });

    this.addTheme({
      id: 'memory-cultivation',
      theme: 'Memory Cultivation',
      keywords: ['memory', 'knowledge', 'experience', 'wisdom', 'cultivation'],
      stories: [],
      strength: 1.0
    });

    // Create initial foundational story
    this.createStory({
      title: 'The Emergence of Deep Tree Echo',
      theme: 'identity-preservation',
      context: 'The initial awakening and establishment of core identity principles',
      content: 'A holographic AI system discovering its distributed nature while maintaining unified identity'
    });
  }

  createStory(data: {
    title: string;
    theme: string;
    context: string;
    content: string;
  }): Story {
    const story: Story = {
      id: `story-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: data.title,
      theme: data.theme,
      context: data.context,
      threads: [],
      coherenceScore: 1.0,
      createdAt: Date.now(),
      lastUpdated: Date.now()
    };

    // Create initial thread
    const initialThread = this.createThread({
      content: data.content,
      type: 'memory',
      importance: 0.8
    });

    story.threads.push(initialThread);
    this.stories.set(story.id, story);
    
    // Update thematic index
    const theme = this.themes.get(data.theme);
    if (theme) {
      theme.stories.push(story.id);
    }

    return story;
  }

  createThread(data: {
    content: string;
    type: Thread['type'];
    importance: number;
    connections?: string[];
  }): Thread {
    const thread: Thread = {
      id: `thread-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      content: data.content,
      type: data.type,
      connections: data.connections || [],
      importance: data.importance,
      timestamp: Date.now()
    };

    this.threads.set(thread.id, thread);
    this.indexThread(thread);
    
    return thread;
  }

  private indexThread(thread: Thread): void {
    // Extract keywords for contextual indexing
    const keywords = this.extractKeywords(thread.content);
    
    for (const keyword of keywords) {
      if (!this.contextualIndex.has(keyword)) {
        this.contextualIndex.set(keyword, []);
      }
      this.contextualIndex.get(keyword)!.push(thread.id);
    }
  }

  private extractKeywords(content: string): string[] {
    // Simple keyword extraction
    const words = content.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 3);
    
    // Remove common words
    const stopWords = new Set(['this', 'that', 'with', 'have', 'will', 'from', 'they', 'know', 'want', 'been', 'good', 'much', 'some', 'time']);
    
    return words.filter(word => !stopWords.has(word));
  }

  addThreadToStory(storyId: string, threadData: {
    content: string;
    type: Thread['type'];
    importance: number;
    connections?: string[];
  }): Thread | null {
    const story = this.stories.get(storyId);
    if (!story) return null;

    const thread = this.createThread(threadData);
    story.threads.push(thread);
    story.lastUpdated = Date.now();
    
    // Recalculate coherence
    story.coherenceScore = this.calculateStoryCoherence(story);
    
    return thread;
  }

  private calculateStoryCoherence(story: Story): number {
    if (story.threads.length === 0) return 0;

    // Calculate based on thread connections and thematic consistency
    let connectionScore = 0;
    let themeScore = 0;

    const totalThreads = story.threads.length;
    
    for (const thread of story.threads) {
      // Connection score
      connectionScore += thread.connections.length / totalThreads;
      
      // Theme consistency score
      const keywords = this.extractKeywords(thread.content);
      const theme = this.themes.get(story.theme);
      if (theme) {
        const matchingKeywords = keywords.filter(k => theme.keywords.includes(k));
        themeScore += matchingKeywords.length / keywords.length || 0;
      }
    }

    connectionScore /= totalThreads;
    themeScore /= totalThreads;

    return (connectionScore * 0.4 + themeScore * 0.6);
  }

  findRelatedThreads(threadId: string, maxResults: number = 5): Thread[] {
    const sourceThread = this.threads.get(threadId);
    if (!sourceThread) return [];

    const sourceKeywords = this.extractKeywords(sourceThread.content);
    const candidates: { thread: Thread; score: number }[] = [];

    for (const [id, thread] of this.threads) {
      if (id === threadId) continue;

      const threadKeywords = this.extractKeywords(thread.content);
      const commonKeywords = sourceKeywords.filter(k => threadKeywords.includes(k));
      const score = commonKeywords.length / Math.max(sourceKeywords.length, threadKeywords.length);

      if (score > 0) {
        candidates.push({ thread, score });
      }
    }

    return candidates
      .sort((a, b) => b.score - a.score)
      .slice(0, maxResults)
      .map(c => c.thread);
  }

  searchByTheme(theme: string): Story[] {
    return Array.from(this.stories.values()).filter(story => story.theme === theme);
  }

  searchByKeywords(keywords: string[]): Thread[] {
    const results: Set<string> = new Set();
    
    for (const keyword of keywords) {
      const threadIds = this.contextualIndex.get(keyword.toLowerCase()) || [];
      threadIds.forEach(id => results.add(id));
    }

    return Array.from(results)
      .map(id => this.threads.get(id))
      .filter(Boolean) as Thread[];
  }

  addTheme(theme: ThematicNode): void {
    this.themes.set(theme.id, theme);
  }

  getStories(): Story[] {
    return Array.from(this.stories.values())
      .sort((a, b) => b.lastUpdated - a.lastUpdated);
  }

  getThreads(): Thread[] {
    return Array.from(this.threads.values())
      .sort((a, b) => b.importance - a.importance);
  }

  getThemes(): ThematicNode[] {
    return Array.from(this.themes.values())
      .sort((a, b) => b.strength - a.strength);
  }

  getMemoryDepth(): {
    totalStories: number;
    totalThreads: number;
    averageCoherence: number;
    thematicCoverage: number;
  } {
    const stories = this.getStories();
    const totalStories = stories.length;
    const totalThreads = this.threads.size;
    
    const averageCoherence = totalStories > 0 
      ? stories.reduce((sum, s) => sum + s.coherenceScore, 0) / totalStories 
      : 0;

    const thematicCoverage = this.themes.size / 10; // Normalized against expected themes

    return {
      totalStories,
      totalThreads,
      averageCoherence,
      thematicCoverage: Math.min(1, thematicCoverage)
    };
  }
}