var express = require("express");
var cors = require("cors");
var consign = require("consign");
var bodyParser = require("body-parser");

module.exports = function() {
	var app = express();

	app.use(cors());
	app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

	consign()
		.include("controllers")
		.into(app);

    return app;
}