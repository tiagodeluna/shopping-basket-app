//-------------------------------------------------------
// Price Table service module
//-------------------------------------------------------
const currentPriceTable =
[
	{"productName":"apple","unitPrice":0.25},
	{"productName":"orange","unitPrice":0.3},
	{"productName":"banana","unitPrice":0.1},
	{"productName":"kiwi","unitPrice":0.15,"saleOffer":{"take":5,"payFor":3}},
	{"productName":"papaya","unitPrice":0.5,"saleOffer":{"take":3,"payFor":2}}
];

function PriceItem(productName, unitPrice, saleOffer) {
    this.productName = productName;
    this.unitPrice = unitPrice;
    this.saleOffer = saleOffer;
}

function SaleOffer(take, payFor) {
    this.take = take;
    this.payFor = payFor;
}

function PriceTable(items = []) {
    this.items = items;
}

function createPriceTable() {
    return new PriceTable(currentPriceTable);
}

//Exports PriceTable instance globally
module.exports = createPriceTable();