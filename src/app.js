const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("../utils/geoCode");
const forecast = require("../utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// defining paths for express config
const publicDirectoryPath = path.join(__dirname, "../public/");
const viewsPath = path.join(__dirname, "../views/templates");
const partialsPath = path.join(__dirname, "../views/partials");

// setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setting up routes for dynamic views
app.get("", (req, res) => {
  res.render("index", {
    name: "Bhanu Handa",
    pageDesc: "Weather Page",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    name: "Bhanu Handa",
    pageDesc: "About Page",
  });
});
app.get("/profile", (req, res) => {
  res.render("profile", {
    name: "Bhanu Handa",
    pageDesc: "Profile Page",
  });
});

//
// Serving static pages from here
app.use(express.static(publicDirectoryPath));

// app.get("", (req, res) => {
//   res.send(`<h1>Home Page</h1>`);
// });
// app.get("/abc", (req, res) => {
//   res.send("About Page");
// });

// app.get("/user", (req, res) => {
//   res.send([
//     {
//       name: "Bhanu",
//       age: 21,
//     },
//     {
//       name: "Surya",
//       age: 17,
//     },
//   ]);
// });

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please enter an address",
    });
  }

  geoCode(req.query.address, (err, { latitude, longitude, location } = {}) => {
    if (err) {
      return res.send({
        error: err,
      });
    }
    forecast(latitude, longitude, (err, { desc, temp }) => {
      if (err) {
        return res.send({
          error: err,
        });
      }
      res.send({
        location: location,
        description: desc,
        temperature: temp,
      });
    });
  });
});

// app.get("/products", (req, res) => {
//   if (!req.query.search) {
//     return res.send({
//       error: "You must provide a search term",
//     });
//   }
//   res.send({ products: [] });
// });

app.get("/about/*", (req, res) => {
  res.render("404", {
    errorMsg: "No Data Found",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    errorMsg: "Page Not Found, Please try a valid Url.",
    name: "Bhanu Handa",
    pageDesc: "404",
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
