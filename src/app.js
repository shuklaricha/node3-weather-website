const express = require("express");
const path = require("path");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geoCode");

const app = express();
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

console.log(publicDirectoryPath);
app.set("view engine", "hbs");
app.use(express.static(publicDirectoryPath));
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "Hbs Home",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "about me!!",
    name: "richa",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "please provide the address",
    });
  }
  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({
        error,
      });
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error,
        });
      }
      res.send({
        forecast: forecastData,
        location: location,
        address: req.query.address,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    errorMessage: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    errorMessage: "Page not found",
  });
});

// app.get('/help', (req,res) => {
//     res.send({
//       SecurityOfficer: 'Richa',
//       mission: 'save Everyone'
//     })
// })

// app.get('/about', (req,res) => {
//     res.send('<article>About Us!!</article>')
// })

app.listen(port, () => {
  console.log("server is up and m checking on!!" + port);
});
