import { 
    doc, 
    collection, 
    query, 
    onSnapshot, 
    addDoc, 
    updateDoc, 
    deleteDoc 
} from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js';
import { Book } from './Book.js';

// ID додатку, який використовується для визначення шляху до колекції в Firestore
const APP_ID = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

export class ApiClient {
    /**
     * @param {Firestore} db - Екземпляр Firestore.
     * @param {Auth} auth - Екземпляр Auth.
     */
    constructor(db, auth) {
        this.db = db;
        this.auth = auth;
    }

    // Приватна функція для отримання шляху до колекції книг (публічні дані)
    getBooksCollectionRef() {
        // Шлях: /artifacts/{appId}/public/data/books
        return collection(this.db, `artifacts/${APP_ID}/public/data/books`);
    }

    /**
     * Отримує список книг у реальному часі (onSnapshot).
     * @param {function(Book[])} callback - Колбек-функція для обробки оновлень.
     * @returns {function()} - Функція для відписки від слухача (для очищення).
     */
    subscribeToBooks(callback) {
        const booksQuery = query(this.getBooksCollectionRef());

        // onSnapshot - слухач змін у реальному часі
        const unsubscribe = onSnapshot(booksQuery, (snapshot) => {
            const books = [];
            snapshot.forEach((doc) => {
                // Створюємо екземпляр класу Book
                books.push(new Book({ id: doc.id, ...doc.data() }));
            });
            // Сортуємо книги за назвою локально
            books.sort((a, b) => a.title.localeCompare(b.title));
            callback(books); // Передаємо оновлений список до UI
        }, (error) => {
            console.error("Помилка підписки на книги:", error);
            callback([]); // Передаємо пустий масив у разі помилки
        });

        return unsubscribe;
    }
    
    /**
     * Додає нову книгу до колекції.
     * @param {Book} book - Екземпляр класу Book.
     */
    async addBook(book) {
        try {
            // Використовуємо .toFirestore() для отримання чистого об'єкта даних
            await addDoc(this.getBooksCollectionRef(), book.toFirestore());
            console.log("Книга успішно додана.");
        } catch (e) {
            console.error("Помилка додавання книги: ", e);
            throw e; 
        }
    }

    /**
     * Оновлює існуючу книгу.
     * @param {string} id - ID книги.
     * @param {Object} data - Об'єкт з оновленими полями.
     */
    async updateBook(id, data) {
        try {
            const bookRef = doc(this.getBooksCollectionRef(), id);
            await updateDoc(bookRef, data);
            console.log(`Книга з ID ${id} оновлена.`);
        } catch (e) {
            console.error("Помилка оновлення книги: ", e);
            throw e;
        }
    }
    
    /**
     * Видаляє книгу.
     * @param {string} id - ID книги.
     */
    async deleteBook(id) {
        try {
            const bookRef = doc(this.getBooksCollectionRef(), id);
            await deleteDoc(bookRef);
            console.log(`Книга з ID ${id} видалена.`);
        } catch (e) {
            console.error("Помилка видалення книги: ", e);
            throw e;
        }
    }

    // TODO: Якщо буде потрібна логіка звітів, її можна додати сюди
}