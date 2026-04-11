import Navbar from "@/components/Navbar";
import Overview from "@/components/Overview";
import Education from "@/components/Education";
import Certificates from "@/components/Certificates";
import Projects from "@/components/Projects";
import Blogs from "@/components/Blogs";
import Achievements from "@/components/Achievements";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import BackgroundEffects from "@/components/BackgroundEffects";
import CustomCursor from "@/components/CustomCursor";
import clientData from "@/data/clientData";

export default function Home() {
  return (
    <main 
  className={`relative min-h-screen selection:bg-blue-200 dark:selection:bg-blue-900 selection:text-blue-900 dark:selection:text-blue-100 transition-colors duration-500 overflow-hidden ${
    clientData.enableCustomCursor ? "cursor-auto md:cursor-none" : "cursor-auto"
  }`}
>
      {clientData.enableCustomCursor && <CustomCursor />}
      
      {/* Light Mode Explicit Gradients */}
      <div 
        className="absolute inset-0 pointer-events-none -z-30 transition-opacity duration-500 dark:opacity-0"
        style={{ background: "linear-gradient(135deg, #eef2ff, #f0f9ff, #fdf4ff)" }}
      />
      
      {/* Light Mode Depth Radial Glow Layer */}
      <div 
        className="absolute inset-0 pointer-events-none -z-20 transition-opacity duration-500 dark:opacity-0"
        style={{ background: "radial-gradient(circle at 20% 30%, rgba(99,102,241,0.15), transparent 50%), radial-gradient(circle at 80% 70%, rgba(232,121,249,0.1), transparent 50%)" }}
      />
      
      {/* Dark Mode Fallback Map */}
      <div className="absolute inset-0 bg-gray-900 opacity-0 dark:opacity-100 transition-opacity duration-500 pointer-events-none -z-30" />
      
      <BackgroundEffects />
      
      <div className="relative z-10 w-full">
        <Navbar />
        <Overview />
        <Education />
        <Certificates />
        <Projects />
        <Blogs />
        <Achievements />
        <Gallery />
        <Contact />
        <Footer />
      </div>
      
      <ScrollToTop />
    </main>
  );
}
