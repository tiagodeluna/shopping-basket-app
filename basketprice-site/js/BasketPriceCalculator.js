//-------------------------------------------------------
// Shopping Basket Price Calculator module
//-------------------------------------------------------
(function(window){
    /* The use of strict mode eliminates some JavaScript silent errors by changing them to throw errors,
       fixes mistakes that make it difficult for JavaScript engines to perform optimizations and prohibits
       some syntax likely to be defined in future versions of ECMAScript */
    "use strict";

    //-------------------------------------------------------
    // Utilitary functions
    //-------------------------------------------------------
    //Get the price of a product from a given priceTable
    function findPrice(priceTable, productName) {
        let priceItem = priceTable.items.find(function(item){
            return item.productName === productName;
        });

        if (!priceItem) {
            //Raise error if product does not exist in the price table
            throw new Error(`Sorry, product '${productName}' not registered on our system`);
        }

        return priceItem;
    }

    //-------------------------------------------------------
    // Shopping basket price calculator class definition
    //-------------------------------------------------------
    var BasketPriceCalculator = {
        products : [],
        priceTable: [],
        receipt: []
    };


    //Receives a basket and calculates its price
    BasketPriceCalculator.processNextBasket = function(basket) {
        //Prepare screen for printing of the payment receipt
        clearForm();
        clearReceipt();

        this.loadBasket(basket);

        //Construct a form with product quantities
        createProductForm(this.products);

        window.RestClient.findPriceTable(function(priceTable) {
            BasketPriceCalculator.priceTable = priceTable;
            BasketPriceCalculator.calculateReceipt();
        });
    }

    BasketPriceCalculator.loadBasket = function(basket) {
        /* Computes the number of each product using a Map structure,
        considering that in the basket they can appear multiple times randomly */
        BasketPriceCalculator.products = new Map();
        const len = basket.length;
        for(let i = 0; i < len; i++) {
            var name = basket[i].name;
            BasketPriceCalculator.products.set(name,
                (BasketPriceCalculator.products.has(name) 
                    ? BasketPriceCalculator.products.get(name) : 0) + 1);
        }
    }

    BasketPriceCalculator.calculateReceipt = function() {
        /* The calculator uses a Price Table as reference to calculate the prices
        and generates a payment Receipt */
        BasketPriceCalculator.receipt = new Receipt();

        //Process each set of products
        //const lenProd = BasketPriceCalculator.products.size;
        for (let product of BasketPriceCalculator.products) {
        //for(var i = 0; i < lenProd; i++) {
            //var product = BasketPriceCalculator.products[i];
            var name = product[0];
            var qty = product[1];

            //Get corresponding price information
            var priceItem = findPrice(BasketPriceCalculator.priceTable, name);

            /* If there is a sale offer configured for this product, find out how 
            many items can be included in the offer and calculate its price */
            if (priceItem.saleOffer !== undefined) {
                var offer = priceItem.saleOffer;
                //Calculates quantity of products that fit the offer
                var quantityInOffer = Math.floor(qty / offer.take) * offer.take;

                if (quantityInOffer > 0) {
                    //Computes how much is paid for a product in a offer type "Take X, pay for Y"...
                    var priceInOffer = (offer.payFor * priceItem.unitPrice / offer.take);
                    //...and round decimals
                    priceInOffer = Math.round(priceInOffer * 100) / 100;

                    //Adds items with sale offer to the receipt
                    BasketPriceCalculator.receipt.items.push(
                        new ReceiptItem(name, quantityInOffer, priceInOffer, offer));

                    //The remaining items will be sold with the normal price
                    qty -= quantityInOffer;
                }
            }

            //Adds items without any sale offer to the receipt
            if (qty > 0) {
                BasketPriceCalculator.receipt.items.push(new ReceiptItem(name, qty, priceItem.unitPrice));
            }
        }

        //After all items were included, the total value of the receipt is computed
        BasketPriceCalculator.receipt.calculateTotal();
    }

    BasketPriceCalculator.updateProductQuantity = function(name, qty) {
        BasketPriceCalculator.products.set(name, qty);
        //Recalculate prices and create a new receipt
        BasketPriceCalculator.calculateReceipt();
    }

    //-------------------------------------------------------
    // Interface events/functions
    //-------------------------------------------------------
    //Requests a basket from a remote service and process it.
    window.ProcessBasket = function() {
        console.log("Processing basket...");
        window.RestClient.findNextBasket(function processNext(basket) {
            BasketPriceCalculator.processNextBasket(basket);
            console.log("Basket processed.");
        });
    }

    //Prepares receipt to be printed
    window.PrintReceipt = function() {
        console.log("Printing receipt...");
        printReceipt(BasketPriceCalculator.receipt);
        console.log("Receipt printed.");
    }

    //Changes the given product's quantity in the basket and recalculates the prices
    window.UpdateQuantity = function(name, qty) {
        console.log(`Updating quantity of ${name} to ${qty}...`);
        BasketPriceCalculator.updateProductQuantity(name, qty);
        console.log("Quantity updated.");
    }

})(window);