function About() {
  return (
    <section className="about">
      <h2>About Me</h2>
      <p>
        I am a full-stack developer who loves building modern and fast websites.
        My focus is on React, Node.js, MySQL, and full-stack systems.
      </p>
    </section>
  );
}
<button 
  onClick={() => window.location.href='/admin-login'} 
  style={{
    position: "fixed",
    right: "20px",
    bottom: "20px",
    background: "var(--neon)",
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer"
  }}
>
 ⚙️
</button>
export default About;
