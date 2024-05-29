const router = require("express").Router();
const db = require("../db/index");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenarator");

// register

router.get("/", async (req, res) => {
  const result = await db.query("SELECT * FROM users");

  res.status(200).json({
    status: "success",
    results: result.rows.length,
    data: {
      users: result.rows,
    },
  });
});

router.post("/register", async (req, res) => {
  try {
    const { username, usermail, password } = req.body;
    // check if user exists
    const user = await db.query("SELECT * FROM users WHERE usermail = $1", [
      usermail,
    ]);
    if (user.rows.length !== 0) {
      return res.status(401).json("User already exists");
    }

    //becrypt password
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await db.query(
      "INSERT INTO users (username, usermail, password) VALUES ($1, $2, $3) RETURNING *",
      [username, usermail, hashedPassword]
    );

    const token = jwtGenerator(newUser.rows[0].id);
    res.status(200).json({
      status: "success",
      data: {
        user: newUser.rows[0],
      },
      token,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { usermail, password } = req.body;
    const user = await db.query("SELECT * FROM users WHERE usermail = $1", [
      usermail,
    ]);
    if (user.rows.length === 0) {
      return res.status(401).json("Password or Email is incorrect");
    }
    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
      return res.status(401).json("Password or Email is incorrect");
    }
    const token = jwtGenerator(user.rows[0].id);
    res.status(200).json({
      status: "success",
      data: {
        user: user.rows[0],
      },
      token,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
