export class LoginPage {
    constructor(apiClient, authManager) {
        this.apiClient = apiClient;
        this.authManager = authManager;
        this.container = null;

        // Прив'язка контексту
        this.handleLogin = this.handleLogin.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
    }

    showMessage(message, type) {
        const messageBox = this.container.querySelector('#auth-message');
        if (!messageBox) return;
        messageBox.textContent = message;
        messageBox.className = `p-3 mb-4 rounded-lg font-medium transition duration-300 ${type === 'error' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`;
    }

    async handleLogin(event) {
        event.preventDefault();
        const email = this.container.querySelector('#email').value;
        const password = this.container.querySelector('#password').value;
        
        if (!email || !password) return this.showMessage('Введіть дані.', 'error');

        try {
            await this.authManager.login(email, password);
            this.showMessage('Вхід успішний!', 'success');
            setTimeout(() => window.location.hash = '/catalog', 1000);
        } catch (error) {
            this.showMessage(error.message, 'error');
        }
    }

    async handleSignup(event) {
        event.preventDefault();
        const email = this.container.querySelector('#email').value;
        const password = this.container.querySelector('#password').value;

        if (!email || !password) return this.showMessage('Введіть дані.', 'error');
        if (password.length < 6) return this.showMessage('Пароль має бути від 6 символів.', 'error');

        try {
            await this.authManager.signup(email, password);
            this.showMessage('Реєстрація успішна!', 'success');
            setTimeout(() => window.location.hash = '/catalog', 1000);
        } catch (error) {
            this.showMessage(error.message, 'error');
        }
    }

    render(container) {
        this.container = container;
        
        // Якщо користувач вже в системі
        if (this.authManager.isAuthenticated()) {
            container.innerHTML = `
                <div class="p-8 max-w-lg mx-auto bg-white rounded-xl shadow-2xl text-center">
                    <h1 class="text-2xl font-bold text-yellow-800 mb-4">Ви вже авторизовані</h1>
                    <p class="mb-6">Ваша роль: <strong>${this.authManager.getCurrentUserRole()}</strong></p>
                    <a href="#/catalog" class="btn btn-primary">До каталогу</a>
                </div>`;
            return;
        }

        container.innerHTML = `
            <div class="p-8 max-w-lg mx-auto bg-yellow-50 rounded-xl shadow-2xl mt-10">
                <h1 class="text-3xl font-bold text-yellow-800 mb-6">🔑 Вхід та Реєстрація</h1>
                <div id="auth-message" class="hidden"></div>
                <form id="login-form" class="space-y-4">
                    <div><label class="block text-sm font-bold text-gray-700">Email</label>
                    <input type="email" id="email" class="w-full p-2 border rounded" placeholder="test@admin.com"></div>
                    <div><label class="block text-sm font-bold text-gray-700">Пароль</label>
                    <input type="password" id="password" class="w-full p-2 border rounded" placeholder="******"></div>
                    <div class="flex flex-col space-y-3 pt-4">
                        <button type="submit" id="login-btn" class="btn btn-primary w-full">Увійти</button>
                        <button type="button" id="signup-btn" class="btn btn-secondary w-full bg-white border border-yellow-600 text-yellow-800">Реєстрація</button>
                    </div>
                </form>
            </div>
        `;

        this.container.querySelector('#login-btn').addEventListener('click', this.handleLogin);
        this.container.querySelector('#signup-btn').addEventListener('click', this.handleSignup);
    }
}