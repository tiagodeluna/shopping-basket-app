const
	//Page element id's and classes
	receiptBoxElem = "receipt-box",
	formElem = "basket-form",
	printButtonElem = "print-btn",
	thanksMsgElem = "thanks-message";
	btnDisabledClass = "pure-button-disabled",
	textDisabledClass = "hidden";

const
	months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    	"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

//--------------------------------------------------------------------------
// Utilitary functions
//--------------------------------------------------------------------------
//Simple way to format monetary values with 2 decimal positions
function formatPrice(price) {
    return price.toFixed(2);
}

//Format date in a printable string
function formatDate(date) {
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()
        } ${date.getDate()}${months[date.getMonth()]}${date.getFullYear()}`;
}


//--------------------------------------------------------------------------
// Methods that change the state of the page
//--------------------------------------------------------------------------
//Clears the receipt box
function clearReceipt() {
	//Enables 'Print' button
	var printButton = document.getElementById(printButtonElem);
	printButton.classList.remove(btnDisabledClass);
	//Disables "thanks" message
	var thanksMessage = document.getElementById(thanksMsgElem);
	thanksMessage.classList.add(textDisabledClass);
	//Clears receipt box
	var receiptBox = document.getElementById(receiptBoxElem);
	receiptBox.placeholder = "Click on 'Print' to see the payment receipt";
	receiptBox.value = "";
}

//Removes all form fields
function clearForm() {
	var fieldset = document.getElementById(formElem);
	fieldset.innerHTML = "";
}

//Adds a new input field to the form
function createFormElement(name, value) {
	//Creates a label
	var label = document.createElement("label");
	label.for = name;
	label.innerHTML = name;
	//Creates number input
	var input = document.createElement("input");
	input.id = name;
	input.type = "number";
	input.min = "1";
	input.max = "100";
	input.step = "1";
	input.value = value;

	var fieldset = document.getElementById(formElem);
	fieldset.appendChild(label);
	fieldset.appendChild(input);

	input.addEventListener("input", updateValue);
}

//Populates the form with a field for each element in the basket
function createProductForm(basket) {
	for(let product of basket) {
		createFormElement(product[0], product[1]);
	}
}

//Captures new value from field and updates its quantity in the basket/receipt
function updateValue(event) {
	const id = event.target.id;
	var value = event.target.value;
	if (value === undefined || value <= 0) {
		value = 1;
		var elem = document.getElementById(id);
		elem.value = value;
	}

	window.UpdateQuantity(id, value);
}

//Print payment receipt on the screen
function printReceipt(receipt) {
	//Disables print button to avoid repeated clicks on it
	var printButton = document.getElementById(printButtonElem);
	printButton.classList.add(btnDisabledClass);
	//Enables "thanks" message
	var thanksMessage = document.getElementById(thanksMsgElem);
	thanksMessage.classList.remove(textDisabledClass);
	thanksMessage.innerHTML = "<b>Thank you for choosing Luna Food Market.<br/>Hope to see you soon!</b>";
	//Clears form fields
	clearForm();

    var output = [];

    function printBar() {
        output.push("----------------------------------------------");
    }

    //Prepare header
    output.push("               LUNA FOOD MARKET               ");
    output.push("             www.lunafoodmarket.nl            ");
    printBar();
    output.push("ITEM DESCRIPTION           QTY UN.VALUE  TOTAL");
    printBar();

    //Prepare product list
    const len = receipt.items.length;
    for(var i = 0; i < len; i++) {
        var product = receipt.items[i];

        var itemNum = `#${(i+1).toString().padStart(3, "0")}`;
        var description = product.name.toUpperCase().padEnd(20);
        var qty = product.quantity.toString().padStart(3);
        var price = formatPrice(product.price).padEnd(6);
        var itemTotal = formatPrice(product.getTotal()).padStart(9);
        //Writes line for the item
        output.push(`${itemNum} ${description}${qty} X ${price+itemTotal}`);

        //Writes text detailing the sale offer
        if (product.offer) {
            output.push(
                `   OFFER: ${product.offer.take} FOR THE PRICE OF ${product.offer.payFor}`);
        }
    }

    //Prepare receipt footer
    printBar();
    output.push(`TOTAL: ${formatPrice(receipt.total).padStart(35)} EUR`);
    printBar();
    output.push("DANK U, TOT ZIENS!");
    output.push(formatDate(new Date()).padStart(46));

    //Display receipt on the screen
	var receiptBox = document.getElementById(receiptBoxElem);
    receiptBox.value = output.join("\n");
}