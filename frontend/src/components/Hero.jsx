import '../index.css';

function Hero() {
  return (
    <div className="hero">
      <div className="hero-content">
        <p className="eyebrow">College landing page</p>
        <h1 className="hero-title">Discover Your Future at Horizon College</h1>
        <p className="hero-description">
          A welcoming college campus where innovation, creativity, and student success come together in a beautiful purple-hued experience.
          Join a community that values learning, leadership, and lifelong opportunity.
        </p>
        <div className="hero-meta">
          <span className="hero-meta-item">Admissions open</span>
          <span className="hero-meta-item">Scholarships available</span>
          <span className="hero-meta-item">Campus tours</span>
        </div>
      </div>
      <div className="hero-image">
        <img
          src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=900&q=80"
          alt="College campus" 
        />
      </div>
    </div>
  );
}

export default Hero;
