import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, MessageCircle, UserCheck, Eye, EyeOff } from "lucide-react";
import ChatPage from "./ChatPage";
import AppointmentsPage from "./AppointmentsPage";
import anonymousImage from "@/assets/anonymous-mode.png";

interface AnonymousPageProps {
  onSectionChange?: (section: string) => void;
}

const AnonymousPage = ({ onSectionChange }: AnonymousPageProps) => {
  const [activeMode, setActiveMode] = useState<'landing' | 'chat' | 'appointments'>('landing');
  const [isAnonymous, setIsAnonymous] = useState(true);

  if (activeMode === 'chat') {
    return (
      <div className="min-h-screen bg-gradient-soft">
        <div className="container mx-auto px-4 py-6">
          <div className="mb-6 flex items-center justify-between">
            <Button 
              variant="outline" 
              onClick={() => setActiveMode('landing')}
            >
              ← Back to Anonymous Mode
            </Button>
            <Badge variant="secondary" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Anonymous Session Active
            </Badge>
          </div>
          <ChatPage />
        </div>
      </div>
    );
  }

  if (activeMode === 'appointments') {
    return (
      <div className="min-h-screen bg-gradient-soft">
        <div className="container mx-auto px-4 py-6">
          <div className="mb-6 flex items-center justify-between">
            <Button 
              variant="outline" 
              onClick={() => setActiveMode('landing')}
            >
              ← Back to Anonymous Mode
            </Button>
            <Badge variant="secondary" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Anonymous Booking
            </Badge>
          </div>
          <AppointmentsPage />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-soft">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="outline" className="flex items-center gap-2 w-fit">
                <Shield className="h-4 w-4" />
                100% Anonymous & Encrypted
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                Continue
                <span className="text-primary block">anonymously</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-md">
                Talk privately with our mental health chatbot — your identity stays hidden.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90"
                onClick={() => setActiveMode('chat')}
              >
                Continue anonymously
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => setIsAnonymous(!isAnonymous)}
              >
                {isAnonymous ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                Why anonymous?
              </Button>
            </div>

            <div className="space-y-3 text-sm text-muted-foreground">
              <p>Chats are end-to-end encrypted and tied to an anonymous ID stored only on your device.</p>
              <p>You can request a confidential referral to a counsellor without sharing your name.</p>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <img 
              src={anonymousImage} 
              alt="Person using laptop for anonymous mental health support"
              className="max-w-md w-full h-auto rounded-2xl shadow-glow"
            />
          </div>
        </div>

        {/* Privacy Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center p-6 border-none shadow-elegant bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <Shield className="h-12 w-12 text-primary mx-auto mb-3" />
              <CardTitle className="text-lg">End-to-End Encrypted</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                All conversations are encrypted and stored locally on your device only.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 border-none shadow-elegant bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <MessageCircle className="h-12 w-12 text-primary mx-auto mb-3" />
              <CardTitle className="text-lg">No Personal Data</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                We don't collect names, emails, or any identifying information.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 border-none shadow-elegant bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <UserCheck className="h-12 w-12 text-primary mx-auto mb-3" />
              <CardTitle className="text-lg">Anonymous Referrals</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Get professional help referrals without revealing your identity.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Services */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Anonymous Support Options
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Access the same quality mental health support while maintaining complete privacy.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card 
              className="p-6 cursor-pointer transition-all duration-300 hover:shadow-glow border-none bg-card/50 backdrop-blur-sm"
              onClick={() => setActiveMode('chat')}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <MessageCircle className="h-8 w-8 text-primary" />
                  <CardTitle className="text-xl">AI Chat Support</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Get immediate support through our AI-powered mental health assistant. Available 24/7 with complete privacy.
                </p>
                <Button className="w-full">
                  Start Anonymous Chat
                </Button>
              </CardContent>
            </Card>

            <Card 
              className="p-6 cursor-pointer transition-all duration-300 hover:shadow-glow border-none bg-card/50 backdrop-blur-sm"
              onClick={() => setActiveMode('appointments')}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <UserCheck className="h-8 w-8 text-primary" />
                  <CardTitle className="text-xl">Anonymous Booking</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Book confidential appointments with professional counsellors without sharing personal details.
                </p>
                <Button variant="outline" className="w-full">
                  Book Anonymously
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnonymousPage;