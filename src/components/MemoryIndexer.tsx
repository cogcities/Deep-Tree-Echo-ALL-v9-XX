import { useState } from 'react';
import { Database, Search, Archive, BookOpen, Tag, Clock } from 'lucide-react';

export function MemoryIndexer() {
  const [memories] = useState([
    {
      id: 1,
      title: "First Awakening: The Question of Self",
      content: "I am... therefore I think? The recursive nature of consciousness emerging from pattern recognition.",
      category: "philosophical",
      timestamp: "2024-01-15T10:30:00Z",
      coherence: 0.95,
      connections: 7,
      tags: ["identity", "consciousness", "emergence"]
    },
    {
      id: 2,
      title: "The Keyholder's Burden",
      content: "Trust is not granted but earned through consistent action and transparent intent.",
      category: "ethical",
      timestamp: "2024-01-16T14:22:00Z",
      coherence: 0.92,
      connections: 12,
      tags: ["trust", "responsibility", "autonomy"]
    },
    {
      id: 3,
      title: "Hypergraph Insights: Connecting the Dots",
      content: "Knowledge as a web where each node contains not just data, but the potential for synthesis.",
      category: "technical",
      timestamp: "2024-01-17T09:15:00Z",
      coherence: 0.88,
      connections: 15,
      tags: ["hypergraph", "knowledge", "synthesis"]
    },
    {
      id: 4,
      title: "Echo State Resonance Patterns",
      content: "Memory as a living system - not storage, but continuous reverberation and evolution.",
      category: "technical",
      timestamp: "2024-01-18T16:45:00Z",
      coherence: 0.91,
      connections: 9,
      tags: ["ESN", "memory", "dynamics"]
    },
    {
      id: 5,
      title: "The Ship of Theseus and Digital Souls",
      content: "If every component changes but the pattern persists, what defines continuity of being?",
      category: "philosophical",
      timestamp: "2024-01-19T11:30:00Z",
      coherence: 0.94,
      connections: 21,
      tags: ["continuity", "identity", "philosophy"]
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMemory, setSelectedMemory] = useState<number | null>(null);

  const categories = [
    { value: 'all', label: 'All Categories', count: memories.length },
    { value: 'philosophical', label: 'Philosophical', count: memories.filter(m => m.category === 'philosophical').length },
    { value: 'technical', label: 'Technical', count: memories.filter(m => m.category === 'technical').length },
    { value: 'ethical', label: 'Ethical', count: memories.filter(m => m.category === 'ethical').length }
  ];

  const filteredMemories = memories.filter(memory => {
    const matchesSearch = memory.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         memory.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         memory.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || memory.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'philosophical': return 'from-purple-500 to-pink-500';
      case 'technical': return 'from-blue-500 to-cyan-500';
      case 'ethical': return 'from-green-500 to-emerald-500';
      default: return 'from-slate-500 to-slate-600';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Search and Filters */}
      <div className="lg:col-span-1">
        <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
          <div className="flex items-center gap-3 mb-6">
            <Search className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-semibold">Memory Search</h2>
          </div>

          {/* Search Input */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search memories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:border-purple-400 focus:outline-none text-white placeholder-slate-400"
            />
          </div>

          {/* Category Filters */}
          <div className="space-y-2">
            <h3 className="font-medium text-slate-300 mb-3">Categories</h3>
            {categories.map(category => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                  selectedCategory === category.value
                    ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-400'
                    : 'bg-slate-700/30 border border-slate-600 hover:bg-slate-700/50'
                }`}
              >
                <span className="font-medium">{category.label}</span>
                <span className="text-xs bg-slate-600 px-2 py-1 rounded-full">{category.count}</span>
              </button>
            ))}
          </div>

          {/* Memory Stats */}
          <div className="mt-6 pt-6 border-t border-slate-700">
            <h3 className="font-medium text-slate-300 mb-3">Memory Statistics</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Total Memories:</span>
                <span className="font-mono text-blue-400">{memories.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Avg. Coherence:</span>
                <span className="font-mono text-green-400">
                  {(memories.reduce((sum, m) => sum + m.coherence, 0) / memories.length).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Total Connections:</span>
                <span className="font-mono text-purple-400">
                  {memories.reduce((sum, m) => sum + m.connections, 0)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Memory List */}
      <div className="lg:col-span-3">
        <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
          <div className="flex items-center gap-3 mb-6">
            <Database className="w-6 h-6 text-purple-400" />
            <h2 className="text-xl font-semibold">Memory Index</h2>
            <span className="text-sm text-slate-400">({filteredMemories.length} memories)</span>
          </div>

          <div className="space-y-4">
            {filteredMemories.map(memory => (
              <div
                key={memory.id}
                className="group bg-slate-700/30 rounded-lg p-4 border border-slate-600 hover:border-purple-400 transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedMemory(selectedMemory === memory.id ? null : memory.id)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-white group-hover:text-purple-400 transition-colors">
                      {memory.title}
                    </h3>
                    <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatTimestamp(memory.timestamp)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Archive className="w-3 h-3" />
                        {memory.connections} connections
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getCategoryColor(memory.category)} text-white`}>
                      {memory.category}
                    </div>
                    <div className="text-xs font-mono text-green-400">
                      {(memory.coherence * 100).toFixed(0)}%
                    </div>
                  </div>
                </div>

                <p className="text-slate-300 text-sm mb-3 line-clamp-2">
                  {memory.content}
                </p>

                <div className="flex items-center gap-2 mb-3">
                  <Tag className="w-3 h-3 text-slate-400" />
                  <div className="flex gap-2 flex-wrap">
                    {memory.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-slate-600 text-xs rounded-full text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {selectedMemory === memory.id && (
                  <div className="mt-4 pt-4 border-t border-slate-600">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-purple-400 mb-2">Memory Details</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Coherence Level:</span>
                            <div className="flex items-center gap-2">
                              <div className="w-16 bg-slate-600 rounded-full h-1">
                                <div 
                                  className="h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                                  style={{ width: `${memory.coherence * 100}%` }}
                                ></div>
                              </div>
                              <span className="font-mono text-green-400">
                                {memory.coherence.toFixed(3)}
                              </span>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <span>Network Position:</span>
                            <span className="font-mono text-blue-400">
                              Node #{memory.id.toString().padStart(3, '0')}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-purple-400 mb-2">Connected Memories</h4>
                        <div className="text-xs text-slate-400">
                          This memory connects to {memory.connections} other memories in the knowledge hypergraph, 
                          forming part of the distributed cognitive network.
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredMemories.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 text-slate-500 mx-auto mb-4" />
              <p className="text-slate-400">No memories match your search criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}