// ========== ДАННЫЕ ==========
const tours = [
    {
        id: 1,
        title: "Обзорная экскурсия по Москве",
        description: "Увлекательная прогулка по центру Москвы. Посетим Красную площадь, Александровский сад, храм Христа Спасителя.",
        price: 1500,
        duration: "3 часа",
        location: "Москва",
        maxPeople: 20,
        availableSeats: 15,
        date: "2026-04-15T10:00:00",
        image: "moscow"
    },
    {
        id: 2,
        title: "Эрмитаж - сокровища России",
        description: "Экскурсия по одному из величайших музеев мира. Шедевры живописи, скульптуры и прикладного искусства.",
        price: 2000,
        duration: "2 часа",
        location: "Санкт-Петербург",
        maxPeople: 10,
        availableSeats: 8,
        date: "2026-04-16T11:00:00",
        image: "hermitage"
    },
    {
        id: 3,
        title: "Казанский Кремль",
        description: "Знакомство с историей и архитектурой главной достопримечательности Татарстана.",
        price: 1200,
        duration: "2.5 часа",
        location: "Казань",
        maxPeople: 15,
        availableSeats: 12,
        date: "2026-04-17T09:00:00",
        image: "kazan"
    },
    {
        id: 4,
        title: "Сочи Парк",
        description: "Экскурсия в самый большой тематический парк России. Аттракционы и развлечения для всей семьи.",
        price: 2500,
        duration: "4 часа",
        location: "Сочи",
        maxPeople: 25,
        availableSeats: 20,
        date: "2026-04-18T12:00:00",
        image: "sochi"
    },
    {
        id: 5,
        title: "Петродворец - русский Версаль",
        description: "Прогулка по дворцово-парковому ансамблю с знаменитыми фонтанами.",
        price: 1800,
        duration: "3 часа",
        location: "Санкт-Петербург",
        maxPeople: 12,
        availableSeats: 10,
        date: "2026-04-19T10:00:00",
        image: "petergof"
    },
    {
        id: 6,
        title: "Золотое кольцо России",
        description: "Путешествие по древним городам: Сергиев Посад, Переславль-Залесский, Ростов Великий.",
        price: 3500,
        duration: "12 часов",
        location: "Москва",
        maxPeople: 8,
        availableSeats: 6,
        date: "2026-04-20T08:00:00",
        image: "goldenring"
    }
];

