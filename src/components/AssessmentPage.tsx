import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  AlertCircle, 
  CheckCircle, 
  Heart, 
  Brain,
  ArrowLeft,
  ArrowRight,
  MessageCircle,
  Calendar,
  BookOpen
} from "lucide-react";

interface AssessmentPageProps {
  onSectionChange: (section: string) => void;
}

const PHQ9_QUESTIONS = [
  "Little interest or pleasure in doing things",
  "Feeling down, depressed, or hopeless",
  "Trouble falling or staying asleep, or sleeping too much",
  "Feeling tired or having little energy",
  "Poor appetite or overeating",
  "Feeling bad about yourself or that you are a failure or have let yourself or your family down",
  "Trouble concentrating on things, such as reading the newspaper or watching television",
  "Moving or speaking so slowly that other people could have noticed, or the opposite - being so fidgety or restless that you have been moving around a lot more than usual",
  "Thoughts that you would be better off dead, or of hurting yourself"
];

const GAD7_QUESTIONS = [
  "Feeling nervous, anxious, or on edge",
  "Not being able to stop or control worrying",
  "Worrying too much about different things",
  "Trouble relaxing",
  "Being so restless that it is hard to sit still",
  "Becoming easily annoyed or irritable",
  "Feeling afraid, as if something awful might happen"
];

