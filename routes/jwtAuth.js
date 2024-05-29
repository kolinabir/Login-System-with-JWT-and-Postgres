const router = require("express").Router();
const db = require("../db/index");

// register

router.get("/", async (req, res) => {
  const result = await db.query("SELECT * FROM users");
  console.log(result);
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
    const newUser = await db.query(
      "INSERT INTO users (username, usermail, password) VALUES ($1, $2, $3) RETURNING *",
      [username, usermail, password]
    );
    res.status(200).json({
      status: "success",
      data: {
        user: newUser.rows[0],
      },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
