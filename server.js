const express = require("express")
const app = express();
const port = 3000;
app.use(express.json());

const dbconnect = require("./dbconfig");
dbconnect();

const userRoutes = require("./userRoutes");
app.use("/user", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log("server connected to ", port);
});


