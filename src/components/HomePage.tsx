import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Heart, 
  Shield, 
  Clock, 
  Users, 
  MessageCircle, 
  Calendar,
  BookOpen,
  BarChart3,
  ArrowRight
} from "lucide-react";

interface HomePageProps {
  onSectionChange: (section: string) => void;
}

const HomePage = ({ onSectionChange }: HomePageProps) => {
  const features = [
    {
      icon: BarChart3,
      title: "Mental Health Assessment",
      description: "Take standardized PHQ-9 and GAD-7 assessments to understand your mental health status",
      action: () => onSectionChange('assessment'),
      color: "bg-primary-soft"
    },
    {
      icon: MessageCircle,
      title: "AI-Guided Support",
      description: "Get immediate support through our AI chat system with evidence-based coping strategies",
      action: () => onSectionChange('chat'),
      color: "bg-secondary-soft"
    },
    {
      icon: Calendar,
      title: "Professional Appointments",
      description: "Book confidential appointments with licensed counselors and mental health professionals",
      action: () => onSectionChange('appointments'),
      color: "bg-accent-soft"
    },
    {
      icon: BookOpen,
      title: "Wellness Resources",
      description: "Access videos, audio guides, and educational materials in multiple languages",
      action: () => onSectionChange('resources'),
      color: "bg-primary-soft"
    }
  ];

  const stats = [
    { label: "Students Helped", value: "2,500+", icon: Users },
    { label: "Response Time", value: "< 2 min", icon: Clock },
    { label: "Privacy Protected", value: "100%", icon: Shield },
    { label: "Success Rate", value: "94%", icon: Heart }
  ];

  return (
    <div className="min-h-screen bg-gradient-soft">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-6">
              <Heart className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Your Mental Health
              <span className="block text-primary">Matters</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              A comprehensive digital platform designed specifically for students in higher education. 
              Get confidential, accessible, and culturally-sensitive mental health support when you need it most.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="shadow-medium"
                onClick={() => onSectionChange('assessment')}
              >
                Start Assessment
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => onSectionChange('chat')}
              >
                Get Support Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="text-center shadow-soft border-0">
                  <CardContent className="pt-6">
                    <Icon className="w-8 h-8 text-primary mx-auto mb-3" />
                    <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Comprehensive Mental Health Support
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need for your mental wellness journey, designed with students in mind
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index} 
                  className="shadow-medium border-0 hover:shadow-strong transition-all duration-300 cursor-pointer group"
                  onClick={feature.action}
                >
                  <CardHeader className="pb-4">
                    <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{feature.description}</p>
                    <div className="flex items-center text-primary font-medium group-hover:translate-x-2 transition-transform duration-300">
                      Get Started
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-strong border-0 bg-gradient-primary text-primary-foreground">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to take control of your mental health?</h3>
              <p className="text-lg opacity-90 mb-6">
                Join thousands of students who have found support through our platform
              </p>
              <Button 
                variant="secondary" 
                size="lg"
                onClick={() => onSectionChange('assessment')}
              >
                Begin Your Journey
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default HomePage;