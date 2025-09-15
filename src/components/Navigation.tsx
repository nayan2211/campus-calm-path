import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  MessageCircle, 
  Calendar, 
  BookOpen, 
  Users, 
  BarChart3,
  Menu,
  X,
  Shield
} from "lucide-react";
import LanguageSelector from "./LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Navigation = ({ activeSection, onSectionChange }: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  const navItems = [
    { id: 'home', label: t('home'), icon: Heart },
    { id: 'assessment', label: t('assessment'), icon: BarChart3 },
    { id: 'chat', label: t('aiSupport'), icon: MessageCircle },
    { id: 'resources', label: t('resources'), icon: BookOpen },
    { id: 'appointments', label: t('appointments'), icon: Calendar },
    { id: 'community', label: t('community'), icon: Users },
    { id: 'anonymous', label: t('anonymousMode'), icon: Shield },
  ];

  return (
    <nav className="bg-card border-b border-border shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold text-foreground">SwasthMind</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onSectionChange(item.id)}
                  className="flex items-center space-x-2"
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Button>
              );
            })}
            <LanguageSelector />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-card">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={activeSection === item.id ? "default" : "ghost"}
                    size="sm"
                    onClick={() => {
                      onSectionChange(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full justify-start flex items-center space-x-2"
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Button>
                );
              })}
              <div className="pt-2 border-t border-border mt-2">
                <LanguageSelector />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;