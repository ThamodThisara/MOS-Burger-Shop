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

// Function to delete a customer
function deleteCustomer(index) {
    customers.splice(index, 1); // Remove the customer from the array
    displayCustomers(); // Refresh the customer list
}

// Function to edit a customer's details
function editCustomer(index) {
    let customer = customers[index];
    document.getElementById('customerName').value = customer.name;
    document.getElementById('customerPhone').value = customer.phone;
    
    // Update button to save changes
    document.getElementById('customerForm').innerHTML += `<button type="button" class="btn btn-success mt-3" onclick="saveCustomer(${index})">Save Changes</button>`;
}

// Function to save updated customer details
function saveCustomer(index) {
    let name = document.getElementById('customerName').value;
    let phone = document.getElementById('customerPhone').value;

    customers[index].name = name;
    customers[index].phone = phone;

    displayCustomers(); // Refresh the customer list
    document.getElementById('customerForm').reset(); // Reset form
}

// Function to view orders for a customer
function viewCustomerOrders(index) {
    let customer = customers[index];
    let ordersDiv = document.getElementById('customerOrders');

    if (customer.orders.length > 0) {
        let orderList = `<strong>Orders for ${customer.name}:</strong><br>`;
        customer.orders.forEach((order, idx) => {
            orderList += `${idx + 1}. ${order.name} - LKR ${order.price} x ${order.quantity} <br>`;
        });
        ordersDiv.innerHTML = orderList;
    } else {
        ordersDiv.innerHTML = `<strong>No orders for ${customer.name}</strong>`;
    }
}

// Function to add order to a customer during the finalization of an order
function addOrderToCustomer(customerName, order) {
    let customer = customers.find(c => c.name === customerName);
    if (customer) {
        customer.orders.push(order); // Add order to the customer
    } else {
        alert('Customer not found.');
    }
}

// Add item to cart with discount applied
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

// Display cart items with discounts applied
function displayCart() {
    let cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = ''; // Clear cart

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

// Finalize the order and update the quantities in the foodItems table
function finalizeOrder() {
    let customerName = prompt("Enter Customer Name for this order:"); // Prompt for customer name
    let orderDiscount = document.getElementById('orderDiscount').value || 0;
    let total = cart.reduce((acc, item) => acc + (item.discountedPrice * item.quantity), 0);
    let discountAmount = (total * orderDiscount) / 100;
    let finalAmount = total - discountAmount;

    // Add orders to customer
    cart.forEach(item => {
        addOrderToCustomer(customerName, item); // Associate the order with the customer
    });

    // Update quantities in foodItems
    cart.forEach(item => {
        let foodItem = foodItems.find(f => f.code === item.code);
        if (foodItem) {
            foodItem.quantity -= item.quantity; 
        }
    });

    sales.push(...cart); // Store finalized order for sales report

    generateReceiptPreview(finalAmount); 
    generateMonthlySalesReport(); // Update the monthly sales report
    displayFoodItems(); // Refresh the table to show updated quantities
}

// Generate and display receipt preview
function generateReceiptPreview(finalAmount) {
    let receiptPreview = document.getElementById('receiptPreview');
    let receiptText = 'MOS Burgers Receipt\n\n';

    cart.forEach((item, index) => {
        receiptText += `${index + 1}. ${item.name} - LKR ${item.discountedPrice} x ${item.quantity}\n`;
    });

    receiptText += `\nTotal: LKR ${finalAmount}\n`;

    receiptPreview.textContent = receiptText;
}

// Generate receipt PDF
function generateReceipt() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    let receiptText = document.getElementById('receiptPreview').textContent;
    doc.text(receiptText, 10, 10);
    doc.save('receipt.pdf');
}

// Generate and display sales report preview
function generateMonthlySalesReport() {
    let salesReportPreview = document.getElementById('salesReportPreview');
    let reportText = 'Monthly Sales Report\n\n';

    sales.forEach((sale, index) => {
        reportText += `${index + 1}. ${sale.name} - LKR ${sale.discountedPrice} x ${sale.quantity}\n`;
    });

    salesReportPreview.textContent = reportText;
}

// Generate sales report PDF
function downloadMonthlySalesReport() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    let reportText = document.getElementById('salesReportPreview').textContent;
    doc.text(reportText, 10, 10);
    doc.save('monthly_sales_report.pdf');
}

// Search item in the foodItems table
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
document.addEventListener('DOMContentLoaded', displayFoodItems);
