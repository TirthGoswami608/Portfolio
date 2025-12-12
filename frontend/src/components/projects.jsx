import axios from "axios";
import { useEffect, useState } from "react";

function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/projects")
      .then(res => setProjects(res.data))
      .catch(err => console.error("API Error:", err));
  }, []);

  return (
    <section className="projects">
      <h2>My Projects</h2>

      {projects.length === 0 && <p>No projects available.</p>}

      {projects.map(project => (
        <div className="project-card" key={project.id}>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <strong>Tech:</strong> {project.tech_stack}
          <br /><br />
          <a href={project.project_link} target="_blank" style={{ color: "#4c6ef5" }}>
            View Project →
          </a>
        </div>
      ))}
    </section>
  );
}

export default Projects;
