// js/ui/ReportsPage.js

import { ApiClient } from '../modules/ApiClient.js';
import { AuthManager } from '../modules/Auth.js';

const api = new ApiClient();
const auth = new AuthManager();

export const ReportsPage = {
    async render(targetElement) {
        targetElement.innerHTML = `
            <h2>📈 Звіти та Аналіз Продажів</h2>
            <p>Цей інтерфейс доступний лише адміністраторам.</p>
            
            <div class="report-controls">
                <label for="report-type">Тип звіту:</label>
                <select id="report-type">
                    <option value="sales-by-month">Продажі за місяцями</option>
                    <option value="stock-level">Рівень запасів (Top 5)</option>
                </select>
            </div>

            <div class="chart-container" style="max-width: 800px; margin: 20px auto;">
                <canvas id="salesChart"></canvas>
            </div>
            
            <p id="report-message" class="error-message"></p>
        `;

        // Додаємо слухача для вибору звіту (якщо потрібно)
        document.getElementById('report-type').addEventListener('change', () => this.loadAndDisplayReport(targetElement));
        
        await this.loadAndDisplayReport(targetElement);
    },
    
    async loadAndDisplayReport(targetElement) {
        const messageElement = document.getElementById('report-message');
        const reportType = document.getElementById('report-type').value;
        const token = auth.getToken();
        
        messageElement.textContent = 'Завантаження даних для звіту...';
        
        try {
            // Отримуємо дані з бекенду (використовуємо ApiClient.getSalesReports)
            // ПРИМІТКА: Вам потрібно буде реалізувати /api/reports/sales на бекенді
            const reportData = await api.getSalesReports({ type: reportType }, token);
            
            messageElement.textContent = '';
            
            // Запускаємо візуалізацію
            this.renderChart(reportData, reportType);

        } catch (error) {
            messageElement.textContent = `Помилка завантаження звіту: ${error.message}`;
            this.clearChart();
        }
    },
    
    clearChart() {
        const canvas = document.getElementById('salesChart');
        // Якщо Chart.js вже ініціалізовано на цьому canvas, його треба знищити
        if (canvas && canvas.chart) { 
            canvas.chart.destroy();
        }
    },

    renderChart(data, type) {
        this.clearChart(); // Очищаємо попередній графік
        const ctx = document.getElementById('salesChart').getContext('2d');
        
        let chartConfig = {};
        
        if (type === 'sales-by-month') {
            chartConfig = {
                type: 'bar', // Стовпчаста діаграма
                data: {
                    // Місяці з даних звіту
                    labels: data.labels, 
                    datasets: [{
                        label: 'Загальний обсяг продажів (грн)',
                        data: data.values,
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            };
        } 
        // Тут можна додати інші типи графіків (наприклад, для stock-level)
        
        // Зберігаємо екземпляр Chart, щоб його можна було знищити пізніше
        document.getElementById('salesChart').chart = new Chart(ctx, chartConfig);
    }
};