// ========== ПОЛЬЗОВАТЕЛИ ==========
let users = JSON.parse(localStorage.getItem('users')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

// ========== КОРЗИНА ==========
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// ========== БРОНИРОВАНИЯ ==========
let bookings = JSON.parse(localStorage.getItem('bookings')) || [];

// ========== ФУНКЦИИ АВТОРИЗАЦИИ ==========
function register(event) {
    event.preventDefault();
    
    const username = document.getElementById('regUsername').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const password2 = document.getElementById('regPassword2').value;
    
    if (password !== password2) {
        alert('Пароли не совпадают!');
        return false;
    }
    
    if (users.find(u => u.username === username || u.email === email)) {
        alert('Пользователь с таким именем или email уже существует!');
        return false;
    }
    
    const newUser = {
        id: Date.now(),
        username,
        email,
        password
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    currentUser = newUser;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    alert('Регистрация успешна!');
    window.location.href = 'index.html';
    return false;
}

function login(event) {
    event.preventDefault();
    
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    
    const user = users.find(u => (u.username === username || u.email === username) && u.password === password);
    
    if (!user) {
        alert('Неверное имя пользователя или пароль!');
        return false;
    }
    
    currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    alert('Вход выполнен!');
    window.location.href = 'index.html';
    return false;
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

function checkAuth() {
    const authButtons = document.getElementById('authButtons');
    const userInfo = document.getElementById('userInfo');
    
    if (currentUser) {
        if (authButtons) authButtons.style.display = 'none';
        if (userInfo) {
            userInfo.style.display = 'flex';
            document.getElementById('username').textContent = currentUser.username;
        }
    } else {
        if (authButtons) authButtons.style.display = 'flex';
        if (userInfo) userInfo.style.display = 'none';
    }
}

// ========== ФУНКЦИИ ТУРОВ ==========
function loadPopularTours() {
    const container = document.getElementById('popularTours');
    if (!container) return;
    
    const popularTours = tours.slice(0, 3);
    container.innerHTML = popularTours.map(tour => createTourCard(tour)).join('');
}

function loadAllTours() {
    const container = document.getElementById('allTours');
    if (!container) return;
    
    container.innerHTML = tours.map(tour => createTourCard(tour)).join('');
}

function filterTours() {
    const search = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const location = document.getElementById('locationFilter')?.value || '';
    const minPrice = parseInt(document.getElementById('minPrice')?.value) || 0;
    const maxPrice = parseInt(document.getElementById('maxPrice')?.value) || Infinity;
    
    const filtered = tours.filter(tour => {
        const matchSearch = tour.title.toLowerCase().includes(search) || tour.description.toLowerCase().includes(search);
        const matchLocation = !location || tour.location === location;
        const matchPrice = tour.price >= minPrice && tour.price <= maxPrice;
        return matchSearch && matchLocation && matchPrice;
    });
    
    const container = document.getElementById('allTours');
    if (container) {
        container.innerHTML = filtered.map(tour => createTourCard(tour)).join('');
    }
}

function createTourCard(tour) {
    const date = new Date(tour.date);
    const formattedDate = date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' });
    
    return `
        <div class="tour-card">
            <div class="tour-image">
                <i class="fas fa-map-marker-alt"></i>
            </div>
            <div class="tour-content">
                <h3 class="tour-title">${tour.title}</h3>
                <p class="tour-description">${tour.description.substring(0, 100)}...</p>
                <div class="tour-info">
                    <span><i class="fas fa-map-pin"></i> ${tour.location}</span>
                    <span><i class="fas fa-clock"></i> ${tour.duration}</span>
                    <span><i class="fas fa-calendar"></i> ${formattedDate}</span>
                    <span><i class="fas fa-users"></i> ${tour.availableSeats} мест</span>
                </div>
                <div class="tour-price">${tour.price.toLocaleString()} ₽</div>
                <div class="tour-actions">
                    <button onclick="addToCart(${tour.id})" class="btn btn-primary btn-small">В корзину</button>
                    <button onclick="bookNow(${tour.id})" class="btn btn-outline btn-small">Забронировать</button>
                </div>
            </div>
        </div>
    `;
}

// ========== ФУНКЦИИ КОРЗИНЫ ==========
function addToCart(tourId) {
    if (!currentUser) {
        if (confirm('Для бронирования необходимо войти. Перейти на страницу входа?')) {
            window.location.href = 'login.html';
        }
        return;
    }
    
    const tour = tours.find(t => t.id === tourId);
    if (!tour) return;
    
    const existingItem = cart.find(item => item.tourId === tourId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            tourId: tour.id,
            title: tour.title,
            price: tour.price,
            location: tour.location,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert('Тур добавлен в корзину!');
}

function updateCartCount() {
    const cartCountElements = document.querySelectorAll('#cartCount');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElements.forEach(el => {
        if (el) el.textContent = totalItems;
    });
}

function loadCart() {
    const container = document.getElementById('cartItems');
    const summaryContainer = document.getElementById('cartSummary');
    
    if (!container) return;
    
    if (cart.length === 0) {
        container.innerHTML = '<p style="text-align: center;">Корзина пуста. <a href="tours.html">Выбрать туры</a></p>';
        if (summaryContainer) summaryContainer.innerHTML = '';
        return;
    }
    
    let total = 0;
    container.innerHTML = cart.map(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        return `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h3>${item.title}</h3>
                    <p>${item.location}</p>
                    <p>${item.price.toLocaleString()} ₽ × ${item.quantity}</p>
                </div>
                <div>
                    <button onclick="updateQuantity(${item.tourId}, ${item.quantity - 1})" class="btn btn-outline btn-small">-</button>
                    <span style="margin: 0 10px;">${item.quantity}</span>
                    <button onclick="updateQuantity(${item.tourId}, ${item.quantity + 1})" class="btn btn-outline btn-small">+</button>
                    <button onclick="removeFromCart(${item.tourId})" class="btn btn-danger btn-small">Удалить</button>
                </div>
                <div class="cart-item-price">${itemTotal.toLocaleString()} ₽</div>
            </div>
        `;
    }).join('');
    
    if (summaryContainer) {
        summaryContainer.innerHTML = `
            <div class="cart-total">Итого: ${total.toLocaleString()} ₽</div>
            <button onclick="checkout()" class="btn btn-primary">Оформить бронирование</button>
        `;
    }
}

function updateQuantity(tourId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(tourId);
        return;
    }
    
    const item = cart.find(i => i.tourId === tourId);
    if (item) {
        item.quantity = newQuantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        loadCart();
    }
}

function removeFromCart(tourId) {
    cart = cart.filter(item => item.tourId !== tourId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    loadCart();
}

function checkout() {
    if (cart.length === 0) {
        alert('Корзина пуста!');
        return;
    }
    
    if (!currentUser) {
        alert('Необходимо войти в систему');
        window.location.href = 'login.html';
        return;
    }
    
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
    });
    
    if (confirm(`Оформить бронирование на сумму ${total.toLocaleString()} ₽?`)) {
        const newBookings = cart.map(item => ({
            id: Date.now() + Math.random(),
            userId: currentUser.id,
            tourId: item.tourId,
            title: item.title,
            location: item.location,
            price: item.price,
            quantity: item.quantity,
            total: item.price * item.quantity,
            date: new Date().toISOString(),
            status: 'pending'
        }));
        
        bookings.push(...newBookings);
        localStorage.setItem('bookings', JSON.stringify(bookings));
        
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        
        alert('Бронирование успешно оформлено! Перейдите к оплате в разделе "Мои бронирования"');
        window.location.href = 'booking.html';
    }
}

// ========== ФУНКЦИИ БРОНИРОВАНИЙ ==========
function loadBookings() {
    const container = document.getElementById('bookingsList');
    if (!container) return;
    
    const userBookings = bookings.filter(b => b.userId === currentUser?.id);
    
    if (userBookings.length === 0) {
        container.innerHTML = '<p style="text-align: center;">У вас пока нет бронирований. <a href="tours.html">Выбрать тур</a></p>';
        return;
    }
    
    container.innerHTML = userBookings.map(booking => {
        const bookingDate = new Date(booking.date);
        const formattedDate = bookingDate.toLocaleDateString('ru-RU');
        
        let statusText = '';
        let statusClass = '';
        
        switch(booking.status) {
            case 'pending':
                statusText = 'Ожидает оплаты';
                statusClass = 'status-pending';
                break;
            case 'paid':
                statusText = 'Оплачен';
                statusClass = 'status-paid';
                break;
            case 'cancelled':
                statusText = 'Отменен';
                statusClass = 'status-cancelled';
                break;
        }
        
        return `
            <div class="booking-card">
                <div>
                    <h3>${booking.title}</h3>
                    <p><i class="fas fa-map-pin"></i> ${booking.location}</p>
                    <p>Количество: ${booking.quantity} чел.</p>
                    <p>Сумма: ${booking.total.toLocaleString()} ₽</p>
                    <p>Дата бронирования: ${formattedDate}</p>
                </div>
                <div style="text-align: right;">
                    <span class="booking-status ${statusClass}">${statusText}</span>
                    ${booking.status === 'pending' ? `
                        <div style="margin-top: 10px;">
                            <button onclick="payBooking(${booking.id})" class="btn btn-primary btn-small">Оплатить</button>
                            <button onclick="cancelBooking(${booking.id})" class="btn btn-danger btn-small">Отменить</button>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }).join('');
}

function payBooking(bookingId) {
    const booking = bookings.find(b => b.id === bookingId);
    if (booking && booking.userId === currentUser?.id) {
        if (confirm(`Оплатить ${booking.title} на сумму ${booking.total.toLocaleString()} ₽?`)) {
            booking.status = 'paid';
            localStorage.setItem('bookings', JSON.stringify(bookings));
            alert('Оплата прошла успешно!');
            loadBookings();
        }
    }
}

function cancelBooking(bookingId) {
    const booking = bookings.find(b => b.id === bookingId);
    if (booking && booking.userId === currentUser?.id) {
        if (confirm('Отменить бронирование?')) {
            booking.status = 'cancelled';
            localStorage.setItem('bookings', JSON.stringify(bookings));
            alert('Бронирование отменено');
            loadBookings();
        }
    }
}

function bookNow(tourId) {
    if (!currentUser) {
        if (confirm('Для бронирования необходимо войти. Перейти на страницу входа?')) {
            window.location.href = 'login.html';
        }
        return;
    }
    
    const tour = tours.find(t => t.id === tourId);
    if (!tour) return;
    
    const quantity = prompt('Введите количество человек:', '1');
    if (!quantity) return;
    
    const numQuantity = parseInt(quantity);
    if (isNaN(numQuantity) || numQuantity < 1) {
        alert('Введите корректное количество');
        return;
    }
    
    if (numQuantity > tour.availableSeats) {
        alert(`Доступно только ${tour.availableSeats} мест`);
        return;
    }
    
    const newBooking = {
        id: Date.now(),
        userId: currentUser.id,
        tourId: tour.id,
        title: tour.title,
        location: tour.location,
        price: tour.price,
        quantity: numQuantity,
        total: tour.price * numQuantity,
        date: new Date().toISOString(),
        status: 'pending'
    };
    
    bookings.push(newBooking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    
    alert('Бронирование успешно создано! Перейдите к оплате в разделе "Мои бронирования"');
    window.location.href = 'booking.html';
}