const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// TEMP ADMIN (later store in DB)
const ADMIN_EMAIL = "tirth@example.com";
const ADMIN_PASSWORD = bcrypt.hashSync("12345", 10);  // You can change password

// LOGIN ROUTE
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email !== ADMIN_EMAIL) {
    return res.status(401).json({ error: "Invalid email" });
  }

  const validPass = bcrypt.compareSync(password, ADMIN_PASSWORD);

  if (!validPass) {
    return res.status(401).json({ error: "Incorrect password" });
  }

  // Generate token
  const token = jwt.sign({ email }, "SECRET_KEY", { expiresIn: "2h" });

  res.json({ success: true, token });
});

module.exports = router;
