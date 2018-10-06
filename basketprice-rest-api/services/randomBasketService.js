//-------------------------------------------------------
// Random Basket Generator service module
//-------------------------------------------------------
var currentPriceTable = require("./priceTableService");

const
	//Minimum and maximum number of itens in a generated basket
	minimumItems = 5,
	maximumItems = 30;

//-------------------------------------------------------
// Utilitary Functions
//-------------------------------------------------------
//Returns a random number between 'min' and 'max'
function randomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Returns a random element from an array
function randomElement(arr) {
	return arr[randomNumber(0, arr.length-1)];
}

//Find all products available in the current price table
function findProducts() {
	var priceTable = currentPriceTable;
	var products = [];

	var len = priceTable.items.length;
	for(var i = 0; i < len; i++) {
		products.push(new Product(priceTable.items[i].productName));
	}

	return products;
}

//-------------------------------------------------------
// Basic product class
//-------------------------------------------------------
function Product(name) {
    this.name = name;
}

//-------------------------------------------------------
// Random basket module function
//-------------------------------------------------------
function generateRandomBasket() {
	var newBasket = [];
	var product;
	var products = findProducts();

	var numberOfItems = randomNumber(minimumItems, maximumItems);
	for(var i = 0; i < numberOfItems; i++) {
		product = randomElement(products);
		newBasket.push(product);
	}

	return newBasket;
}

//Export generateRandomBasket() function
module.exports = generateRandomBasket;