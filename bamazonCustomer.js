// var mysql = require("mysql");
var inquirer = require("inquirer");

// var connection = mysql.createConnection({
//     host: "localhost", 
//     port: 3306, 
//     user: "root", 
//     password: "", 
//     database: "bamazon"
// });

// connection.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
// });
  
connection.connect();

var prodLength;

function read(item_id) {
    if (item_id) {
        connection.query("SELECT * FROM products WHERE item_id = ?", [item_id], function (err, res){
            if (err) throw err; 
            });
    }
    else{
        connection.query("SELECT * FROM products", function (err, res) {
            if (err) throw err; 
            prodLength = res.length;
            console.log("***********************************************************************")
            for (i = 0; i < res.length; i++) { 
                console.log(`Item ID: ${res[i].item_id} \nProduct Name: ${res[i].product_name} \nDepartment:  ${res[i].department_name} \nPrice: $${res[i].price} \nStock Quantity: ${res[i].stock_quantity}`);
                console.log("***********************************************************************")
            }
            console.log("------------------------------------------------------------------");
            prompt();
        });
    }
    
}
function update(item_id, stock_quantity, quantity, price) {
    if (stock_quantity >= quantity) {
        var new_stock = stock_quantity - quantity;
        connection.query(`
        UPDATE products SET 
        stock_quantity = ? 
        WHERE item_id = ?
        `, [new_stock, item_id], function (err, res) {
        var totalPrice = quantity*price;
        console.log("------------------------------------------------------------------");
        console.log("Thank you for ordering with us, the total is $" + totalPrice + "." )
        console.log("------------------------------------------------------------------");
        connection.end();
        });
    }
    else {
        console.log("-----------------------------------------------------------------------------------------");
        console.log("We ran out of inventory to fill your order. Please try a different quantity or similar item.")
        console.log("-----------------------------------------------------------------------------------------");
        prompt();
    }
    
}

read();


function prompt() {
    inquirer   
    .prompt([
        {
        name: "item_id", 
        message: "What is the ID of the item you would like to purchase?", 
        type: "input"
        },
        {
        name: "quantity", 
        message: "How many would you like?", 
        type: "input"
        }

    ])
    .then(answers => {
        var item_number = parseInt(answers.item_id);
        var quantity_number = parseInt(answers.quantity);
        if (answers.item_id) {
            connection.query("SELECT * FROM products WHERE item_id = ?", [answers.item_id], function (err, res){
                if (err) {
                    throw err; 
                }
                else {
                     if (item_number <= prodLength) {
                        if (typeof(quantity_number) != "number") {
                            console.log("--------------------------------------");
                            console.log(" Please enter a quantity for the item you would like.");
                            console.log("--------------------------------------");
                        }
                        else {
                            update(res[0].item_id, res[0].stock_quantity, answers.quantity, res[0].price);    
                        }
                     }

                     else {
                        console.log("--------------------------------------");
                         console.log(" That item ID is incorrect, please enter a valid item ID.");
                         console.log("--------------------------------------");
                         prompt();
                     }
                     
                   
                }
            });
        }
        else{
            connection.query("SELECT * FROM products", function (err, res) {
                if (err) throw err; 
                console.log(res);
            });
        }
    });
}
