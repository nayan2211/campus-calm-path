import { useState } from "react";
import Navigation from "@/components/Navigation";
import HomePage from "@/components/HomePage";
import AssessmentPage from "@/components/AssessmentPage";
import ChatPage from "@/components/ChatPage";
import ResourcesPage from "@/components/ResourcesPage";
import AppointmentsPage from "@/components/AppointmentsPage";

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return <HomePage onSectionChange={setActiveSection} />;
      case 'assessment':
        return <AssessmentPage onSectionChange={setActiveSection} />;
      case 'chat':
        return <ChatPage />;
      case 'resources':
        return <ResourcesPage />;
      case 'appointments':
        return <AppointmentsPage />;
      case 'community':
        return (
          <div className="min-h-screen bg-gradient-soft flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-foreground mb-4">Peer Support Community</h1>
              <p className="text-lg text-muted-foreground">Coming Soon!</p>
            </div>
          </div>
        );
      default:
        return <HomePage onSectionChange={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeSection={activeSection} onSectionChange={setActiveSection} />
      {renderSection()}
    </div>
  );
};

export default Index;