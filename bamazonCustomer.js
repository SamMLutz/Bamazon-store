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
    // addProduct("Kingdom Hearts 3", "Video Games", 40.00, 50);
    // addProduct("Bamazon Balexa", "Homegoods", 150.00, 25);
    // deleteProduct("Bamazon Balexa");
    getAll();
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

