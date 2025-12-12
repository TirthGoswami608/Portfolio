const express = require("express");
const router = express.Router();
const db = require("../db");
const auth = require("../middleware/auth");

// SAVE MESSAGE
router.post("/", (req, res) => {
  const { name, email, message, phone } = req.body;

  const sql =
    "INSERT INTO contact_messages (name, email, phone, message) VALUES (?, ?, ?, ?)";

  db.query(sql, [name, email, phone, message], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ success: true });
  });
});

// VIEW ALL MESSAGES (Admin only)
router.get("/messages", auth, (req, res) => {
  db.query(
    "SELECT * FROM contact_messages ORDER BY created_at DESC",
    (err, rows) => {
      if (err) return res.status(500).send(err);
      res.json(rows);
    }
  );
});

module.exports = router;
