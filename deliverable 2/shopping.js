// Initializing quantity variable for calculations
let quantity = 0;
// Initializing the variable which stores the number of items in shopping cart
let cartNumber = 0;
// Initializing the string variable
let details = "";
// Create an array of colours to be presented - best data structure to store
let colours = ["Red", "Blue Violet", "Black", "White", "Orange", "Yellow", "Blue", "Chartreuse", "Coral", "Cyan", "Deep Pink", "Chocolate", "Green", "Grey", "Maroon", "Plum", "Dark Orange", "Pink"];
// Create a key value pair of Colour objects that have been initialized
let colourpairs;

// OOP Principle: Create Colour class with getter and setter methods. Promotes code re-use.
class Colour {
    // Use constructor to initialize objects with paramaters passed.
    constructor(colourname, price_par) {
        // The this keyword refers to the object it belongs to
        this.name = colourname;
        this.quantity = 0; // Quantity is set to 0.
        this.price = price_par;
    }
    // Getter method which returns price
    get getPrice() {
        return this.price;
    }
    // Setter method which sets quantity if called
    set setQuantity(qt_par) {
        this.quantity = qt_par;
    }
    // Getter method which returns quantity
    get getQuantity() {
        return this.quantity;
    }
    // Getter method which returns buttons for the details section when called
    get button() {f
        let butttonName = this.name.toLowerCase().replace(" ","-"); //converting space in colour names to hyphens for recognition by CSS
        return "<button class='circle button-" + butttonName + "' onclick=colorSelect('" + this.name + "');></button>";
    }
}

// The createColours function creates a key value pair of initialized Colour objects
function createColours() {
    colourpairs = {
        "Red": new Colour("Red", 14.99),
        "Blue Violet": new Colour("Blue Violet", 16.49),
        "Black": new Colour("Black", 19.99),
        "White": new Colour("White", 18.49),
        "Orange": new Colour("Orange", 13.99),
        "Yellow": new Colour("Yellow", 12.99),
        "Blue": new Colour("Blue", 19.49),
        "Chartreuse": new Colour("Chartreuse", 12.49),
        "Coral": new Colour("Coral", 21.99),
        "Cyan": new Colour("Cyan", 24.49),
        "Deep Pink": new Colour("Deep Pink", 14.49),
        "Chocolate": new Colour("Chocolate", 15.49),
        "Green": new Colour("Green", 16.49),
        "Grey": new Colour("Grey", 12.99),
        "Maroon": new Colour("Maroon", 17.99),
        "Plum": new Colour("Plum", 12.99),
        "Dark Orange": new Colour("Dark Orange", 18.49),
        "Pink": new Colour("Pink", 13.49),
    }
}

// The colourSelect function updates DOM as user selects colour.
function colourSelect(colour) {
    document.getElementById("colourlabel1").innerHTML = colour; // Change select colour on page
    document.getElementById("colourlabel2").innerHTML = colour; // Change colour displayed on modal
    document.querySelector("#price").innerText = "$"+colourpairs[colour].getPrice;
    document.querySelector("#originalprice").innerText = "$"+ (colourpairs[colour].getPrice*1.2).toFixed(2); //Calculates original price
    document.querySelector("#cartButton").innerHTML = "<strong>Add to Cart</strong>";
    document.querySelector("#cartButton").dataset.target = "#shoppingModal";
}

// The increment function when called increments (i.e. increases) the quantity of the colour item and updates the DOM
function increment() {
    quantity++; // Increases quantity by one
    document.querySelector("#quantity").innerHTML = quantity;
}

// The decrement function when called decrements (i.e. decreases) the quantity of the colour item and updates the DOM
function decrement() {
    if(quantity>0){  // Test to confirm that we don't decrement below zero
        quantity--;
        document.querySelector("#quantity").innerHTML = quantity;
    } else {
        document.querySelector("#quantity").innerHTML = quantity;
    }
}

// The updateCart function updates the cart after the user clicks agree on shopping cart
function updateCart() {
    // The current colour choice is stored in the colour variable
    let colour = document.getElementById("colourlabel1").innerText;
    // That specific colour's quantity is set to an amount
    colourpairs[colour].setQuantity = quantity;
    // Call the sumItems function to get the number of colours in the chart
    cart = sumItems(colourpairs);
    // Update the button text to current quantity of colours selected
    document.querySelector("#cartNumber").innerHTML = cart;
    // Variable to track total cost
    let total = 0;
    // Display colour circles and update dollar total of shopping cart
    for(const item of colours) {
        if(colourpairs[item].getQuantity != 0) { // Make sure quantity is not equal to zero
            for (let i = colourpairs[item].getQuantity; i > 0; i--){ // For loop
                details += colourpairs[item].button;
                total += colourpairs[item].getPrice;
            }
        }
    }
    document.querySelector("#details").innerHTML = "<p><strong>DETAILS</strong></p>"+details; //
    details = "";
    document.querySelector("#price").innerText = "$"+total.toFixed(2);
    document.querySelector("#originalprice").innerText = "$"+ (total*1.2).toFixed(2);

    // This code changes "Add to Cart" button text to "Checkout" and redirects to check out modal
    document.querySelector("#cartButton").innerHTML = "<strong>Checkout</strong>";
    document.querySelector("#cartButton").dataset.target = "#checkoutModal"; //redirect to checkout modal
}

// The update Quantity function updates the number of colours selected
function updateQuantity(){
    //This code determines the current colour selected by the user
    let colour = document.getElementById("colourlabel1").innerText;
    if (colour == 'Select a colour'){ // If no colour has been selected quantity should be zero.
        document.querySelector("#quantity").innerText = "0";
        quantity = 0;
    } else {
        document.querySelector("#quantity").innerText = colourpairs[colour].getQuantity; // Get colour quantity.
        quantity = colourpairs[colour].getQuantity;
    }

    // This code shows the cart items in the checkout modal
    let items = "";
    let total = 0;
    for(const item of colours) {
        if(colourpairs[item].getQuantity != 0) {
            items += "<p>";
            for (let i = colourpairs[item].getQuantity; i > 0; i--){
                items += colourpairs[item].button;
                total += colourpairs[item].getPrice;
            }
            items += '<span style="float: right; padding: 10px; margin-right: 20px;"><strong> X '+ colourpairs[item].getPrice+' = '+(colourpairs[item].getPrice*colourpairs[item].getQuantity).toFixed(2)+'</strong></span>';
            items += "</p>";
        }
    }
    items += "<br>"
    items += "<h4>Cart total: " + total.toFixed(2) + "</h4>"
    document.querySelector("#summary").innerHTML = items;
}

// Function resetQuantity when called sets quantity to zero
function resetQuantity(){
    quantity = 0;
}

// Function sumItems returns the total number of colours in cart by looping through the key value pair/object passed as a paramater to it
function sumItems(object) {
    let sum = 0;
    for(var place in object){
        sum+= object[place].getQuantity;
    }
    return sum;
}
