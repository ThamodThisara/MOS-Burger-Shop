let foodItems = [
    { code: 'B1001', name: 'Classic Burger (Large)', price: 750, quantity: 50, expiration: '2024-12-31', discount: 0 },
    { code: 'B1002', name: 'Classic Burger (Regular)', price: 1500, quantity: 50, expiration: '2024-12-31', discount: 15 },
    { code: 'B1003', name: 'Turkey Burger', price: 1600, quantity: 50, expiration: '2024-12-31', discount: 0 },
    
];

let cart = []; 
let sales = []; 
let customers = [];

function addFoodItem() {
    let code = document.getElementById('itemCode').value;
    let name = document.getElementById('itemName').value;
    let price = document.getElementById('itemPrice').value;
    let quantity = document.getElementById('itemQuantity').value;
    let expiration = document.getElementById('itemExpiration').value;
    let discount = document.getElementById('itemDiscount').value; 

    let newItem = {
        code: code,
        name: name,
        price: Number(price),
        quantity: Number(quantity),
        expiration: expiration,
        discount: Number(discount) 
    };

    foodItems.push(newItem); 

    displayFoodItems();
    document.getElementById('addItemForm').reset(); 
}

function displayFoodItems() {
    let table = document.getElementById('foodItemsTable').getElementsByTagName('tbody')[0];
    table.innerHTML = ''; 

    foodItems.forEach((item, index) => {
        let row = table.insertRow();
        row.innerHTML = `
            <td>${item.code}</td>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td>${item.quantity}</td>
            <td>${item.expiration}</td>
            <td>${item.discount}%</td>
            <td>
                <button class="btn btn-danger" onclick="deleteFoodItem(${index})">Delete</button>
                <button class="btn btn-secondary" onclick="editFoodItem(${index})">Update</button>
            </td>
        `;
    });
}

document.addEventListener('DOMContentLoaded', displayFoodItems);