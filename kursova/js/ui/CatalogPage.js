// js/ui/CatalogPage.js

// 1. Імпортуємо ВСІ необхідні залежності, які використовує цей файл
import { ApiClient } from '../modules/ApiClient.js';
import { Book } from '../modules/Book.js';

// 2. Створюємо єдиний екземпляр ApiClient
const api = new ApiClient(); 

export const CatalogPage = {
    /**
     * Рендерить сторінку Каталогу.
     * @param {HTMLElement} targetElement - Елемент (зазвичай div#app-container), куди потрібно вставити контент.
     */
    async render(targetElement) {
        
        // targetElement тут є нашим div#app-container, який передав Router.
        const appContainer = targetElement; 

        // Ваш код починається тут (без document.addEventListener)
        appContainer.innerHTML = '<h2>Завантаження даних каталогу...</h2>';
        
        try {
            // 3. Виклик API для отримання даних
            const booksData = await api.getBooks(); 
            
            if (booksData && booksData.length > 0) {
                appContainer.innerHTML = '<h2>📚 Каталог Книг</h2><div id="book-list"></div>';
                const bookListElement = document.getElementById('book-list');

                // 4. Створення та відображення елементів Book
                booksData.forEach(data => {
                    const book = new Book(data.id, data.title, data.author, data.price);
                    bookListElement.innerHTML += book.toHtml();
                });
            } else {
                appContainer.innerHTML = '<h2>Каталог порожній. Перевірте, чи запущено бекенд.</h2>';
            }

        } catch (error) {
            // 5. Обробка помилки (наприклад, бекенд не працює)
            appContainer.innerHTML = `<h2>Помилка завантаження</h2><p>Неможливо підключитися до API: ${error.message}</p>`;
        }
    }
};