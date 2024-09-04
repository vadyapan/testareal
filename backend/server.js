const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
