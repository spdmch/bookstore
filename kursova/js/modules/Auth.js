import { 
    getAuth, 
    signInWithCustomToken, 
    signInAnonymously,
    onAuthStateChanged,
    signOut,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword // Додано для реєстрації
} from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js';

// Ролі користувачів
export const USER_ROLES = {
    GUEST: 'guest',
    MANAGER: 'manager',
    ADMIN: 'admin',
    // Примітка: ролі користувачів (крім UID) у Firestore не зберігаються,
    // вони визначаються заздалегідь для демо-мети.
};

export class AuthManager {
    /**
     * @param {App} app - Екземпляр Firebase App.
     */
    constructor(app) {
        this.auth = getAuth(app);
        this.currentUser = null;
        this.isAuthenticated = false;
        this.userRole = USER_ROLES.GUEST;
    }

    /**
     * Ініціалізує автентифікацію. Викликається один раз при запуску.
     * Спробує увійти через CustomToken, інакше анонімно.
     */
    async init() {
        this.currentUser = null; // Очищаємо стан
        this.isAuthenticated = false; // Очищаємо стан

        const token = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;
        
        // Встановлюємо слухача змін стану автентифікації
        return new Promise((resolve) => {
            const unsubscribe = onAuthStateChanged(this.auth, (user) => {
                this.currentUser = user;
                this.isAuthenticated = !!user;
                this.userRole = this.determineUserRole(user);
                
                // Після першого виклику слухача, ми знаємо початковий стан
                if (unsubscribe) {
                    unsubscribe(); // Відписуємося після першої перевірки
                }
                resolve(this);
            });

            // Виконуємо початковий вхід
            if (token) {
                signInWithCustomToken(this.auth, token)
                    .catch(error => {
                        console.error("Помилка входу за токеном:", error);
                        signInAnonymously(this.auth);
                    });
            } else {
                signInAnonymously(this.auth)
                    .catch(error => console.error("Помилка анонімного входу:", error));
            }
        });
    }

    /**
     * Визначає роль користувача на основі його UID або пошти (для демо-мети).
     * @param {User} user
     * @returns {string}
     */
    determineUserRole(user) {
        if (!user) return USER_ROLES.GUEST;
        
        // Використовуємо UID для визначення ролей (це симуляція, в реальному світі ролі зберігаються у Firestore)
        // Для спрощення демо-логіки, припустимо, що певні UID/email мають ролі
        if (user.email === 'test@admin.com') return USER_ROLES.ADMIN;
        if (user.email === 'test@manager.com') return USER_ROLES.MANAGER;
        
        return USER_ROLES.GUEST;
    }

    /**
     * Вхід користувача за допомогою електронної пошти та пароля.
     * @param {string} email
     * @param {string} password
     */
    async login(email, password) {
        try {
            await signInWithEmailAndPassword(this.auth, email, password);
            // onAuthStateChanged оновиться автоматично
        } catch (error) {
            console.error("Помилка входу:", error.message);
            // Перекидаємо помилку далі, щоб UI міг її відобразити
            throw new Error(this.getAuthErrorMessage(error.code));
        }
    }

    /**
     * Реєстрація нового користувача.
     * @param {string} email
     * @param {string} password
     */
    async signup(email, password) {
        try {
            // Використовуємо createUserWithEmailAndPassword для створення нового користувача
            await createUserWithEmailAndPassword(this.auth, email, password);
            // onAuthStateChanged оновиться автоматично, користувач буде одразу авторизований
        } catch (error) {
            console.error("Помилка реєстрації:", error.message);
            // Перекидаємо помилку далі, щоб UI міг її відобразити
            throw new Error(this.getAuthErrorMessage(error.code));
        }
    }

    /**
     * Вихід користувача.
     */
    async logout() {
        try {
            await signOut(this.auth);
            // onAuthStateChanged оновиться автоматично
        } catch (error) {
            console.error("Помилка виходу:", error);
            throw error;
        }
    }
    
    /**
     * Перетворює коди помилок Firebase на зрозумілі повідомлення.
     * @param {string} code 
     */
    getAuthErrorMessage(code) {
        switch (code) {
            case 'auth/user-not-found':
            case 'auth/wrong-password':
                return 'Невірний email або пароль.';
            case 'auth/email-already-in-use':
                return 'Користувач з таким email вже зареєстрований.';
            case 'auth/invalid-email':
                return 'Некоректний формат email.';
            case 'auth/weak-password':
                return 'Пароль має бути не менше 6 символів.';
            case 'auth/operation-not-allowed':
                return 'Вхід/реєстрація за допомогою email та пароля відключена. Перевірте налаштування Firebase Project.';
            default:
                return 'Невідома помилка автентифікації.';
        }
    }
}