const express =require ("express");// loads Express library
const cors=require("cors");//cors allows your React frontend to request data from backend
const app=express();//this create backend server 

app.use(express.json());  // this allows backend to understand json
app.use(cors()); // React to backend browsers block different port communication for security. cors solve that 

app.get("/",(req,res)=>{
    res.send("backend API is working");

});
//route files 
app.use("/api/cotact",require("./routes/contact"));
app.use("/api/projects",require("./routes/projects"));
//start server
const PORT =5000;
app.listen(PORT,()=> console.log(`Server running on port ${PORT}`));
