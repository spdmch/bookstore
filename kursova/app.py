<!DOCTYPE html>
<html lang="uk">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Онлайн-Книгарня | SpBooks</title>

    <!-- Підключення шрифтів: Montserrat (основний) та Playfair Display (для заголовка) -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Playfair+Display:wght@700&display=swap" rel="stylesheet">
    
    <!-- Підключення іконок Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">

    <!-- ВБУДОВАНІ СТИЛІ (замість styles/main.css) -->
    <style>
        :root {
            --primary-color: #4A301D; /* Темний шоколад - основний колір */
            --accent-color: #FFC30B; /* Золото/Янтар - акцентний колір */
            --light-bg: #F8F8F8;
            --font-montserrat: 'Montserrat', sans-serif;
            --font-playfair: 'Playfair Display', serif;
        }

        body {
            font-family: var(--font-montserrat);
            background-color: var(--light-bg);
            color: var(--primary-color);
            margin: 0;
            padding: 0;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }

        header {
            background-color: white;
            padding: 10px 0;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .logo-wrapper {
            width: 100%;
            padding: 0 20px;
            display: flex;
            justify-content: center;
        }

        .logo-container {
            display: flex;
            align-items: center;
            padding: 8px 15px;
            border-radius: 10px;
            background-color: var(--primary-color);
            color: white;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .site-logo {
            width: 35px;
            height: 35px;
            border-radius: 50%;
            margin-right: 10px;
            object-fit: cover;
            border: 2px solid var(--accent-color);
        }

        .logo-container h1 {
            font-family: var(--font-playfair);
            font-size: 1.8rem;
            font-weight: 700;
            margin: 0;
            color: var(--accent-color);
        }

        #navigation-container {
            margin-top: 10px;
            padding: 0 20px;
            display: flex;
            gap: 20px;
        }

        .nav-link {
            text-decoration: none;
            color: var(--primary-color);
            padding: 8px 12px;
            border-radius: 5px;
            transition: background-color 0.2s, color 0.2s;
            font-weight: 600;
        }

        .nav-link:hover, .nav-link.active {
            background-color: var(--accent-color);
            color: white;
        }
        
        .nav-link i {
            margin-right: 5px;
        }

        main {
            flex-grow: 1;
            padding: 20px;
            max-width: 1200px;
            width: 100%;
            margin: 20px auto;
            background-color: white;
            border-radius: 12px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
        }

        h2 {
            font-family: var(--font-playfair);
            font-size: 2rem;
            color: var(--primary-color);
            margin-bottom: 20px;
            border-bottom: 2px solid var(--accent-color);
            padding-bottom: 5px;
        }

        footer {
            margin-top: auto;
            background-color: var(--primary-color);
            color: white;
            text-align: center;
            padding: 10px 20px;
            font-size: 0.8rem;
        }

        /* --- Компоненти --- */

        /* Таблиця */
        .data-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        .data-table th, .data-table td {
            padding: 12px 15px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }
        .data-table th {
            background-color: #f1e0c5; /* Світлий акцент */
            color: var(--primary-color);
            font-weight: 700;
            text-transform: uppercase;
            font-size: 0.85rem;
        }
        .data-table tr:hover {
            background-color: #fcf6e9;
        }
        .action-btns button {
            background: none;
            border: none;
            cursor: pointer;
            color: var(--primary-color);
            margin: 0 5px;
            transition: color 0.2s;
        }
        .action-btns button:hover {
            color: var(--accent-color);
        }

        /* Кнопки */
        .btn {
            padding: 10px 15px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-weight: 600;
            transition: background-color 0.2s;
            display: inline-flex;
            align-items: center;
            gap: 5px;
        }
        .btn-primary {
            background-color: var(--primary-color);
            color: white;
        }
        .btn-primary:hover {
            background-color: #6a4a33;
        }
        .btn-secondary {
            background-color: #ccc;
            color: var(--primary-color);
        }
        .btn-delete {
            background-color: #c70039;
            color: white;
        }
        .btn-delete:hover {
            background-color: #900028;
        }
        
        /* Форми */
        .form-group {
            margin-bottom: 15px;
        }
        .form-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: 600;
            color: #666;
        }
        .form-group input, .form-group select {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
            box-sizing: border-box;
            font-family: var(--font-montserrat);
        }

        /* Модальне вікно */
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.6);
            display: none;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }
        .modal-content {
            background-color: white;
            padding: 30px;
            border-radius: 10px;
            width: 90%;
            max-width: 500px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            position: relative;
        }
        .modal-close {
            position: absolute;
            top: 10px;
            right: 15px;
            font-size: 1.5rem;
            cursor: pointer;
            color: #aaa;
        }

        /* Спінер завантаження */
        #loading-spinner {
            margin-top: 50px;
            text-align: center;
        }
        .error-message {
            color: #c70039;
            text-align: center;
            padding: 20px;
            border: 1px solid #c70039;
            background-color: #ffe4e4;
            border-radius: 5px;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <header>
        <!-- Обгортка для білого заокругленого блоку -->
        <div class="logo-wrapper"> 
            <div class="logo-container">
                <!-- Логотип -->
                <img src="https://placehold.co/35x35/462506/FFC30B?text=S" alt="SpBooks Logo" class="site-logo">
                <h1>SpBooks</h1> 
            </div>
        </div>
        
        <nav id="navigation-container">
            <a href="#/catalog" id="nav-catalog" class="nav-link"><i class="fas fa-book"></i> Каталог</a>
            <a href="#/login" id="nav-login" class="nav-link"><i class="fas fa-sign-in-alt"></i> Вхід</a>
            <!-- Адмін-панель буде видима тільки для аутентифікованих користувачів -->
            <a href="#/admin" id="nav-admin" class="nav-link hidden"><i class="fas fa-user-shield"></i> Адмін-панель</a>
        </nav>
    </header>

    <main id="app-container">
        <h2 style="text-align: center; color: var(--primary-color); margin-top: 50px;">
            Ласкаво просимо до SpBooks! Оберіть розділ у навігації.
        </h2>
        <div id="loading-spinner" style="text-align:center; display:none;"><i class="fas fa-spinner fa-spin fa-2x" style="color:var(--primary-color);"></i></div>
    </main>

    <footer>
        <p>&copy; 2025 | Курсова робота | Розробник: Думич Софія &middot; <span id="user-status"></span></p>
    </footer>

    <!-- МОДАЛЬНЕ ВІКНО ДЛЯ СТВОРЕННЯ/РЕДАГУВАННЯ КНИГ -->
    <div id="product-modal-overlay" class="modal-overlay">
        <div class="modal-content">
            <span class="modal-close" onclick="closeModal()">&times;</span>
            <h3 id="modal-title" style="color:var(--primary-color); font-family:var(--font-playfair); margin-top: 0;"></h3>
            
            <form id="product-form">
                <input type="hidden" id="product-id">
                
                <div class="form-group">
                    <label for="name">Назва книги / товару</label>
                    <input type="text" id="name" required>
                </div>
                
                <div class="form-group">
                    <label for="author">Автор / Видавець</label>
                    <input type="text" id="author" required>
                </div>

                <div class="form-group">
                    <label for="category">Категорія (Жанр)</label>
                    <input type="text" id="category" required>
                </div>

                <div style="display: flex; gap: 20px;">
                    <div class="form-group" style="flex: 1;">
                        <label for="price">Ціна (грн)</label>
                        <input type="number" id="price" required step="0.01" min="0">
                    </div>
                    <div class="form-group" style="flex: 1;">
                        <label for="quantity">Кількість на складі</label>
                        <input type="number" id="quantity" required min="0">
                    </div>
                </div>

                <div style="text-align: right; margin-top: 20px;">
                    <button type="button" class="btn btn-secondary" onclick="closeModal()">Скасувати</button>
                    <button type="submit" class="btn btn-primary" id="save-button">Зберегти</button>
                </div>
            </form>
        </div>
    </div>


    <!-- Firebase SDK Ініціалізація та Auth -->
    <script type="module">
        import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
        import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
        import { getFirestore, doc, getDoc, addDoc, setDoc, updateDoc, deleteDoc, onSnapshot, collection, query, where, getDocs, setLogLevel } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
        
        // Встановлюємо режим налагодження для Firestore
        setLogLevel('Debug');
        
        // Глобальні змінні з Canvas (обов'язкові)
        const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
        const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : null;
        const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

        if (!firebaseConfig) {
            console.error("Firebase configuration is missing!");
            document.getElementById('app-container').innerHTML = `<p class="error-message">Помилка: Не вдалося завантажити конфігурацію Firebase.</p>`;
            return;
        }
        
        // Ініціалізація Firebase та Auth
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);
        const auth = getAuth(app);
        
        // Зберігаємо посилання на глобальні об'єкти для використання в основній логіці
        window.db = db;
        window.auth = auth;
        window.appId = appId;
        window.isAuthReady = false; // Флаг готовності автентифікації
        window.currentUserId = null;

        // 1. Функція ініціалізації автентифікації
        async function initializeAuth() {
            try {
                if (initialAuthToken) {
                    await signInWithCustomToken(auth, initialAuthToken);
                } else {
                    await signInAnonymously(auth);
                }
                console.log("Firebase Auth initialized successfully.");
            } catch (error) {
                console.error("Помилка під час Firebase sign-in:", error);
            }
        }

        // 2. Слухач стану автентифікації
        onAuthStateChanged(auth, (user) => {
            const statusElement = document.getElementById('user-status');
            const adminLink = document.getElementById('nav-admin');
            
            window.isAuthReady = true;

            if (user) {
                window.currentUserId = user.uid;
                statusElement.textContent = `Користувач ID: ${user.uid}`;
                console.log("Current user ID:", user.uid);
                
                // Якщо користувач аутентифікований, показуємо Адмін-панель
                adminLink.style.display = 'inline-flex';
                
            } else {
                window.currentUserId = null;
                statusElement.textContent = `Анонімний користувач`;
                adminLink.style.display = 'none';
            }
            
            // Після того, як Auth готовий, запускаємо роутер
            if (window.initRouter) {
                window.initRouter();
            }
        });

        // Запускаємо процес автентифікації
        initializeAuth();
        
        // Експортуємо Firebase функції для використання в основному скрипті
        window.firebaseFunctions = {
            getFirestore, doc, getDoc, addDoc, setDoc, updateDoc, deleteDoc, onSnapshot, collection, query, where, getDocs, signOut
        };

    </script>

    <!-- ОСНОВНА ЛОГІКА ДОДАТКА (замість js/main.js) -->
    <script type="module">
        // Отримання глобальних об'єктів після того, як вони будуть встановлені
        const getDB = () => window.db;
        const getAuth = () => window.auth;
        const getAppId = () => window.appId;
        const getUserId = () => window.currentUserId;
        const getAuthReady = () => window.isAuthReady;
        const { doc, addDoc, setDoc, updateDoc, deleteDoc, onSnapshot, collection, query, orderBy } = window.firebaseFunctions;
        const signOut = window.firebaseFunctions.signOut;

        const appContainer = document.getElementById('app-container');
        const loadingSpinner = document.getElementById('loading-spinner');
        const productModal = document.getElementById('product-modal-overlay');
        const productForm = document.getElementById('product-form');
        const modalTitle = document.getElementById('modal-title');
        
        let productsUnsubscribe = null; // Змінна для зберігання підписки Firestore

        // --- ДОПОМІЖНІ ФУНКЦІЇ ---

        function showLoading() {
            appContainer.innerHTML = '';
            loadingSpinner.style.display = 'block';
        }

        function hideLoading() {
            loadingSpinner.style.display = 'none';
        }
        
        function showMessage(message, isError = false) {
            const p = document.createElement('p');
            p.className = isError ? 'error-message' : 'info-message';
            p.textContent = message;
            appContainer.appendChild(p);
        }

        // Функція для отримання шляху до публічної колекції товарів
        function getProductsCollectionRef() {
            const db = getDB();
            const appId = getAppId();
            // Шлях: /artifacts/{appId}/public/data/products
            return collection(db, 'artifacts', appId, 'public', 'data', 'products');
        }

        // --- УПРАВЛІННЯ МОДАЛЬНИМ ВІКНОМ ---

        window.closeModal = function() {
            productModal.style.display = 'none';
            productForm.reset();
            document.getElementById('product-id').value = '';
        }

        function openModal(product = null) {
            productForm.reset();
            document.getElementById('product-id').value = '';
            
            if (product) {
                modalTitle.textContent = 'Редагувати Товар';
                document.getElementById('product-id').value = product.id;
                document.getElementById('name').value = product.name;
                document.getElementById('author').value = product.author || '';
                document.getElementById('category').value = product.category || '';
                document.getElementById('price').value = product.price;
                document.getElementById('quantity').value = product.quantity;
            } else {
                modalTitle.textContent = 'Створити Новий Товар';
            }

            productModal.style.display = 'flex';
        }

        // --- ЛОГІКА CRUD ДЛЯ FIRESTORE ---

        // 1. Завантаження та відображення даних (READ/LISTEN)
        function listenToProducts() {
            if (!getAuthReady() || productsUnsubscribe) {
                return;
            }

            const productsRef = getProductsCollectionRef();
            
            // Використовуємо onSnapshot для отримання оновлень в реальному часі
            productsUnsubscribe = onSnapshot(productsRef, (snapshot) => {
                const products = [];
                snapshot.forEach(doc => {
                    products.push({ id: doc.id, ...doc.data() });
                });
                renderCatalogPage(products);
            }, (error) => {
                console.error("Помилка отримання даних з Firestore:", error);
                appContainer.innerHTML = '<p class="error-message">Помилка завантаження даних. Спробуйте пізніше.</p>';
            });
        }
        
        // 2. Створення/Оновлення товару (CREATE/UPDATE)
        productForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (!getUserId()) {
                showMessage("Ви не авторизовані для цієї дії. Увійдіть в систему.", true);
                return;
            }

            const id = document.getElementById('product-id').value;
            const data = {
                name: document.getElementById('name').value,
                author: document.getElementById('author').value,
                category: document.getElementById('category').value,
                price: parseFloat(document.getElementById('price').value),
                quantity: parseInt(document.getElementById('quantity').value, 10),
                // Додаємо мітку часу
                updated_at: new Date().toISOString()
            };

            showLoading();
            closeModal();

            try {
                if (id) {
                    // Оновлення
                    const productDocRef = doc(getProductsCollectionRef(), id);
                    await updateDoc(productDocRef, data);
                    showMessage(`Товар "${data.name}" успішно оновлено.`);
                } else {
                    // Створення
                    await addDoc(getProductsCollectionRef(), { ...data, created_at: new Date().toISOString() });
                    showMessage(`Товар "${data.name}" успішно створено.`);
                }
            } catch (error) {
                console.error("Помилка збереження товару:", error);
                showMessage(`Помилка збереження: ${error.message}`, true);
            } finally {
                // onSnapshot сам оновить список, тому додаткового виклику listenToProducts не потрібно.
                hideLoading();
            }
        });
        
        // 3. Видалення товару (DELETE)
        window.deleteProduct = async function(id, name) {
            if (!getUserId()) {
                showMessage("Ви не авторизовані для цієї дії. Увійдіть в систему.", true);
                return;
            }
            
            // Замість confirm() ми просто видаляємо і даємо повідомлення
            showLoading();
            
            try {
                const productDocRef = doc(getProductsCollectionRef(), id);
                await deleteDoc(productDocRef);
                showMessage(`Товар "${name}" успішно видалено.`);
            } catch (error) {
                console.error("Помилка видалення товару:", error);
                showMessage(`Помилка видалення: ${error.message}`, true);
            } finally {
                hideLoading();
            }
        }
        
        // 4. Редагування товару (GET by ID та відкриття модального вікна)
        window.editProduct = async function(id) {
            if (!getUserId()) {
                showMessage("Ви не авторизовані для редагування. Увійдіть в систему.", true);
                return;
            }
            
            try {
                // Оскільки onSnapshot вже завантажив всі дані, ми можемо знайти їх в DOM,
                // але для чистоти логіки краще завантажити їх ще раз або використовувати вже завантажений список.
                // Для простоти, відкриємо модалку, яка знає id, а дані підтягнемо з вже наявного списку (якщо він є)
                // Оскільки listenToProducts вже працює, ми можемо вважати, що дані є.
                const productDocRef = doc(getProductsCollectionRef(), id);
                const docSnap = await getDoc(productDocRef);
                
                if (docSnap.exists()) {
                    openModal({ id: docSnap.id, ...docSnap.data() });
                } else {
                    showMessage("Товар не знайдено.", true);
                }
            } catch (error) {
                console.error("Помилка завантаження даних для редагування:", error);
                showMessage(`Помилка завантаження даних: ${error.message}`, true);
            }
        }


        // --- ШАБЛОНИ СТОРІНОК ---

        // Шаблон "Каталог"
        function renderCatalogPage(products) {
            hideLoading();
            
            let tableRows = '';
            if (products.length === 0) {
                tableRows = `<tr><td colspan="5" style="text-align:center; padding: 20px;">Каталог порожній.</td></tr>`;
            } else {
                // Сортуємо дані в JavaScript, оскільки orderBy у Firestore вимагає індексації.
                products.sort((a, b) => (a.name || '').localeCompare(b.name || ''));

                products.forEach(product => {
                    const price = parseFloat(product.price).toFixed(2);
                    tableRows += `
                        <tr>
                            <td>
                                <strong>${product.name}</strong><br>
                                <span style="font-size: 0.9em; color: #666;">${product.author || 'Невідомий автор'}</span>
                            </td>
                            <td>${product.category || 'Інше'}</td>
                            <td style="color: green; font-weight: bold;">${price} грн</td>
                            <td>${product.quantity} шт.</td>
                            <td class="action-btns" style="text-align: center;">
                                ${getUserId() ? `
                                    <button onclick="editProduct('${product.id}')" title="Редагувати"><i class="fas fa-edit"></i></button>
                                    <button onclick="deleteProduct('${product.id}', '${product.name}')" title="Видалити"><i class="fas fa-trash"></i></button>
                                ` : '<span style="color: #ccc;">(Тільки для адміністратора)</span>'}
                            </td>
                        </tr>
                    `;
                });
            }

            appContainer.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <h2>📚 Каталог Книг</h2>
                    ${getUserId() ? `
                        <button class="btn btn-primary" onclick="openModal()">
                            <i class="fas fa-plus"></i> Додати Товар
                        </button>
                    ` : ''}
                </div>
                
                <div style="overflow-x: auto;">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Назва / Автор</th>
                                <th>Категорія</th>
                                <th>Ціна</th>
                                <th>Кількість</th>
                                <th style="text-align: center;">Дії</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${tableRows}
                        </tbody>
                    </table>
                </div>
            `;
            // Перевіряємо, чи потрібно перезапустити слухача Firestore
            listenToProducts();
        }
        
        // Шаблон "Вхід"
        function renderLoginPage() {
            hideLoading();
            const auth = getAuth();
            
            let content = '';
            if (getUserId()) {
                content = `
                    <h3>Вітаємо!</h3>
                    <p>Ви вже увійшли в систему з ID: <code style="color:var(--primary-color);">${getUserId()}</code></p>
                    <p>Для керування каталогом ви можете перейти до <a href="#/catalog" style="color:var(--accent-color); font-weight: bold;">Каталогу</a></p>
                    <button class="btn btn-delete" onclick="handleSignOut()"><i class="fas fa-sign-out-alt"></i> Вийти</button>
                `;
            } else {
                content = `
                    <h3>Вхід</h3>
                    <p>
                        Для використання функціоналу адміністратора (створення/редагування/видалення) потрібно увійти. 
                        Наразі ви використовуєте анонімний доступ, наданий системою. 
                        В реальному застосунку тут була б форма логіну.
                    </p>
                    <p><strong>Поточний статус:</strong> Анонімний користувач.</p>
                `;
            }

            appContainer.innerHTML = `
                <h2>🔑 Вхід / Статус</h2>
                <div style="max-width: 400px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; text-align: center;">
                    ${content}
                </div>
            `;
        }
        
        // Функція виходу
        window.handleSignOut = async function() {
            try {
                await signOut(getAuth());
                showMessage("Ви успішно вийшли з системи.");
                window.location.hash = '#/login'; // Перенаправляємо на сторінку входу
            } catch (error) {
                console.error("Помилка виходу:", error);
                showMessage(`Помилка виходу: ${error.message}`, true);
            }
        }
        
        // Шаблон "Адмін-панель"
        function renderAdminPage() {
            hideLoading();
            
            if (!getUserId()) {
                 appContainer.innerHTML = `
                    <h2>🛡️ Адмін-панель</h2>
                    <p class="error-message">Доступ заборонено. Будь ласка, <a href="#/login">увійдіть</a> для перегляду цієї сторінки.</p>
                `;
                return;
            }
            
            // Тут буде логіка для Chart.js (якщо потрібна), але поки що це заглушка
            appContainer.innerHTML = `
                <h2>🛡️ Адмін-панель</h2>
                <p><strong>Ваш ID:</strong> <code>${getUserId()}</code></p>
                <div style="padding: 20px; border: 1px dashed var(--accent-color); border-radius: 5px;">
                    <h3>Аналітика (Заглушка)</h3>
                    <p>Тут можна відобразити статистику продажів або графіки, використовуючи Chart.js та дані з інших колекцій Firestore (наприклад, колекції "Замовлення").</p>
                    <p>Наприклад: кількість товарів у каталозі, кількість користувачів, найпопулярніші категорії.</p>
                </div>
                <div style="margin-top: 20px; text-align: center;">
                    <button class="btn btn-delete" onclick="handleSignOut()"><i class="fas fa-sign-out-alt"></i> Вийти</button>
                </div>
            `;
        }

        // --- РОУТЕР (КЕРУВАННЯ СТОРІНКАМИ) ---

        function router() {
            if (!getAuthReady()) {
                showLoading();
                return; // Чекаємо, поки Auth ініціалізується
            }
            
            const hash = window.location.hash || '#/catalog';
            const route = hash.split('?')[0]; // Ігноруємо параметри запиту

            // Знімаємо активний клас з усіх посилань
            document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));

            // Зупиняємо попередній слухач Firestore, якщо він був
            if (productsUnsubscribe) {
                productsUnsubscribe();
                productsUnsubscribe = null;
            }
            
            showLoading();

            // Визначаємо, який шаблон відобразити
            switch (route) {
                case '#/catalog':
                    document.getElementById('nav-catalog').classList.add('active');
                    // Функція renderCatalogPage буде викликана в listenToProducts після завантаження даних
                    // Але ми одразу викликаємо listen, щоб почати процес
                    listenToProducts();
                    break;
                case '#/login':
                    document.getElementById('nav-login').classList.add('active');
                    renderLoginPage();
                    break;
                case '#/admin':
                    document.getElementById('nav-admin').classList.add('active');
                    renderAdminPage();
                    break;
                default:
                    window.location.hash = '#/catalog';
                    break;
            }
        }

        // Ініціалізація роутера
        window.initRouter = () => {
            window.addEventListener('hashchange', router);
            router(); // Перший запуск
        };
        
        // Якщо автентифікація вже завершена на момент завантаження, запускаємо роутер негайно.
        if (getAuthReady()) {
             window.initRouter();
        }

    </script>
</body>
</html>