import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  Heart,
  AlertTriangle,
  Phone,
  Clock
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hello! I'm here to provide you with mental health support and coping strategies. How are you feeling today?",
      timestamp: new Date(),
      suggestions: [
        "I'm feeling anxious",
        "I'm having trouble sleeping",
        "I feel overwhelmed with studies",
        "I'm feeling lonely"
      ]
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response (in real implementation, this would call your AI service)
    setTimeout(() => {
      const botResponse = generateResponse(message);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateResponse = (userMessage: string): Message => {
    // Simple response generator - in real implementation, this would use AI
    const responses = {
      anxiety: {
        content: "I understand you're feeling anxious. Let's try a simple breathing exercise: Breathe in for 4 counts, hold for 4, then breathe out for 6. This activates your parasympathetic nervous system and can help reduce anxiety. Would you like to try this now?",
        suggestions: ["Yes, let's try breathing exercises", "Tell me more coping strategies", "I need professional help"]
      },
      sleep: {
        content: "Sleep troubles are common among students. Here are some evidence-based tips: Keep a consistent sleep schedule, avoid screens 1 hour before bed, and try progressive muscle relaxation. Creating a bedtime routine can signal to your brain that it's time to wind down.",
        suggestions: ["Tell me about progressive muscle relaxation", "What should I do if I can't fall asleep?", "I think I need to talk to someone"]
      },
      overwhelmed: {
        content: "Feeling overwhelmed with studies is very common. Let's break this down: 1) Prioritize tasks using the Eisenhower Matrix, 2) Take regular breaks (Pomodoro technique), 3) Practice self-compassion. Remember, it's okay to ask for help. What specific aspect feels most overwhelming?",
        suggestions: ["Time management help", "I'm behind on assignments", "I'm worried about exams", "Connect me with a counselor"]
      },
      lonely: {
        content: "Loneliness can be really difficult, especially as a student. You're not alone in feeling this way. Consider: joining student groups with similar interests, reaching out to one person today, or attending campus events. Sometimes taking small social steps can make a big difference.",
        suggestions: ["How do I make friends in college?", "I'm too shy to join groups", "Tell me about peer support", "I need to talk to someone"]
      },
      default: {
        content: "Thank you for sharing that with me. I'm here to listen and support you. Can you tell me more about what you're experiencing? Remember, if you're having thoughts of self-harm, please reach out to emergency services or a crisis helpline immediately.",
        suggestions: ["I'm feeling depressed", "I'm stressed about the future", "I need immediate help", "Connect me with resources"]
      }
    };

    const lowerMessage = userMessage.toLowerCase();
    let responseKey: keyof typeof responses = 'default';

    if (lowerMessage.includes('anxious') || lowerMessage.includes('anxiety') || lowerMessage.includes('nervous')) {
      responseKey = 'anxiety';
    } else if (lowerMessage.includes('sleep') || lowerMessage.includes('insomnia') || lowerMessage.includes('tired')) {
      responseKey = 'sleep';
    } else if (lowerMessage.includes('overwhelmed') || lowerMessage.includes('stressed') || lowerMessage.includes('studies')) {
      responseKey = 'overwhelmed';
    } else if (lowerMessage.includes('lonely') || lowerMessage.includes('alone') || lowerMessage.includes('isolated')) {
      responseKey = 'lonely';
    }

    return {
      id: Date.now().toString(),
      type: 'bot',
      content: responses[responseKey].content,
      timestamp: new Date(),
      suggestions: responses[responseKey].suggestions
    };
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      <div className="max-w-4xl mx-auto py-8 px-4 h-screen flex flex-col">
        {/* Header */}
        <div className="mb-6">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-4">
              <MessageCircle className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">AI Mental Health Support</h1>
            <p className="text-muted-foreground">Get immediate support and evidence-based coping strategies</p>
          </div>

          {/* Emergency Notice */}
          <Card className="mb-6 border-warning bg-warning/5">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-warning mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">Crisis Support Available 24/7</p>
                  <p className="text-xs text-muted-foreground">
                    If you're having thoughts of self-harm, please contact emergency services (108) or 
                    the national suicide prevention helpline immediately.
                  </p>
                </div>
                <Button size="sm" variant="outline" className="ml-auto">
                  <Phone className="w-4 h-4 mr-1" />
                  Call Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chat Container */}
        <Card className="flex-1 flex flex-col shadow-strong border-0">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-secondary-soft rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-secondary" />
              </div>
              <div>
                <CardTitle className="text-lg">MindCare AI Assistant</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  Online • Responds in ~2 minutes
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          {/* Messages */}
          <CardContent className="flex-1 flex flex-col">
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {message.type === 'bot' && (
                      <div className="w-8 h-8 bg-secondary-soft rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <Bot className="w-4 h-4 text-secondary" />
                      </div>
                    )}
                    <div className={`max-w-sm lg:max-w-md ${message.type === 'user' ? 'order-1' : ''}`}>
                      <div className={`p-3 rounded-lg ${
                        message.type === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted'
                      }`}>
                        <p className="text-sm">{message.content}</p>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      
                      {/* Suggestions */}
                      {message.suggestions && message.type === 'bot' && (
                        <div className="mt-3 space-y-2">
                          {message.suggestions.map((suggestion, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              className="text-xs h-8"
                              onClick={() => handleSendMessage(suggestion)}
                            >
                              {suggestion}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                    {message.type === 'user' && (
                      <div className="w-8 h-8 bg-primary-soft rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <User className="w-4 h-4 text-primary" />
                      </div>
                    )}
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 bg-secondary-soft rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot className="w-4 h-4 text-secondary" />
                    </div>
                    <div className="bg-muted p-3 rounded-lg">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse delay-75"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse delay-150"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="mt-4 flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message here..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputMessage)}
                className="flex-1"
              />
              <Button 
                onClick={() => handleSendMessage(inputMessage)}
                disabled={!inputMessage.trim()}
                className="px-3"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChatPage;