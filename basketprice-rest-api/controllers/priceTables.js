var currentPriceTable = require("../services/priceTableService");

module.exports = function(app) {
   app.get("/api/pricetables",function findCurrentPriceTable(req, res) {
        var result = currentPriceTable;
        res.json(result);
        return;
    });
}