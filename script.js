let foodItems = [
    { code: 'B1001', name: 'Classic Burger (Large)', price: 750, quantity: 50, expiration: '2024-12-31', discount: 0 },
    { code: 'B1002', name: 'Classic Burger (Regular)', price: 1500, quantity: 25, expiration: '2024-10-11', discount: 15 },
    { code: 'B1003', name: 'Turkey Burger', price: 1600, quantity: 60, expiration: '2024-10-15', discount: 0 },
    { code: 'B1004', name: 'Chicken Burger (Large)', price: 1400, quantity: 100, expiration: '2024-11-23', discount: 0 },
    { code: 'B1005', name: 'Chicken Burger (Regular)', price: 800, quantity: 13, expiration: '2024-12-02', discount: 20 },
    { code: 'B1006', name: 'Cheese Burger (Large)', price: 1000, quantity: 55, expiration: '2024-10-18', discount: 0 },
    { code: 'B1007', name: 'Cheese Burger (Regular) ', price: 600, quantity: 34, expiration: '2024-11-11', discount: 0 },
    { code: 'B1008', name: 'Bacon Burger', price: 650, quantity: 80, expiration: '2024-12-13', discount: 15 },
    { code: 'B1009', name: 'Shawarma Burger', price: 800, quantity: 43, expiration: '2024-11-05', discount: 0 },
    { code: 'B1010', name: 'Olive Burger', price: 1800, quantity: 10, expiration: '2024-11-27', discount: 0 },
    { code: 'B1011', name: 'Double-Cheese Burger', price: 1250, quantity: 18, expiration: '2024-10-09', discount: 20 },
    { code: 'B1012', name: 'Crispy Chicken Burger (Regular)', price: 1200, quantity: 74, expiration: '2024-11-14', discount: 0 },
    { code: 'B1013', name: 'Crispy Chicken Burger (Large)', price: 1600, quantity: 44, expiration: '2024-11-03', discount: 10 },
    { code: 'B1014', name: 'Paneer Burger', price: 900, quantity: 20, expiration: '2024-12-01', discount: 0 }
];

let cart = [];
let sales = [];
let customers = [];
let currentIndex = -1; 

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

function addFoodItem() {
    let code = document.getElementById('itemCode').value;
    let name = document.getElementById('itemName').value;
    let price = document.getElementById('itemPrice').value;
    let quantity = document.getElementById('itemQuantity').value;
    let expiration = document.getElementById('itemExpiration').value;
    let discount = document.getElementById('itemDiscount').value;

    if (currentIndex == -1) {
        let newItem = { code, name, price: Number(price), quantity: Number(quantity), expiration, discount: Number(discount) };
        foodItems.push(newItem); 
    } else {
        foodItems[currentIndex] = { code, name, price: Number(price), quantity: Number(quantity), expiration, discount: Number(discount) };
        currentIndex = -1; 
        document.getElementById('addFoodItemBtn').textContent = 'Add Item'; 
    }

    displayFoodItems(); 
    document.getElementById('addItemForm').reset(); 
}

function editFoodItem(index) {
    let item = foodItems[index];
    document.getElementById('itemCode').value = item.code;
    document.getElementById('itemName').value = item.name;
    document.getElementById('itemPrice').value = item.price;
    document.getElementById('itemQuantity').value = item.quantity;
    document.getElementById('itemExpiration').value = item.expiration;
    document.getElementById('itemDiscount').value = item.discount;

    currentIndex = index; 
    document.getElementById('addFoodItemBtn').textContent = 'Update Item'; 
}

function deleteFoodItem(index) {
    foodItems.splice(index, 1); 
    displayFoodItems(); 
}

function searchItem() {
    let input = document.getElementById('searchItemInput').value.toLowerCase();
    let result = foodItems.find(item => item.name.toLowerCase().includes(input) || item.code.toLowerCase().includes(input));
    if (result) {
        document.getElementById('itemDetails').innerHTML = `
            <strong>Item:</strong> ${result.name} <br>
            <strong>Price:</strong> LKR ${result.price} <br>
            <strong>Expiration:</strong> ${result.expiration} <br>
            <strong>Discount:</strong> ${result.discount}% <br>
            <button class="btn btn-success mt-3" onclick="addToCart('${result.code}')">Add to Cart</button>
        `;
    } else {
        document.getElementById('itemDetails').innerHTML = 'No item found.';
    }
}

function addToCart(itemCode) {
    let item = foodItems.find(item => item.code === itemCode);
    let quantity = prompt('Enter quantity:', 1);

    if (item && quantity > 0) {
        let discountedPrice = item.price - (item.price * (item.discount / 100));
        let cartItem = { ...item, quantity: Number(quantity), discountedPrice };
        cart.push(cartItem);
        displayCart();
    }
}

function displayCart() {
    let cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = ''; 

    cart.forEach(item => {
        let totalItemPrice = item.discountedPrice * item.quantity;
        let listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        listItem.innerHTML = `
            <strong>${item.name}</strong> - LKR ${item.discountedPrice} x ${item.quantity} = LKR ${totalItemPrice} (Discount Applied: ${item.discount}%)
            <button class="btn btn-danger btn-sm float-end" onclick="removeFromCart('${item.code}')">Remove</button>
        `;
        cartItemsContainer.appendChild(listItem);
    });
}

function addCustomer() {
    let name = document.getElementById('customerName').value;
    let phone = document.getElementById('customerPhone').value;

    let newCustomer = {
        name: name,
        phone: phone,
        orders: [] 
    };

    customers.push(newCustomer);
    displayCustomers(); 
    document.getElementById('customerForm').reset(); 
}

function displayCustomers() {
    let customerList = document.getElementById('customers');
    customerList.innerHTML = ''; 

    customers.forEach((customer, index) => {
        let listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        listItem.innerHTML = `
            <strong>${customer.name}</strong> - ${customer.phone}
            <button class="btn btn-danger btn-sm float-end ms-2" onclick="deleteCustomer(${index})">Delete</button>
            <button class="btn btn-secondary btn-sm float-end" onclick="editCustomer(${index})">Edit</button>
            <button class="btn btn-info btn-sm float-end" onclick="viewCustomerOrders(${index})">View Orders</button>
        `;
        customerList.appendChild(listItem);
    });
}

document.addEventListener('DOMContentLoaded', displayFoodItems);
