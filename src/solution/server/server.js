// Express boilerplate, hosting the `dist` file, connecting to the routes
const express = require("express");
const port = 8080;
const app = express();
const todoRouter = require("./routes");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(todoRouter);
app.use(express.static("../dist"));

app.listen(port, () => {
  console.log("Server started on port", port);
});
