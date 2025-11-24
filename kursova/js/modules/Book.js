// js/modules/Book.js - Зміна на ЕКСПОРТ ЗА ЗАМОВЧУВАННЯМ

export class Book { 
    constructor(id, title, author, price) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.price = price;
    }

    toHtml() {
        return `
            <div class="book-card" data-id="${this.id}">
                <h4>${this.title}</h4>
                <p>Автор: ${this.author}</p>
                <p>Ціна: ${this.price} грн</p>
                <button class="add-to-cart">Купити</button>
            </div>
        `;
    }
}

// !!! КРИТИЧНО: Експорт за замовчуванням !!!
export default Book;