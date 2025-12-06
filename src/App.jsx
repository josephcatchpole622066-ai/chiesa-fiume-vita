import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Gallery from "./components/Gallery";
import Events from "./components/Events";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import EventDetail from "./pages/events/EventDetail";
import SermonsDynamic from "./pages/sermons/SermonsDynamic";
import SermonDetailDynamic from "./pages/sermons/SermonDetailDynamic";
import TestimonialsDynamic from "./pages/testimonials/TestimonialsDynamic";
import TestimonialDetailDynamic from "./pages/testimonials/TestimonialDetailDynamic";
import ArticlesPage from "./pages/articles/ArticlesPage";
import ArticleDetail from "./pages/articles/ArticleDetail";
import LoginPage from "./pages/admin/LoginPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Gallery />
      <Events />
      <Contact />
    </>
  );
}

function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header scrolled={scrolled} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/events/:eventId" element={<EventDetail />} />
            <Route path="/sermons" element={<SermonsDynamic />} />
            <Route path="/sermons/:sermonId" element={<SermonDetailDynamic />} />
            <Route path="/testimonials" element={<TestimonialsDynamic />} />
            <Route path="/testimonials/:testimonialId" element={<TestimonialDetailDynamic />} />
            <Route path="/articles" element={<ArticlesPage />} />
            <Route path="/articles/:articleId" element={<ArticleDetail />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/admin/dashboard"
              element={
                <PrivateRoute>
                  <AdminDashboard />
                </PrivateRoute>
              }
            />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

