const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

var app =express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


var router = require("./router");

app.use("/", router)


app.listen(3000, console.log(("run")))
