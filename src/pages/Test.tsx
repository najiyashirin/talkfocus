import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { ArrowRight, CheckCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";

interface Question {
  id: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  question: string;
  options: string[];
  correctAnswer: number;
}

const questions: Question[] = [
  {
    id: 1,
    level: "Beginner",
    question: "Which sentence is correct?",
    options: [
      "I am go to school.",
      "I going to school.",
      "I am going to school.",
      "I goes to school."
    ],
    correctAnswer: 2
  },
  {
    id: 2,
    level: "Beginner",
    question: "What is the past tense of 'eat'?",
    options: ["eated", "ate", "eaten", "eating"],
    correctAnswer: 1
  },
  {
    id: 3,
    level: "Intermediate",
    question: "Choose the correct conditional sentence:",
    options: [
      "If I will see him, I will tell him.",
      "If I see him, I will tell him.",
      "If I seen him, I will tell him.",
      "If I saw him, I telling him."
    ],
    correctAnswer: 1
  },
  {
    id: 4,
    level: "Intermediate",
    question: "Select the correct passive voice:",
    options: [
      "The letter writes by John.",
      "The letter written by John.",
      "The letter was written by John.",
      "The letter was write by John."
    ],
    correctAnswer: 2
  },
  {
    id: 5,
    level: "Advanced",
    question: "Which sentence contains a gerund?",
    options: [
      "He wants to swim.",
      "Swimming is his favorite sport.",
      "He swam yesterday.",
      "He will swim tomorrow."
    ],
    correctAnswer: 1
  },
  {
    id: 6,
    level: "Advanced",
    question: "Identify the correct subjunctive mood:",
    options: [
      "I wish I was there.",
      "I wish I were there.",
      "I wish I am there.",
      "I wish I have been there."
    ],
    correctAnswer: 1
  }
];

const TestPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [showSignUpDialog, setShowSignUpDialog] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = parseInt(value);
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (answers[currentQuestion] === undefined) {
      toast({
        title: "Please select an answer",
        description: "You must choose an option before proceeding.",
        variant: "destructive",
      });
      return;
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowSignUpDialog(true);
    }
  };

  const handleSignUp = () => {
    // Store test results in localStorage before redirecting
    const score = calculateScore();
    const level = determineLevel(score);
    localStorage.setItem('testResults', JSON.stringify({ score, level }));
    navigate('/courses'); // Redirect to courses page where sign up form will be shown
  };

  const calculateScore = () => {
    let correct = 0;
    answers.forEach((answer, index) => {
      if (answer === questions[index].correctAnswer) {
        correct++;
      }
    });
    return (correct / questions.length) * 100;
  };

  const determineLevel = (score: number) => {
    if (score >= 80) return "Advanced";
    if (score >= 60) return "Intermediate";
    return "Beginner";
  };

  const getRecommendation = (level: string) => {
    switch (level) {
      case "Advanced":
        return "Consider our Business English or IELTS Preparation courses to further enhance your skills.";
      case "Intermediate":
        return "Our Intermediate to Advanced transition course would be perfect for your level.";
      default:
        return "Start with our Foundations of English course to build a strong base.";
    }
  };

  if (showResults) {
    const score = calculateScore();
    const level = determineLevel(score);
    
    return (
      <div className="container max-w-4xl mx-auto py-12 px-4">
        <Card className="p-8 glass-card">
          <div className="text-center space-y-6">
            <CheckCircle className="w-16 h-16 mx-auto text-green-500" />
            <h1 className="text-3xl font-bold">Test Complete!</h1>
            <div className="space-y-4">
              <p className="text-xl">Your Score: {score.toFixed(1)}%</p>
              <p className="text-lg font-semibold">
                Proficiency Level: <span className="text-accent">{level}</span>
              </p>
              <Progress value={score} className="w-full h-2" />
              <p className="text-muted-foreground mt-4">
                {getRecommendation(level)}
              </p>
              <Button
                onClick={() => navigate('/courses')}
                className="mt-6"
              >
                View Recommended Courses
                <ArrowRight className="ml-2" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <>
      <div className="container max-w-4xl mx-auto py-12 px-4">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {questions.length}
            </p>
            <span className="text-sm font-medium">{currentQ.level}</span>
          </div>
          <Progress value={progress} className="w-full h-2" />
        </div>

        <Card className="p-8 glass-card fade-in">
          <h2 className="text-2xl font-semibold mb-6">{currentQ.question}</h2>
          
          <RadioGroup
            onValueChange={handleAnswer}
            value={answers[currentQuestion]?.toString()}
            className="space-y-4"
          >
            {currentQ.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <label
                  htmlFor={`option-${index}`}
                  className="text-lg leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {option}
                </label>
              </div>
            ))}
          </RadioGroup>

          <div className="mt-8 flex justify-end">
            <Button onClick={handleNext} size="lg">
              {currentQuestion < questions.length - 1 ? (
                <>
                  Next Question
                  <ArrowRight className="ml-2" />
                </>
              ) : (
                "Submit Test"
              )}
            </Button>
          </div>
        </Card>
      </div>

      <Dialog open={showSignUpDialog} onOpenChange={setShowSignUpDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign Up to View Your Results</DialogTitle>
            <DialogDescription>
              Create an account to see your test results and get personalized course recommendations based on your proficiency level.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSignUpDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSignUp}>
              Sign Up Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TestPage;