const AssessmentPage = ({ onSectionChange }: AssessmentPageProps) => {
  const [currentAssessment, setCurrentAssessment] = useState<'selection' | 'phq9' | 'gad7' | 'results'>('selection');
  const [phq9Answers, setPHQ9Answers] = useState<{ [key: number]: number }>({});
  const [gad7Answers, setGAD7Answers] = useState<{ [key: number]: number }>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const calculatePHQ9Score = () => {
    return Object.values(phq9Answers).reduce((sum, value) => sum + value, 0);
  };

  const calculateGAD7Score = () => {
    return Object.values(gad7Answers).reduce((sum, value) => sum + value, 0);
  };

  const interpretPHQ9Score = (score: number) => {
    if (score <= 4) return { level: "Minimal", color: "bg-success", description: "Your responses suggest minimal depression symptoms." };
    if (score <= 9) return { level: "Mild", color: "bg-warning", description: "Your responses suggest mild depression symptoms." };
    if (score <= 14) return { level: "Moderate", color: "bg-destructive", description: "Your responses suggest moderate depression symptoms." };
    if (score <= 19) return { level: "Moderately Severe", color: "bg-destructive", description: "Your responses suggest moderately severe depression symptoms." };
    return { level: "Severe", color: "bg-destructive", description: "Your responses suggest severe depression symptoms." };
  };

  const interpretGAD7Score = (score: number) => {
    if (score <= 4) return { level: "Minimal", color: "bg-success", description: "Your responses suggest minimal anxiety symptoms." };
    if (score <= 9) return { level: "Mild", color: "bg-warning", description: "Your responses suggest mild anxiety symptoms." };
    if (score <= 14) return { level: "Moderate", color: "bg-destructive", description: "Your responses suggest moderate anxiety symptoms." };
    return { level: "Severe", color: "bg-destructive", description: "Your responses suggest severe anxiety symptoms." };
  };

  const handleAnswerSelect = (value: string) => {
    const numValue = parseInt(value);
    if (currentAssessment === 'phq9') {
      setPHQ9Answers({ ...phq9Answers, [currentQuestion]: numValue });
    } else if (currentAssessment === 'gad7') {
      setGAD7Answers({ ...gad7Answers, [currentQuestion]: numValue });
    }
  };

  const nextQuestion = () => {
    const questions = currentAssessment === 'phq9' ? PHQ9_QUESTIONS : GAD7_QUESTIONS;
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      if (currentAssessment === 'phq9') {
        setCurrentAssessment('gad7');
        setCurrentQuestion(0);
      } else {
        setCurrentAssessment('results');
      }
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else if (currentAssessment === 'gad7') {
      setCurrentAssessment('phq9');
      setCurrentQuestion(PHQ9_QUESTIONS.length - 1);
    }
  };

  const getCurrentAnswer = () => {
    const answers = currentAssessment === 'phq9' ? phq9Answers : gad7Answers;
    return answers[currentQuestion]?.toString() || '';
  };

  const options = [
    { value: "0", label: "Not at all" },
    { value: "1", label: "Several days" },
    { value: "2", label: "More than half the days" },
    { value: "3", label: "Nearly every day" }
  ];

  if (currentAssessment === 'selection') {
    return (
      <div className="min-h-screen bg-gradient-soft py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-6">
              <Brain className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">Mental Health Assessment</h1>
            <p className="text-lg text-muted-foreground">
              Take standardized assessments to better understand your mental health
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="shadow-medium border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-soft rounded-lg flex items-center justify-center">
                    <Heart className="w-5 h-5 text-primary" />
                  </div>
                  PHQ-9 Depression Assessment
                </CardTitle>
                <CardDescription>
                  Patient Health Questionnaire-9 measures depression severity over the past 2 weeks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground mb-4">
                  • 9 questions
                  • Takes 3-5 minutes
                  • Clinically validated
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-medium border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-secondary-soft rounded-lg flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-secondary" />
                  </div>
                  GAD-7 Anxiety Assessment
                </CardTitle>
                <CardDescription>
                  Generalized Anxiety Disorder-7 measures anxiety severity over the past 2 weeks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground mb-4">
                  • 7 questions
                  • Takes 2-4 minutes
                  • Clinically validated
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-strong border-0 bg-accent-soft">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Important Information</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Your responses are completely confidential</li>
                    <li>• This assessment is not a diagnostic tool</li>
                    <li>• Results should be discussed with a mental health professional</li>
                    <li>• If you're in crisis, please contact emergency services immediately</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-8">
            <Button 
              size="lg" 
              onClick={() => setCurrentAssessment('phq9')}
              className="shadow-medium"
            >
              Begin Assessment
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (currentAssessment === 'results') {
    const phq9Score = calculatePHQ9Score();
    const gad7Score = calculateGAD7Score();
    const phq9Result = interpretPHQ9Score(phq9Score);
    const gad7Result = interpretGAD7Score(gad7Score);

    return (
      <div className="min-h-screen bg-gradient-soft py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-6">
              <CheckCircle className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">Assessment Results</h1>
            <p className="text-lg text-muted-foreground">
              Here's what your responses indicate about your mental health
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="shadow-medium border-0">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Depression (PHQ-9)
                  <Badge className={`${phq9Result.color} text-white`}>
                    {phq9Result.level}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground mb-2">
                  {phq9Score} / 27
                </div>
                <p className="text-muted-foreground">{phq9Result.description}</p>
              </CardContent>
            </Card>

            <Card className="shadow-medium border-0">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Anxiety (GAD-7)
                  <Badge className={`${gad7Result.color} text-white`}>
                    {gad7Result.level}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground mb-2">
                  {gad7Score} / 21
                </div>
                <p className="text-muted-foreground">{gad7Result.description}</p>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-strong border-0 mb-8">
            <CardHeader>
              <CardTitle>Recommended Next Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => onSectionChange('chat')}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Get AI-guided support and coping strategies
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => onSectionChange('appointments')}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule appointment with a counselor
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => onSectionChange('resources')}
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Explore wellness resources and guides
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button 
              variant="outline" 
              onClick={() => {
                setCurrentAssessment('selection');
                setPHQ9Answers({});
                setGAD7Answers({});
                setCurrentQuestion(0);
              }}
            >
              Take Assessment Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const questions = currentAssessment === 'phq9' ? PHQ9_QUESTIONS : GAD7_QUESTIONS;
  const totalQuestions = PHQ9_QUESTIONS.length + GAD7_QUESTIONS.length;
  const currentQuestionNumber = currentAssessment === 'phq9' 
    ? currentQuestion + 1 
    : PHQ9_QUESTIONS.length + currentQuestion + 1;
  const progress = (currentQuestionNumber / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-gradient-soft py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Button 
              variant="ghost" 
              onClick={prevQuestion}
              disabled={currentQuestion === 0 && currentAssessment === 'phq9'}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <Badge variant="outline">
              {currentAssessment === 'phq9' ? 'PHQ-9' : 'GAD-7'}
            </Badge>
          </div>
          <div className="mb-2">
            <div className="flex justify-between text-sm text-muted-foreground mb-1">
              <span>Question {currentQuestionNumber} of {totalQuestions}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        <Card className="shadow-strong border-0">
          <CardHeader>
            <CardTitle className="text-xl">
              Over the last 2 weeks, how often have you been bothered by...
            </CardTitle>
            <CardDescription className="text-lg font-medium text-foreground">
              {questions[currentQuestion]}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup 
              value={getCurrentAnswer()} 
              onValueChange={handleAnswerSelect}
              className="space-y-4"
            >
              {options.map((option) => (
                <div key={option.value} className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="flex-1 cursor-pointer font-medium">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="mt-8 flex justify-between">
              <Button 
                variant="outline" 
                onClick={prevQuestion}
                disabled={currentQuestion === 0 && currentAssessment === 'phq9'}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button 
                onClick={nextQuestion}
                disabled={!getCurrentAnswer()}
              >
                {currentQuestion === questions.length - 1 && currentAssessment === 'gad7' 
                  ? 'View Results' 
                  : 'Next'
                }
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AssessmentPage;