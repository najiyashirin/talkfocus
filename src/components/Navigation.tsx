import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Navigation = () => {
  return (
    <nav className="border-b">
      <div className="container mx-auto flex h-16 items-center px-4">
        <Link to="/" className="mr-6 text-lg font-bold">
          English Academy
        </Link>
        <div className="flex gap-6">
          <Link to="/">Home</Link>
          <Link to="/courses">Courses</Link>
        </div>
        <div className="ml-auto">
          <Button>Get Started</Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;