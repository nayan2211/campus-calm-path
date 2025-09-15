import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Video, 
  Headphones, 
  Download,
  Search,
  Play,
  Clock,
  Star,
  Filter,
  Globe,
  Heart,
  Brain,
  Lightbulb
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'audio' | 'article' | 'guide';
  category: 'anxiety' | 'depression' | 'stress' | 'sleep' | 'mindfulness' | 'relationships';
  duration?: string;
  rating: number;
  downloads: number;
  language: string;
  level: 'beginner' | 'intermediate' | 'advanced';
}

const ResourcesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const resources: Resource[] = [
    {
      id: '1',
      title: 'Understanding Anxiety: A Student Guide',
      description: 'Comprehensive guide to recognizing and managing anxiety symptoms in academic settings',
      type: 'guide',
      category: 'anxiety',
      rating: 4.8,
      downloads: 1250,
      language: 'English',
      level: 'beginner'
    },
    {
      id: '2',
      title: 'Breathing Techniques for Instant Calm',
      description: 'Learn 5 evidence-based breathing exercises to reduce anxiety and stress',
      type: 'video',
      category: 'anxiety',
      duration: '8 min',
      rating: 4.9,
      downloads: 2100,
      language: 'English',
      level: 'beginner'
    },
    {
      id: '3',
      title: 'Progressive Muscle Relaxation',
      description: 'Guided audio session for deep relaxation and tension release',
      type: 'audio',
      category: 'stress',
      duration: '15 min',
      rating: 4.7,
      downloads: 1800,
      language: 'Hindi',
      level: 'beginner'
    },
    {
      id: '4',
      title: 'Overcoming Academic Procrastination',
      description: 'Evidence-based strategies to tackle procrastination and improve productivity',
      type: 'article',
      category: 'stress',
      rating: 4.6,
      downloads: 950,
      language: 'English',
      level: 'intermediate'
    },
    {
      id: '5',
      title: 'Sleep Hygiene for Students',
      description: 'Complete guide to improving sleep quality and establishing healthy sleep habits',
      type: 'guide',
      category: 'sleep',
      rating: 4.8,
      downloads: 1600,
      language: 'English',
      level: 'beginner'
    },
    {
      id: '6',
      title: 'Mindfulness Meditation - 20 Min Session',
      description: 'Guided mindfulness practice for stress reduction and mental clarity',
      type: 'audio',
      category: 'mindfulness',
      duration: '20 min',
      rating: 4.9,
      downloads: 2500,
      language: 'English',
      level: 'intermediate'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Resources', icon: BookOpen },
    { id: 'anxiety', label: 'Anxiety', icon: Heart },
    { id: 'depression', label: 'Depression', icon: Brain },
    { id: 'stress', label: 'Stress', icon: Lightbulb },
    { id: 'sleep', label: 'Sleep', icon: Clock },
    { id: 'mindfulness', label: 'Mindfulness', icon: Star },
    { id: 'relationships', label: 'Relationships', icon: Heart }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return Video;
      case 'audio': return Headphones;
      case 'article': return BookOpen;
      case 'guide': return BookOpen;
      default: return BookOpen;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'bg-red-100 text-red-700';
      case 'audio': return 'bg-green-100 text-green-700';
      case 'article': return 'bg-blue-100 text-blue-700';
      case 'guide': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-soft py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-6">
            <BookOpen className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">Wellness Resources</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Access evidence-based resources to support your mental health journey. 
            All content is available in multiple languages and designed for students.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="md:w-auto">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>

          {/* Category Tabs */}
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-7 mb-6">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <TabsTrigger 
                    key={category.id} 
                    value={category.id}
                    className="flex items-center gap-2 text-xs"
                  >
                    <Icon className="w-3 h-3" />
                    <span className="hidden sm:inline">{category.label}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </Tabs>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="shadow-soft border-0 text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary mb-1">150+</div>
              <div className="text-sm text-muted-foreground">Resources</div>
            </CardContent>
          </Card>
          <Card className="shadow-soft border-0 text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-secondary mb-1">5</div>
              <div className="text-sm text-muted-foreground">Languages</div>
            </CardContent>
          </Card>
          <Card className="shadow-soft border-0 text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-accent mb-1">98%</div>
              <div className="text-sm text-muted-foreground">Satisfaction</div>
            </CardContent>
          </Card>
          <Card className="shadow-soft border-0 text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-success mb-1">Free</div>
              <div className="text-sm text-muted-foreground">Always</div>
            </CardContent>
          </Card>
        </div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => {
            const TypeIcon = getTypeIcon(resource.type);
            return (
              <Card 
                key={resource.id} 
                className="shadow-medium border-0 hover:shadow-strong transition-all duration-300 group"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <Badge className={`${getTypeColor(resource.type)} border-0`}>
                      <TypeIcon className="w-3 h-3 mr-1" />
                      {resource.type}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-warning fill-current" />
                      <span className="text-sm font-medium">{resource.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors duration-300">
                    {resource.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {resource.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      {resource.duration && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {resource.duration}
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Globe className="w-3 h-3" />
                        {resource.language}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {resource.downloads.toLocaleString()} downloads
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {resource.level}
                      </Badge>
                    </div>
                    
                    <div className="flex gap-2 pt-2">
                      <Button size="sm" className="flex-1">
                        {resource.type === 'video' || resource.type === 'audio' ? (
                          <><Play className="w-3 h-3 mr-1" /> Play</>
                        ) : (
                          <><BookOpen className="w-3 h-3 mr-1" /> Read</>
                        )}
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* No Results */}
        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No resources found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or filter criteria
            </p>
            <Button onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}>
              Clear Filters
            </Button>
          </div>
        )}

        {/* Featured Section */}
        <div className="mt-16">
          <Card className="shadow-strong border-0 bg-gradient-accent text-accent-foreground">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">New to Mental Health Resources?</h3>
              <p className="text-lg opacity-90 mb-6">
                Start with our beginner-friendly guide that covers the basics of mental wellness
              </p>
              <Button variant="secondary" size="lg">
                <BookOpen className="w-5 h-5 mr-2" />
                Start Learning
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;