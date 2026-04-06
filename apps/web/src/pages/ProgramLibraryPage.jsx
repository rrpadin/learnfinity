
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import pb from '@/lib/pocketbaseClient';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import ProgramCard from '@/components/ProgramCard.jsx';
import { Search, BookOpen } from 'lucide-react';
import { toast } from 'sonner';

function ProgramLibraryPage() {
  const navigate = useNavigate();
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      setLoading(true);
      const records = await pb.collection('programs').getFullList({
        sort: '-created',
        $autoCancel: false
      });
      setPrograms(records);
    } catch (error) {
      console.error("Error fetching programs:", error);
      toast.error("Failed to load programs library.");
    } finally {
      setLoading(false);
    }
  };

  const filteredPrograms = programs
    .filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'duration') return a.duration_days - b.duration_days;
      if (sortBy === 'popularity') return (b.enrollment_count || 0) - (a.enrollment_count || 0);
      return new Date(b.created) - new Date(a.created); // newest
    });

  const categories = [...new Set(programs.map(p => p.category).filter(Boolean))];

  return (
    <>
      <Helmet>
        <title>Program Library - Learnfinity</title>
        <meta name="description" content="Explore our library of AI learning programs and sprints." />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        {/* Hero Section */}
        <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1624388611710-bdf95023d1c2" 
            alt="Abstract digital art representing learning and AI" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
              Program Library
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl">
              Discover structured learning paths designed to accelerate your AI mastery.
            </p>
          </div>
        </div>

        <div className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Filters & Search */}
          <div className="flex flex-col md:flex-row gap-4 mb-10">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search programs..." 
                className="pl-10 bg-card"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[160px] bg-card">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[160px] bg-card">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="popularity">Most Popular</SelectItem>
                  <SelectItem value="duration">Duration</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <Skeleton key={i} className="h-[300px] rounded-2xl" />
              ))}
            </div>
          ) : filteredPrograms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPrograms.map(program => (
                <ProgramCard 
                  key={program.id} 
                  program={program} 
                  onAction={(p) => navigate(`/programs/${p.id}`)} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-muted/30 rounded-2xl border border-dashed">
              <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No programs found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ProgramLibraryPage;
