const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// ROUTES
app.use("/api/admin", require("./routes/admin"));
app.use("/api/projects", require("./routes/projects"));
app.use("/api/contact", require("./routes/contact"));
app.use("/api/skills", require("./routes/skills"));

app.get("/", (req, res) => {
  res.send("Backend API is working");
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
