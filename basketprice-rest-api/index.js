var app = require('./config/custom-express')();

app.listen(3000, function(){
  console.log("Basket Price Server running!");
});