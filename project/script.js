let cart = [];
let currentPage = 'home';

function showPage(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(page).classList.add('active');
    currentPage = page;
    updateNav();
}

function updateNav() {
    document.querySelectorAll('.menu a').forEach(link => {
        link.classList.remove('active');
        if (link.textContent.toLowerCase().includes(currentPage)) {
            link.classList.add('active');
        }
    });
}

function addItem(name, price) {
    let item = cart.find(i => i.name === name);
    
    if (item) {
        item.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }
    
    updateCart();
    alert(`${name} added to cart!`);
}

function updateCart() {
    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    let cartCount = document.getElementById('cart-count');
    
    if (cartCount) {
        cartCount.textContent = totalItems > 0 ? totalItems : '';
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
}

function viewCart() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    
    let message = "Your Cart:\n";
    let total = 0;
    
    cart.forEach(item => {
        let itemTotal = item.price * item.quantity;
        total += itemTotal;
        message += `${item.name} - Rs ${item.price.toLocaleString()} x ${item.quantity}\n`;
    });
    
    message += `\nTotal: Rs ${total.toLocaleString()}`;
    
    if (confirm(message + "\n\nProceed to checkout?")) {
        alert("Checkout feature coming soon!");
        cart = [];
        updateCart();
    }
}

function submitForm() {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let message = document.getElementById('message').value;
    
    if (!name || !email || !message) {
        alert("Please fill all fields!");
        return false;
    }
    
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Please enter valid email!");
        return false;
    }
    
    alert("Message sent! We'll contact you soon.");
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('message').value = '';
    return false;
}

function loadCart() {
    let savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    loadCart();
    showPage('home');
    
    document.querySelector('.logo img').addEventListener('click', function() {
        showPage('home');
    });
});