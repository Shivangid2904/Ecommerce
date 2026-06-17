function Navbar() {
  return (
    <header className="navbar">
      <a className="brand" href="#top">
        <img
          className="brand-logo"
          src="https://img.icons8.com/fluency/48/8b5cf6/university.png"
          alt="Horizon College logo"
        />
        <span>Horizon College</span>
      </a>
      <nav>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#mission-vision">Mission</a></li>
          <li><a href="#testimonials">Testimonials</a></li>
        </ul>
      </nav>
      <a className="nav-cta" href="#about">Apply Now</a>
    </header>
  );
}

export default Navbar;
