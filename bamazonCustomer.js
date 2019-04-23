var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 8889,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "BamazonDB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    start();
    // placeOrder();
    // addProduct("Kingdom Hearts 3", "Video Games", 40.00, 50);
    // addProduct("Bamazon Balexa", "Homegoods", 150.00, 25);
    // addProduct("Headphones", "Electronics", 25.00, 20);
    // addProduct("Wireless Mouse", "Electronics", 50.00, 30);
    // addProduct("Game System", "Electronics", 400.00, 10);
    // addProduct("Toothbrush", "Homegoods", 1.00, 500);
    // addProduct("Bananas", "Grocery", .50, 150);
    // addProduct("Apples", "Grocery", .75, 100);
    // addProduct("Crockpot", "Homegoods", 30.00, 35);
    // addProduct("TV", "Electronics", 300.00, 60);
    // addProduct("Frozen Pizza", "Grocery", 8.00, 120);

    // deleteProduct("Bamazon Balexa");
    // getAll();
    connection.end();

});

// function to get all products
const getAll = function () {
    connection.query("SELECT * FROM Bamazon_inventory", function (err, res) {
        if (err) throw err;
        console.log(res)
        // connection.end();
    })
};

//   function to add products
const addProduct = function (productName, departmentName, price, stockQuantity) {
    connection.query(
        "INSERT INTO Bamazon_inventory SET ?",
        {
            // position: position,  
            product_name: productName,
            department_name: departmentName,
            price: price,
            stock_quantity: stockQuantity
        },
        function (err, res) {
            if (err) throw err;
            console.log("product added!")
            // console.log(res);
            // connection.end();
        }
    )
};

const deleteProduct = function (item) {
    connection.query("DELETE FROM Bamazon_inventory WHERE ?",
        {
            product_name: item
        },
        function (err, res) {
            if (err) throw err;
            //   console.log(res);
            console.log("product deleted");
            // connection.end();
        })
};

// start function to initiate buyer experience
function start() {
    connection.query("SELECT * FROM Bamazon_inventory", function (err, res) {
        if (err) throw err;
        console.table(res)
        // connection.end();
        placeOrder();
    })
}

function placeOrder() {
    inquirer
        .prompt([
            {
                name: "order",
                type: "input",
                message: "Select item for purchase by entering the ID"
            },
            {
                name: "quantity",
                type: "input",
                message: "How many units of this product would you like to buy?"
            }
        ])
}