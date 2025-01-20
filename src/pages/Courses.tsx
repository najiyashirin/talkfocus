import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Briefcase, GraduationCap } from "lucide-react";

interface Course {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  gradient: string;
}

const courses: Course[] = [
  {
    id: "kids",
    title: "English for Kids",
    description: "Fun, interactive lessons designed specifically for young learners. Features animated characters and engaging activities.",
    icon: <BookOpen className="h-6 w-6" />,
    image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
    gradient: "from-pink-500 to-orange-400",
  },
  {
    id: "business",
    title: "Business English",
    description: "Professional English courses focused on business communication, presentations, and workplace vocabulary.",
    icon: <Briefcase className="h-6 w-6" />,
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    id: "exam",
    title: "Exam Preparation",
    description: "Comprehensive preparation for IELTS, TOEFL, and Cambridge exams with practice tests and study materials.",
    icon: <GraduationCap className="h-6 w-6" />,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    gradient: "from-green-500 to-emerald-500",
  },
];

const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div
        className="absolute inset-0 opacity-10 transition-opacity group-hover:opacity-20"
        style={{
          backgroundImage: `url(${course.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className={`absolute inset-0 opacity-20 bg-gradient-to-br ${course.gradient}`} />
      <CardHeader className="relative">
        <div className="mb-2 flex items-center gap-2">
          {course.icon}
          <CardTitle className="text-2xl">{course.title}</CardTitle>
        </div>
        <CardDescription className="text-base">
          {course.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="relative">
        <div className="h-32 rounded-lg bg-white/10 backdrop-blur-sm" />
      </CardContent>
      <CardFooter className="relative">
        <Button className="w-full">
          Select Course
          <span className="ml-2">→</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

const CoursesPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold">Our Courses</h1>
        <p className="text-lg text-muted-foreground">
          Choose from our selection of specialized English courses
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;