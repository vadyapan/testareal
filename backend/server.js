const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 4000;
const version = "v1";
const apiRoute = require("./routers");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(`/api/${version}`, apiRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
