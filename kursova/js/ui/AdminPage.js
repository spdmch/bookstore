export class AdminPage {
    constructor(apiClient, authManager) {
        this.apiClient = apiClient;
        this.authManager = authManager;
    }

    render(container) {
        const role = this.authManager.getCurrentUserRole();
        container.innerHTML = `
            <div class="p-8 bg-white rounded-xl shadow-2xl">
                <h1 class="text-4xl font-bold text-red-700 mb-6 border-b-2 pb-2">🛠️ Адмін-панель</h1>
                <p class="text-gray-600 mb-4">Привіт, ${role}! Тут ви зможете керувати асортиментом книг.</p>
                <div class="bg-yellow-50 p-6 rounded-lg shadow-inner">
                    <h2 class="text-2xl font-semibold text-yellow-800 mb-4">Керування Книгами</h2>
                    <p class="text-gray-700">Форма для додавання/редагування/видалення книг буде тут.</p>
                </div>
            </div>
        `;
        // TODO: Додати форму CRUD та логіку

    }
}