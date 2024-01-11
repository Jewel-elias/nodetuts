const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");

// express app
const app = express();

// connect to mongoDB
const dbURI =
  "mongodb+srv://jewelelias:jewel1234@node-tuts.ohjbbql.mongodb.net/?retryWrites=true&w=majority";
// mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose
  .connect(dbURI)
  .then((res) => {
    console.log("connected to db");
    // listen for requests
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });

// register view engines
app.set("view engine", "ejs");

// Middleware and Static files
app.use(express.static("public"));
app.use(express.urlencoded());

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// blog routes
// ماتجي لهون الا اذا كان الراب بيبلش ب blogs
app.use("/blogs", blogRoutes);

// redirects
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
