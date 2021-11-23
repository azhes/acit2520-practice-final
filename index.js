const express = require("express");
const PORT = process.env.PORT || 8007;
const app = express();
const fs = require('fs').promises

// Don't worry about these 4 lines below
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("createcard");
});

app.post("/", async (req, res) => {
  let formData = req.body;
  let formName = req.body.name
  let aboutMe = req.body.aboutme
  let books = req.body.books
  let artists = req.body.artists

  console.log(formData)
  const database = await fs.readFile('database.json', "utf8");
  const obj = JSON.parse(database)
  console.log(obj)
  obj.users.push(formData)
  await fs.writeFile('database.json', JSON.stringify(obj))

  res.render("homepage", { id: Math.floor(Math.random() * 9999999), name: formName, aboutme: aboutMe, books: books, artists: artists })
})

app.get("/people/:id", (req, res) => {
  res.render("people");
});

app.get("/:id/photos", (req, res) => {
  const id = req.params.id;
});

app.listen(PORT, () => {
  console.log(`Server now is running at http://localhost:${PORT} 🚀`);
});
