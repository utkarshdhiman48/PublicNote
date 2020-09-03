require("express-async-errors");
const express = require("express");
const app = express();
const fs = require("fs");

app.use(express.urlencoded({extended: false}));
app.use(express.static("public"));

app.get("/", (req, res)=>{
  let main;
  fs.readFile("./assets/main.txt", (err,data)=>{
    if(err) console.error(err);
    else {
      main=data.toString().split(/\%dIf\%/g).reverse();
      main=main.map((e)=>{
        return JSON.parse(e);
      });
      res.render("index.ejs", {main: main});
    }
  });

});

app.post("/", (req,res)=>{
  let obj = {
    heading: req.body.heading,
    text: req.body.text,
    author: req.body.author
  };
  fs.appendFile("./assets/main.txt", "%dIf%"+JSON.stringify(obj) , (err)=>{
    if(err) console.error(err);
    else {
      res.status(200);
    }
    res.redirect("/");
  });
});





let port = process.env.PORT || 3000;
app.listen(port, ()=>{
  console.log("listening at "+port);
})