


if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config();
}




const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Form = require("./models/form");

const sgMail = require("@sendgrid/mail");




const API_KEY = process.env.API_KEY;
sgMail.setApiKey(API_KEY);









// Connect with our database
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));






//middlewares
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

// To define the req.body
app.use( express.urlencoded({ extended: true }));























// This is for Mail 

let date_ob = new Date();

// current date
// adjust 0 before single digit date
let date = ("0" + date_ob.getDate()).slice(-2);

// current month
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

// current year
let year = date_ob.getFullYear();

// current hours
let hours = date_ob.getHours();

// current minutes
let minutes = date_ob.getMinutes();

// current seconds
let seconds = date_ob.getSeconds();

























//routes
app.get("/", (req, res) => {
  res.render("index");
});









app.post("/", async(req, res) => {

  console.log(req.body);
  const { name, email, number, check} = req.body;


    await Form.create({ name, email, number, check });





  const message = {
    to: email,
    from: process.env.MY_ID,
    subject: "Visitors-App",
    html: `<h3><strong> Hello ${req.body.name}! You have ${req.body.check} in the office at ${hours}:${minutes}:${seconds} on ${date}/${month}/${year}. </h3></strong>`
  };

  //Hello Ashish! You have entered in the office at 2:34:14 PM on 5 October


//ES6
  sgMail
    .send(message)
    .then((response) => {
      console.log("Email send!");
    })
    .catch((err) => {
      console.log(err);
    });





  res.render("enter");

});







app.post('/enter', (req,res)=>{
  res.redirect('/');
})








const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server started at port 3000");
});






