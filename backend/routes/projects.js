const express = require("express");
const router = express.Router();
const db = require("../db");
const auth = require("../middleware/auth");

// GET ALL PROJECTS
router.get("/", (req, res) => {
  db.query(
    "SELECT * FROM projects ORDER BY created_at DESC",
    (err, rows) => {
      if (err) return res.status(500).send(err);
      res.json(rows);
    }
  );
});

// ADD PROJECT (Admin only)
router.post("/", auth, (req, res) => {
  const { title, description, tech_stack, image_url, project_link } = req.body;

  const sql =
    "INSERT INTO projects (title, description, tech_stack, image_url, project_link) VALUES (?, ?, ?, ?, ?)";

  db.query(
    sql,
    [title, description, tech_stack, image_url, project_link],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ success: true, id: result.insertId });
    }
  );
});

// UPDATE PROJECT
router.put("/:id", auth, (req, res) => {
  const { title, description, tech_stack, image_url, project_link } = req.body;

  const sql = `
    UPDATE projects 
    SET title=?, description=?, tech_stack=?, image_url=?, project_link=? 
    WHERE id=?
  `;

  db.query(
    sql,
    [title, description, tech_stack, image_url, project_link, req.params.id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.json({ success: true });
    }
  );
});

// DELETE PROJECT
router.delete("/:id", auth, (req, res) => {
  db.query("DELETE FROM projects WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ success: true });
  });
});

module.exports = router;
