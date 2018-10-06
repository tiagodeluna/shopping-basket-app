//-------------------------------------------------------
// Receipt aggregate classes definition
//-------------------------------------------------------
"use strict";

function ReceiptItem(name, quantity = 0, price = 0, offer) {
    this.name = name;
    this.offer = offer;
    this.quantity = quantity;
    this.price = price;
}

ReceiptItem.prototype.getTotal = function() {
    return this.quantity * this.price;
}

function Receipt(items = [], total = 0) {
    this.items = items;
    this.total = total;
}

Receipt.prototype.calculateTotal = function() {
    this.total = 0;

    const len = this.items.length;
    for (var i = 0; i < len; i++) {
        this.total += this.items[i].getTotal();
    }
}