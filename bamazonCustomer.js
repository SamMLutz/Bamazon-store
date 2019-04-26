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
    console.log("Bamazon_inventory")
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
    // updateProduct(10, "Game system");
    // deleteProduct("Bamazon Balexa");
    // getAll();
    // connection.query("SELECT stock_quantity from Bamazon_inventory WHERE id = 1", function (err, res) {
    //     if (err) throw err;
    //     console.log(res)
    // });
    // connection.end();

});

// function to get all products
const getAll = function () {
    // select all products from inventory and log to the screen
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
//  delete product function
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

// update product function
const updateProduct = function (quantity, productName) {
    connection.query(
        "UPDATE Bamazon_inventory SET ? WHERE ?", [
            {
                stock_quantity: quantity
            },
            {
                product_name: productName
            }
        ],
        function (err, res) {
            if (err) throw err;
            console.log("item updated")
            console.log(res);
            // connection.end()
        }
    )
}

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
        ]).then(function (answer) {
            // console.log("order id: " + answer.order);
            // console.log("order quantity: " + answer.quantity);

            let query = "SELECT stock_quantity from Bamazon_inventory WHERE id = "

            connection.query(query + answer.order,
                {
                    id: answer.order
                }, function (err, res) {
                    if (err) throw err;
                    // console.log(res)

                    if (res[0].stock_quantity > answer.quantity) {
                        console.log("order succesful");
                        connection.query("UPDATE Bamazon_inventory SET ? WHERE ?", [
                            {
                                stock_quantity: res[0].stock_quantity - answer.quantity
                            },
                            {
                                id: answer.order
                            }], function (err, res) {
                                if (err) throw err;
                                
                                // console.log("Congrats you have recieved " + answer.quantity + " " + answer.product_name)
                                // console.log(answer);
                            }
                        )
                        connection.query("SELECT product_name FROM Bamazon_inventory WHERE id = ?", answer.order, function(err, res){
                            // if (err) throw err;
                            console.log(`You ordered ${answer.quantity} ${res[0].product_name}`)
                            // console.log(answer.order)
                        })
                        // console.log(answer.quantity)
                        // console.log(res[0].stock_quantity)
                        // console.log(res -= answer.quantity)
                        connection.query("SELECT price FROM Bamazon_inventory WHERE id = ?", answer.order, function(err, res){
                            // if (err) throw err;
                            // console.log(`Your total is: ${res[0].price} dollar(s)`);
                            console.log("Your total is: " + (res[0].price * answer.quantity) + " dollar(s)");
                            // console.log(answer.order)
                        })
                        
                    }
                    else {
                        console.log("item is sold out :(")
                    }
                    connection.end();
                });
        });
}