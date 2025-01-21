import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, BookOpen, Users, Award } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Personalized Learning",
      description: "Tailored courses to match your learning style and goals",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Expert Teachers",
      description: "Learn from experienced native English speakers",
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Certified Programs",
      description: "Internationally recognized certification upon completion",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Business Professional",
      content: "The personalized approach helped me achieve my language goals faster than I expected.",
    },
    {
      name: "Michael Chen",
      role: "University Student",
      content: "Outstanding teaching methods and supportive environment. Highly recommended!",
    },
    {
      name: "Emma Rodriguez",
      role: "High School Student",
      content: "Thanks to this academy, I improved my English significantly and gained confidence.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 fade-in">
            Master English with
            <span className="text-accent"> Confidence</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 fade-in">
            Join our academy for personalized English courses tailored to your goals.
            Start your journey to fluency today.
          </p>
          <div className="space-x-4 fade-in">
            <Button size="lg" className="hover-lift">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="hover-lift">
              Take Free Test
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose Our Academy?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 glass-card hover-lift">
                <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Student Testimonials
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 glass-card hover-lift">
                <p className="text-lg mb-4">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-accent text-accent-foreground">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your English Journey?
          </h2>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Join our academy today and take the first step towards English fluency.
          </p>
          <Button size="lg" variant="secondary" className="hover-lift">
            Enroll Now
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;