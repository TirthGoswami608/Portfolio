import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const token = localStorage.getItem("adminToken");

  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [messages, setMessages] = useState([]);
  const [form, setForm] = useState({
    title: "", description: "", tech_stack: "", image_url: "", project_link: ""
  });

  const headers = { Authorization: token };

  // Load everything
  useEffect(() => {
    loadProjects();
    loadSkills();
    loadMessages();
  }, []);

  const loadProjects = async () => {
    const res = await axios.get("http://localhost:5000/api/projects");
    setProjects(res.data);
  };

  const loadSkills = async () => {
    const res = await axios.get("http://localhost:5000/api/skills");
    setSkills(res.data);
  };

  const loadMessages = async () => {
    const res = await axios.get("http://localhost:5000/api/contact/messages", { headers });
    setMessages(res.data);
  };

  // Add project
  const addProject = async () => {
    await axios.post("http://localhost:5000/api/projects", form, { headers });
    loadProjects();
    setForm({ title: "", description: "", tech_stack: "", image_url: "", project_link: "" });
  };

  // Delete project
  const deleteProject = async (id) => {
    await axios.delete(`http://localhost:5000/api/projects/${id}`, { headers });
    loadProjects();
  };

  // Add Skill
  const addSkill = async () => {
    await axios.post("http://localhost:5000/api/skills", { skill_name: form.skill, category: "Using now" }, { headers });
    loadSkills();
  };

  // Delete Skill
  const deleteSkill = async (id) => {
    await axios.delete(`http://localhost:5000/api/skills/${id}`, { headers });
    loadSkills();
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      {/* ADD PROJECT SECTION */}
      <h2>Add Project</h2>
      <input type="text" placeholder="Title" value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})}/>
      <input type="text" placeholder="Description" value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})}/>
      <input type="text" placeholder="Tech Stack" value={form.tech_stack} onChange={(e)=>setForm({...form,tech_stack:e.target.value})}/>
      <input type="text" placeholder="Image URL" value={form.image_url} onChange={(e)=>setForm({...form,image_url:e.target.value})}/>
      <input type="text" placeholder="Project Link" value={form.project_link} onChange={(e)=>setForm({...form,project_link:e.target.value})}/>
      <button className="btn" onClick={addProject}>Add Project</button>

      {/* PROJECT LIST */}
      <h2>Projects</h2>
      {projects.map(p => (
        <div key={p.id} className="admin-item">
          <b>{p.title}</b>
          <button className="delete" onClick={() => deleteProject(p.id)}>Delete</button>
        </div>
      ))}

      {/* SKILLS SECTION */}
      <h2>Skills</h2>
      <input type="text" placeholder="Add Skill" onChange={(e)=>setForm({...form, skill:e.target.value})}/>
      <button className="btn" onClick={addSkill}>Add Skill</button>

      {skills.map(s => (
        <div key={s.id} className="admin-item">
          <b>{s.skill_name}</b>
          <button className="delete" onClick={() => deleteSkill(s.id)}>Delete</button>
        </div>
      ))}

      {/* CONTACT MESSAGES */}
      <h2>Messages</h2>
      {messages.map(m => (
        <div key={m.id} className="admin-item message-box">
          <b>{m.name}</b> — {m.email}
          <p>{m.message}</p>
        </div>
      ))}
    </div>
  );
}
