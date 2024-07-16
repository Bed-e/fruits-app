require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const conn = require("./db/conn");
const fruitRoutes = require("./routes/fruits");
const Fruit = require("./models/fruit");
const starterFruits = require("./db/seed");
conn();

//VIEW ENGINE
app.set("views", __dirname + "/views");
app.set("view engine", "jsx");
app.engine("jsx", require("express-react-views").createEngine());

//MIDDLEWARE
app.use(express.json());
app.use("/api/fruits", fruitRoutes);

//ROUTES

app.get("/", (req, res) => {
  res.send("Home route!");
});

app.get("/fruits/seed", async (req, res) => {
  try {
    await Fruit.deleteMany({});
    await Fruit.create(starterFruits);
    res.json(starterFruits);
  } catch (error) {
    console.log(`something went wrong loading seed data: ${error.message}`);
  }
});

//END ROUTES
app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});
