import {useEffect,useState} from "react";
import axios from "axios;"

function Projects(){
    const[project,setProjects]=useState ([]);

   useEffect(() => {
    axios.get("http://localhost:5000/api/projects")
      .then(res => setProjects(res.data))
      .catch(err => console.error("API Error:", err));
  }, []);
  return (
    <section style={{padding:'20px'}}>
        <h2>My Projects</h2>
        {project.map(project=>(
            <div key={project.id} style={{marginBottom:"20px"}}>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <strong>Tech:</strong>{project.tech_stack}
                <br />
                <a href={project.project_link} target="_blank">View Project</a>
                
            </div>
        ))}
    </section>
  );
}
