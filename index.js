const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

app.use("/auth", require("./routes/jwtAuth"));

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
