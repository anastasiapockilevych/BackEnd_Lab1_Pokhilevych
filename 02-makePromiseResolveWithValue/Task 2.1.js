/**
 * Створіть проміс, який одразу резолвиться зі значенням
 * * @param {any} value - Будь-яке значення
 * @returns {Promise<any>}
 */
function makePromiseResolveWith(value) {
    // Повертаємо готовий успішний проміс із переданим значенням
    return Promise.resolve(value);
}

// Перевірка:
makePromiseResolveWith(5)
    .then(value => console.log('Тест 2.1:', value)); // Очікується: 5