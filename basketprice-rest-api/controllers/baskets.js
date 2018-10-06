var generateRandomBasket = require("../services/randomBasketService");

module.exports = function(app) {
   app.get("/api/baskets",function findBasket(req, res) {
        var result = generateRandomBasket();
        res.json(result);
        return;
    });
}