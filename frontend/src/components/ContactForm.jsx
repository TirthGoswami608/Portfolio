import axios from "axios";
import { useState } from "react";

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/contact", form)
      .then(() => {
        setStatus("Message sent!");
        setForm({ name: "", email: "", message: "" });
      })
      .catch(() => setStatus("Error sending message"));
  };

  return (
    <section className="contact">
      <h2>Contact Me</h2>

      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Your Name" required />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Your Email" required />
        <textarea name="message" value={form.message} onChange={handleChange} placeholder="Your Message" required />

        <button type="submit">Send Message</button>
      </form>

      <p>{status}</p>
    </section>
  );
}

export default ContactForm;
