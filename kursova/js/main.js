// js/main.js - Основна логіка маршрутизації та відображення
// Глобальні змінні Firebase (db, auth, userId, appId) доступні через window.

const appContainer = document.getElementById('app-container');
const loadingSpinner = document.getElementById('loading-spinner');

// =========================================================
// 1. УТИЛІТИ ДЛЯ ВІДОБРАЖЕННЯ
// =========================================================

/**
 * Відображає спіннер завантаження.
 */
function showLoading() {
    if (loadingSpinner) {
        // Очищаємо контейнер, але залишаємо спіннер видимим
        appContainer.innerHTML = ''; 
        loadingSpinner.style.display = 'block';
    }
}

/**
 * Приховує спіннер завантаження.
 */
function hideLoading() {
    if (loadingSpinner) {
        loadingSpinner.style.display = 'none';
    }
}

/**
 * Відображає повідомлення у контейнері.
 * @param {string} message - Текст повідомлення.
 * @param {string} type - Тип повідомлення ('success' або 'error').
 */
function showMessage(message, type = 'success') {
    // Вставляємо повідомлення
    appContainer.innerHTML = `<div class="message ${type}-message form-card" style="max-width: 600px; margin: 50px auto;">${message}</div>`;
    hideLoading();
}

// =========================================================
// 2. ФУНКЦІЇ ВІДОБРАЖЕННЯ ВМІСТУ
// =========================================================

// HTML-КОНТЕНТ ДЛЯ ПОЧАТКОВОЇ СТОРІНКИ (Щоб не змінювати її дизайн)
const INITIAL_CONTENT = `<h2 style="text-align: center; color: #4A301D; margin-top: 50px;">Ласкаво просимо до SpBooks! Оберіть розділ у навігації.</h2>`;

/**
 * Відображає сторінку Каталогу. (Заглушка)
 */
function renderCatalog() {
    showLoading();
    // Імітація завантаження даних
    setTimeout(() => {
        appContainer.innerHTML = `
            <h2><i class="fas fa-book-open"></i> Каталог Книг</h2>
            <div class="data-table-container form-card">
                <p>Тут буде відображено список книг, завантажених з Firestore. Наразі це заглушка.</p>
                <p style="margin-top: 15px;">**Поточний користувач (для перевірки):** ${window.userId || 'Невідомо (Зачекайте Firebase Auth)'}</p>
            </div>
        `;
        hideLoading();
    }, 300);
}

/**
 * Відображає сторінку Входу/Реєстрації. (Заглушка)
 */
function renderLogin() {
    showLoading();
    // Імітація завантаження
    setTimeout(() => {
        appContainer.innerHTML = `
            <h2><i class="fas fa-sign-in-alt"></i> Вхід та Реєстрація</h2>
            <div class="form-card" style="max-width: 400px; margin: 30px auto;">
                <p style="margin-bottom: 20px;">Цей розділ дозволить користувачам автентифікуватися через Firebase Auth. Наразі це заглушка.</p>
                <form id="login-form">
                    <label for="email">Електронна пошта:</label>
                    <input type="email" id="email" name="email" required class="input-field">
                    
                    <label for="password">Пароль:</label>
                    <input type="password" id="password" name="password" required class="input-field">
                    
                    <button type="submit" class="btn"><i class="fas fa-user-check"></i> Увійти</button>
                    <button type="button" class="btn btn-secondary" style="margin-left: 10px;"><i class="fas fa-user-plus"></i> Реєстрація</button>
                </form>
            </div>
        `;
        hideLoading();
    }, 300);
}

/**
 * Відображає Адмін-панель. (Заглушка)
 */
function renderAdmin() {
    showLoading();
    // Імітація завантаження
    setTimeout(() => {
        appContainer.innerHTML = `
            <h2><i class="fas fa-user-shield"></i> Адмін-панель</h2>
            <div class="data-table-container form-card">
                <p>Тут буде доступ до функцій додавання, редагування та видалення книг.</p>
                <p class="error-message">Примітка: доступ до цього розділу має бути обмежений лише для адміністраторів!</p>
            </div>
        `;
        hideLoading();
    }, 300);
}

/**
 * Головна функція роутера: обирає, яку сторінку відобразити.
 */
function route() {
    // Отримуємо частину URL після #, видаляючи символ / на початку
    const path = window.location.hash.slice(1).replace(/^\//, '') || '';
    console.log("Routing to path:", path);

    switch (path) {
        case '':
            // Зберігаємо початковий вигляд сторінки
            if (appContainer.innerHTML.indexOf('Ласкаво просимо') === -1) {
                appContainer.innerHTML = INITIAL_CONTENT;
            }
            hideLoading();
            break;
        case 'catalog':
            renderCatalog();
            break;
        case 'login':
            renderLogin();
            break;
        case 'admin':
            renderAdmin();
            break;
        default:
            renderNotFound();
            break;
    }
}

/**
 * Відображає сторінку 404 (Не знайдено).
 */
function renderNotFound() {
    showMessage('<h4>404. Сторінку не знайдено!</h4> Перевірте адресу.', 'error');
}

// =========================================================
// 3. ІНІЦІАЛІЗАЦІЯ
// =========================================================

/**
 * Ініціалізує роутер.
 * Ця функція запускається один раз при завантаженні DOM.
 */
function initRouter() {
    // 1. Встановлюємо слухач на зміну хешу (коли натискаємо на a href="#/...")
    window.removeEventListener('hashchange', route); // Запобігаємо подвійному слухачу
    window.addEventListener('hashchange', route);
    
    // 2. Запускаємо роутинг один раз при першому завантаженні сторінки
    route();
    
    console.log("Router initialized and ready.");
}

// Запуск роутера при повному завантаженні документа
document.addEventListener('DOMContentLoaded', initRouter);

// Робимо initRouter доступним глобально для Firebase-блоку, якщо він все ж потрібен
window.initRouter = initRouter;