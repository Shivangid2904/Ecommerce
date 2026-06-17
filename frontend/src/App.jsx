import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Hero />

        <section className="about" id="about">
          <div className="section-header">
            <p className="eyebrow">About</p>
            <h2>Welcome to Horizon College</h2>
          </div>
          <p className="section-copy">
            Horizon College is a modern academic community dedicated to nurturing students through interdisciplinary learning,
            supportive mentorship, and a vibrant campus culture. Our college combines innovation, character building, and career-ready
            opportunities for tomorrow's leaders.
          </p>
          <div className="about-grid">
            <div className="about-card">
              <h3>Academic Excellence</h3>
              <p>Rigorous programs backed by experienced faculty, research opportunities, and personalized guidance.</p>
            </div>
            <div className="about-card">
              <h3>Campus Life</h3>
              <p>Clubs, events, and hands-on experiences designed to help students grow both socially and professionally.</p>
            </div>
            <div className="about-card">
              <h3>Future Ready</h3>
              <p>Career services, internships, and industry partnerships that help our graduates launch with confidence.</p>
            </div>
          </div>
        </section>

        <section className="mission-vision" id="mission-vision">
          <div className="section-header">
            <p className="eyebrow">Mission & Vision</p>
            <h2>Our purpose and direction</h2>
          </div>
          <div className="vision-grid">
            <div className="vision-card">
              <h3>Our Mission</h3>
              <p>To empower every student with a supportive education, creative problem-solving skills, and a strong sense of community responsibility.</p>
            </div>
            <div className="vision-card">
              <h3>Our Vision</h3>
              <p>To become a leading college that inspires lifelong learners and innovators who shape the future with compassion and expertise.</p>
            </div>
          </div>
        </section>

        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}

export default App;