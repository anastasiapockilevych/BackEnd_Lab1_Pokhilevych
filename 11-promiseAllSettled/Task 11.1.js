// ==================== ЗАВДАННЯ 11.1 ====================
/**
 * Використайте Promise.allSettled() для обробки масиву промісів
 * Порахуйте скільки успішних і скільки невдалих
 */
function analyzeResults(promises) {
    // Чекаємо завершення ВСІХ промісів
    return Promise.allSettled(promises).then(results => {
        let successful = 0;
        let failed = 0;

        // Перебираємо результати і рахуємо
        results.forEach(result => {
            if (result.status === 'fulfilled') {
                successful++;
            } else if (result.status === 'rejected') {
                failed++;
            }
        });

        // Повертаємо об'єкт зі статистикою
        return {
            successful: successful,
            failed: failed,
            results: results
        };
    });
}

// Перевірка:
const testPromises1 = [
    Promise.resolve(1),
    Promise.reject(new Error('Fail')),
    Promise.resolve(3),
    Promise.reject(new Error('Another fail')),
    Promise.resolve(5)
];

analyzeResults(testPromises1)
    .then(stats => {
        console.log('Тест 11.1:', stats);
        // Очікується: {successful: 3, failed: 2, results: [...]}
    });