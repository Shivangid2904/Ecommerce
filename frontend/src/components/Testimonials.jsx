function Testimonials() {
  return (
    <section className="testimonials" id="testimonials">
      <div className="section-header">
        <p className="eyebrow">Testimonials</p>
        <h2>What students love about Horizon</h2>
      </div>
      <div className="testimonial-grid">
        <article className="testimonial-card">
          <p className="testimonial-quote">
            "Horizon College gave me the support, mentorship, and confidence to discover my true strengths. The faculty really care."
          </p>
          <div className="testimonial-author">
            <strong>Priya Sharma</strong>
            <span>Business Administration</span>
          </div>
        </article>
        <article className="testimonial-card">
          <p className="testimonial-quote">
            "The campus community is welcoming and the programs are future-focused. I felt prepared for my internship from day one."
          </p>
          <div className="testimonial-author">
            <strong>Arjun Patel</strong>
            <span>Computer Science</span>
          </div>
        </article>
        <article className="testimonial-card">
          <p className="testimonial-quote">
            "Horizon helped me find my voice and explore my passions on a campus that feels both inspiring and supportive."
          </p>
          <div className="testimonial-author">
            <strong>Sana Khan</strong>
            <span>Design & Media</span>
          </div>
        </article>
      </div>
    </section>
  );
}

export default Testimonials;
