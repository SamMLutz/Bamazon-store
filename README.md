# Bamazon-store

*a mock store for users to select an item, purchase item and update inventory*

  For this project we created a mock amazon online store. Users access the store using node.js. Once you run node on the page
  a table is displayed including all the product names, department names, price, stock inventory as well as an ID number for 
  each available item. To begin we created the databse using **MySQL workbench**. Once the database was created we used a few
  node packages to run the app. Firstly we *require* the mysql node package as well as the *inquirer* package. We use inquirer
  get info from the user in terms of which item they would like to purchase and how many units of the item they would like to 
  buy. Using the MySQL node package we can connect to the databse using node in our code editor. Once connected to the 
  database we right a few functions to including various *connection queries* to update the database. Using these functions we can add products, delete products, view all and update indiviual values of each (price, quantity etc). Once the database has been populated with items we use inquire to ask the user to select which item they would like to buy and the number of units they would like. Then using the gathered info from inquirer we use connection queries to calculate the total price for the 
  user as well as the new stock quantity after the users purchase. Below you will find screenhots of the store in action!
![image](https://user-images.githubusercontent.com/46271448/56915679-25ddd380-6a85-11e9-97e4-810334a5ef26.png)

![image](https://user-images.githubusercontent.com/46271448/56915724-3beb9400-6a85-11e9-8896-5eaf88523aea.png)

![image](https://user-images.githubusercontent.com/46271448/56915594-f3cc7180-6a84-11e9-9c61-30fc9fb1a048.png)
