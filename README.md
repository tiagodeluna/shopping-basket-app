# Basket Price Calculator Web Application

**Author:** Tiago Luna

## Solution Details

This is a simple shopping basket processing application developed as a coding practice. It consists of two modules:
* A website that receives the baskets, calculates the prices and generates payment receipts.
* A REST API that provides shopping baskets with a random combination of items and a reference price table.

## Tools

It was written using:
* Frontend:
    - Javascript
    - HTML/CSS - using a PureCSS layout
* Backend:
    - node.js
* Dev Tools:
    - Sublime
    - Git
    - npm

## Implementation notes

* *Node.js:* since we're talking about a Javascript project, the choice of node.js for the backend seemed clear. In addition, it is a technology that favors productivity due to its easy, lean syntax, and to the wide range of modules/packages in its ecosystem.
* *Price Table endpoint:* I decided to create an endpoint to isolate the price table from the Frontend code, making it easier to maintain the prices.
* *JS classes structure:* *BasketPriceCalculator.js* is the main module of the frontend application. It requests the web service, through the class *RestClient.js*, the current price table and the next basket from the "queue", calculates the total price, and coordinates the receipt printing (whose model is in *Receipt.js*, and delivery logic is in the *InterfaceHandling.js* file).
* *PureCSS for the UI:* I think it's a good choice on this case to avoid wasting time designing screens, defining color palettes, and writing CSS styles for each page element. And it's pure CSS!

## Prerequisites

- A good web browser
- [Node.js and NPM](https://nodejs.org/en/)

## How to run it
1. Clone (or download) the project from GitHub
2. Run the backend API:
    - In Command Prompt, natigate to `basketprice-rest-api` folder
    - Run command `npm install` to install project dependencies
    - Run `node index.js` to start the server
3. Run the frontend website:
    - Natigate to `basketprice-site` folder
    - Double-click on `index.html` file
4. The application will open in your default web browser
