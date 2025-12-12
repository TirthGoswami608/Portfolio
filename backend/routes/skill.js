const express = require("express");
const router = express.Router();
const db = require("../db");
const auth = require("../middleware/auth");

// GET ALL SKILLS
router.get("/", (req, res) => {
  db.query("SELECT * FROM skills ORDER BY created_at DESC", (err, rows) => {
    if (err) return res.status(500).send(err);
    res.json(rows);
  });
});

// ADD SKILL (Admin only)
router.post("/", auth, (req, res) => {
  const { skill_name, category } = req.body;

  const sql = "INSERT INTO skills (skill_name, category) VALUES (?, ?)";

  db.query(sql, [skill_name, category], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ success: true, id: result.insertId });
  });
});

// DELETE SKILL
router.delete("/:id", auth, (req, res) => {
  db.query("DELETE FROM skills WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ success: true });
  });
});

module.exports = router;
