import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Index from "./pages/Index";
import CoursesPage from "./pages/Courses";
import TestPage from "./pages/Test";
import Auth from "./pages/Auth";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background font-sans antialiased">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;