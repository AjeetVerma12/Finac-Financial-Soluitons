const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const bodyParser=require("body-parser")
const mongoose = require("mongoose");
require("./src/db/conn");

const url = "mongodb://localhost:27017/users";

mongoose
  .connect(url)
  .then(function () {
    console.log("connection successful");
  })
  .catch(function (e) {
    console.log("Error connecting to DB");
  });


// app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.urlencoded({ extended: true }));

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
});

const users = mongoose.model("abc", userSchema);

app.post("/register", (req, res) => {
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  var user = new users({
    username: username,
    email: email,
    password: password,
  });
  user.save(function (err, user) {
    if (err) {
      console.log("error ", err);
    } else {
      console.log(username);
    }

    res.redirect("/login");
  });
});

app.post("/login", (req, res) => {
  console.log("user");
  const email = req.body.email;
  const password = req.body.password;
  
  users.find({ email: email }, function (err, user) {
    
    if (err) {
      console.log("invalid username");
    }
    if (user) {
      if (user[0].password==password) {
        console.log(user[0].password)
        res.redirect("/");
      } else {
        console.log("invalid password");
      }
    }
    else{
      console.log("invalid")
    }
  });
});



const template_path = path.join(__dirname, "./views");
const partials_path = path.join(__dirname, "./partials");

app.use(express.static(path.join(__dirname,"/public")));
app.set("view engine", "hbs");

app.set("views", template_path);
hbs.registerPartials(partials_path);


app.get("/login", (req, res) => {
    res.render("login")
});

app.get("/", (req, res) => {
    res.render("index")
});

app.get("/index", (req, res) => {
  res.render("index")
});


app.get("/register", (req, res) => {
    res.render("register");
})

app.get("/news", (req, res) => {
  res.render("news");
})

app.get("/about", (req, res) => {
  res.render("about");
})

app.get("/contact", (req, res) => {
  res.render("contact");
})

app.get("/testimonial", (req, res) => {
  res.render("testimonial");
})

app.get("/services", (req, res) => {
  res.render("services");
})

app.listen(3000, () => {
    console.log('Server is running at port no 3000');
})

app.all("*",(req,res)=>{
    res.status(404).send("Resource not found")
    })