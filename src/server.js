require("mongoose").connect(process.env.DB_URL, () => {
  ("Database connnected");
});

const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 80; // port at which server listening
app.listen(PORT, console.log(`server started in mode at port ${PORT}`));

// fetch routes
let auth = require("./routes/auth");
let user = require("./routes/users");
let post = require("./routes/posts");
let comment = require("./routes/comment");
let index = require("./routes/index");
//define root routes.

app.use("/api", index);
app.use("/api/authenticate", auth);
app.use("/api/user", user);
app.use("/api/posts", post);
app.use("/api/comment", comment);

app.use((err, req, res, next) => {
  return res.status(400).json({ message: err.message });
});
