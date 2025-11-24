// js/modules/Router.js

import { CatalogPage } from '../ui/CatalogPage.js';
import { AdminPage } from '../ui/AdminPage.js';
import { LoginPage } from '../ui/LoginPage.js';
import { ReportsPage } from '../ui/ReportsPage.js'; // Якщо ви вже створили цей файл
import { AuthManager } from './Auth.js'; // <-- Це має бути ЄДИНИЙ імпорт AuthManager

export class Router {
    constructor(appContainerId) {
        this.appContainer = document.getElementById(appContainerId);
        
        // !!! ПЕРЕВІРТЕ: Екземпляр створюється ТІЛЬКИ ТУТ !!!
        this.auth = new AuthManager();
      // ...
this.routes = {
    // ... інші маршрути ...
    '/admin': AdminPage, 
    '/reports': ReportsPage, // <-- ТЕПЕР ВКАЗУЄ НА REPORTS PAGE
};

// Налаштування захисту маршруту (тільки для адміністратора)
this.protectedRoutes = {
    '/admin': ['адміністратор', 'менеджер'],
    '/reports': ['адміністратор'], // <-- ТІЛЬКИ АДМІНІСТРАТОР
};
// ...
        
        // Визначаємо необхідні ролі для захищених маршрутів
        this.protectedRoutes = {
            '/admin': ['адміністратор', 'менеджер'],
            '/reports': ['адміністратор'],
        };
    }

    init() {
        window.addEventListener('hashchange', this.route.bind(this));
        // При завантаженні сторінки також потрібно рендерити навігацію, 
        // оскільки вона залежить від ролі користувача
        this.renderNavigation();
        this.route();
    }
    
    // Нова функція для динамічного рендерингу навігації
    renderNavigation() {
        const navContainer = document.getElementById('navigation-container');
        const role = this.auth.getCurrentUserRole();
        
        // Базова навігація
        let navHtml = `
            <a href="#/catalog" class="nav-link">Каталог</a> | 
            <a href="#/login" class="nav-link">Вхід</a>
        `;
        
        // Додавання посилань залежно від ролі
        if (role === 'менеджер' || role === 'адміністратор') {
            navHtml += ` | <a href="#/admin" class="nav-link">Керування</a>`;
        }
        if (role === 'адміністратор') {
             navHtml += ` | <a href="#/reports" class="nav-link">Звіти</a>`;
        }
        
        // Якщо користувач увійшов, додаємо кнопку "Вихід"
        if (this.auth.isAuthenticated()) {
            navHtml += ` | <button id="logout-btn">Вихід (${role})</button>`;
        }
        
        if (navContainer) {
            navContainer.innerHTML = navHtml;
        }

        // Додаємо слухача події на кнопку "Вихід"
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.auth.logout());
        }
    }

    // Оновлена функція маршрутизації
    route() {
        const path = window.location.hash.slice(1) || '/';
        const page = this.routes[path];
        const role = this.auth.getCurrentUserRole();

        // 1. ПЕРЕВІРКА ЗАХИЩЕНИХ МАРШРУТІВ
        const requiredRoles = this.protectedRoutes[path];
        
        if (requiredRoles) {
            if (!this.auth.isAuthenticated()) {
                // Якщо не автентифікований, перенаправляємо на вхід
                window.location.hash = '/login'; 
                return;
            }
            if (!requiredRoles.includes(role)) {
                // Якщо недостатньо прав (наприклад, менеджер хоче зайти у звіти)
                this.appContainer.innerHTML = `<h2>🚫 Доступ заборонено</h2><p>Ваша роль (${role}) не має доступу до цієї сторінки.</p>`;
                return;
            }
        }
        
        // 2. РЕНДЕРИНГ
        if (page) {
            page.render(this.appContainer);
        } else {
            this.render404();
        }
        
        // Перерендеринг навігації після зміни маршруту (наприклад, після входу/виходу)
        this.renderNavigation();
    }
    // ... render404 залишається без змін ...
    render404() {
        if (this.appContainer) {
            this.appContainer.innerHTML = `
                <h2>🚫 404: Сторінка не знайдена</h2>
                <p>Вибачте, але такої сторінки не існує.</p>
                <p><a href="#/catalog">Перейти до Каталогу</a></p>
            `;
        }
    }
}