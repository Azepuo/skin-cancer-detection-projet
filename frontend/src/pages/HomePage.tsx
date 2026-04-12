import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Stethoscope } from "lucide-react";
import gsap from "gsap";
import { useAuthStore } from "@/store/authStore";
import bgImage from "../assets/backgroundimage.png";

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Hero background image path:", bgImage);
    if (isAuthenticated) {
      navigate("/dashboard");
      return;
    }

    const ctx = gsap.context(() => {
      // Hero background animation
      gsap.from(".hero-text", {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });

      // Scroll trigger for navbar
      const handleScroll = () => {
        const navbar = document.querySelector("[data-navbar]");
        if (navbar) {
          if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
          } else {
            navbar.classList.remove("scrolled");
          }
        }
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, containerRef);

    return () => ctx.revert();
  }, [isAuthenticated, navigate]);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-white text-slate-900 overflow-x-hidden selection:bg-teal-100 selection:text-teal-900"
    >
      {/* Navbar */}
      <nav
        data-navbar
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-teal-500/10">
              <Stethoscope className="h-6 w-6 text-teal-500" />
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button
                variant="ghost"
                className="text-slate-600 hover:bg-slate-100 transition-all"
              >
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="px-4 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-blue-500 text-white shadow-md hover:opacity-90 transition">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
      >
        {/* Background Image & Overlays */}
        <div className="absolute inset-0">
          <img
            src={bgImage}
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover opacity-70 z-0"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-white/30 to-white/50 backdrop-blur-[2px] z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(20,184,166,0.1),transparent_40%)] z-10" />
        </div>

        {/* Content */}
        <div
          ref={textRef}
          className="relative z-20 max-w-4xl mx-auto px-6 text-center space-y-6"
        >
          <div className="hero-text inline-flex items-center px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-sm font-medium border border-teal-200/50">
            AI Medical Platform
          </div>

          <h1 className="hero-text text-5xl md:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1]">
            AI Skin Cancer <br />
            <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
              Detection Platform
            </span>
          </h1>

          <p className="hero-text text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Clinical-grade dermatology insights powered by deep learning. Fast,
            secure, and accessible anytime.
          </p>

          <div className="hero-text flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link to="/signup">
              <Button className="bg-gradient-to-r from-teal-500 to-blue-500 text-white text-lg px-8 py-7 rounded-xl shadow-xl shadow-teal-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]">
                Start Analysis
              </Button>
            </Link>
            <Link to="/login">
              <Button
                variant="outline"
                className="border-slate-200 text-slate-600 hover:bg-slate-50 text-lg px-8 py-7 rounded-xl transition-all"
              >
                Sign In
              </Button>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="hero-text mt-16 pt-8 border-t border-slate-100 flex flex-wrap justify-center gap-8 grayscale opacity-50">
            <div className="flex items-center gap-2 font-semibold text-slate-400">
              <span>98.7% Accuracy</span>
            </div>
            <div className="flex items-center gap-2 font-semibold text-slate-400">
              <span>HAM10000 Dataset</span>
            </div>
            <div className="flex items-center gap-2 font-semibold text-slate-400">
              <span>CNN Architecture</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
